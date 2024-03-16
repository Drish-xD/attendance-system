'use client';

import { Button, Checkbox, Input, Link, Select, SelectItem, Spacer } from '@nextui-org/react';
import NextLink from 'next/link';

import { classOptions, sectionOptions } from '@/utils/options';
import { RefObject, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';

export default function RegisterForm({
  formRef,
  registerUser,
  loading
}: {
  formRef: RefObject<HTMLFormElement>;
  registerUser: () => void;
  loading: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const [valid, setValid] = useState<{ [key: string]: boolean | null }>({
    email: null,
    password: null,
    fname: null,
    lname: null,
    class_: null,
    section: null
  });

  const validateEmail = (value: string) => /^[a-z]{2}\d{4}$/.test(value);

  const handleValidation = () => {
    const email = formRef.current!['email'].value;
    const password = formRef.current!['password'].value;
    const fname = formRef.current!['fname'].value;
    const lname = formRef.current!['lname'].value;
    const class_ = formRef.current!['class'].value;
    const section = formRef.current!['section'].value;
    setValid({
      email: validateEmail(email),
      password: password.length > 6,
      fname: fname.length > 0,
      lname: lname.length > 0,
      class_: class_.length > 0,
      section: section.length > 0
    });
  };

  // disable btn of not valid state
  const isDisabled =
    !valid.email ||
    !valid.password ||
    !valid.fname ||
    !valid.lname ||
    !valid.class_ ||
    !valid.section;

  return (
    <form ref={formRef}>
      <div className="flex flex-col md:flex-row">
        <Input
          type="text"
          label="First Name"
          name="fname"
          placeholder="Enter your first name"
          isInvalid={valid.fname === false}
          errorMessage={valid.fname === false && 'Please enter the first name'}
          isRequired
          onBlur={handleValidation}
        />

        <Spacer y={5} x={5} />
        <Input
          type="text"
          label="Last Name"
          name="lname"
          placeholder="Enter your last name"
          errorMessage={valid.lname === false && 'Please enter the last name'}
          isInvalid={valid.lname === false}
          isRequired
          onBlur={handleValidation}
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row">
        <Select
          label="Class"
          name="class"
          isRequired
          placeholder="Select your class"
          errorMessage={valid.class_ === false && 'Please select the class'}
          isInvalid={valid.class_ === false}
          onBlur={handleValidation}
        >
          {classOptions.map((c) => (
            <SelectItem key={c} value={c}>
              {c.toString()}
            </SelectItem>
          ))}
        </Select>

        <Spacer y={5} x={5} />

        <Select
          label="Section"
          name="section"
          isRequired
          placeholder="Select your section"
          errorMessage={valid.section === false && 'Please select the section'}
          isInvalid={valid.section === false}
          onBlur={handleValidation}
        >
          {sectionOptions.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Spacer y={5} />
      <Input
        type="text"
        label="Email"
        name="email"
        placeholder="Enter your email"
        description="only Email Prefix (without @srmist.edu.in)"
        fullWidth
        isRequired
        errorMessage={valid.email === false && 'Please enter the email'}
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
        errorMessage={valid.password === false && 'Please enter the Password'}
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

      <Button
        fullWidth
        type="button"
        onClick={registerUser}
        color="success"
        isDisabled={isDisabled}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </form>
  );
}
