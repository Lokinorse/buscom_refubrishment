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
    public function getCategoryData() {
        if (isset($this->request->get['category_id'])) {
            $category_id = (int)$this->request->get['category_id'];
            $this->load->model('catalog/category');
            $category_info = $this->model_catalog_category->getCategory($category_id);
            $this->response->addHeader('Content-Type: application/json');
            if (($this->request->server['REQUEST_METHOD'] == 'GET') && isset($this->request->server['HTTP_ORIGIN'])) {
                $this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
                $this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
                $this->response->addHeader('Access-Control-Max-Age: 1000');
                $this->response->addHeader('Access-Control-Allow-Credentials: true');
                $this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
                $headers = getallheaders();
            };
            $this->response->setOutput(json_encode($category_info));
        } else {
            echo 'cant see query params :(';
            $this->response->setOutput('');
        }
    }
    public function getProductsByCategoryId($category_id) {
        $category_id = (int)$this->request->get['category_id'];
        $this->response->addHeader('Content-Type: application/json');
        if (($this->request->server['REQUEST_METHOD'] == 'GET') && isset($this->request->server['HTTP_ORIGIN'])) {
            $this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
            $this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
            $this->response->addHeader('Access-Control-Max-Age: 1000');
            $this->response->addHeader('Access-Control-Allow-Credentials: true');
            $this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
            $headers = getallheaders();
        };
        $this->load->model('catalog/product');
        $filter_data = array(
            'filter_category_id' => $category_id
        );
        $products = array();
        $results = $this->model_catalog_product->getProducts($filter_data);
        foreach ($results as $result) {
            $products[] = array('product_id' => $result['product_id'], 'name' => $result['name'], 'price' => $result['price'],);
        }
        $this->response->setOutput(json_encode($results));
        return $products;
    }

    public function getConstructorData() {
        $this->response->addHeader('Content-Type: application/json');
        $this->response->addHeader('Access-Control-Allow-Origin: https://bus-com.ru');
        $this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        $this->response->addHeader('Access-Control-Max-Age: 1000');
        $this->response->addHeader('Access-Control-Allow-Credentials: true');
        $this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    
        $this->load->model('catalog/category');
        $this->load->model('catalog/product');
        $cats = $this->model_catalog_category->getCategories(89);
        $data['categories'] = [];
    
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
    
        $this->response->setOutput(json_encode($data));
    }
}
