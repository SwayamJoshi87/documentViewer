
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getUserById } from '@/app/dataAccess';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Get the user name from the cookie headers x-custom-user
  const data = await getUserById('1');
  return NextResponse.json(data);
}