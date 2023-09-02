import { Document } from "mongoose";

export interface PurchaseHistory {
  productId: string;
  purchaseDate: string;
  amountPaid: number;
}
