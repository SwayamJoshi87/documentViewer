-- indexes.sql

-- Add index to users table
CREATE INDEX idx_users_oauthusername ON users (oauthusername);
CREATE INDEX idx_users_name ON users (name);

-- Add index to folders table
CREATE INDEX idx_folders_parent_id ON folders (parent_id);
CREATE INDEX idx_folders_folder_name ON folders (folder_name);

-- Add index to documents table
CREATE INDEX idx_documents_folder_id ON documents (folder_id);
CREATE INDEX idx_documents_document_name ON documents (document_name);

-- Add index to pages table
CREATE INDEX idx_pages_document_id ON pages (document_id);
CREATE INDEX idx_pages_page_name ON pages (page_name);

-- Add index to comments table
CREATE INDEX idx_comments_page_id ON comments (page_id);
CREATE INDEX idx_comments_user_id ON comments (user_id);

-- Add index to tags table
CREATE INDEX idx_tags_label ON tags (label);

-- Add index to taggings table
CREATE INDEX idx_taggings_page_id ON taggings (page_id);
CREATE INDEX idx_taggings_tag_id ON taggings (tag_id);