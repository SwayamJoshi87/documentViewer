ALTER TABLE "dr_comments" DROP CONSTRAINT "dr_comments_page_id_dr_pages_id_fk";
--> statement-breakpoint
ALTER TABLE "dr_comments" DROP CONSTRAINT "dr_comments_user_id_dr_users_id_fk";
--> statement-breakpoint
ALTER TABLE "dr_documents" DROP CONSTRAINT "dr_documents_folder_id_dr_folders_id_fk";
--> statement-breakpoint
ALTER TABLE "dr_pages" DROP CONSTRAINT "dr_pages_document_id_dr_documents_id_fk";
--> statement-breakpoint
ALTER TABLE "dr_taggings" DROP CONSTRAINT "dr_taggings_tag_id_dr_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "dr_taggings" DROP CONSTRAINT "dr_taggings_page_id_dr_pages_id_fk";
--> statement-breakpoint
ALTER TABLE "dr_taggings" DROP CONSTRAINT "dr_taggings_user_id_dr_users_id_fk";
--> statement-breakpoint
ALTER TABLE "dr_comments" ALTER COLUMN "page_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_comments" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_comments" ALTER COLUMN "comment" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_documents" ALTER COLUMN "folder_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_documents" ALTER COLUMN "document_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_documents" ALTER COLUMN "document_title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_documents" ALTER COLUMN "document_path" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_folders" ALTER COLUMN "folder_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_folders" ALTER COLUMN "folder_title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_folders" ALTER COLUMN "folder_path" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_pages" ALTER COLUMN "document_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_pages" ALTER COLUMN "page_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_pages" ALTER COLUMN "page_title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_pages" ALTER COLUMN "page_path" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_taggings" ALTER COLUMN "tag_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_taggings" ALTER COLUMN "page_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_taggings" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_users" ALTER COLUMN "totalInterations" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_users" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_comments" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "dr_users" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_comments" ADD CONSTRAINT "dr_comments_page_id_dr_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."dr_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_comments" ADD CONSTRAINT "dr_comments_user_id_dr_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dr_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_documents" ADD CONSTRAINT "dr_documents_folder_id_dr_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."dr_folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_pages" ADD CONSTRAINT "dr_pages_document_id_dr_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."dr_documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_taggings" ADD CONSTRAINT "dr_taggings_tag_id_dr_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."dr_tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_taggings" ADD CONSTRAINT "dr_taggings_page_id_dr_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."dr_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_taggings" ADD CONSTRAINT "dr_taggings_user_id_dr_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dr_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "page_id_idx" ON "dr_comments" USING btree ("page_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "dr_comments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "folder_id_idx" ON "dr_documents" USING btree ("folder_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "document_path_idx" ON "dr_documents" USING btree ("document_path");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "folder_path_idx" ON "dr_folders" USING btree ("folder_path");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "document_id_idx" ON "dr_pages" USING btree ("document_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "page_path_idx" ON "dr_pages" USING btree ("page_path");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tag_page_user_idx" ON "dr_taggings" USING btree ("tag_id","page_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "label_idx" ON "dr_tags" USING btree ("label");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "dr_users" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "oauthusername_idx" ON "dr_users" USING btree ("oauthusername");--> statement-breakpoint
ALTER TABLE "dr_comments" DROP COLUMN IF EXISTS "cereatedAt";