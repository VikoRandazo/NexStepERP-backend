import { Address } from "./Address";
import { PurchaseHistory } from "./PurchaseHistory";

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateRegistered: Date;
  address?: Address;
  purchaseHistory?: PurchaseHistory[];
};
