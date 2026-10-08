import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("Product", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  price: doublePrecision("price").notNull(),
  category: text("category").notNull().default("general"),
  thumbnail: text("thumbnail"),
  createdAt: timestamp("createdAt", { precision: 3 }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
