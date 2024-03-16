'use client';

import { useAuth } from '@/Provider/auth';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

// Profile Page to show user Data
// TODO: Create User Profile Card
const Profile = () => {
  const { isLoggedIn } = useAuth();

  const router = useRouter();

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      const timeoutId = setTimeout(() => {
        router.push('/');
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn, router]);

  return (
    <main className="h-screen w-full flex justify-center items-center flex-col">
      {isLoggedIn ? (
        <>
          <h2 className="text-5xl">Profile</h2>
          <p>Not Implemented yet</p>
        </>
      ) : (
        <h2 className="text-center py-10">
          User Not LoggedIn <br />
          Redirecting to <em>Home page</em> in 2sec
        </h2>
      )}
    </main>
  );
};

export default Profile;
