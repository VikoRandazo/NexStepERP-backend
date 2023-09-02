import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../../database/schemas/product";
import { productValidation } from "../validation/Products/product";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body;

    const dataValidation = await productValidation.validate(productData);

    const newProduct = await ProductModel.create(productData);
    console.log(newProduct);

    res.status(201).json({ message: "Success!", product_created: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pid = req.params.pid;
    const foundProduct = await ProductModel.deleteOne({ _id: pid });
    res.status(200).json({ message: "Success!", product_deleted: foundProduct });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pid = req.params.pid;
    const updates = req.body;

    const updatedProduct = ProductModel.findByIdAndUpdate(pid, updates, { new: true });

    res.status(500).json({ message: "Success!", updatedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};
