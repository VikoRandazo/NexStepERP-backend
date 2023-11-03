import { Request, Response, NextFunction } from "express";
import { CustomerModel } from "../../database/schemas/customer";
import { customerValidationSchema } from "../validation/customers/customer";

// middlewares
export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allCustomers = await CustomerModel.find();
    res.status(200).json(allCustomers);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  try {
    const newCustomerData = req.body;
    const { firstName, lastName, email, phoneNumber, address } = newCustomerData;
    const { street, city, state, postalCode, country } = address;
    const customerStructure = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      dateRegistered: new Date().toISOString(),

      purchaseHistory: [],
    };
    const validation = await customerValidationSchema.validate(customerStructure);

    const newCustomer = await CustomerModel.create(validation);
    res.status(201).json({ message: "Success!", customer: newCustomer });
  } catch (error) {
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
