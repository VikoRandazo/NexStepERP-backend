import { Schema, model } from "mongoose";
import { Sale } from "../../src/models/Sales/Sale";

const SaleSchema = new Schema(
  {
    date: { type: String, required: true },
    productsSold: [
      {
        pid: { type: Schema.Types.ObjectId, ref: "product", required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    customerId: { type: String, required: true },
  },
  { versionKey: false }
);
export const SaleModel = model<Sale>(`sale`, SaleSchema);
