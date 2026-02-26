'use client';

import { useState } from 'react';
import type { HotColdGuessBlock as HotColdGuessBlockType } from '@/lib/types/content';
import { Thermometer, Target, Lightbulb } from 'lucide-react';

interface Props {
  block: HotColdGuessBlockType;
  onComplete?: () => void;
}

function getTemperature(guess: number, answer: number): { label: string; emoji: string; color: string; bg: string; border: string } {
  const diff = Math.abs((guess - answer) / answer) * 100;
  if (diff <= 5) return { label: 'CHÍNH XÁC!', emoji: '🎯', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-300' };
  if (diff <= 10) return { label: 'Rất nóng!', emoji: '☀️', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-300' };
  if (diff <= 25) return { label: 'Nóng!', emoji: '🔥', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
  if (diff <= 50) return { label: 'Ấm ấm...', emoji: '😐', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' };
  return { label: 'Lạnh!', emoji: '🥶', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-300' };
}

function getDirection(guess: number, answer: number): string {
  if (guess > answer) return '⬇️ Thấp hơn!';
  if (guess < answer) return '⬆️ Cao hơn!';
  return '';
}

function formatNumber(n: number): string {
  return n.toLocaleString('vi-VN');
}

export default function HotColdGuessBlockComponent({ block, onComplete }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [guesses, setGuesses] = useState<{ value: number; temp: ReturnType<typeof getTemperature>; direction: string }[]>([]);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentHintIndex = Math.min(guesses.length, block.hints.length - 1);

  const handleGuess = () => {
    const guess = parseFloat(inputValue.replace(/[,.]/g, ''));
    if (isNaN(guess)) return;

    const temp = getTemperature(guess, block.answer);
    const direction = getDirection(guess, block.answer);
    const diff = Math.abs((guess - block.answer) / block.answer) * 100;

    setGuesses(prev => [...prev, { value: guess, temp, direction }]);
    setInputValue('');
    setShowHint(false);

    if (diff <= block.tolerance) {
      setSolved(true);
      onComplete?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleGuess();
  };

  return (
    <div className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-6 h-6 text-indigo-600" />
        <h3 className="text-lg font-bold text-gray-900">{block.title || 'Đoán số liệu'}</h3>
      </div>

      {/* Question */}
      <p className="text-gray-800 text-lg mb-6 font-medium">{block.question}</p>

      {/* Guess history */}
      {guesses.length > 0 && (
        <div className="space-y-2 mb-4">
          {guesses.map((g, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${g.temp.bg} ${g.temp.border}`}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{g.temp.emoji}</span>
                <span className={`font-semibold ${g.temp.color}`}>{g.temp.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 tabular-nums">{formatNumber(g.value)} {block.unit}</span>
                {!solved && g.direction && (
                  <span className="text-sm font-medium text-gray-500">{g.direction}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      {!solved && (
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <input
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Nhập số (${block.unit})`}
              className="w-full p-3 pr-16 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none text-lg tabular-nums"
            />
            {block.unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{block.unit}</span>
            )}
          </div>
          <button
            onClick={handleGuess}
            disabled={!inputValue.trim()}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Đoán
          </button>
        </div>
      )}

      {/* Hint button */}
      {!solved && guesses.length > 0 && block.hints.length > 0 && (
        <div className="mb-3">
          {showHint ? (
            <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-800 text-sm">{block.hints[currentHintIndex]}</p>
            </div>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              <Lightbulb className="w-4 h-4" />
              Xem gợi ý ({currentHintIndex + 1}/{block.hints.length})
            </button>
          )}
        </div>
      )}

      {/* Attempts counter */}
      {!solved && guesses.length > 0 && (
        <p className="text-sm text-gray-500">Số lần đoán: {guesses.length}</p>
      )}

      {/* Success state */}
      {solved && (
        <div className="mt-4 p-5 bg-green-50 border-2 border-green-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🎉</span>
            <h4 className="text-lg font-bold text-green-800">Chính xác!</h4>
          </div>
          <p className="text-green-700 mb-2">
            <span className="font-semibold">Đáp án: {formatNumber(block.answer)} {block.unit}</span>
            <span className="text-sm ml-2">(đoán đúng sau {guesses.length} lần)</span>
          </p>
          <div className="mt-3 p-3 bg-white/60 rounded-xl">
            <div className="flex items-start gap-2">
              <Thermometer className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 leading-relaxed">{block.context}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
