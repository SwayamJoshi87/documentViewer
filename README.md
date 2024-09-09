This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Adding a database to the app

The app is designed to be deployed on a platfrom like vercel. All the setup will be already done for you in the code. 

- Login to your vercel or vercel/like platform and go to integrations. 
- Find postgreSQL/Neon DB. This will give you one free database.
- Here, go to run query and copy the databaseINIT query( Currently work in progrss ).
- This is automatically provide the connection url and necessary info to the vercel app with a .env file.
- Redeploy the vercel app which will result in the database being added to the vercel app.

## Adding Authentication using OAuth

Adding OAuth is pretty straight forward as well.

- Login to your vercel or vercel/like platform and go to integrations.
- Find OAuth and add it to your app.
- This will automatically add the necessary information in the .env file.
- Redeploy the vercel app which will result in the authentication being added to the vercel app.
- Now you can use the /api/auth/login endpoint to login and /api/auth/logout endpoint to logout and api/auth/me to get the user information.

## Data access and update functions

### Using an ORM

For accessing data, I have used an ORM called Drizzle which is a type safe way to
access data to avoid SQL injections and unwanted errors when accessing data. There is
a drizzle folder which contains a schema which shows all the tables and relationships in the database. 

- There are two files in app folder, dataAccess.jsx and dataUpdate.tsx which contain the functions for accessing and updating data.

- Adding and updating folder paths is prohibited in the app as it will result in circular dependencies. It is not advised to do so using the app router or the react router as it directly needs to talk to the os for getting the directories and files which is not recommended as the system is stateless.

- There is a python script called ingestData.py which reads all the documents and the nested folders and pages to insert them into the database. It takes any number of folders, documents and pages. The script will read all the files in the folders and add them to the database.

- Python is a generally safer way to access the folder names, file names, etc.

