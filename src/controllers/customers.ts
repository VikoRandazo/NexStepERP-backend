import { Request, Response, NextFunction } from "express";
import { CustomerModel } from "../../database/schemas/customer";
import { customerValidationSchema } from "../validation/customers/customer";

interface MongoError extends Error {
  code?: number;
  keyPattern?: { [key: string]: number };
  keyValue?: { [key: string]: any };
}
// middlewares
export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allCustomers = await CustomerModel.find();
    res.status(200).json(allCustomers);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerIds:string[] = req.body
    const customers = await CustomerModel.find({ _id: { $in: customerIds } });
    if (customers) {
      res.status(200).json(customers);
    } else {
      res.status(404).json("clients ids didnt found")
    }
  } catch (error) {
    console.log(error);
  }
};

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  console.log("creating client");

  try {
    const newCustomerData = req.body;
    const { firstName, lastName, email, phoneNumber, address } = newCustomerData;
    const customerStructure = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      purchaseHistory: [],
    };
    const validation = await customerValidationSchema.validate(customerStructure);

    const newCustomer = await CustomerModel.create(validation);
    res.status(201).json({ message: "Success!", customer: newCustomer });
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cid = req.params.cid;

    const foundCustomer = await CustomerModel.deleteOne({ _id: cid });
    console.log(foundCustomer);

    res.status(200).json({ message: "Success!", customer_deleted: foundCustomer });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cid = req.params.cid;
    const updates = req.body;

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(cid, updates, { new: true });

    res.status(200).json({ message: "Success!", updatedCustomer });
  } catch (error) {
    res.status(500).json(error);
  }
};

// reusable functions

export const updateCustomerData = async (cid: string, updates: any) => {
  try {
    await CustomerModel.findByIdAndUpdate({ _id: cid }, { $push: updates });
  } catch (error) {
    console.log(error);
  }
};
