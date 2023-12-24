import { Router } from "express";
import { handleSoldProduct, getAllSales, clearSales } from "../../controllers/sales";

const router = Router();

router.get("/all", getAllSales);
router.post("/:cid", handleSoldProduct);
router.delete("/delete_all", clearSales);

export default router;
