<?php
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
        $cats = $this->model_catalog_category->getCategories(89);
        $data['categories'] = [];


        
        //seats (step 1)
        $seatsCat = new stdClass();
        $seatsCat->sort_order = '1';
        $seatsCat->name = 'Установка сидений';
        $seatsCat->category_id = '89';
        $seatsCat->products = [];
        // get options for Seats
        $noOption = $this->model_catalog_product->getProduct('352');
        $inturistSeat = $this->model_catalog_product->getProduct('249');
        $inturistSeatLux = $this->model_catalog_product->getProduct('205');
        

        // get options for options for you can select option while selecting option
        $inturistSeatOptions = $this->model_catalog_product->getProductOptions($inturistSeat['product_id']);
        $inturistSeatLuxOptions = $this->model_catalog_product->getProductOptions($inturistSeatLux['product_id']);
        $inturistSeat['options'] = $inturistSeatOptions;
        $inturistSeatLux['options'] = $inturistSeatLuxOptions;

        $inturistSeat['description'] = $inturistSeat['meta_description'];
        $inturistSeatLux['description'] = $inturistSeatLux['meta_description'];
        $seatsCat->products[] = $noOption;
        
        // add options for Seats
        $seatsCat->products[] = $inturistSeat;
        $seatsCat->products[] = $inturistSeatLux;
        // add Seats to categories
        $data['categories'][] = $seatsCat;



        foreach ($cats as $category) {
            if ($category['category_id'] === '91') {
                continue;
            }
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
        $this->response->setOutput(json_encode($data));

    }
}
