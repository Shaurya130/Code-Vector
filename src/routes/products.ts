import { Router } from "express";
import {
  getProducts,
  type GetProductsParams,
} from "../services/product.service.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = Math.min(
        Number(req.query.limit) || 20,
        100
        );

    const category =
      typeof req.query.category === "string"
        ? req.query.category
        : undefined;

    const cursor =
      typeof req.query.cursor === "string"
        ? req.query.cursor
        : undefined;

        const result = await getProducts({
        limit,
        ...(category && { category }),
        ...(cursor && { cursor }),
        });


    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;