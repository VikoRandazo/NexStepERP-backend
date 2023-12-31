import { Router } from "express";
import customersRoutes from "./Customers/customers";
import productsRoutes from "./Products/products";
import salesRoutes from "./Sales/sales";
import authRoutes from "./Auth/authRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/clients", customersRoutes);
router.use("/products", productsRoutes);
router.use("/sales", salesRoutes);

export default router;
