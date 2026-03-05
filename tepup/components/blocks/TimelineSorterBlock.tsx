'use client';

import { useState, useCallback } from 'react';
import type { TimelineSorterBlock as TimelineSorterBlockType } from '@/lib/types/content';

interface Props {
  block: TimelineSorterBlockType;
  onComplete?: () => void;
}

export default function TimelineSorterBlockComponent({ block, onComplete }: Props) {
  const [sortedEvents, setSortedEvents] = useState(() =>
    [...block.events].sort(() => Math.random() - 0.5)
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const correctOrder = [...block.events].sort((a, b) => a.year - b.year);

  const moveItem = useCallback((fromIndex: number, toIndex: number) => {
    setSortedEvents(prev => {
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
    if (index < sortedEvents.length - 1) moveItem(index, index + 1);
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    onComplete?.();
  };

  const getPositionScore = (eventId: string) => {
    if (!hasSubmitted) return null;
    const userIndex = sortedEvents.findIndex(e => e.id === eventId);
    const correctIndex = correctOrder.findIndex(e => e.id === eventId);
    if (userIndex === correctIndex) return 'correct';
    if (Math.abs(userIndex - correctIndex) === 1) return 'close';
    return 'wrong';
  };

  const correctCount = hasSubmitted
    ? sortedEvents.filter((e, i) => correctOrder[i]?.id === e.id).length
    : 0;

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-4">
        <h3 className="text-white font-bold text-lg">{block.title || 'Sắp xếp Dòng thời gian'}</h3>
        {block.instruction && <p className="text-white/70 text-sm mt-1">{block.instruction}</p>}
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500 mb-3">
          {hasSubmitted ? 'Thứ tự đúng:' : 'Sắp xếp các sự kiện từ sớm nhất → muộn nhất:'}
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-2">
            {(hasSubmitted ? correctOrder : sortedEvents).map((event, index) => {
              const score = getPositionScore(event.id);
              const userIndex = hasSubmitted ? sortedEvents.findIndex(e => e.id === event.id) : index;

              return (
                <div
                  key={event.id}
                  draggable={!hasSubmitted}
                  onDragStart={() => setDragIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (dragIndex !== null && dragIndex !== index) {
                      moveItem(dragIndex, index);
                    }
                    setDragIndex(null);
                  }}
                  className={`relative pl-12 pr-3 py-3 rounded-xl border-2 transition-all ${
                    hasSubmitted
                      ? score === 'correct'
                        ? 'border-green-300 bg-green-50'
                        : score === 'close'
                        ? 'border-yellow-300 bg-yellow-50'
                        : 'border-red-200 bg-red-50'
                      : dragIndex === index
                      ? 'border-amber-400 bg-amber-50 opacity-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 cursor-grab active:cursor-grabbing'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                    hasSubmitted
                      ? score === 'correct' ? 'bg-green-500 border-green-600 text-white' : 'bg-red-400 border-red-500 text-white'
                      : 'bg-amber-100 border-amber-400 text-amber-700'
                  }`}>
                    {index + 1}
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-800">{event.title}</p>
                      {hasSubmitted && (
                        <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
                      )}
                      {event.description && hasSubmitted && (
                        <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                      )}
                      {hasSubmitted && score !== 'correct' && (
                        <p className="text-xs text-red-500 mt-1">Bạn xếp ở vị trí #{userIndex + 1}</p>
                      )}
                    </div>

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
                          disabled={index === sortedEvents.length - 1}
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
        </div>

        {/* Submit */}
        {!hasSubmitted && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-4 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
          >
            Kiểm tra thứ tự
          </button>
        )}

        {/* Results & Connections */}
        {hasSubmitted && (
          <div className="mt-4 space-y-3" aria-live="polite">
            <div className={`p-4 rounded-xl text-center ${correctCount === block.events.length ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`font-semibold ${correctCount === block.events.length ? 'text-green-700' : 'text-blue-700'}`}>
                {correctCount}/{block.events.length} đúng vị trí
              </p>
            </div>

            {block.connections && block.connections.length > 0 && (
              <>
                {!showConnections ? (
                  <button
                    onClick={() => setShowConnections(true)}
                    className="w-full py-2 text-amber-600 text-sm font-medium hover:text-amber-700"
                  >
                    Xem mối liên hệ nhân-quả →
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Mối liên hệ nhân-quả:</p>
                    {block.connections.map((conn, i) => {
                      const fromEvent = block.events.find(e => e.id === conn.fromId);
                      const toEvent = block.events.find(e => e.id === conn.toId);
                      return (
                        <div key={i} className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-amber-800">{fromEvent?.title}</span>
                            <span className="text-amber-400">→</span>
                            <span className="font-medium text-amber-800">{toEvent?.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{conn.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
