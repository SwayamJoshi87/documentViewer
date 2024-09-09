import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export const db = drizzle(sql, {schema});

// Set new user data from Oauth to the database the data is the object provided by the Oauth provider which
// resembles the user object in the schema
export async function setUser(data: any) {
    return await db.insert(schema.userTable).values({given_name: data.given_name, 
        family_name: data.family_name, 
        email: data.email, 
        picture: data.picture, 
        oauthusername: data.oauthusername});
}

// Set user affiliation
export async function setAffiliation(userid: any, affiliation: string) {
    return await db.update(schema.userTable)
    .set({affiliation: affiliation})
    .where(eq(schema.userTable.id, userid));
}   

// Set user ban status
export async function setBan(userid: any, banned: boolean) {
    return await db.update(schema.userTable)
    .set({banned: banned})
    .where(eq(schema.userTable.id, userid));
}

// Add a new comment to the database, the function takes page id user id and noted
export async function addComment(pageid: any, userid: any, note: string) {
    return await db.insert(schema.commentsTable).values({page_id: pageid, user_id: userid, comment: note});
}

// Update the comment with the given comment id
export async function updateComment(commentid: any, note: string) {
    return await db.update(schema.commentsTable)
    .set({comment: note})
    .where(eq(schema.commentsTable.id, commentid));
}

// Add new tag
export async function addTag(tag: string) {
    return await db.insert(schema.tagsTable).values({label: tag});
}

// Set tag status
export async function setTagStatus(tagid: any, status: boolean) {
    return await db.update(schema.tagsTable)
    .set({disabled: status})
    .where(eq(schema.tagsTable.id, tagid));
}

// Set tagging
export async function setTagging(pageid: any, tagid: any, user_id: any) {
    return await db.insert(schema.taggingsTable).values({page_id: pageid, tag_id: tagid, user_id: user_id});
}