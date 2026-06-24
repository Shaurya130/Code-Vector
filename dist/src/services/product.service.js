import { prisma } from "../lib/prisma.js";
import { decodeCursor, encodeCursor } from "../utils/cursor.js";
import { Prisma } from "@prisma/client";
export async function getProducts({ limit = 20, category, cursor, }) {
    let snapshotTime = new Date();
    let cursorUpdatedAt;
    let cursorId;
    if (cursor) {
        const decoded = decodeCursor(cursor);
        snapshotTime = new Date(decoded.snapshotTime);
        cursorUpdatedAt = new Date(decoded.updatedAt);
        cursorId = Number(decoded.id);
    }
    const conditions = [
        {
            updatedAt: {
                lte: snapshotTime,
            },
        },
    ];
    if (category) {
        conditions.push({
            category,
        });
    }
    if (cursorUpdatedAt && cursorId) {
        conditions.push({
            OR: [
                {
                    updatedAt: {
                        lt: cursorUpdatedAt,
                    },
                },
                {
                    AND: [
                        {
                            updatedAt: cursorUpdatedAt,
                        },
                        {
                            id: {
                                lt: cursorId,
                            },
                        },
                    ],
                },
            ],
        });
    }
    const whereClause = {
        AND: conditions,
    };
    const products = await prisma.product.findMany({
        where: whereClause,
        orderBy: [
            {
                updatedAt: "desc",
            },
            {
                id: "desc",
            },
        ],
        take: limit + 1,
    });
    let nextCursor = null;
    if (products.length > limit) {
        const lastVisible = products[limit - 1];
        if (!lastVisible) {
            return {
                products,
                nextCursor: null,
            };
        }
        nextCursor = encodeCursor({
            snapshotTime: snapshotTime.toISOString(),
            updatedAt: lastVisible.updatedAt.toISOString(),
            id: lastVisible.id.toString()
        });
        products.pop();
    }
    return {
        products: products.map((product) => ({
            ...product,
            price: Number(product.price),
        })),
        nextCursor,
    };
}
//# sourceMappingURL=product.service.js.map