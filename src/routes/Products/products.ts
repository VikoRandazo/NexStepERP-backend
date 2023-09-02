import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../controllers/products";

const router = Router();

router.get("/all", getProducts);
router.post("/new", createProduct);
router.delete("/:pid", deleteProduct);
router.patch("/:pid", updateProduct);

export default router;
