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
  boolean,
  index
} from 'drizzle-orm/pg-core';

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

// Users table
export const userTable = pgTable('dr_users', {
  id: serial("id").primaryKey(),
  oauthusername: varchar('oauthusername', { length: 255 }),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  given_name: varchar('given_name', { length: 255 }),
  family_name: varchar('family_name', { length: 255 }),
  picture: varchar('picture', { length: 255 }),
  totalInterations: integer('totalInterations').notNull().default(0),
  affiliation: varchar('affiliation', { length: 255 }),
  banned: boolean('banned').notNull().default(false),
  isAdmin: boolean('isAdmin').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull() // Added an updatedAt for consistency
}, (userTable) => ({
  emailIndex: uniqueIndex('email_idx').on(userTable.email), // Unique index on email
  oauthUsernameIndex: index('oauthusername_idx').on(userTable.oauthusername) // Index on oauthusername for search efficiency
}));

// Folders table
export const foldersTable = pgTable('dr_folders', {
  id: serial("id").primaryKey(),
  folder_name: varchar('folder_name', { length: 255 }).notNull(),
  folder_title: varchar('folder_title', { length: 255 }).notNull(),
  folder_path: varchar('folder_path', { length: 255 }).notNull().unique()
}, (foldersTable) => ({
  folderPathIndex: uniqueIndex('folder_path_idx').on(foldersTable.folder_path), // Unique index on folder_path
}));

// Documents table
export const documentTable = pgTable('dr_documents', {
  id: serial("id").primaryKey(),
  folder_id: integer('folder_id').notNull().references(() => foldersTable.id, { onDelete: "cascade" }),
  document_name: varchar('document_name', { length: 255 }).notNull(),
  document_title: varchar('document_title', { length: 255 }).notNull(),
  document_path: varchar('document_path', { length: 255 }).notNull().unique()
}, (documentTable) => ({
  folderIndex: index('folder_id_idx').on(documentTable.folder_id), // Index on folder_id for quick retrieval of documents by folder
  documentPathIndex: uniqueIndex('document_path_idx').on(documentTable.document_path) // Unique index on document_path
}));

// Pages table
export const pagesTable = pgTable('dr_pages', {
  id: serial("id").primaryKey(),
  document_id: integer('document_id').notNull().references(() => documentTable.id, { onDelete: "cascade" }),
  page_name: varchar('page_name', { length: 255 }).notNull(),
  page_title: varchar('page_title', { length: 255 }).notNull(),
  page_path: varchar('page_path', { length: 255 }).notNull().unique()
}, (pagesTable) => ({
  documentIndex: index('document_id_idx').on(pagesTable.document_id), // Index on document_id
  pagePathIndex: uniqueIndex('page_path_idx').on(pagesTable.page_path) // Unique index on page_path
}));

// Comments table
export const commentsTable = pgTable('dr_comments', {
  id: serial("id").primaryKey(),
  page_id: integer('page_id').notNull().references(() => pagesTable.id, { onDelete: "cascade" }),
  user_id: integer('user_id').notNull().references(() => userTable.id, { onDelete: "cascade" }),
  comment: text('comment').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
}, (commentsTable) => ({
  pageIndex: index('page_id_idx').on(commentsTable.page_id), // Index on page_id
  userIndex: index('user_id_idx').on(commentsTable.user_id)  // Index on user_id
}));

// Tags table
export const tagsTable = pgTable('dr_tags', {
  id: serial("id").primaryKey(),
  label: varchar('label', { length: 255 }).notNull().unique(),
  disabled: boolean('disabled').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow().notNull()
}, (tagsTable) => ({
  labelIndex: uniqueIndex('label_idx').on(tagsTable.label) // Unique index on label
}));

// Taggings table
export const taggingsTable = pgTable('dr_taggings', {
  id: serial("id").primaryKey(),
  tag_id: integer('tag_id').notNull().references(() => tagsTable.id, { onDelete: "cascade" }),
  page_id: integer('page_id').notNull().references(() => pagesTable.id, { onDelete: "cascade" }),
  user_id: integer('user_id').notNull().references(() => userTable.id, { onDelete: "cascade" })
}, (taggingsTable) => ({
  tagPageUserIndex: index('tag_page_user_idx').on(taggingsTable.tag_id, taggingsTable.page_id, taggingsTable.user_id) // Composite index for efficient querying
}));
