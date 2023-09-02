import * as yup from "yup";

export const purchaseHistorySchema = yup.object().shape({
    productId: yup.string().required(),
    purchaseDate: yup.string().required(),
    amountPaid: yup.number().required().min(0)
});