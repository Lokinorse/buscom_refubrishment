<?php

class ControllerInformationConstructor extends Controller {
	public function index() {
		$this->load->language('module/category');
		$this->load->language('module/product');
		$this->load->language('information/contact');
		$this->load->language('information/information');
		$this->load->model('catalog/information');
		$this->document->addScript('catalog/view/javascript/test.js');
		$this->document->addScript('catalog/view/javascript/constructor.js');
		$this->document->addStyle('catalog/view/theme/default/stylesheet/constructor.css');


		/* PAGE DATA */



		/*
			INFORMATION INFO

		*/

		$information_info = $this->model_catalog_information->getInformation(9);

		if ($information_info) {
			$this->document->setTitle($information_info['meta_title']);
			$this->document->setDescription($information_info['meta_description']);
			$this->document->setKeywords($information_info['meta_keyword']);


			$data['heading_title'] = $information_info['title'];
			$data['description'] = html_entity_decode($information_info['description'], ENT_QUOTES, 'UTF-8');

 			$data['telephone'] = $this->config->get('config_telephone');

		}
		/* / INFO */




		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'href' => $this->url->link('common/home')
		);

		$data['breadcrumbs'][] = array(
			'text' => $data['heading_title'],
			'href' => $this->url->link('information/constructor')
		);

		$data['text_location'] = $this->language->get('text_location');
		$data['text_store'] = $this->language->get('text_store');
		$data['text_contact'] = $this->language->get('text_contact');
		$data['text_address'] = $this->language->get('text_address');
		$data['text_telephone'] = $this->language->get('text_telephone');
		$data['text_fax'] = $this->language->get('text_fax');
		$data['text_open'] = $this->language->get('text_open');
		$data['text_comment'] = $this->language->get('text_comment');

		$data['entry_name'] = $this->language->get('entry_name');
		$data['entry_email'] = $this->language->get('entry_email');
		$data['entry_enquiry'] = $this->language->get('entry_enquiry');

		$data['button_map'] = $this->language->get('button_map');



		if (isset($this->request->post['name'])) {
			$data['name'] = $this->request->post['name'];
		} else {
			$data['name'] = $this->customer->getFirstName();
		}

		if (isset($this->request->post['email'])) {
			$data['email'] = $this->request->post['email'];
		} else {
			$data['email'] = $this->customer->getEmail();
		}

		if (isset($this->request->post['enquiry'])) {
			$data['enquiry'] = $this->request->post['enquiry'];
		} else {
			$data['enquiry'] = '';
		}

		// Captcha
		if ($this->config->get($this->config->get('config_captcha') . '_status') && in_array('contact', (array)$this->config->get('config_captcha_page'))) {
			$data['captcha'] = $this->load->controller('captcha/' . $this->config->get('config_captcha'), $this->error);
		} else {
			$data['captcha'] = '';
		}

		if (isset($this->error['name'])) {
			$data['error_name'] = $this->error['name'];
		} else {
			$data['error_name'] = '';
		}

		if (isset($this->error['email'])) {
			$data['error_email'] = $this->error['email'];
		} else {
			$data['error_email'] = '';
		}

		if (isset($this->error['enquiry'])) {
			$data['error_enquiry'] = $this->error['enquiry'];
		} else {
			$data['error_enquiry'] = '';
		}
		$data['button_submit'] = $this->language->get('button_submit');


		/* PAGE DATA */

		$data['footer'] = $this->load->controller('common/footer');
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['column_right'] = $this->load->controller('common/column_right');
		$data['content_top'] = $this->load->controller('common/content_top');
		$data['content_bottom'] = $this->load->controller('common/content_bottom');


		$cats = $this->model_catalog_category->getCategories(89);


		$data['categories'] = [];
		$data['action'] = $this->url->link('information/constructor', '', 'SSL');

		$data['action_contact'] = $this->url->link('information/contact', '', 'SSL');

		foreach ($cats as $cat_id => $category) {

			$productsInTheCat = $this->model_catalog_product->getProducts(['filter_category_id' => $category['category_id']]);
			$currentCat = $category;

			$currentCat['products'] = [];
			foreach ($productsInTheCat as $prod_id => $product) {
				$opts = $this->model_catalog_product->getProductImages($product['product_id']);

				$product['price'] = $this->currency->format($this->tax->calculate($product['price'], $product['tax_class_id'], $this->config->get('config_tax')));

				if (isset($opts[0]) && isset($opts[0]['image'])) {
					$product['image'] = $opts[0]['image'];
				}
				$pr_options = $this->model_catalog_product->getProductOptions($product['product_id']);



				$product['options'] = $pr_options;

				$currentCat['products'][] = $product;
			}
			$data['categories'][] = $currentCat;
		}


		if (($this->request->server['REQUEST_METHOD'] == 'GET')) {	
			if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/information/constructor.tpl')) {
				$this->response->setOutput($this->load->view($this->config->get('config_template') . '/template/information/constructor.tpl', $data));
			} else {
				$this->response->setOutput($this->load->view('default/template/information/constructor.tpl', $data));
			}
		} else if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate() ) {



			$mail = new Mail();
			$mail->protocol = $this->config->get('config_mail_protocol');
			$mail->parameter = $this->config->get('config_mail_parameter');
			$mail->smtp_hostname = $this->config->get('config_mail_smtp_hostname');
			$mail->smtp_username = $this->config->get('config_mail_smtp_username');
			$mail->smtp_password = html_entity_decode($this->config->get('config_mail_smtp_password'), ENT_QUOTES, 'UTF-8');
			$mail->smtp_port = $this->config->get('config_mail_smtp_port');
			$mail->smtp_timeout = $this->config->get('config_mail_smtp_timeout');
			$mail->setTo('info@bus-com.ru');
			//$mail->setTo('neuroweet@gmail.com');
			$mail->setFrom('info@bus-com.ru');
			$mail->setSender(html_entity_decode($this->request->post['name'], ENT_QUOTES, 'UTF-8'));
			$mail->setSubject("Заказ добработки с сайта");


			$tableTdStyle = 'border-collapse: collapse;border: 1px solid black;padding:5px;';
			$tableThStyle = 'padding:5px;text-align:left;';



			$services = json_decode(str_replace('&quot;', '"', $this->request->post['requestHtml']),true);


			//echo $this->request->post['requestHtml'];
			//var_dump($services);

			//echo($this->request->post['requestHtml']);


			$cart_table = "<table><tr><th>Название</th><th>Стоимость</th></tr>";
			$cart_totals = 0;
			foreach ($services as $serv) {

				$price = str_replace(' ', '', $serv['productprice']);

				$product_totals = $price * ($serv['count']);
				$cart_totals += intval($product_totals);

				$cart_table .= '
					<tr>
						<td style="'.$tableTdStyle.'">'.$serv['productname'].' <b>x '.$serv['count'].'</b></td>
						<td style="'.$tableTdStyle.'">'.number_format ($product_totals, 0 , "." , " " ).' руб.</td>
					</tr>
				';
				
			}

			$cart_table .= '<tr style="padding-top: 20px; height: 50px;"><td>Всего: </td><td><b>'.number_format ($cart_totals, 0 , "." , " " ).' руб.</b></td></tr></table>';



			$req = '
				<h1>Поступил новый заказ от <b>' . $this->request->post['name'] . '</b></h1>
				<br><br>
				<table >
					<tr>
						<th style="'.$tableThStyle.'">Email</th>
						<th style="'.$tableThStyle.'">Телефон</th>
					</tr>
					<tr>
						<td style="'.$tableTdStyle.'">'.$this->request->post['email'].'</td>
						<td style="'.$tableTdStyle.'">'.$this->request->post['phone'].'</td>
					</tr>
				</table>
				<br><br>
				<b>В заказе:</b><br><br>
				<div>
					'.$cart_table.'
				</div>
				';
			var_dump($req);

			$mail->setHtml($req);
			$test = $mail->send();
			
			$this->response->redirect($this->url->link('information/constructor/success'));
		} 


	}


}
