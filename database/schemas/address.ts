import { Schema, model, Document } from "mongoose";
import { Address } from "../../src/models/Address";

export const AddressSchema = new Schema<Address>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

export const AddressModel = model(`address`, AddressSchema);
