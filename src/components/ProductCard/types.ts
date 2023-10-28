import { IProduct } from "../../types";
export interface IProductCardProps {
  parentCat: string;
  product: IProduct;
  isSeats: boolean;
  canPurchaseSingleProduct: boolean;
}
