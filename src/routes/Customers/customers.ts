import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomers,
  getCustomer,
} from "../../controllers/customers";

const router = Router();

router.post("/new", createCustomer);
router.get("/all", getCustomers);
router.post("/multiple", getCustomer);
router.delete("/:cid", deleteCustomer);
router.patch("/:cid", updateCustomer);

export default router;
