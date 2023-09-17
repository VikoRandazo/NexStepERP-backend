import { Schema, model, Types } from "mongoose";
import { Product } from "../../src/models/Products/Product";

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: false },
    category: { type: String, required: true, index: true },
    stockQuantity: {
      type: Number,
      required: true,
      min: [0, `stock cannot be less than 0`],
      validate: {
        validator: (value: number) => {
          return value >= 0;
        },
      },
    },
    manufacturer: { type: String, required: false },
    purchasesAmount: { type: Number, required: false, default: 0 },
  },
  { versionKey: false }
);

export const ProductModel = model<Product>("product", ProductSchema);
