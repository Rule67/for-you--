CREATE TABLE IF NOT EXISTS "Product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"price" double precision NOT NULL,
	"category" text DEFAULT 'general' NOT NULL,
	"thumbnail" text,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL
);
