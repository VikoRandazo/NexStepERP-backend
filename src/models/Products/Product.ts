import { Document } from "mongoose";

export interface Product{
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stockQuantity?: number;
  manufacturer?: string;
  purchasesAmount?: number;
}

export default Product;
