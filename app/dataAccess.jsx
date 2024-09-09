import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import * as schema from '../drizzle/schema';

export const db = drizzle(sql, {schema});


// Get a user info by id
export const getUserById = async (id) => {
    const users = await db.query.userTable.findMany({
        where: (userTable, { eq }) => eq(userTable.id, id), 
    });
    return users;
};

// Get a user info by email
export const getUserByEmail = async (email) => {
    const users = await db.query.userTable.findMany({
        where: (userTable, { eq }) => eq(userTable.email, email), 
    });
    return users;
};

// Get all the user IDs
export const getAllUserIds = async () => {
    const users = await db.query.userTable.findMany({
        columns: {
            id: true
        }
    });
    return users;
};

// Get all data of all users
export const getAllUsers = async () => {
    const users = await db.query.userTable.findMany();
    return users;
};

// Get if the user is admin
export const isAdmin = async (id) => {
    const users = await db.query.userTable.findMany({
        where: (userTable, { eq }) => eq(userTable.id, id), 
        columns: {
            isAdmin: true
        }
    });
    return users;
}

// Check if user is banned
export const isBanned = async (id) => {
    const users = await db.query.userTable.findMany({
        where: (userTable, { eq }) => eq(userTable.id, id), 
        columns: {
            banned: true
        }
    });
    return users;
}

// Get the folder class
export const getFolderClass = async (id) => {
    const folders = await db.query.foldersTable.findMany({
        where: (foldersTable, { eq }) => eq(foldersTable.id, id),
    });
    return folders;
}

// Get the document class
export const getDocumentClass = async (id) => {
    const documents = await db.query.documentTable.findMany({
        where: (documentTable, { eq }) => eq(documentTable.id, id), 
    });
    return documents;
}

// Get page class
export const getPageClass = async (id) => {
    const pages = await db.query.pagesTable.findMany({
        where: (pagesTable, { eq }) => eq(pagesTable.id, id),
    });
    return pages;
}


// Get all the folder ids
export const getAllFolderIds = async () => {
    const folders = await db.query.foldersTable.findMany({
        columns: {
            id: true
        }
    });
    return folders;
};

// Get all the document ids
export const getAllDocumentIds = async () => {
    const documents = await db.query.documentTable.findMany({
        columns: {
            id: true
        }
    });
    return documents;
};

// Get all the page ids
export const getAllPageIds = async () => {
    const pages = await db.query.pagesTable.findMany({
        columns: {
            id: true
        }
    });
    return pages;
};

// Get a comment by comment Id
export const getCommentById = async (id) => {
    const comments = await db.query.commentsTable.findMany({
        where: (commentsTable, { eq }) => eq(commentsTable.id, id),
    });
    return comments;
}

// Get all the user id and comment id for comments belonging to a particular page id
export const getCommentsByPageId = async (id) => {
    const comments = await db.query.commentsTable.findMany({
        where: (commentsTable, { eq }) => eq(commentsTable.page_id, id),
        columns: {
            userId: true,
            id: true
        }
    });
    return comments;
}

// Get is comment editable. So basically check if the comment belongs to the user
export const isCommentEditable = async (commentId, userId) => {
    const comments = await db.query.commentsTable.findMany({
        where: (commentsTable, { and, eq }) => and(eq(commentsTable.id, commentId), eq(commentTable.userId, userId)),
    });
    return comments;
}

// Get all the tags
export const getAllTags = async () => {
    const tags = await db.query.tagsTable.findMany();
    return tags;
}

// Get the number of tags associated with a page id for this just run an sql query to count the number of tags associated to a page by checking the taggins check all the taggins where page id and count it
export const getNumberOfTagsByPageId = async (id) => {
    const tags = await db.execute(sql`SELECt COUNT(*) FROM dr_taggings WHERE page_id = ${id}`);
    return tags;
}

// Get tagging so on a page id get all the taggings associated to the particular page id
export const getTaggingsByPageId = async (id) => {
    const taggings = await db.query.taggingsTable.findMany({
        where: (taggingsTable, { eq }) => eq(taggingsTable.page_id, id),
    });
    return taggings;
}