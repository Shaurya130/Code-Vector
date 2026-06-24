-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "products_updated_at_id_idx" ON "products"("updated_at" DESC, "id" DESC);

-- CreateIndex
CREATE INDEX "products_category_updated_at_id_idx" ON "products"("category", "updated_at" DESC, "id" DESC);
