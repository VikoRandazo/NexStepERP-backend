import { ProductsSold } from "../Products/ProductsSold";

export interface Sale {
  id?: string;
  date: string;
  productsSold: ProductsSold[];
  totalAmount: number;
  customerId: string;
}
