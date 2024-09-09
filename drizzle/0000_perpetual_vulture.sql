CREATE TABLE IF NOT EXISTS "dr_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_id" integer,
	"user_id" integer,
	"comment" text,
	"cereatedAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dr_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"folder_id" integer,
	"document_name" varchar(255),
	"document_title" varchar(255),
	"document_path" varchar(255),
	CONSTRAINT "dr_documents_document_path_unique" UNIQUE("document_path")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dr_folders" (
	"id" serial PRIMARY KEY NOT NULL,
	"folder_name" varchar(255),
	"folder_title" varchar(255),
	"folder_path" varchar(255),
	CONSTRAINT "dr_folders_folder_path_unique" UNIQUE("folder_path")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dr_pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer,
	"page_name" varchar(255),
	"page_title" varchar(255),
	"page_path" varchar(255),
	CONSTRAINT "dr_pages_page_path_unique" UNIQUE("page_path")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dr_taggings" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag_id" integer,
	"page_id" integer,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dr_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(255) NOT NULL,
	"disabled" boolean DEFAULT false NOT NULL,
	CONSTRAINT "dr_tags_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dr_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"oauthusername" varchar(255),
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"given_name" varchar(255),
	"family_name" varchar(255),
	"picture" varchar(255),
	"totalInterations" integer DEFAULT 0,
	"affiliation" varchar(255),
	"banned" boolean DEFAULT false NOT NULL,
	"isAdmin" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "dr_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_comments" ADD CONSTRAINT "dr_comments_page_id_dr_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."dr_pages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_comments" ADD CONSTRAINT "dr_comments_user_id_dr_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dr_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_documents" ADD CONSTRAINT "dr_documents_folder_id_dr_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."dr_folders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_pages" ADD CONSTRAINT "dr_pages_document_id_dr_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."dr_documents"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_taggings" ADD CONSTRAINT "dr_taggings_tag_id_dr_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."dr_tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_taggings" ADD CONSTRAINT "dr_taggings_page_id_dr_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."dr_pages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dr_taggings" ADD CONSTRAINT "dr_taggings_user_id_dr_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dr_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
