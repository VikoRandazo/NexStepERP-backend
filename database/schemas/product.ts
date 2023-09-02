import { Schema, model, Document } from "mongoose";
import Product from "../../src/models/Product";

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    manufacturer: { type: String, required: true },
  },
  { versionKey: false }
);

export const ProductModel = model(`product`, ProductSchema);
