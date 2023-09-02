import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../controllers/products";

const router = Router();

router.get("/all", getProducts);
router.post("/findProducts", getProduct);
router.post("/new", createProduct);
router.delete("/:pid", deleteProduct);
router.patch("/:pid", updateProduct);

export default router;
