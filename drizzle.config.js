import '@/drizzle/envConfig';
import { defineConfig } from 'drizzle-kit';
 
export default defineConfig({
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://default:CS7VOWs9tMXA@ep-quiet-voice-a4m7jszf-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require',
  },
});