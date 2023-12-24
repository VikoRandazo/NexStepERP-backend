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
import mongoose from "mongoose";

export const getAllSales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales = await SaleModel.find();

    res.status(200).json(sales);
  } catch (error) {
    console.log(error);
  }
};

export const handleSoldProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cid = req.params.cid;
    const purchase = req.body;
    const { date, productsSold, totalAmount, customerId } = purchase;

    console.log(purchase);

    let productUpdates;
    let customerUpdates;

    for (const currentProduct of productsSold) {
      const foundProduct: Product | any = await ProductModel.findOne({ _id: currentProduct.pid });

      if (foundProduct) {
        // Update Stock
        productUpdates = {
          stockQuantity: foundProduct.stockQuantity - currentProduct.quantity,
          purchasesAmount: foundProduct.purchasesAmount + currentProduct.quantity,
        };

        // Update Product Purchase History
        const purchaseHistoryUpdates: PurchaseHistory = {
          productId: currentProduct.pid,
          quantity: currentProduct.quantity,
          purchaseDate: new Date().toISOString(),
          amountPaid: currentProduct.price * currentProduct.quantity,
        };

        customerUpdates = { purchaseHistory: purchaseHistoryUpdates };

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
      date: new Date().toISOString(),
      productsSold: productsSold,
      totalAmount: totalAmount,
      customerId: cid,
    };

    console.log(saleObj);

    const newSale = await SaleModel.create(saleObj);

    res.status(201).json({ message: "Success!", purchase: newSale });
  } catch (error) {
    console.log(error);
  }
};

export const clearSales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = await CustomerModel.updateMany({}, { $set: { purchaseHistory: [] } });
    
    res.status(200).json({ message: `success`, modified_objects: query.modifiedCount });
    console.log(query);
    
  } catch (error) {
    console.log(error);
  }
};
