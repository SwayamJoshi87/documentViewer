import { faker } from '@faker-js/faker';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '../../../drizzle/schema';
import { sql } from "@vercel/postgres";
import { promises as fs } from 'fs';
import path from 'path';

export const db = drizzle(sql, {schema});

async function insertMockUsers() {
    for (let i = 0; i < 100; i++) {
      await db.insert(schema.userTable).values({
        oauthusername: faker.internet.userName(),   
        name: faker.person.fullName(),
        email: faker.internet.email(),
        given_name: faker.name.firstName(),
        family_name: faker.name.lastName(),
        picture: faker.image.avatar(),
        totalInterations: faker.number.int({min: 0, max: 1000}),
        affiliation: faker.company.name(),
        banned: faker.datatype.boolean(),
        isAdmin: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: new Date()  // using current date as updatedAt
      });
    }
  }

async function insertMockTags() {
    for (let i = 0; i < 100; i++) {
        await db.insert(schema.tagsTable).values({
        label: faker.food.dish(),  // Generate a random label
        disabled: faker.datatype.boolean(),  // Randomly set disabled flag to true/false
        createdAt: faker.date.past(),  // Optional: if you want timestamps
      });
    }
  }
  
// Helper function to get random user ids from dr_users
async function getUserIds(): Promise<number[]> {
    const users = await db.select({ id: schema.userTable.id }).from(schema.userTable);
    return users.map(user => user.id);
}

// Helper function to get random page ids from dr_pages
async function getPageIds(): Promise<number[]> {
    const pages = await db.select({ id: schema.pagesTable.id }).from(schema.pagesTable);
    return pages.map(page => page.id);
}

// Function to generate random comments and insert them into the database
async function generateMockComments(numComments: number): Promise<void> {
    const userIds = await getUserIds();
    const pageIds = await getPageIds();

    for (let i = 0; i < numComments; i++) {
        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
        const randomPageId = pageIds[Math.floor(Math.random() * pageIds.length)];
        const randomComment = faker.lorem.sentences(3);  // Generate random sentences for the comment
        const createdAt = faker.date.recent({ days: 30 });  // Random date within the past 30 days
        const updatedAt = faker.date.between({ from: createdAt, to: new Date() }) // Ensure updatedAt is after createdAt

        // Insert comment into the database
        await db.insert(schema.commentsTable).values({
            page_id: randomPageId,
            user_id: randomUserId,
            comment: randomComment,
            createdAt: createdAt,
            updatedAt: updatedAt
        });
    }

    console.log(`${numComments} mock comments have been generated.`);
}


// Helper function to get random tag ids from dr_tags
async function getTagIds(): Promise<number[]> {
    const tags = await db.select({ id: schema.tagsTable.id }).from(schema.tagsTable);
    return tags.map(tag => tag.id);
}

// Function to generate random taggings and insert them into the database
async function generateMockTaggings(numTaggings: number): Promise<void> {
    const userIds = await getUserIds();
    const pageIds = await getPageIds();
    const tagIds = await getTagIds();

    for (let i = 0; i < numTaggings; i++) {
        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
        const randomPageId = pageIds[Math.floor(Math.random() * pageIds.length)];
        const randomTagId = tagIds[Math.floor(Math.random() * tagIds.length)];

        // Insert tagging into the database
        await db.insert(schema.taggingsTable).values({
            tag_id: randomTagId,
            page_id: randomPageId,
            user_id: randomUserId
        });
    }

    console.log(`${numTaggings} mock taggings have been generated.`);
}

// Generate 50 mock taggings
generateMockTaggings(50).then(() => {
    console.log('Tagging generation completed.');
}).catch(err => {
    console.error('Error generating mock taggings:', err);
});