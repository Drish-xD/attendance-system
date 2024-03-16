'use client';

import { useAuth } from '@/Provider/auth';
import { AttendanceView, UserDetails } from '@/components';
import { AttendanceRecord } from '@/types';
import { Divider } from '@nextui-org/divider';
import { Spacer } from '@nextui-org/spacer';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { getAttendanceHistory, markAttendance } from 'utils/attendance';

const Dashboard = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const userId: number = Number(getCookie('loginUser')?.toString());
  const [history, setHistory] = useState<AttendanceRecord[]>([]);

  const fetchData = useCallback(
    async () => setHistory(await getAttendanceHistory(userId)),
    [userId]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAttendance = async () => {
    await markAttendance(userId);
    fetchData();
  };

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      const timeoutId = setTimeout(() => {
        router.push('/');
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn, router]);

  console.log('renders');

  return (
    <main className="h-screen w-full px-5">
      {isLoggedIn ? (
        <>
          <Spacer y={10} />
          <UserDetails handleAttendance={handleAttendance} />
          <Divider className="my-10 md:my-20 w-11/12 mx-auto" />
          <AttendanceView history={history} />
          <Spacer y={10} />
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

export default Dashboard;
