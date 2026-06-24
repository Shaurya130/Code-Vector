import { Prisma } from "@prisma/client";
export interface GetProductsParams {
    limit?: number;
    category?: string;
    cursor?: string;
}
export declare function getProducts({ limit, category, cursor, }: GetProductsParams): Promise<{
    products: {
        category: string;
        id: number;
        updatedAt: Date;
        name: string;
        price: Prisma.Decimal;
        createdAt: Date;
    }[];
    nextCursor: null;
} | {
    products: {
        price: number;
        category: string;
        id: number;
        updatedAt: Date;
        name: string;
        createdAt: Date;
    }[];
    nextCursor: string | null;
}>;
//# sourceMappingURL=product.service.d.ts.map