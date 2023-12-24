import { Schema, model } from "mongoose";
import { UserDetails } from "../../src/models/UserDetails";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);
export const UserModel = model<UserDetails>(`users`, UserSchema);
