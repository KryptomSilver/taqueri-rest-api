import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getConnection } from "typeorm";
import { Product } from "../models/Product";

const productsCtrl = {
  createProduct: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, description } = req.body;
      let connection = getConnection();
      let productRepository = connection.getRepository(Product);
      const existProduct = await productRepository.find({
        where: {
          name: name,
        },
      });
      if (Object.keys(existProduct).length !== 0) {
        return res.status(409).json({ message: "Product already exist!" });
      }
      let product = new Product();
      product = {
        description,
        name,
      };
      await productRepository.save(product);
      return res.status(201).json({ message: "Product created!" });
    } catch (error: any) {
      res.status(500).json({ message: "Ups.." });
      console.log(error);
    }
  },
  findAllProducts: async (req: Request, res: Response) => {
    try {
      const connection = getConnection();
      const productRepository = connection.getRepository(Product);
      const products = await productRepository.find();
      return res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: "Ups.." });
      console.log(error);
    }
  },
  updateProductById: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { idProduct, name, description } = req.body;
      const connection = getConnection();
      const productRepository = connection.getRepository(Product);
      const existProduct = await productRepository.find({
        where: {
          id: idProduct,
        },
      });
      if (Object.keys(existProduct).length === 0) {
        return res.status(404).json({ message: "Product not exists" });
      }
      const productUpdate = await productRepository.update(
        { id: idProduct },
        { name, description }
      );
      return res.status(200).json({ message: "Product updated" });
    } catch (error: any) {
      res.status(500).json({ message: "Ups.." });
      console.log(error);
    }
  },
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { idProduct } = req.body;
      const connection = getConnection();
      const productRepository = connection.getRepository(Product);
      const existProduct = await productRepository.find({
        where: {
          id: idProduct,
        },
      });
      if (Object.keys(existProduct).length === 0) {
        return res.status(404).json({ message: "Product not exists" });
      }
      await productRepository.delete({
        id: idProduct,
      });
      return res.status(201).json({ message: "Product deleted" });
    } catch (error: any) {
      res.status(500).json({ message: "Ups.." });
      console.log(error);
    }
  },
};
export default productsCtrl;
