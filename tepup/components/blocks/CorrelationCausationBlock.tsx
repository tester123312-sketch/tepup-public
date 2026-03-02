'use client';

import { useState } from 'react';
import type { CorrelationCausationBlock } from '@/lib/types/content';

interface Props {
  block: CorrelationCausationBlock;
  onComplete?: () => void;
}

const answerConfig = {
  causation: { label: 'Nhân quả', description: 'A gây ra B', color: 'bg-green-500' },
  correlation: { label: 'Tương quan', description: 'A và B liên quan nhưng không trực tiếp gây ra', color: 'bg-yellow-500' },
  coincidence: { label: 'Trùng hợp', description: 'A và B không liên quan', color: 'bg-red-500' },
};

export default function CorrelationCausationBlockComponent({ block, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentPair = block.pairs[currentIndex];
  const totalPairs = block.pairs.length;

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setAnswers(prev => ({ ...prev, [currentPair.id]: answer }));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentIndex < totalPairs - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      onComplete?.();
    }
  };

  const isCorrect = answers[currentPair?.id] === currentPair?.correctAnswer;
  const correctCount = Object.entries(answers).filter(
    ([id, answer]) => block.pairs.find(p => p.id === id)?.correctAnswer === answer
  ).length;

  // Simple mini chart
  const MiniChart = ({ data, label, color }: { data: number[]; label: string; color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    return (
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-600 mb-2 truncate">{label}</p>
        <div className="flex items-end gap-1 h-16">
          {data.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full rounded-t ${color} transition-all`}
                style={{ height: `${((value - min) / range) * 100}%`, minHeight: '4px' }}
              />
              <span className="text-[9px] text-gray-400 mt-0.5">{currentPair?.labels?.[i] || ''}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isFinished) {
    return (
      <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
          <h3 className="text-white font-bold text-lg">{block.title || 'Tương quan hay Nhân quả?'}</h3>
        </div>
        <div className="p-6 text-center">
          <div className="text-5xl mb-4">{correctCount === totalPairs ? '🧠' : '📊'}</div>
          <p className="text-2xl font-bold text-gray-900 mb-2">{correctCount}/{totalPairs} câu đúng</p>
          <p className="text-gray-500">
            {correctCount === totalPairs
              ? 'Tuyệt vời! Bạn phân biệt nhân quả và tương quan rất tốt.'
              : 'Nhớ: tương quan không có nghĩa là nhân quả!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">{block.title || 'Tương quan hay Nhân quả?'}</h3>
          <span className="text-white/80 text-sm font-medium">{currentIndex + 1}/{totalPairs}</span>
        </div>
        {block.instruction && <p className="text-white/80 text-sm mt-1">{block.instruction}</p>}
      </div>

      <div className="p-6">
        {/* Data visualization */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5">
          <div className="flex gap-6">
            <MiniChart data={currentPair.factA.data} label={currentPair.factA.label} color="bg-blue-400" />
            <div className="flex items-center text-gray-300 text-2xl font-light">↔</div>
            <MiniChart data={currentPair.factB.data} label={currentPair.factB.label} color="bg-purple-400" />
          </div>
        </div>

        {/* Answer buttons */}
        {!showResult ? (
          <div className="space-y-2">
            {(Object.keys(answerConfig) as Array<keyof typeof answerConfig>).map((key) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all text-left flex items-center gap-3"
              >
                <div className={`w-3 h-3 rounded-full ${answerConfig[key].color}`} />
                <div>
                  <span className="font-semibold text-gray-800">{answerConfig[key].label}</span>
                  <span className="text-sm text-gray-500 ml-2">{answerConfig[key].description}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
                <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Chính xác!' : `Đáp án đúng: ${answerConfig[currentPair.correctAnswer].label}`}
                </span>
              </div>
              <p className="text-sm text-gray-600">{currentPair.explanation}</p>
              {currentPair.confoundingFactor && (
                <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-700">
                    <span className="font-semibold">Yếu tố gây nhiễu:</span> {currentPair.confoundingFactor}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              {currentIndex < totalPairs - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
