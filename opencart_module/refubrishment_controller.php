<?php
class ControllerInformationRefubrishment extends Controller {
    public function index() {
		$this->load->model('catalog/information');

		$this->document->addScript('catalog/view/javascript/refubrishment.js');
		$this->document->addStyle('catalog/view/theme/default/stylesheet/refubrishment.css');
            
        $this->document->setTitle($this->language->get('heading_title'));


		$data['footer'] = $this->load->controller('common/footer');
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['column_right'] = $this->load->controller('common/column_right');
		$data['content_top'] = $this->load->controller('common/content_top');
		$data['content_bottom'] = $this->load->controller('common/content_bottom');
    
        // Render the page
        $this->response->setOutput($this->load->view($this->config->get('config_template') . '/template/information/refubrishment.tpl', $data));
      }
    public function getCategoryData() {
        if (isset($this->request->get['category_id'])) {
            $category_id = (int)$this->request->get['category_id'];
            $this->load->model('catalog/category');
            $category_info = $this->model_catalog_category->getCategory($category_id);
            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode($category_info));
        } else {
            $this->response->setOutput('');
        }
    }
}