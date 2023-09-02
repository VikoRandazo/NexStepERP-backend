import { Schema, model, Document } from "mongoose";
import { Customer } from "../../src/models/Customer";
import { AddressSchema } from "./shared/address";
import { PurchaseHistorySchema } from "./shared/purchaseHistory";

const CustomerSchema = new Schema<Customer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    dateRegistered: { type: Date, required: true, default: Date.now },
    address: AddressSchema,
    purchaseHistory: [PurchaseHistorySchema],
  },
  { versionKey: false }
);

export const CustomerModel = model(`customer`, CustomerSchema);
