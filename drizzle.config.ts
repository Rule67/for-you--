import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

if (existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

const connectionString = process.env.DATABASE_URL;

export default defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  ...(connectionString ? { dbCredentials: { url: connectionString } } : {}),
});
