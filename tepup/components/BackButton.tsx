'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BackButtonProps {
  fallbackUrl?: string;
}

export default function BackButton({ fallbackUrl = '/' }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    // Store the referrer URL on mount (only client-side)
    if (typeof document !== 'undefined') {
      setReferrer(document.referrer);
    }
  }, []);

  const handleBack = () => {
    // Check if referrer is a lesson detail page
    const isReferrerLesson = referrer && referrer.includes('/learn/');

    // If coming from a lesson page, go to fallback instead
    if (isReferrerLesson) {
      router.push(fallbackUrl);
      return;
    }

    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback to specified URL if no history
      router.push(fallbackUrl);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Quay lại</span>
    </button>
  );
}
