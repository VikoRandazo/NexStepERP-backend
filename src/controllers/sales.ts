import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../../database/schemas/product";
import { SaleModel } from "../../database/schemas/sale";
import Product from "../models/Products/Product";
import { Sale } from "../models/Sales/Sale";
import { ProductsSold } from "../models/Products/ProductsSold";
import { updateCustomerData } from "./customers";
import { updateProductData } from "./products";
import { CustomerModel } from "../../database/schemas/customer";
import { PurchaseHistory } from "../models/shared/PurchaseHistory";

export const handleSoldProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const date = new Date().toISOString();
    const productsSold: ProductsSold[] = req.body;
    let totalAmount = 0;
    const cid = req.params.cid;

    let productUpdates;
    let customerUpdates;

    for (const currentProduct of productsSold) {
      const foundProduct: Product | any = await ProductModel.findOne({ _id: currentProduct.pid });

      if (foundProduct) {
        productUpdates = {
          stockQuantity: foundProduct.stockQuantity - currentProduct.quantity,
          purchasesAmount: foundProduct.purchasesAmount + currentProduct.quantity,
        };

        const purchaseHistoryUpdates: PurchaseHistory = {
          productId: currentProduct.pid,
          purchaseDate: new Date().toISOString(),
          amountPaid: currentProduct.price * currentProduct.quantity,
        };

        customerUpdates = { purchaseHistory: purchaseHistoryUpdates };

        totalAmount += currentProduct.price;
        updateProductData(currentProduct.pid, productUpdates);
        updateCustomerData(cid, customerUpdates);
      }
    }

    const saleObj: Sale = {
      date,
      productsSold,
      totalAmount,
      customerId: cid,
    };

    const newSale = await SaleModel.create(saleObj);

    res.status(201).json({ message: "Success!", purchase: [newSale] });
  } catch (error) {
    console.log(error);
  }
};

// customer purchase history
// product stock
// purchases amount
