'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const {status, data: session} = useSession();


  return (
    <div className='flex gap-[20px]'>
      <div>Hello World!</div>
      {status === 'loading' && <div>Loading...</div>} 
      {status === 'authenticated' && 
        <div>
          {session.user!.name}
          <Link href="/api/auth/signout" className='ml-3'>Sign Out</Link>
        </div>}
      {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
    </div>
    
  );
}
