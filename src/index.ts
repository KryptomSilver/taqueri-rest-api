import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import "reflect-metadata";
import routes from "./routes";

// --- Config APP --- //

createConnection();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Routes --- //
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "REST API taqueria" });
});
app.use("/products", routes.productRouter);
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
