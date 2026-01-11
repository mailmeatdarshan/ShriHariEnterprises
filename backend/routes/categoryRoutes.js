import express from "express";
const router = express.Router();
import { createCategory, updateCategory, removeCategory } from "../controllers/categoryController.js";

import { authenticate, authorizedAdmin } from "../middlewares/authMiddleware.js";

router.route('/').post(authenticate, authorizedAdmin, createCategory)
router.route("/:categoryId").put(authenticate, authorizedAdmin, updateCategory)
router.route("/:categoryId").delete(authenticate, authorizedAdmin, removeCategory)


export default router;
