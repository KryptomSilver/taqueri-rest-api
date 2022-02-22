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
};
export default productsCtrl;
