import { Schema, model, Document } from "mongoose";
import { Customer } from "../../src/models/Customer";
import { AddressSchema } from "./address";
import { PurchaseHistorySchema } from "./purchaseHistory";

const CustomerSchema = new Schema<Customer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Assuming email should be unique
    phoneNumber: { type: String },
    dateRegistered: { type: Date, required: true, default: Date.now },
    address: AddressSchema,
    purchaseHistory: [PurchaseHistorySchema],
  },
  { versionKey: false }
);

export const CustomerModel = model(`customer`, CustomerSchema);