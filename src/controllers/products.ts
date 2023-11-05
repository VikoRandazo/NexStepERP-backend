import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../../database/schemas/product";
import { productValidation } from "../validation/Products/product";
import { Product } from "../models/Products/Product";

// middleWares
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const pid = req.body; 

  try {
    const foundProduct = await ProductModel.findById({ _id: pid });
    console.log(foundProduct);

    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
//   const products = req.body; // array

//   try {
//     for (const product of products) {
//       const foundProduct = await ProductModel.findById({ _id: product.pid });
//       console.log(foundProduct);
//     }
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body;
    console.log(productData);

    const dataValidated = await productValidation.validate(productData);

    const newProduct = await ProductModel.create(dataValidated);
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

export const deleteProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ids = req.body;
    console.log(ids);

    const foundProducts = await ProductModel.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Success!", product_deleted: foundProducts.deletedCount });
    next();
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pid = req.params.pid;
    const updates: Partial<Product> = req.body;
    console.log(updates.imageUrl);

    const updatedProduct = await ProductModel.findOneAndReplace({ _id: pid }, updates, {
      new: true,
    });

    res.status(201).json({ message: "Success!", updatedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

// reusable functions
export const updateProductData = async (pid: string, updates: any) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(pid, updates, {
      new: true,
      runValidators: true,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};
