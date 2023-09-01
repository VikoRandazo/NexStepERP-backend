import { Schema, model, Document } from "mongoose";
import { PurchaseHistory } from "../../src/models/PurchaseHistory";

export const PurchaseHistorySchema = new Schema<PurchaseHistory>(
  {
    productId: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    amountPaid: { type: Number, required: true },
  },
  { _id: false }
);

export const  PurchaseHistoryModel = model(`purchaseHistory`, PurchaseHistorySchema)