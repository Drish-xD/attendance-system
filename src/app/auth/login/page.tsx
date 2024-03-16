'use client';

import { useAuth } from '@/Provider/auth';
import { LoginForm } from '@/components';
import { Button, Card, Link, Spacer, Spinner } from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { createRef, useState } from 'react';

// form ref to get data
const formRef = createRef<HTMLFormElement>();

const Login = () => {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [errorMsg, seterrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Login User using credentials
  const loginUser = async () => {
    const formData = new FormData(formRef.current!);
    const email = formData.get('email') + '@srmist.edu.in';
    const password = formData.get('password') as string;

    if (!email && !password) return;

    try {
      setLoading(true);
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) seterrorMsg(error.message);
    }
    setLoading(false);
  };

  // if loggedIn the goto dashboard
  if (isLoggedIn) router.push('/dashboard');

  return (
    <section className="relative min-h-[85dvh] flex justify-center items-center flex-col px-10">
      <h2 className="text-5xl font-extrabold text-center">Login Student</h2>
      <Spacer y={10} />
      <Card
        isBlurred
        className="relative bg-background/60 dark:bg-default-100/50 w-full max-w-[600px] px-3 py-5"
        shadow="sm"
      >
        <LoginForm formRef={formRef} />
        <Button fullWidth type="button" onClick={loginUser} color="success">
          {loading ? <Spinner /> : 'Log in'}
        </Button>
        <p className="text-danger text-center pt-3">{errorMsg && errorMsg}</p>
      </Card>
      <Spacer y={4} />
      <p>
        New Student{' '}
        <Link as={NextLink} href="/auth/register">
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;
