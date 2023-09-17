import * as yup from "yup";

export const productValidation = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .min(3, "Name should be at least 3 characters"),
  description: yup
    .string()
    .notRequired(),
  price: yup.number().required("Price is required").positive("Price must be a positive number"),
  imageUrl: yup.string().url("Must be a valid URL").notRequired(),
  category: yup.string().required(`Must assign product to a category`),
  stockQuantity: yup
    .number()
    .required("Stock quantity is required")
    .positive("Stock quantity must be a positive number")
    .integer("Stock quantity must be an integer"),
  manufacturer: yup.string().notRequired(),
  purchasesAmount: yup.number().notRequired().integer(),
});
