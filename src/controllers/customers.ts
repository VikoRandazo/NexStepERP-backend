import { Request, Response, NextFunction } from "express";
import { CustomerModel } from "../../database/schemas/customer";

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {};

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {    
  try {
    const newCustomerData = req.body;
    const newCustomer = await CustomerModel.create(newCustomerData);
    res.status(201).json({ message: "Success!", customer: newCustomer });
  } catch (error) {
    res.json(error)
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {};
export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {};
