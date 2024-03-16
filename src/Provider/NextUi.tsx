'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';

// NEXTUI Provider
export function NextUI({ children }: { children: ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
