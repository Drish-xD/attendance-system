import { Mockup } from '@/components';
import { Button } from '@nextui-org/button';
import { Spacer } from '@nextui-org/spacer';

import NextLink from 'next/link';
import { Zap } from 'react-feather';

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen flex-col">
      <div className="text-center">
        <h1 className="text-primary italic text-5xl font-bold">
          RollSync
          <sup className="inline-block">
            <Zap color="yellow" />
          </sup>
        </h1>
        <Spacer y={3} />
        <p className="text-lg text-foreground-600">Simplify Student Attendance Tracking</p>
        <Spacer y={5} />
        <Button href="/auth/register" color="primary" variant="flat" as={NextLink}>
          Get Started
        </Button>
      </div>
      <Spacer y={10} />
      <Mockup />
    </main>
  );
}
