import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomers,
} from "../../controllers/customers";

const router = Router();

router.post("/new", createCustomer);
router.get("/all", getCustomers);
router.delete("/:cid", deleteCustomer);
router.put("/:cid", updateCustomer);

export default router;
