import { Router } from "express";
import customersRoutes from "./Customers/customers";
const router = Router();

router.use("/customers", customersRoutes);
// router.use("/products", productsRoutes);
// router.use("/employees", employeesRoutes);

export default router;
