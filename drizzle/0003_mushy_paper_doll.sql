ALTER TABLE "dr_tags" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "page_id_idx" ON "dr_comments" USING btree ("page_id");