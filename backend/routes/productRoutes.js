import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import { addProducts, updateProductDetails } from "../controllers/productController.js";
import { authenticate, authorizedAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.route("/").post(authenticate, authorizedAdmin, formidable(), addProducts);

router.route("/:id").put(authenticate, authorizedAdmin, formidable(), updateProductDetails);

export default router;