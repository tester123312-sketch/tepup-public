'use client';

import { useState } from 'react';
import type { StatTrickBlock as StatTrickBlockType } from '@/lib/types/content';
import { BarChart3, Check, X, Eye } from 'lucide-react';

interface Props {
  block: StatTrickBlockType;
  onComplete?: () => void;
}

function CSSBarChart({ chart, animated }: {
  chart: { type: string; data: { label: string; value: number; displayValue?: string }[]; yAxisStart?: number; title?: string };
  animated?: boolean;
}) {
  const maxValue = Math.max(...chart.data.map(d => d.value));
  const yStart = chart.yAxisStart || 0;
  const range = maxValue - yStart;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      {chart.title && (
        <p className="text-sm font-semibold text-gray-700 mb-3 text-center">{chart.title}</p>
      )}
      <div className="flex items-end gap-3 h-40 px-2">
        {chart.data.map((d, i) => {
          const heightPct = range > 0 ? ((d.value - yStart) / range) * 100 : 0;
          const clampedHeight = Math.max(Math.min(heightPct, 100), 2);
          const colors = ['bg-blue-500', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'];

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs tabular-nums text-gray-600">{d.displayValue || d.value.toLocaleString('vi-VN')}</span>
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                <div
                  className={`absolute bottom-0 left-0 right-0 rounded-t-lg ${colors[i % colors.length]} ${animated ? 'transition-all duration-700' : ''}`}
                  style={{ height: `${clampedHeight}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 text-center mt-1 leading-tight">{d.label}</span>
            </div>
          );
        })}
      </div>
      {yStart > 0 && (
        <div className="flex items-center justify-between mt-2 px-2">
          <span className="text-[10px] text-gray-400">Trục Y bắt đầu từ: {yStart.toLocaleString('vi-VN')}</span>
        </div>
      )}
    </div>
  );
}

export default function StatTrickBlockComponent({ block, onComplete }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showCorrected, setShowCorrected] = useState(false);

  const isCorrect = checked && block.options.find(o => o.id === selectedAnswer)?.isCorrect;

  const handleCheck = () => {
    setChecked(true);
    if (block.options.find(o => o.id === selectedAnswer)?.isCorrect) {
      onComplete?.();
    }
  };

  return (
    <div className="mb-6 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-6 h-6 text-rose-600" />
        <h3 className="text-lg font-bold text-gray-900">{block.title || 'Mẹo thống kê'}</h3>
      </div>

      <p className="text-gray-600 text-sm mb-4">{block.instruction}</p>

      {/* Chart */}
      <div className="mb-4">
        {!showCorrected ? (
          <CSSBarChart chart={block.chart} />
        ) : (
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full uppercase">
                Sai lệch
              </div>
              <div className="opacity-50">
                <CSSBarChart chart={block.chart} />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase">
                Chính xác
              </div>
              <CSSBarChart chart={block.reveal.correctedChart} animated />
            </div>
          </div>
        )}
      </div>

      {/* Question */}
      <div className="bg-white/60 rounded-xl p-4">
        <p className="text-gray-900 font-medium mb-3">{block.question}</p>

        <div className="space-y-2">
          {block.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const showCorrect = checked && option.isCorrect;
            const showWrong = checked && isSelected && !option.isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => !checked && setSelectedAnswer(option.id)}
                disabled={checked}
                className={`
                  w-full p-3 text-left rounded-xl border-2 transition-all text-sm
                  ${showCorrect ? 'border-green-500 bg-green-50'
                    : showWrong ? 'border-red-500 bg-red-50'
                    : isSelected ? 'border-rose-500 bg-rose-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                  ${checked ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-2">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${showCorrect ? 'border-green-500 bg-green-500'
                      : showWrong ? 'border-red-500 bg-red-500'
                      : isSelected ? 'border-rose-500 bg-rose-500'
                      : 'border-gray-300'}
                  `}>
                    {showCorrect && <Check className="w-3 h-3 text-white" />}
                    {showWrong && <X className="w-3 h-3 text-white" />}
                    {isSelected && !checked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <span className={`${showCorrect ? 'text-green-700 font-medium' : showWrong ? 'text-red-700' : isSelected ? 'text-rose-700 font-medium' : 'text-gray-700'}`}>
                    {option.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {!checked && selectedAnswer && (
          <button
            onClick={handleCheck}
            className="mt-3 px-6 py-2.5 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-colors"
          >
            Kiểm tra
          </button>
        )}

        {/* Explanation + toggle corrected chart */}
        {checked && (
          <>
            <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`${isCorrect ? 'text-green-700' : 'text-blue-700'} leading-relaxed`}>
                <span className="font-semibold">{isCorrect ? 'Chính xác! ' : 'Giải thích: '}</span>
                {block.reveal.explanation}
              </p>
            </div>

            {!showCorrected && (
              <button
                onClick={() => setShowCorrected(true)}
                className="mt-3 flex items-center gap-2 text-sm text-rose-600 hover:text-rose-800 font-medium"
              >
                <Eye className="w-4 h-4" />
                Xem biểu đồ so sánh
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
