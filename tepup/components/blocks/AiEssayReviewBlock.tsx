'use client';

import { useState, useMemo } from 'react';
import type { AiEssayReviewBlock as AiEssayReviewBlockType } from '@/lib/types/content';

interface Props {
  block: AiEssayReviewBlockType;
  onComplete?: () => void;
}

export default function AiEssayReviewBlockComponent({ block, onComplete }: Props) {
  const [essay, setEssay] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showSample, setShowSample] = useState(false);

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const minWords = block.minWords || 50;
  const maxWords = block.maxWords || 300;
  const canSubmit = wordCount >= minWords && wordCount <= maxWords;

  const scores = useMemo(() => {
    if (!hasSubmitted) return [];
    const lowerEssay = essay.toLowerCase();
    return block.rubric.map(criterion => {
      const matchedKeywords = criterion.keywords.filter(kw =>
        lowerEssay.includes(kw.toLowerCase())
      );
      const ratio = matchedKeywords.length / Math.max(criterion.keywords.length, 1);
      // Score based on keyword coverage + length bonus
      let score = Math.round(ratio * criterion.maxScore * 0.7);
      // Bonus for essay length
      if (wordCount >= minWords * 1.5) score = Math.min(score + 1, criterion.maxScore);
      return {
        ...criterion,
        score: Math.min(score, criterion.maxScore),
        matchedKeywords,
      };
    });
  }, [hasSubmitted, essay, block.rubric, wordCount, minWords]);

  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const maxTotalScore = block.rubric.reduce((sum, r) => sum + r.maxScore, 0);

  const handleSubmit = () => {
    setHasSubmitted(true);
    onComplete?.();
  };

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4">
        <h3 className="text-white font-bold text-lg">{block.title || 'Bài viết Phân tích'}</h3>
      </div>

      <div className="p-5">
        {/* Prompt */}
        <div className="bg-emerald-50 rounded-xl p-4 mb-4 border border-emerald-100">
          <p className="text-sm font-semibold text-emerald-700 mb-1">Đề bài</p>
          <p className="text-gray-800 text-sm leading-relaxed">{block.prompt}</p>
        </div>

        {/* Rubric preview */}
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">Tiêu chí đánh giá:</p>
          <div className="flex flex-wrap gap-1.5">
            {block.rubric.map(criterion => (
              <span key={criterion.id} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {criterion.label} ({criterion.maxScore}đ)
              </span>
            ))}
          </div>
        </div>

        {/* Essay input */}
        {!hasSubmitted ? (
          <>
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Viết bài phân tích của bạn ở đây..."
              aria-label="Viết bài phân tích của bạn"
              className="w-full h-48 p-4 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-0 outline-none resize-none text-sm text-gray-800 leading-relaxed"
            />
            <div className="flex items-center justify-between mt-2 mb-4">
              <span className={`text-xs ${
                wordCount < minWords ? 'text-red-500' :
                wordCount > maxWords ? 'text-red-500' :
                'text-green-600'
              }`}>
                {wordCount} từ (yêu cầu: {minWords}-{maxWords})
              </span>
              <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    wordCount < minWords ? 'bg-red-400' :
                    wordCount > maxWords ? 'bg-red-400' :
                    'bg-green-400'
                  }`}
                  style={{ width: `${Math.min((wordCount / maxWords) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Tips */}
            {block.tips.length > 0 && (
              <div className="bg-yellow-50 rounded-xl p-3 mb-4 border border-yellow-100">
                <p className="text-xs font-semibold text-yellow-700 mb-1">Gợi ý viết bài:</p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                  {block.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                canSubmit
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Nộp bài
            </button>
          </>
        ) : (
          <div aria-live="polite">
            {/* Submitted essay */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
              <p className="text-xs text-gray-400 mb-1">Bài viết của bạn ({wordCount} từ)</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{essay}</p>
            </div>

            {/* Scores */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">Đánh giá</p>
                <span className={`text-lg font-bold ${
                  totalScore >= maxTotalScore * 0.7 ? 'text-green-600' :
                  totalScore >= maxTotalScore * 0.4 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {totalScore}/{maxTotalScore}
                </span>
              </div>

              <div className="space-y-3">
                {scores.map(criterion => (
                  <div key={criterion.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{criterion.label}</span>
                      <span className={`text-sm font-bold ${
                        criterion.score >= criterion.maxScore * 0.7 ? 'text-green-600' : 'text-orange-500'
                      }`}>
                        {criterion.score}/{criterion.maxScore}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1">
                      <div
                        className={`h-full rounded-full transition-all ${
                          criterion.score >= criterion.maxScore * 0.7 ? 'bg-green-400' : 'bg-orange-400'
                        }`}
                        style={{ width: `${(criterion.score / criterion.maxScore) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">{criterion.description}</p>
                    {criterion.matchedKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {criterion.matchedKeywords.map((kw, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-600 rounded-full">
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sample response */}
            {block.sampleResponse && (
              <>
                {!showSample ? (
                  <button
                    onClick={() => setShowSample(true)}
                    className="w-full py-2 text-emerald-600 text-sm font-medium hover:text-emerald-700"
                  >
                    Xem bài mẫu →
                  </button>
                ) : (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <p className="text-sm font-semibold text-emerald-700 mb-2">Bài mẫu tham khảo</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{block.sampleResponse}</p>
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
