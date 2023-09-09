import { Document } from "mongoose";

export interface PurchaseHistory {
  productId: string;
  quantity: number;
  purchaseDate: string;
  amountPaid: number;
}
