'use client';

import { useState, useRef, useCallback } from 'react';
import type { SpectrumPlacerBlock as SpectrumPlacerBlockType } from '@/lib/types/content';

interface Props {
  block: SpectrumPlacerBlockType;
  onComplete?: () => void;
}

export default function SpectrumPlacerBlockComponent({ block, onComplete }: Props) {
  const [placements, setPlacements] = useState<Record<string, number>>({});
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const spectrumRef = useRef<HTMLDivElement>(null);

  const allPlaced = block.items.every(item => placements[item.id] !== undefined);

  const handleSpectrumClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeItem || hasSubmitted || !spectrumRef.current) return;
    const rect = spectrumRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    setPlacements(prev => ({ ...prev, [activeItem]: position }));
    setActiveItem(null);
  }, [activeItem, hasSubmitted]);

  const handleSpectrumKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!activeItem || hasSubmitted) return;
    const currentPos = placements[activeItem] ?? 50;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const newPos = Math.max(0, currentPos - 5);
      setPlacements(prev => ({ ...prev, [activeItem]: newPos }));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const newPos = Math.min(100, currentPos + 5);
      setPlacements(prev => ({ ...prev, [activeItem]: newPos }));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setActiveItem(null);
    }
  }, [activeItem, hasSubmitted, placements]);

  const handleSubmit = () => {
    setHasSubmitted(true);
    onComplete?.();
  };

  const getScore = (itemId: string) => {
    const item = block.items.find(i => i.id === itemId);
    if (!item || placements[itemId] === undefined) return null;
    const distance = Math.abs(placements[itemId] - item.correctPosition);
    if (distance <= item.tolerance) return 'correct';
    if (distance <= item.tolerance * 2) return 'close';
    return 'wrong';
  };

  const totalCorrect = hasSubmitted
    ? block.items.filter(item => getScore(item.id) === 'correct').length
    : 0;

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-4">
        <h3 className="text-white font-bold text-lg">{block.title || 'Đặt trên Quang phổ'}</h3>
        {block.instruction && <p className="text-white/70 text-sm mt-1">{block.instruction}</p>}
      </div>

      <div className="p-5">
        {/* Item selection */}
        {!hasSubmitted && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              {activeItem ? 'Click vào thanh quang phổ để đặt vị trí:' : 'Chọn một khái niệm để đặt:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {block.items.map(item => {
                const isPlaced = placements[item.id] !== undefined;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(isActive ? null : item.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2 ${
                      isActive
                        ? 'border-pink-500 bg-pink-50 text-pink-700 scale-105'
                        : isPlaced
                        ? 'border-green-300 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {isPlaced && !isActive && <span className="mr-1">✓</span>}
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Spectrum bar */}
        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800">{block.spectrum.leftLabel}</p>
              {block.spectrum.leftDescription && (
                <p className="text-xs text-gray-500">{block.spectrum.leftDescription}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">{block.spectrum.rightLabel}</p>
              {block.spectrum.rightDescription && (
                <p className="text-xs text-gray-500">{block.spectrum.rightDescription}</p>
              )}
            </div>
          </div>

          <div
            ref={spectrumRef}
            onClick={handleSpectrumClick}
            onKeyDown={handleSpectrumKeyDown}
            tabIndex={0}
            role="slider"
            aria-label={`Thanh quang phổ từ ${block.spectrum.leftLabel} đến ${block.spectrum.rightLabel}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={activeItem ? (placements[activeItem] ?? 50) : undefined}
            className={`relative h-12 rounded-full overflow-hidden ${
              activeItem && !hasSubmitted ? 'cursor-crosshair' : ''
            }`}
            style={{
              background: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)',
            }}
          >
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/50" />

            {/* Placed items */}
            {block.items.map(item => {
              const pos = placements[item.id];
              if (pos === undefined) return null;
              const score = hasSubmitted ? getScore(item.id) : null;
              return (
                <div
                  key={item.id}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
                  style={{ left: `${pos}%` }}
                >
                  <div className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-md ${
                    score === 'correct' ? 'bg-green-500 text-white' :
                    score === 'close' ? 'bg-yellow-500 text-white' :
                    score === 'wrong' ? 'bg-red-500 text-white' :
                    'bg-white text-gray-800 border border-gray-300'
                  }`}>
                    {item.label}
                  </div>
                </div>
              );
            })}

            {/* Correct positions (show after submit) */}
            {hasSubmitted && block.items.map(item => (
              <div
                key={`correct-${item.id}`}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${item.correctPosition}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-white border-2 border-gray-800 shadow" />
              </div>
            ))}
          </div>

          {/* Scale markers */}
          <div className="flex justify-between mt-1 px-2">
            {[0, 25, 50, 75, 100].map(n => (
              <span key={n} className="text-[10px] text-gray-400">{n}</span>
            ))}
          </div>
        </div>

        {/* Submit */}
        {!hasSubmitted && allPlaced && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors"
          >
            Kiểm tra vị trí
          </button>
        )}

        {!hasSubmitted && !allPlaced && (
          <p className="text-sm text-gray-400 text-center">
            Đã đặt {Object.keys(placements).length}/{block.items.length} khái niệm
          </p>
        )}

        {/* Results */}
        {hasSubmitted && (
          <div className="space-y-3" aria-live="polite">
            <div className={`p-4 rounded-xl text-center ${totalCorrect === block.items.length ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`font-semibold ${totalCorrect === block.items.length ? 'text-green-700' : 'text-blue-700'}`}>
                {totalCorrect}/{block.items.length} đúng vị trí
              </p>
              <p className="text-xs text-gray-500 mt-1">● = vị trí đúng, nhãn = vị trí bạn đặt</p>
            </div>

            {block.items.map(item => {
              const score = getScore(item.id);
              return (
                <div key={item.id} className={`p-3 rounded-xl ${
                  score === 'correct' ? 'bg-green-50 border border-green-200' :
                  score === 'close' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-gray-800">{item.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      score === 'correct' ? 'bg-green-200 text-green-800' :
                      score === 'close' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {score === 'correct' ? 'Chính xác' : score === 'close' ? 'Gần đúng' : 'Sai vị trí'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Bạn: {placements[item.id]} | Đúng: {item.correctPosition}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{item.explanation}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
