import * as yup from "yup";
import { addressSchema } from "./address";
import { purchaseHistorySchema } from "./purchaseHistory";

export const customerValidationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  phoneNumber: yup.string().required().matches(/[0-9]/),
  address: addressSchema,
  purchaseHistory: yup.array().of(purchaseHistorySchema),
});

