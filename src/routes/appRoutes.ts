import { Router } from "express";
import customersRoutes from "./Customers/customers";
import productsRoutes from "./Products/products";
import salesRoutes from "./Sales/sales";

const router = Router();

router.use("/customers", customersRoutes);
router.use("/products", productsRoutes);
router.use("/sales", salesRoutes);

export default router;
