'use client';

import { useState, useCallback } from 'react';
import type { SourceRankerBlock } from '@/lib/types/content';

interface Props {
  block: SourceRankerBlock;
  onComplete?: () => void;
}

export default function SourceRankerBlockComponent({ block, onComplete }: Props) {
  const [rankedSources, setRankedSources] = useState(() =>
    [...block.sources].sort(() => Math.random() - 0.5)
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const moveItem = useCallback((fromIndex: number, toIndex: number) => {
    setRankedSources(prev => {
      const newArr = [...prev];
      const [item] = newArr.splice(fromIndex, 1);
      newArr.splice(toIndex, 0, item);
      return newArr;
    });
  }, []);

  const handleMoveUp = (index: number) => {
    if (index > 0) moveItem(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index < rankedSources.length - 1) moveItem(index, index + 1);
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    onComplete?.();
  };

  const correctOrder = [...block.sources].sort((a, b) => b.credibilityScore - a.credibilityScore);

  const getScore = () => {
    let score = 0;
    rankedSources.forEach((source, i) => {
      const correctIndex = correctOrder.findIndex(s => s.id === source.id);
      if (correctIndex === i) score += 2;
      else if (Math.abs(correctIndex - i) === 1) score += 1;
    });
    return score;
  };

  const maxScore = block.sources.length * 2;

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4">
        <h3 className="text-white font-bold text-lg">{block.title || 'Xếp hạng Nguồn tin'}</h3>
        {block.instruction && <p className="text-white/80 text-sm mt-1">{block.instruction}</p>}
      </div>

      <div className="p-6">
        {/* Event context */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 mb-1">Sự kiện</p>
          <p className="text-gray-800">{block.event}</p>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          {hasSubmitted ? 'Kết quả xếp hạng:' : 'Sắp xếp từ đáng tin nhất (trên) → ít tin cậy nhất (dưới):'}
        </p>

        {/* Source list */}
        <div className="space-y-2 mb-5">
          {(hasSubmitted ? correctOrder : rankedSources).map((source, index) => {
            const userIndex = hasSubmitted ? rankedSources.findIndex(s => s.id === source.id) : index;
            const isCorrectPosition = hasSubmitted && userIndex === index;

            return (
              <div
                key={source.id}
                draggable={!hasSubmitted}
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={() => {
                  if (dragIndex !== null && dragIndex !== index) {
                    moveItem(dragIndex, index);
                  }
                  setDragIndex(null);
                }}
                className={`p-3 rounded-xl border-2 transition-all ${
                  hasSubmitted
                    ? isCorrectPosition
                      ? 'border-green-300 bg-green-50'
                      : 'border-red-200 bg-red-50'
                    : dragIndex === index
                      ? 'border-cyan-400 bg-cyan-50 opacity-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 cursor-grab active:cursor-grabbing'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Rank number */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    hasSubmitted
                      ? isCorrectPosition ? 'bg-green-500 text-white' : 'bg-red-400 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{source.name}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{source.excerpt}</p>

                    {hasSubmitted && (
                      <div className="mt-2">
                        <div className="flex items-center gap-1 mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full ${i < source.credibilityScore ? 'bg-teal-400' : 'bg-gray-200'}`} />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">{source.credibilityScore}/5</span>
                        </div>
                        <p className="text-xs text-gray-600">{source.explanation}</p>
                        {source.redFlags && source.redFlags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {source.redFlags.map((flag, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">{flag}</span>
                            ))}
                          </div>
                        )}
                        {source.greenFlags && source.greenFlags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {source.greenFlags.map((flag, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-600">{flag}</span>
                            ))}
                          </div>
                        )}
                        {!isCorrectPosition && (
                          <p className="text-xs text-red-500 mt-1">Bạn xếp ở vị trí #{userIndex + 1}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Move buttons (only before submit) */}
                  {!hasSubmitted && (
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center text-gray-600 text-xs"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === rankedSources.length - 1}
                        className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center text-gray-600 text-xs"
                      >
                        ▼
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
          >
            Kiểm tra thứ tự
          </button>
        ) : (
          <div className="text-center p-3 bg-gray-50 rounded-xl" aria-live="polite">
            <p className="text-lg font-bold text-gray-800">Điểm: {getScore()}/{maxScore}</p>
            <p className="text-sm text-gray-500">
              {getScore() === maxScore
                ? 'Hoàn hảo! Bạn đánh giá nguồn tin rất chính xác.'
                : getScore() >= maxScore / 2
                ? 'Khá tốt! Hãy chú ý đến các dấu hiệu đáng tin cậy.'
                : 'Cần luyện tập thêm kỹ năng đánh giá nguồn tin.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
