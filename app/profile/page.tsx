import { getSession} from '@auth0/nextjs-auth0';

export default async function Page() {
  const { user } = await getSession() as any;

  return <div>Hello {user.email} </div>;
};
