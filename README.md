# CodeVector Backend Take-Home Assignment

## Overview

This project implements a backend service for browsing a large product catalog (~200,000 products) with:

* Fast pagination
* Category filtering
* Stable results while data is changing
* PostgreSQL database
* Prisma ORM
* Express.js API

Products are sorted by:

```text
updatedAt DESC, id DESC
```

so the most recently updated products appear first.

---

## Live Demo

https://your-render-url.onrender.com

## Repository

https://github.com/Shaurya130/Code-Vector

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL (Neon)

---

## Database Schema

```prisma
model Product {
  id         Int      @id @default(autoincrement())
  name       String
  category   String
  price      Decimal

  createdAt  DateTime
  updatedAt  DateTime
}
```

Indexes:

```prisma
@@index([updatedAt(sort: Desc), id(sort: Desc)])
@@index([category, updatedAt(sort: Desc), id(sort: Desc)])
```

These indexes support efficient filtering and cursor-based pagination.

---

## Data Generation

A seed script generates 200,000 products with:

* Name
* Category
* Price
* Created timestamp
* Updated timestamp

Products are inserted in batches using Prisma `createMany()` for efficient bulk insertion.

Run:

```bash
npm run seed
```

---

## API

### Get Products

```http
GET /products
```

### Query Parameters

| Parameter | Description                            |
| --------- | -------------------------------------- |
| limit     | Number of products to return (max 100) |
| category  | Optional category filter               |
| cursor    | Cursor for next page                   |

Example:

```http
GET /products?limit=20
```

```http
GET /products?category=Books&limit=20
```

```http
GET /products?cursor=<cursor>
```

---

## Pagination Strategy

### Why Not OFFSET Pagination?

OFFSET pagination becomes unreliable when new rows are inserted or existing rows are updated.

Example:

1. User loads page 1.
2. New products are added.
3. User requests page 2.

Rows shift position, causing:

* Duplicate products
* Missing products

---

## Cursor-Based Pagination

The API uses keyset/cursor pagination.

Products are ordered by:

```text
updatedAt DESC, id DESC
```

The cursor stores:

```json
{
  "snapshotTime": "...",
  "updatedAt": "...",
  "id": "..."
}
```

The next page starts after the last visible product using:

```text
(updatedAt, id)
```

as the pagination key.

---

## Snapshot-Based Consistency

Cursor pagination alone solves issues caused by inserts.

However, updates are more challenging because an updated product can move to the top of the feed while a user is browsing.

To ensure users never see duplicates or miss products:

1. A snapshot timestamp is generated on the first request.
2. The snapshot timestamp is embedded in the cursor.
3. Every subsequent page only returns products where:

```text
updatedAt <= snapshotTime
```

This creates a stable view of the dataset throughout the browsing session.

Result:

* No duplicates
* No skipped products
* Consistent pagination even while products are being updated

---

## Running Locally

Install dependencies:

```bash
npm install
```

Configure environment variables:

```env
DATABASE_URL=your_postgres_connection_string
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed database:

```bash
npm run seed
```

Start server:

```bash
npm run dev
```

---

## Future Improvements

Given more time, I would add:

* Automated integration tests
* Cursor signing/encryption
* OpenAPI/Swagger documentation
* Rate limiting
* Query performance benchmarking
* Caching layer (Redis)

---

## AI Usage

AI was used as a development assistant for:

* Discussing pagination approaches
* Reviewing implementation details
* TypeScript and Prisma troubleshooting
* Architecture validation

All design decisions, testing, debugging, and final implementation were reviewed and understood before submission.
