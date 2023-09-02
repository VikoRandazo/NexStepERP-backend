import * as yup from "yup";

export const addressSchema = yup.object().shape({
  street: yup.string().required(),
  city: yup.string().required(),
  postalCode: yup.string().required(),
  state: yup.string(),
  country: yup.string().required(),
});
