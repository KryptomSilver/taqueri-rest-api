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
router.get("/", ProductCtrl.findAllProducts);
router.put(
  "/",
  [
    check("idProduct").notEmpty().isNumeric(),
    check("name").notEmpty().isString(),
    check("description").notEmpty().isString(),
  ],
  ProductCtrl.updateProductById
);
export default router;
