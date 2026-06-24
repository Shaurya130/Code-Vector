import express from "express";
import productRoutes from "./routes/products.js";
const app = express();
app.use(express.json());
app.get("/", (_req, res) => {
    res.json({
        status: "ok",
    });
});
app.use("/products", productRoutes);
export default app;
//# sourceMappingURL=app.js.map