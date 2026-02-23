'use client';

import { ReactNode } from 'react';
import { ProgressProvider } from '@/lib/contexts/ProgressContext';
import { AIChatProvider } from '@/lib/contexts/AIChatContext';
import AIChatBox from '@/components/ai/AIChatBox';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ProgressProvider>
      <AIChatProvider>
        {children}
        <AIChatBox />
      </AIChatProvider>
    </ProgressProvider>
  );
}
