'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import type { LevelDisplay, LessonDisplay } from '@/lib/types/content';
import { useProgress } from '@/lib/contexts/ProgressContext';
import LessonNode from './LessonNode';
import LessonPopup from './LessonPopup';

interface LearningPathProps {
  levels: LevelDisplay[];
}

export default function LearningPath({ levels }: LearningPathProps) {
  const [selectedLesson, setSelectedLesson] = useState<{ lesson: LessonDisplay; isSkippingAhead: boolean } | null>(null);
  const { isCompleted, getCurrentLessonIndex, isSkippingAhead, refreshProgress } = useProgress();
  const currentLessonRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);

  // Refresh progress when component mounts to ensure latest data
  useEffect(() => {
    refreshProgress();
    // Mark progress as loaded after a small delay to ensure state is updated
    const timer = setTimeout(() => {
      setIsProgressLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [refreshProgress]);

  // Collect all lesson slugs in order (use slug for progress tracking consistency)
  const allLessonSlugs = useMemo(() => {
    const slugs: string[] = [];
    for (const level of levels) {
      for (const lesson of level.lessons) {
        slugs.push(lesson.slug);
      }
    }
    return slugs;
  }, [levels]);

  // Get current lesson index (first incomplete)
  const currentLessonIndex = getCurrentLessonIndex(allLessonSlugs);

  // Compute lesson states
  const getLessonState = (lessonSlug: string) => {
    const lessonIndex = allLessonSlugs.indexOf(lessonSlug);
    const completed = isCompleted('lesson', lessonSlug);
    const isCurrent = lessonIndex === currentLessonIndex;
    const skippingAhead = isSkippingAhead(lessonIndex, allLessonSlugs);
    return { completed, isCurrent, isSkippingAhead: skippingAhead };
  };

  // Active lesson is the current one (first incomplete)
  const activeLessonSlug = allLessonSlugs[currentLessonIndex] || null;

  // Scroll to current lesson when progress is loaded
  useEffect(() => {
    if (isProgressLoaded && currentLessonRef.current && !hasScrolledRef.current) {
      hasScrolledRef.current = true;
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        currentLessonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 150);
    }
  }, [isProgressLoaded, currentLessonIndex]);

  return (
    <div className="relative">
      {levels.map((level, levelIndex) => (
        <div key={level.id} className="mb-12">
          {/* Level Header */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8 text-center shadow-sm">
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-wide">
              Cấp độ {levelIndex + 1}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{level.name}</h3>
          </div>

          {/* Lessons Path */}
          <div className="flex flex-col items-center gap-8">
            {level.lessons.map((lesson, lessonIndex) => {
              const state = getLessonState(lesson.slug);
              // Create lesson with computed state
              const lessonWithState = {
                ...lesson,
                isCompleted: state.completed,
                isLocked: false, // All lessons are now unlocked
              };

              const isCurrentLesson = lesson.slug === activeLessonSlug;

              return (
                <div
                  key={lesson.id}
                  className="relative"
                  ref={isCurrentLesson ? currentLessonRef : undefined}
                >
                  {/* Connector Line */}
                  {lessonIndex < level.lessons.length - 1 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-200" />
                  )}

                  {/* Zigzag positioning */}
                  <div
                    className={`
                      transform transition-transform
                      ${lessonIndex % 2 === 0 ? '' : 'translate-x-16'}
                    `}
                  >
                    <LessonNode
                      lesson={lessonWithState}
                      isActive={isCurrentLesson}
                      isCurrent={state.isCurrent}
                      isSkippingAhead={state.isSkippingAhead}
                      onClick={() => setSelectedLesson({ lesson: lessonWithState, isSkippingAhead: state.isSkippingAhead })}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Lesson Popup */}
      {selectedLesson && (
        <LessonPopup
          lesson={selectedLesson.lesson}
          isSkippingAhead={selectedLesson.isSkippingAhead}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
}
