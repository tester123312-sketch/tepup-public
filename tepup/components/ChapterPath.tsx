'use client';

import { useState, useMemo, useEffect } from 'react';
import type { StoryPartDisplay, ChapterDisplay } from '@/lib/types/content';
import { useProgress } from '@/lib/contexts/ProgressContext';
import ChapterNode from './ChapterNode';
import ChapterPopup from './ChapterPopup';

interface ChapterPathProps {
  parts: StoryPartDisplay[];
  storySlug: string;
  colorClass: string;
}

export default function ChapterPath({ parts, storySlug, colorClass }: ChapterPathProps) {
  const [selectedChapter, setSelectedChapter] = useState<{ chapter: ChapterDisplay; isSkippingAhead: boolean } | null>(null);
  const { isCompleted, getCurrentChapterIndex, isChapterSkippingAhead, refreshProgress } = useProgress();

  // Refresh progress when component mounts to ensure latest data
  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  // Collect all chapter slugs in order (use slug for progress tracking consistency)
  const allChapterSlugs = useMemo(() => {
    const slugs: string[] = [];
    for (const part of parts) {
      for (const chapter of part.chapters) {
        slugs.push(chapter.slug);
      }
    }
    return slugs;
  }, [parts]);

  // Get current chapter index (first incomplete)
  const currentChapterIndex = getCurrentChapterIndex(allChapterSlugs);

  // Compute chapter states
  const getChapterState = (chapterSlug: string) => {
    const chapterIndex = allChapterSlugs.indexOf(chapterSlug);
    const completed = isCompleted('chapter', chapterSlug);
    const isCurrent = chapterIndex === currentChapterIndex;
    const skippingAhead = isChapterSkippingAhead(chapterIndex, allChapterSlugs);
    return { completed, isCurrent, isSkippingAhead: skippingAhead };
  };

  // Active chapter is the current one (first incomplete)
  const activeChapterSlug = allChapterSlugs[currentChapterIndex] || null;

  // Extract color name for styling
  const colorName = colorClass.replace('text-', '').replace('-600', '');

  return (
    <div className="relative">
      {parts.map((part, partIndex) => (
        <div key={part.id} className="mb-12">
          {/* Part Header */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8 text-center shadow-sm">
            <span
              className={`text-${colorName}-500 text-sm font-semibold uppercase tracking-wide`}
              style={{ color: `var(--color-${colorName}-500, #3b82f6)` }}
            >
              Phần {partIndex + 1}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{part.name}</h3>
          </div>

          {/* Chapters Path */}
          <div className="flex flex-col items-center gap-8">
            {part.chapters.map((chapter, chapterIndex) => {
              const state = getChapterState(chapter.slug);
              // Create chapter with computed state
              const chapterWithState = {
                ...chapter,
                isCompleted: state.completed,
                isLocked: false, // All chapters are now unlocked
              };

              return (
                <div key={chapter.id} className="relative">
                  {/* Connector Line */}
                  {chapterIndex < part.chapters.length - 1 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-200" />
                  )}

                  {/* Zigzag positioning */}
                  <div
                    className={`
                      transform transition-transform
                      ${chapterIndex % 2 === 0 ? '' : 'translate-x-16'}
                    `}
                  >
                    <ChapterNode
                      chapter={chapterWithState}
                      isActive={chapter.slug === activeChapterSlug}
                      isCurrent={state.isCurrent}
                      isSkippingAhead={state.isSkippingAhead}
                      onClick={() => setSelectedChapter({ chapter: chapterWithState, isSkippingAhead: state.isSkippingAhead })}
                      colorClass={colorClass}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Chapter Popup */}
      {selectedChapter && (
        <ChapterPopup
          chapter={selectedChapter.chapter}
          storySlug={storySlug}
          isSkippingAhead={selectedChapter.isSkippingAhead}
          onClose={() => setSelectedChapter(null)}
          colorClass={colorClass}
        />
      )}
    </div>
  );
}
