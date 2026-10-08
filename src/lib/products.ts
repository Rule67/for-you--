import { randomUUID } from "node:crypto";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, type Product } from "@/lib/schema";

export type { Product } from "@/lib/schema";

// ดึงสินค้าทั้งหมดจากฐานข้อมูล โดยเรียงตามชื่อ
export async function fetchProducts(): Promise<Product[]> {
  return db.select().from(products).orderBy(asc(products.name));
}

// ค้นหาสินค้ารายการเดียวด้วยรหัสสินค้า
export async function getProduct(id: string): Promise<Product | null> {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return product ?? null;
}

// เพิ่มสินค้าใหม่ลงในฐานข้อมูล
export async function createProduct(
  product: Pick<
    Product,
    "name" | "description" | "price" | "category" | "thumbnail"
  >
): Promise<Product> {
  const [createdProduct] = await db
    .insert(products)
    .values({ ...product, id: randomUUID() })
    .returning();
  if (!createdProduct) {
    throw new Error("Failed to create product");
  }
  return createdProduct;
}

// บันทึกการเปลี่ยนแปลงของสินค้าตามรหัส
export async function updateProduct(
  id: string,
  product: Pick<Product, "name" | "description" | "price" | "thumbnail">
): Promise<Product> {
  const [updatedProduct] = await db
    .update(products)
    .set(product)
    .where(eq(products.id, id))
    .returning();
  if (!updatedProduct) {
    throw new Error(`Product ${id} not found`);
  }
  return updatedProduct;
}

// ลบสินค้าตามรหัสออกจากฐานข้อมูล
export async function deleteProduct(id: string): Promise<void> {
  const [deletedProduct] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning({ id: products.id });
  if (!deletedProduct) {
    throw new Error(`Product ${id} not found`);
  }
}
