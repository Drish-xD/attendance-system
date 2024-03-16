'use client';

import { Checkbox, Input, Link, Spacer } from '@nextui-org/react';
import NextLink from 'next/link';
import { RefObject, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';

export default function LoginForm({ formRef }: { formRef: RefObject<HTMLFormElement> }) {
  const [isVisible, setIsVisible] = useState(false);

  // check validation of data
  const [valid, setValid] = useState<{ [key: string]: boolean | undefined }>({
    email: undefined,
    password: undefined
  });

  const validateEmail = (value: string) => /^[a-z]{2}\d{4}$/.test(value);

  const handleValidation = () => {
    const email = formRef.current!['email'].value;
    const password = formRef.current!['password'].value;
    const isValidEmail = validateEmail(email);
    const isValidPassword = password.length > 6;
    setValid({ email: isValidEmail, password: isValidPassword });
  };

  return (
    <form ref={formRef}>
      <Input
        type="text"
        label="Email"
        name="email"
        placeholder="Enter your email"
        description="only Email Prefix (without @srmist.edu.in)"
        fullWidth
        isRequired
        errorMessage={valid.email === false && 'Invalid email'}
        isInvalid={valid.email === false}
        endContent={<p className="pointer-events-none flex items-center">@srmist.edu.in</p>}
        onBlur={handleValidation}
      />
      <Spacer y={5} />
      <Input
        placeholder="Enter your password"
        label="Password"
        name="password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye /> : <EyeOff />}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
        errorMessage={valid.password === false && 'Invalid Password'}
        isInvalid={valid.password === false}
        description="Password length > 6"
        fullWidth
        isRequired
        onBlur={handleValidation}
      />
      <Spacer y={2} />

      <div className="flex justify-between">
        <Checkbox defaultSelected radius="full">
          Remember me
        </Checkbox>
        <Link as={NextLink} href="/" isDisabled title="Not implemented yet!!">
          Forgot password?
        </Link>
      </div>
      <Spacer y={2} />
    </form>
  );
}
