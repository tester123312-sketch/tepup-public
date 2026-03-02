'use client';

import { useState } from 'react';
import type { PropagandaDetectorBlock as PropagandaDetectorBlockType } from '@/lib/types/content';
import { AlertTriangle, Check, X, ChevronDown, Info } from 'lucide-react';

interface Props {
  block: PropagandaDetectorBlockType;
  onComplete?: () => void;
}

interface SegmentState {
  selectedTechnique: string | null;
  checked: boolean;
  correct: boolean;
}

export default function PropagandaDetectorBlockComponent({ block, onComplete }: Props) {
  const [segmentStates, setSegmentStates] = useState<Record<string, SegmentState>>({});
  const [allChecked, setAllChecked] = useState(false);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [showTechniqueInfo, setShowTechniqueInfo] = useState<string | null>(null);

  const handleSelectTechnique = (segmentId: string, techniqueId: string) => {
    setSegmentStates(prev => ({
      ...prev,
      [segmentId]: { selectedTechnique: techniqueId, checked: false, correct: false },
    }));
    setActiveSegment(null);
  };

  const handleCheckAll = () => {
    const newStates: Record<string, SegmentState> = {};
    block.segments.forEach(seg => {
      const state = segmentStates[seg.id];
      const correct = state?.selectedTechnique === seg.techniqueType;
      newStates[seg.id] = {
        selectedTechnique: state?.selectedTechnique || null,
        checked: true,
        correct,
      };
    });
    setSegmentStates(newStates);
    setAllChecked(true);
    onComplete?.();
  };

  const allSegmentsAnswered = block.segments.every(seg => segmentStates[seg.id]?.selectedTechnique);
  const correctCount = allChecked
    ? block.segments.filter(seg => segmentStates[seg.id]?.correct).length
    : 0;

  const renderArticle = () => {
    const text = block.article.text;
    const segments = [...block.segments].sort((a, b) => a.startIndex - b.startIndex);
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    segments.forEach((seg) => {
      if (seg.startIndex > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, seg.startIndex)}</span>);
      }

      const state = segmentStates[seg.id];
      const isActive = activeSegment === seg.id;
      const hasAnswer = state?.selectedTechnique;
      const isChecked = state?.checked;
      const isCorrect = state?.correct;

      const techniqueLabel = hasAnswer
        ? block.techniqueOptions.find(o => o.id === state.selectedTechnique)?.label
        : null;

      parts.push(
        <span key={`seg-${seg.id}`} className="relative inline">
          <button
            onClick={() => !allChecked && setActiveSegment(isActive ? null : seg.id)}
            disabled={allChecked}
            className={`
              inline px-1 py-0.5 rounded transition-all underline decoration-2 decoration-wavy
              ${isChecked
                ? isCorrect
                  ? 'bg-green-100 decoration-green-500 text-green-800'
                  : 'bg-red-100 decoration-red-400 text-red-800'
                : hasAnswer
                ? 'bg-orange-100 decoration-orange-400 text-orange-800 cursor-pointer'
                : isActive
                ? 'bg-red-200 decoration-red-500 text-red-900'
                : 'bg-red-50 decoration-red-300 text-red-900 hover:bg-red-100 cursor-pointer'
              }
            `}
          >
            {seg.text}
          </button>
          {hasAnswer && (
            <span className={`
              inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
              ${isChecked
                ? isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                : 'bg-orange-200 text-orange-800'
              }
            `}>
              {isChecked && (isCorrect ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />)}
              {techniqueLabel}
            </span>
          )}
          {isActive && !allChecked && (
            <div className="absolute left-0 top-full mt-1 z-10 bg-white border-2 border-red-300 rounded-xl shadow-lg p-2 min-w-[240px] max-h-[300px] overflow-y-auto">
              <p className="text-xs text-gray-500 px-2 mb-1 font-medium">Chọn kỹ thuật tuyên truyền:</p>
              {block.techniqueOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleSelectTechnique(seg.id, option.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                    ${state?.selectedTechnique === option.id
                      ? 'bg-red-100 text-red-800 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                    }
                  `}
                >
                  <span className="font-medium">{option.label}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                </button>
              ))}
            </div>
          )}
        </span>
      );

      lastIndex = seg.startIndex + seg.text.length;
    });

    if (lastIndex < text.length) {
      parts.push(<span key={`text-end`}>{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div className="mb-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-bold text-gray-900">{block.title || 'Phát hiện Tuyên truyền'}</h3>
      </div>

      <p className="text-gray-600 text-sm mb-4">{block.instruction}</p>

      {/* Technique reference */}
      <div className="mb-4">
        <button
          onClick={() => setShowTechniqueInfo(showTechniqueInfo ? null : 'all')}
          className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
        >
          <Info className="w-3.5 h-3.5" />
          {showTechniqueInfo ? 'Ẩn danh sách kỹ thuật' : 'Xem danh sách kỹ thuật tuyên truyền'}
        </button>
        {showTechniqueInfo && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {block.techniqueOptions.map(opt => (
              <div key={opt.id} className="p-2 bg-white/80 rounded-lg border border-red-100">
                <p className="text-xs font-semibold text-red-700">{opt.label}</p>
                <p className="text-[11px] text-gray-500">{opt.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article */}
      <div className="bg-white/80 rounded-xl p-5 mb-4 border border-red-100">
        {block.article.context && (
          <p className="text-xs text-gray-400 mb-2 italic">{block.article.context}</p>
        )}
        <div className="text-gray-800 leading-relaxed text-[15px]">
          {renderArticle()}
        </div>
        {block.article.source && (
          <p className="mt-3 text-xs text-gray-400 italic">— {block.article.source}</p>
        )}
      </div>

      {!allChecked && (
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-red-50 border border-red-300 rounded" />
            Click vào đoạn highlight
          </span>
          <span className="flex items-center gap-1">
            <ChevronDown className="w-3 h-3" />
            Chọn kỹ thuật
          </span>
        </div>
      )}

      {!allChecked && allSegmentsAnswered && (
        <button
          onClick={handleCheckAll}
          className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
        >
          Kiểm tra ({block.segments.length} đoạn)
        </button>
      )}

      {!allChecked && !allSegmentsAnswered && (
        <p className="text-sm text-gray-400 text-center">
          Đã phân loại {Object.keys(segmentStates).filter(k => segmentStates[k].selectedTechnique).length}/{block.segments.length} đoạn
        </p>
      )}

      {allChecked && (
        <div className="space-y-3">
          <div className={`p-4 rounded-xl ${correctCount === block.segments.length ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
            <p className={`font-semibold ${correctCount === block.segments.length ? 'text-green-700' : 'text-blue-700'}`}>
              Kết quả: {correctCount}/{block.segments.length} đúng
            </p>
          </div>

          {block.segments.map(seg => {
            const state = segmentStates[seg.id];
            const isCorrect = state?.correct;
            const correctTechnique = block.techniqueOptions.find(o => o.id === seg.techniqueType);
            return (
              <div key={seg.id} className={`p-3 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="text-sm">
                  <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>"{seg.text}"</span>
                  <span className="text-gray-600"> — </span>
                  <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{correctTechnique?.label}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">{seg.explanation}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
