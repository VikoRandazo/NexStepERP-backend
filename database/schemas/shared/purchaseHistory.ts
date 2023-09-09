import { Schema, model, Document } from "mongoose";
import { PurchaseHistory } from "../../../src/models/shared/PurchaseHistory";

export const PurchaseHistorySchema = new Schema<PurchaseHistory>(
  {
    productId: { type: String, required: true },
    quantity: {type: Number, required: true},
    purchaseDate: { type: String, required: true },
    amountPaid: { type: Number, required: true },
  },
  { _id: false, versionKey: false }
);
