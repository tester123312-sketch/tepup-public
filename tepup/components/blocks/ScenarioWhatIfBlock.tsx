'use client';

import { useState } from 'react';
import type { ScenarioWhatIfBlock } from '@/lib/types/content';

interface Props {
  block: ScenarioWhatIfBlock;
  onComplete?: () => void;
}

const likelihoodConfig = {
  likely: { label: 'Rất có thể', color: 'bg-green-100 text-green-700 border-green-300' },
  possible: { label: 'Có thể', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  unlikely: { label: 'Khó xảy ra', color: 'bg-red-100 text-red-700 border-red-300' },
};

export default function ScenarioWhatIfBlockComponent({ block, onComplete }: Props) {
  const [selectedPredictions, setSelectedPredictions] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleTogglePrediction = (id: string) => {
    if (hasSubmitted) return;
    setSelectedPredictions(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    onComplete?.();
  };

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4">
        <h3 className="text-white font-bold text-lg">{block.title || 'Nếu... thì sao?'}</h3>
      </div>

      <div className="p-6">
        {/* Scenario */}
        <div className="bg-indigo-50 rounded-xl p-4 mb-4 border border-indigo-100">
          <p className="text-sm font-semibold text-indigo-600 mb-1">Kịch bản giả định</p>
          <p className="text-gray-800 leading-relaxed">{block.scenario}</p>
        </div>

        {/* Historical context */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 mb-1">Bối cảnh lịch sử</p>
          <p className="text-gray-700 text-sm leading-relaxed">{block.historicalContext}</p>
        </div>

        {!hasSubmitted ? (
          <>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Theo bạn, điều gì sẽ xảy ra? (Chọn các dự đoán bạn đồng ý)
            </p>
            <div className="space-y-2 mb-4">
              {block.predictions.map((pred) => (
                <button
                  key={pred.id}
                  onClick={() => handleTogglePrediction(pred.id)}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                    selectedPredictions.includes(pred.id)
                      ? 'border-indigo-400 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedPredictions.includes(pred.id)
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPredictions.includes(pred.id) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-gray-800 text-sm">{pred.text}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={selectedPredictions.length === 0}
              className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                selectedPredictions.length > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Xem phân tích
            </button>
          </>
        ) : (
          <div aria-live="polite">
            {/* Predictions with likelihood */}
            <p className="text-sm font-semibold text-gray-700 mb-3">Đánh giá các dự đoán:</p>
            <div className="space-y-2 mb-5">
              {block.predictions.map((pred) => {
                const wasSelected = selectedPredictions.includes(pred.id);
                const config = likelihoodConfig[pred.likelihood];
                return (
                  <div key={pred.id} className={`p-3 rounded-xl border ${wasSelected ? 'border-indigo-200 bg-indigo-50/50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm text-gray-800 flex-1">
                        {wasSelected && <span className="text-indigo-500 mr-1">◆</span>}
                        {pred.text}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{pred.explanation}</p>
                  </div>
                );
              })}
            </div>

            {/* Real outcome */}
            <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-200">
              <p className="text-sm font-semibold text-green-700 mb-1">Thực tế đã xảy ra</p>
              <p className="text-gray-700 text-sm leading-relaxed">{block.realOutcome}</p>
            </div>

            {/* Analysis toggle */}
            {!showAnalysis ? (
              <button
                onClick={() => setShowAnalysis(true)}
                className="w-full py-2 text-indigo-600 text-sm font-medium hover:text-indigo-700"
              >
                Xem phân tích chuyên sâu →
              </button>
            ) : (
              <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                <p className="text-sm font-semibold text-violet-700 mb-1">Phân tích</p>
                <p className="text-gray-700 text-sm leading-relaxed">{block.analysis}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
