import { Schema, model, Types } from "mongoose";
import Product from "../../src/models/Products/Product";

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true, index: true },
    stockQuantity: { type: Number, required: true },
    manufacturer: { type: String },
    purchasesAmount: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export const ProductModel = model<Product>("product", ProductSchema);
