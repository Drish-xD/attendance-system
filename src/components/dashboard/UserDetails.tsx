'use client';

import { UserType } from '@/types';
import { checkAttendance } from '@/utils/attendance';
import { getUserDetails } from '@/utils/auth';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Spacer } from '@nextui-org/spacer';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const UserDetails = ({ handleAttendance }: { handleAttendance: () => Promise<void> }) => {
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [isMarked, setisMarked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const rawCookie = getCookie('loginUser');
        const safeUserId = rawCookie ? Number(rawCookie) : null;

        if (!safeUserId) return;

        const data = await getUserDetails(safeUserId);
        setUserDetails(data);
        const attendanceMarked = await checkAttendance(safeUserId);
        setisMarked(attendanceMarked);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Card
      isBlurred
      className="relative bg-background/60 dark:bg-default-100/50 w-full max-w-7xl p-5 mx-auto"
      shadow="sm"
    >
      <h2 className="text-3xl">
        <span className="inline-block h-8 w-2 rounded-lg bg-primary mr-3 -mb-1" />
        Student Details
      </h2>
      <Spacer y={5} />
      <section className="flex justify-between items-center flex-col md:flex-row">
        <div className="flex flex-col md:flex-row items-center">
          <Avatar name="Jon doe" color="primary" className="w-20 h-20 text-large" />
          <Spacer x={5} />
          <div className="flex justify-center items-center md:items-start flex-col">
            <h2 className="text-xl">{`${userDetails?.fname + ' ' + userDetails?.lname}`}</h2>
            <Spacer y={4} />
            <div className="flex justify-evenly gap-10">
              <span>
                <p className="font-extralight italic">Email</p>
                <p>{userDetails?.email}</p>
              </span>
              <span>
                <p className="font-extralight italic">Class</p>
                <p>{userDetails?.class + userDetails?.section!}</p>
              </span>
            </div>
          </div>
        </div>

        <Spacer y={10} />
        <div className="flex justify-center flex-col gap-2">
          <h3 className="text-xl">Mark Attendance for today</h3>
          <Button color="primary" variant="flat" onClick={handleAttendance} isDisabled={isMarked}>
            {isMarked ? 'Marked' : 'Mark'}
          </Button>
        </div>
      </section>
    </Card>
  );
};

export default UserDetails;
