import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  uniqueIndex,
  integer,
  boolean
} from 'drizzle-orm/pg-core';


// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB


// Users table
export const userTable = pgTable('dr_users', {
  id: serial("id").primaryKey(),
  oauthusername: varchar('oauthusername', {length: 255}),
  name: varchar('name', {length: 255}),
  email: varchar('email', {length: 255}).notNull().unique(),
  given_name: varchar('given_name', {length: 255}),
  family_name: varchar('family_name', {length: 255}),
  picture: varchar('picture', {length: 255}),
  totalInterations: integer('totalInterations').default(0),
  affiliation: varchar('affiliation', {length: 255}),
  banned: boolean('banned').notNull().default(false),
  isAdmin: boolean('isAdmin').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow()
});

// Folders table
export const foldersTable = pgTable('dr_folders', {
  id: serial("id").primaryKey(),
  folder_name: varchar('folder_name', {length: 255}),
  folder_title: varchar('folder_title', {length: 255}),
  folder_path: varchar('folder_path', {length: 255}).unique()
});

// Documents table
export const documentTable = pgTable('dr_documents', {
  id: serial("id").primaryKey(),
  folder_id : integer('folder_id').references(() => foldersTable.id),
  document_name: varchar('document_name', {length: 255}),
  document_title: varchar('document_title', {length: 255}),
  document_path: varchar('document_path', {length: 255}).unique()
});

// Pages table
export const pagesTable = pgTable('dr_pages', {
  id: serial("id").primaryKey(),
  document_id : integer('document_id').references(() => documentTable.id),
  page_name: varchar('page_name', {length: 255}),
  page_title: varchar('page_title', {length: 255}),
  page_path: varchar('page_path', {length: 255}).unique()
});

// Comments table
export const commentsTable = pgTable('dr_comments', {
  id: serial("id").primaryKey(),
  page_id : integer('page_id').references(() => pagesTable.id),
  user_id : integer('user_id').references(() => userTable.id),
  comment: text('comment'),
  cereatedAt: timestamp('cereatedAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
});

// Tags table
export const tagsTable = pgTable('dr_tags', {
  id: serial("id").primaryKey(),
  label: varchar('label', {length: 255}).unique().notNull(),
  disabled: boolean('disabled').notNull().default(false)
});

// taggings table
export const taggingsTable = pgTable('dr_taggings', {
  id: serial("id").primaryKey(),
  tag_id : integer('tag_id').references(() => tagsTable.id),
  page_id : integer('page_id').references(() => pagesTable.id),
  user_id : integer('user_id').references(() => userTable.id)
});