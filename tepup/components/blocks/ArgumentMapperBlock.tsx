'use client';

import { useState } from 'react';
import type { ArgumentMapperBlock as ArgumentMapperBlockType } from '@/lib/types/content';
import { Check, X, ChevronDown } from 'lucide-react';

interface Props {
  block: ArgumentMapperBlockType;
  onComplete?: () => void;
}

interface ElementState {
  selectedType: string | null;
  checked: boolean;
  correct: boolean;
}

export default function ArgumentMapperBlockComponent({ block, onComplete }: Props) {
  const [elementStates, setElementStates] = useState<Record<string, ElementState>>({});
  const [allChecked, setAllChecked] = useState(false);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const handleSelectType = (elementId: string, typeId: string) => {
    setElementStates(prev => ({
      ...prev,
      [elementId]: { selectedType: typeId, checked: false, correct: false },
    }));
    setActiveElement(null);
  };

  const handleCheckAll = () => {
    const newStates: Record<string, ElementState> = {};
    block.elements.forEach(el => {
      const state = elementStates[el.id];
      const correct = state?.selectedType === el.correctType;
      newStates[el.id] = {
        selectedType: state?.selectedType || null,
        checked: true,
        correct,
      };
    });
    setElementStates(newStates);
    setAllChecked(true);
    onComplete?.();
  };

  const allAnswered = block.elements.every(el => elementStates[el.id]?.selectedType);
  const correctCount = allChecked
    ? block.elements.filter(el => elementStates[el.id]?.correct).length
    : 0;

  const renderPassage = () => {
    const text = block.passage;
    const elements = [...block.elements].sort((a, b) => a.startIndex - b.startIndex);
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    elements.forEach((el) => {
      if (el.startIndex > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, el.startIndex)}</span>);
      }

      const state = elementStates[el.id];
      const isActive = activeElement === el.id;
      const hasAnswer = state?.selectedType;
      const isChecked = state?.checked;
      const isCorrect = state?.correct;

      const typeConfig = block.elementTypes.find(t => t.id === (hasAnswer ? state.selectedType : el.correctType));

      parts.push(
        <span key={`el-${el.id}`} className="relative inline">
          <button
            onClick={() => !allChecked && setActiveElement(isActive ? null : el.id)}
            disabled={allChecked}
            className={`
              inline px-1 py-0.5 rounded transition-all border-b-2
              ${isChecked
                ? isCorrect
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : 'bg-red-100 border-red-400 text-red-800'
                : hasAnswer
                ? `bg-opacity-30 border-current cursor-pointer`
                : isActive
                ? 'bg-blue-200 border-blue-500 text-blue-900'
                : 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100 cursor-pointer'
              }
            `}
            style={hasAnswer && !isChecked ? { color: typeConfig?.color, backgroundColor: `${typeConfig?.color}20` } : undefined}
          >
            {el.text}
          </button>
          {hasAnswer && (
            <span
              className="inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: isChecked ? (isCorrect ? '#16a34a' : '#dc2626') : typeConfig?.color }}
            >
              {isChecked && (isCorrect ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />)}
              {block.elementTypes.find(t => t.id === state.selectedType)?.label}
            </span>
          )}
          {isActive && !allChecked && (
            <div className="absolute left-0 top-full mt-1 z-10 bg-white border-2 border-blue-300 rounded-xl shadow-lg p-2 min-w-[200px]">
              <p className="text-xs text-gray-500 px-2 mb-1 font-medium">Phân loại thành phần:</p>
              {block.elementTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => handleSelectType(el.id, type.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2
                    ${state?.selectedType === type.id
                      ? 'bg-blue-50 font-medium'
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                  <span className="text-gray-700">{type.label}</span>
                </button>
              ))}
            </div>
          )}
        </span>
      );

      lastIndex = el.endIndex;
    });

    if (lastIndex < text.length) {
      parts.push(<span key={`text-end`}>{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-lg font-bold text-gray-900">{block.title || 'Phân tích Lập luận'}</h3>
      </div>

      <p className="text-gray-600 text-sm mb-3">{block.instruction}</p>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {block.elementTypes.map(type => (
          <div key={type.id} className="flex items-center gap-1.5 px-2 py-1 bg-white/80 rounded-full border border-gray-200">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: type.color }} />
            <span className="text-xs font-medium text-gray-600">{type.label}</span>
          </div>
        ))}
      </div>

      {/* Passage */}
      <div className="bg-white/80 rounded-xl p-5 mb-4 border border-blue-100">
        <div className="text-gray-800 leading-relaxed text-[15px]">
          {renderPassage()}
        </div>
      </div>

      {!allChecked && (
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 bg-blue-50 border border-blue-300 rounded" />
            Click vào phần highlight
          </span>
          <span className="flex items-center gap-1">
            <ChevronDown className="w-3 h-3" />
            Phân loại
          </span>
        </div>
      )}

      {!allChecked && allAnswered && (
        <button
          onClick={handleCheckAll}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
        >
          Kiểm tra ({block.elements.length} thành phần)
        </button>
      )}

      {!allChecked && !allAnswered && (
        <p className="text-sm text-gray-400 text-center">
          Đã phân loại {Object.keys(elementStates).filter(k => elementStates[k].selectedType).length}/{block.elements.length} thành phần
        </p>
      )}

      {allChecked && (
        <div className="space-y-3">
          <div className={`p-4 rounded-xl ${correctCount === block.elements.length ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
            <p className={`font-semibold ${correctCount === block.elements.length ? 'text-green-700' : 'text-blue-700'}`}>
              Kết quả: {correctCount}/{block.elements.length} đúng
            </p>
            {block.fallacyName && (
              <p className="text-sm text-gray-600 mt-1">Ngụy biện trong đoạn văn: <span className="font-semibold">{block.fallacyName}</span></p>
            )}
          </div>

          {block.elements.map(el => {
            const state = elementStates[el.id];
            const isCorrect = state?.correct;
            const correctType = block.elementTypes.find(t => t.id === el.correctType);
            return (
              <div key={el.id} className={`p-3 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="text-sm">
                  <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>"{el.text}"</span>
                  <span className="text-gray-600"> → </span>
                  <span className="font-semibold" style={{ color: correctType?.color }}>{correctType?.label}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">{el.explanation}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
