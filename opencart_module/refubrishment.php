<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "mailer/Exception.php";
require "mailer/PHPMailer.php";
require "mailer/SMTP.php";
// https://bus-com.ru/refubrishment
class ControllerInformationRefubrishment extends Controller {
    public function index() {
        $this->load->model('catalog/information');
        $this->load->language('module/category');
        $this->load->language('module/product');
        $this->document->addScript('catalog/view/javascript/refubrishment.js');
        $this->document->addStyle('catalog/view/stylesheet/refubrishment.css');
        $this->document->setTitle($this->language->get('heading_title'));
        $information_info = $this->model_catalog_information->getInformation(12);
        if ($information_info) {
            $this->document->setTitle($information_info['meta_title']);
            $this->document->setDescription($information_info['meta_description']);
            $this->document->setKeywords($information_info['meta_keyword']);
            $data['heading_title'] = $information_info['title'];
            $data['description'] = html_entity_decode($information_info['description'], ENT_QUOTES, 'UTF-8');
            $data['telephone'] = $this->config->get('config_telephone');
        }
        $data['footer'] = $this->load->controller('common/footer');
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['column_right'] = $this->load->controller('common/column_right');
        $data['content_top'] = $this->load->controller('common/content_top');
        $data['content_bottom'] = $this->load->controller('common/content_bottom');
        // Render the page
        $this->response->setOutput($this->load->view($this->config->get('config_template') . '/template/information/refubrishment.tpl', $data));
    }

    public function getCategoryData($category_id) {
        $productsInTheCat = $this->model_catalog_product->getDisabledProducts(['filter_category_id' => $category_id]);
        $currentCat = $this->model_catalog_category->getHiddenCategory($category_id);
        
        // Make seats first in list
        if ($currentCat['category_id'] === '91') {
            $currentCat['sort_order'] = '0';
        }
        
        $currentCat['products'] = [];
        
        foreach ($productsInTheCat as $product) {
            $opts = $this->model_catalog_product->getProductImages($product['product_id']);
            $product['price'] = $this->currency->format($this->tax->calculate($product['price'], $product['tax_class_id'], $this->config->get('config_tax')));
    
            if (isset($opts[0]) && isset($opts[0]['image'])) {
                $product['image'] = $opts[0]['image'];
            }
    
            $pr_options = $this->model_catalog_product->getProductOptions($product['product_id']);
            $product['options'] = $pr_options;
            $currentCat['products'][] = $product;
        }
        
        $subcategories = $this->model_catalog_category->getHiddenCategories($category_id);
        foreach($subcategories as &$subcat){
            $subcat= $this->getCategoryData($subcat['category_id']);
        };
        $currentCat['subcategories'] = $subcategories ?: array();
        
        return $currentCat;
    }

    public function getConstructorData() {
        $this->response->addHeader('Content-Type: application/json');
        // TODO: SET NEXT HEADER TO 'https://bus-com.ru' AFTER THE END OF DEV
        $this->response->addHeader('Access-Control-Allow-Origin: *');
        $this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        $this->response->addHeader('Access-Control-Max-Age: 1000');
        $this->response->addHeader('Access-Control-Allow-Credentials: true');
        $this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    
        $this->load->model('catalog/category');
        $this->load->model('catalog/product');
        $cats = $this->model_catalog_category->getHiddenCategories(89);
        $data['categories'] = [];

        foreach ($cats as $category) {
            $data['categories'][] = $this->getCategoryData($category['category_id']);
        }  
        $this->response->setOutput(json_encode($data));

    }

    public function makeOrder() {
        // Allow requests from any origin (not recommended for production)
        header("Access-Control-Allow-Origin: *");
        // Allow the appropriate HTTP methods (e.g., POST)
        header("Access-Control-Allow-Methods: POST");
        // Allow the appropriate headers (e.g., Content-Type)
        header("Access-Control-Allow-Headers: Content-Type");

        $invalid_characters = array("$", "%", "#", "<", ">", "|", "=");
        $name = str_replace($invalid_characters, "", $_POST["name"]);
        $phone = str_replace($invalid_characters, "", $_POST["phone"]);
        $email = str_replace($invalid_characters, "", $_POST["email"]);
        $order_config = str_replace($invalid_characters, "", $_POST["order_config"]);

        $mail = new PHPMailer;

        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.yandex.ru";
        $mail->Port = 465;
        $mail->Username = "info@bus-com.ru";
        $mail->Password = "Buscomnew2021";
        $mail->SMTPSecure = "ssl";
        $mail->CharSet = "UTF-8";
        $mail->setFrom("info@bus-com.ru", "ЗАКАЗ ПЕРЕОБОРУДОВАНИЯ 2.0");


        $mail->addAddress("info@bus-com.ru", "Zakaz");

        $mail->Subject = "Заказ переоборудования Баском";

        $body =  $name . "\r\n" . $phone . "\r\n" . $email . "\r\n" . $order_config ."\r\n";

        echo $body;

        $mail->isHTML(false);  
        $mail->Body = nl2br($body);
        $mail->AltBody = $body;
        $mail->send();
    }
}
