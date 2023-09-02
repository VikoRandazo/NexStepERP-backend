import {Router} from "express"
import { handleSoldProduct } from "../../controllers/sales"

const router = Router()

router.post("/:cid", handleSoldProduct)

export default router