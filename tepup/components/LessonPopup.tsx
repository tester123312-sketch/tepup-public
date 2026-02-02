'use client';

import { useRouter } from 'next/navigation';
import type { LessonDisplay } from '@/lib/types/content';

interface LessonPopupProps {
  lesson: LessonDisplay;
  isSkippingAhead: boolean;
  onClose: () => void;
}

export default function LessonPopup({ lesson, isSkippingAhead, onClose }: LessonPopupProps) {
  const router = useRouter();

  const handleStart = () => {
    // Use slug for navigation
    router.push(`/learn/${lesson.slug}`);
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
            {lesson.name}
          </h3>

          <button
            onClick={handleStart}
            className={`w-full py-3 px-6 font-semibold rounded-xl transition-colors ${
              isSkippingAhead
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSkippingAhead ? 'Nhảy cóc' : 'Bắt đầu'}
          </button>
        </div>
      </div>
    </>
  );
}
