import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/lib/schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const globalForDb = globalThis as typeof globalThis & {
  pool?: Pool;
  db?: NodePgDatabase<typeof schema>;
};

const pool = globalForDb.pool ?? new Pool({ connectionString });

export const db = globalForDb.db ?? drizzle(pool, { schema });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
  globalForDb.db = db;
}
