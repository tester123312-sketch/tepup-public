'use client';

import { useState } from 'react';
import type { FactOrOpinionBlock } from '@/lib/types/content';

interface Props {
  block: FactOrOpinionBlock;
  onComplete?: () => void;
}

const categoryConfig = {
  fact: { label: 'Sự thật', color: 'bg-green-100 text-green-800 border-green-300', icon: '✓' },
  opinion: { label: 'Ý kiến', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: '💭' },
  misleading: { label: 'Sai lệch', color: 'bg-red-100 text-red-800 border-red-300', icon: '✗' },
};

export default function FactOrOpinionBlockComponent({ block, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentStatement = block.statements[currentIndex];
  const totalStatements = block.statements.length;
  const correctCount = Object.entries(answers).filter(
    ([id, answer]) => block.statements.find(s => s.id === id)?.correctAnswer === answer
  ).length;

  const handleAnswer = (answer: 'fact' | 'opinion' | 'misleading') => {
    if (showResult) return;
    setAnswers(prev => ({ ...prev, [currentStatement.id]: answer }));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setShowExplanation(false);
    if (currentIndex < totalStatements - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      onComplete?.();
    }
  };

  const isCorrect = answers[currentStatement?.id] === currentStatement?.correctAnswer;

  if (isFinished) {
    return (
      <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
          <h3 className="text-white font-bold text-lg">{block.title || 'Sự thật hay Ý kiến?'}</h3>
        </div>
        <div className="p-6 text-center">
          <div className="text-5xl mb-4">{correctCount === totalStatements ? '🎉' : correctCount >= totalStatements / 2 ? '👍' : '📚'}</div>
          <p className="text-2xl font-bold text-gray-900 mb-2">
            {correctCount}/{totalStatements} câu đúng
          </p>
          <p className="text-gray-500">
            {correctCount === totalStatements
              ? 'Xuất sắc! Bạn phân biệt rất tốt giữa sự thật và ý kiến.'
              : correctCount >= totalStatements / 2
              ? 'Khá tốt! Hãy cẩn thận hơn với các phát biểu mang tính dẫn dắt.'
              : 'Cần luyện tập thêm! Đọc lại các giải thích để hiểu rõ hơn.'}
          </p>
          <div className="mt-6 space-y-3">
            {block.statements.map((stmt) => {
              const userAnswer = answers[stmt.id];
              const correct = userAnswer === stmt.correctAnswer;
              return (
                <div key={stmt.id} className={`p-3 rounded-lg border text-left ${correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <p className="text-sm text-gray-700">{stmt.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${categoryConfig[stmt.correctAnswer].color}`}>
                      {categoryConfig[stmt.correctAnswer].label}
                    </span>
                    {!correct && (
                      <span className="text-xs text-red-500">
                        (Bạn chọn: {categoryConfig[userAnswer as keyof typeof categoryConfig]?.label})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">{block.title || 'Sự thật hay Ý kiến?'}</h3>
          <span className="text-white/80 text-sm font-medium">
            {currentIndex + 1}/{totalStatements}
          </span>
        </div>
        {block.instruction && (
          <p className="text-white/80 text-sm mt-1">{block.instruction}</p>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 px-4 pt-4">
        {block.statements.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentIndex ? (answers[block.statements[i].id] === block.statements[i].correctAnswer ? 'bg-green-400' : 'bg-red-400') :
              i === currentIndex ? 'bg-purple-400' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="p-6">
        {/* Statement card */}
        <div className="bg-gray-50 rounded-xl p-5 mb-5 min-h-[80px] flex items-center">
          <p className="text-gray-800 text-lg leading-relaxed">"{currentStatement.text}"</p>
        </div>
        {currentStatement.source && (
          <p className="text-xs text-gray-400 mb-4 -mt-3 px-1">Nguồn: {currentStatement.source}</p>
        )}

        {/* Answer buttons */}
        {!showResult ? (
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((key) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                className={`p-3 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all hover:scale-[1.02] active:scale-95`}
              >
                <div className="text-2xl mb-1">{categoryConfig[key].icon}</div>
                <div className="text-sm font-semibold text-gray-700">{categoryConfig[key].label}</div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            {/* Result feedback */}
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
                <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Chính xác!' : 'Chưa đúng'}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-600">Đáp án đúng:</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryConfig[currentStatement.correctAnswer].color}`}>
                  {categoryConfig[currentStatement.correctAnswer].label}
                </span>
              </div>
              {!showExplanation ? (
                <button
                  onClick={() => setShowExplanation(true)}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Xem giải thích →
                </button>
              ) : (
                <p className="text-sm text-gray-600 mt-2">{currentStatement.explanation}</p>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              {currentIndex < totalStatements - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
