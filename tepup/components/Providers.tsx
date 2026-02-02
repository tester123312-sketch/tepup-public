'use client';

import { ReactNode } from 'react';
import { ProgressProvider } from '@/lib/contexts/ProgressContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
