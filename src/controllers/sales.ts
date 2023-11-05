import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../../database/schemas/product";
import { SaleModel } from "../../database/schemas/sale";
import { Product } from "../models/Products/Product";
import { Sale } from "../models/Sales/Sale";
import { ProductsSold } from "../models/Products/ProductsSold";
import { updateCustomerData } from "./customers";
import { updateProductData } from "./products";
import { CustomerModel } from "../../database/schemas/customer";
import { PurchaseHistory } from "../models/shared/PurchaseHistory";

export const handleSoldProduct = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const productsSold = req.body.productsSold;
    const cid = req.params.cid;

    const date = new Date().toISOString();
    let totalAmount = 0;
    let productUpdates;
    let customerUpdates;

    for (const currentProduct of productsSold) {
      const foundProduct: Product | any = await ProductModel.findOne({ _id: currentProduct.pid });
      console.log(currentProduct);
      
      if (foundProduct) {
        productUpdates = {
          stockQuantity: foundProduct.stockQuantity - currentProduct.quantity,
          purchasesAmount: foundProduct.purchasesAmount + currentProduct.quantity,
        };

        const purchaseHistoryUpdates: PurchaseHistory = {
          productId: currentProduct.pid,
          quantity: currentProduct.quantity,
          purchaseDate: new Date().toISOString(),
          amountPaid: currentProduct.price * currentProduct.quantity,
        };

        customerUpdates = { purchaseHistory: purchaseHistoryUpdates };

        totalAmount += currentProduct.price;

        // Check if the product is in stock

        const updateProductResult = await updateProductData(currentProduct.pid, productUpdates);

        if (!updateProductResult.success) {
          return res
            .status(400)
            .json({ message: `Failed to update product data`, error: updateProductResult.error });
        }

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

    res.status(201).json({ message: "Success!", purchase: newSale });
  } catch (error) {
    console.log(error);
  }
};

