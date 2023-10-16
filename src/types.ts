import { TActionId } from "./services/totalDataReducer";

export interface IProductOptionValue {
  image: string;
  name: string;
  option_value_id: string;
  price: string;
  price_prefix: string;
  product_option_value_id: string;
  quantity: string;
  subtract: string;
}

export interface IProductOption {
  name: string;
  option_id: string;
  product_option_id: string;
  product_option_value: IProductOptionValue[];
  required: string;
  type: "radio";
  value: string;
}
export interface IProduct {
  options: IProductOption[];
  product_id: string;
  description: string;
  image: string;
  meta_description: string;
  meta_keyword: string;
  meta_title: string;
  minimum: string;
  model: string;
  mpn: string;
  name: string;
  points: string;
  price: string;
  quantity: string;
  rating: number;
  reviews: number;
  reward: null;
  sku: string;
  sort_order: string;
  special: null;
  status: string;
  stock_status: string;
  subtract: string;
  tag: string;
  upc: string;
  viewed: string;
  weight: string;
  width: string;
}

export interface IStep {
  category_id: string;
  column: string;
  date_added: string;
  date_modified: string;
  description: string;
  image: string;
  language_id: string;
  meta_description: string;
  meta_keyword: string;
  meta_title: string;
  name: string;
  parent_id: string;
  products: IProduct[];
  sort_order: string;
  status: string;
  store_id: string;
  subcategories: IStep[];
  top: string;
}
export type TSteps = IStep[];

export interface ITDProduct {
  product_id: string;
  count: number;
  additional_options: any[];
}
export interface ITotalData {
  products: ITDProduct[];
  tempState?: any;
}
