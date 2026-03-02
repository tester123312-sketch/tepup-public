'use client';

import { useState } from 'react';
import type { DebateArenaBlock as DebateArenaBlockType } from '@/lib/types/content';

interface Props {
  block: DebateArenaBlockType;
  onComplete?: () => void;
}

export default function DebateArenaBlockComponent({ block, onComplete }: Props) {
  const [selectedStance, setSelectedStance] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedResponses, setSelectedResponses] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const totalRounds = block.rounds.length;
  const currentRoundData = block.rounds[currentRound];

  const handleSelectStance = (stanceId: string) => {
    setSelectedStance(stanceId);
  };

  const handleSelectResponse = (responseId: string) => {
    if (showFeedback) return;
    setSelectedResponses(prev => ({ ...prev, [currentRound]: responseId }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentRound < totalRounds - 1) {
      setCurrentRound(prev => prev + 1);
    } else {
      setIsFinished(true);
      onComplete?.();
    }
  };

  const getSelectedResponse = (round: number) => {
    const responseId = selectedResponses[round];
    return block.rounds[round]?.responseOptions.find(r => r.id === responseId);
  };

  const totalScore = Object.entries(selectedResponses).reduce((sum, [round, responseId]) => {
    const response = block.rounds[Number(round)]?.responseOptions.find(r => r.id === responseId);
    return sum + (response?.score || 0);
  }, 0);

  const maxScore = totalRounds * 3;

  // Stance selection screen
  if (!selectedStance) {
    return (
      <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-blue-600 p-4">
          <h3 className="text-white font-bold text-lg">{block.title || 'Diễn đàn Tranh luận'}</h3>
        </div>
        <div className="p-5">
          <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 mb-1">Chủ đề</p>
            <p className="text-gray-800 font-medium">{block.topic}</p>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-3">Chọn lập trường của bạn:</p>
          <div className="space-y-3">
            {block.stances.map(stance => (
              <button
                key={stance.id}
                onClick={() => handleSelectStance(stance.id)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
              >
                <p className="font-semibold text-gray-800">{stance.label}</p>
                <p className="text-sm text-gray-500 mt-1">{stance.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Finished screen
  if (isFinished) {
    const scorePercent = (totalScore / maxScore) * 100;
    return (
      <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-blue-600 p-4">
          <h3 className="text-white font-bold text-lg">{block.title || 'Diễn đàn Tranh luận'}</h3>
        </div>
        <div className="p-5">
          <div className="text-center mb-5">
            <div className="text-5xl mb-3">
              {scorePercent >= 80 ? '🏆' : scorePercent >= 50 ? '👍' : '📚'}
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalScore}/{maxScore} điểm</p>
            <p className="text-gray-500 text-sm mt-1">
              {scorePercent >= 80
                ? 'Lập luận xuất sắc! Logic chặt chẽ và thuyết phục.'
                : scorePercent >= 50
                ? 'Khá tốt! Có thể cải thiện thêm tính thuyết phục.'
                : 'Cần luyện tập thêm kỹ năng lập luận.'}
            </p>
          </div>

          {/* Round summaries */}
          <div className="space-y-3 mb-5">
            {block.rounds.map((round, i) => {
              const response = getSelectedResponse(i);
              return (
                <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Vòng {i + 1}</p>
                  <p className="text-sm text-gray-600 italic mb-1">"{round.opponentArgument}"</p>
                  <p className="text-sm text-gray-800">→ {response?.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(s => (
                        <div key={s} className={`w-2 h-2 rounded-full ${s <= (response?.score || 0) ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{response?.feedback}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <p className="text-sm font-semibold text-indigo-700 mb-1">Kết luận</p>
            <p className="text-sm text-gray-700 leading-relaxed">{block.conclusion}</p>
          </div>
        </div>
      </div>
    );
  }

  // Debate round
  const selectedResponse = showFeedback ? getSelectedResponse(currentRound) : null;

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-blue-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">{block.title || 'Diễn đàn Tranh luận'}</h3>
          <span className="text-white/80 text-sm">Vòng {currentRound + 1}/{totalRounds}</span>
        </div>
      </div>

      <div className="p-5">
        {/* Progress */}
        <div className="flex gap-1.5 mb-4">
          {block.rounds.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < currentRound ? 'bg-blue-400' :
                i === currentRound ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Opponent's argument */}
        <div className="bg-red-50 rounded-xl p-4 mb-4 border border-red-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">🎯</span>
            <span className="text-xs font-semibold text-red-600">Đối phương lập luận:</span>
          </div>
          <p className="text-gray-800 text-sm leading-relaxed">{currentRoundData.opponentArgument}</p>
        </div>

        {/* Response options */}
        {!showFeedback ? (
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Chọn phản biện của bạn:</p>
            <div className="space-y-2">
              {currentRoundData.responseOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleSelectResponse(option.id)}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left text-sm text-gray-700"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Selected response */}
            <div className="bg-blue-50 rounded-xl p-4 mb-3 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">💬</span>
                <span className="text-xs font-semibold text-blue-600">Phản biện của bạn:</span>
              </div>
              <p className="text-gray-800 text-sm">{selectedResponse?.text}</p>
            </div>

            {/* Feedback */}
            <div className={`p-3 rounded-xl mb-4 ${
              (selectedResponse?.score || 0) >= 2 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`w-3 h-3 rounded-full ${s <= (selectedResponse?.score || 0) ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {(selectedResponse?.score || 0) >= 3 ? 'Xuất sắc!' :
                   (selectedResponse?.score || 0) >= 2 ? 'Tốt' : 'Cần cải thiện'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{selectedResponse?.feedback}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              {currentRound < totalRounds - 1 ? 'Vòng tiếp theo →' : 'Xem kết quả'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
