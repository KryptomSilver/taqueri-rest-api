import { Router } from "express";
import { check } from "express-validator";
import ProductCtrl from "../controllers/productCtrl";
const router = Router();
router.post(
  "/",
  [
    check("name").notEmpty().isString(),
    check("description").notEmpty().isString(),
  ],
  ProductCtrl.createProduct
);
export default router;
