'use client';

import { useRouter } from 'next/navigation';
import type { ChapterDisplay } from '@/lib/types/content';

interface ChapterPopupProps {
  chapter: ChapterDisplay;
  storySlug: string;
  isSkippingAhead: boolean;
  onClose: () => void;
  colorClass: string;
}

export default function ChapterPopup({ chapter, storySlug, isSkippingAhead, onClose, colorClass }: ChapterPopupProps) {
  const router = useRouter();

  // Extract color for button
  const colorName = colorClass.replace('text-', '').replace('-600', '');

  const buttonColors: Record<string, string> = {
    teal: 'bg-teal-500 hover:bg-teal-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
  };

  const buttonColor = isSkippingAhead
    ? 'bg-orange-500 hover:bg-orange-600'
    : buttonColors[colorName] || 'bg-blue-500 hover:bg-blue-600';

  const handleStart = () => {
    // Use slug for navigation
    router.push(`/learn/${chapter.slug}`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
        <div className="bg-white rounded-2xl shadow-2xl p-6 min-w-[280px]">
          <h3 className="text-lg font-bold text-gray-900 text-center mb-4">
            {chapter.title}
          </h3>

          <button
            onClick={handleStart}
            className={`w-full py-3 px-6 ${buttonColor} text-white font-semibold rounded-xl transition-colors`}
          >
            {isSkippingAhead ? 'Nhảy cóc' : 'Bắt đầu'}
          </button>
        </div>
      </div>
    </>
  );
}
