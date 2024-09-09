
-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    oauthusername VARCHAR(255) NOT NULL UNIQUE,
    oauth VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    given_name VARCHAR(255),
    family_name VARCHAR(255),
    picture VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    totalInteractions INTEGER DEFAULT 0,
    affiliation VARCHAR(255),
    banned BOOLEAN DEFAULT FALSE,
    isadmin BOOLEAN DEFAULT FALSE
);

-- Create the folders table
CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES folders(id),
    folder_name VARCHAR(30),
    folder_title VARCHAR(255),
    folder_path VARCHAR(255) NOT NULL UNIQUE
);

-- Create the documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    folder_id INTEGER REFERENCES folders(id),
    document_name VARCHAR(30),
    document_title VARCHAR(255),
    document_path VARCHAR(255) NOT NULL UNIQUE
);

-- Create the pages table
CREATE TABLE pages (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id),
    page_name VARCHAR(30),
    page_title VARCHAR(255),
    page_path VARCHAR(255) NOT NULL UNIQUE
);

-- Create the comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    page_id INTEGER REFERENCES pages(id),
    user_id INTEGER REFERENCES users(id),
    notes TEXT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    label VARCHAR(30) NOT NULL UNIQUE,
    disabled BOOLEAN DEFAULT FALSE
);

-- Create the taggings table
CREATE TABLE taggings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    page_id INTEGER REFERENCES pages(id),
    tag_id INTEGER REFERENCES tags(id)
);