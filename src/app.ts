import express from "express";
import productRoutes from "./routes/products.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/products", productRoutes);

export default app;