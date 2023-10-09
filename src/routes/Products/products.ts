import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  deleteProducts,
  getProduct,
  getProducts,
  updateProduct,
} from "../../controllers/products";

const router = Router();

router.get("/all", getProducts);
router.post("/findProducts", getProduct);
router.post("/new", createProduct);
router.delete("/:pid", deleteProduct);
router.post("/delete", deleteProducts);
router.post("/:pid", updateProduct);

export default router;
