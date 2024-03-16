'use client';

import { RegisterForm } from '@/components';
import { UserType } from '@/types';
import { Card, Link, Spacer } from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { createRef, useState } from 'react';
import { registerAuth } from 'utils/auth';

// form ref to get data
const formRef = createRef<HTMLFormElement>();

const Register = () => {
  const router = useRouter();
  const [errorMsg, seterrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // function to register new user
  const registerUser = async () => {
    const formData = new FormData(formRef.current!);
    const fname = formData.get('fname') as string;
    const lname = formData.get('lname') as string;
    const class_ = Number(formData.get('class'));
    const section = formData.get('section') as string;
    const email = formData.get('email') + '@srmist.edu.in';
    const password = formData.get('password') as string;

    if (!email && !password && !fname && !lname && !class_ && !section) return;

    const userData: UserType = { fname, lname, class: class_, section, email, password };

    try {
      setLoading(true);
      console.log(userData);

      await registerAuth(userData);
      router.push('/auth/login');
    } catch (error) {
      if (error instanceof Error) seterrorMsg(error.message);
    }
    setLoading(false);
  };

  return (
    <section className="relative min-h-[85dvh] flex justify-center items-center flex-col px-10">
      <h2 className="text-5xl font-extrabold text-center">Register Student</h2>
      <Spacer y={10} />
      <Card
        isBlurred
        className="relative bg-background/60 dark:bg-default-100/50 w-full max-w-[600px] px-3 py-5"
        shadow="sm"
      >
        <RegisterForm formRef={formRef} registerUser={registerUser} loading={loading} />
        <p className="text-danger text-center pt-3">{errorMsg && errorMsg}</p>
      </Card>
      <Spacer y={4} />
      <p>
        Already have a account{' '}
        <Link as={NextLink} href="/auth/login">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;
