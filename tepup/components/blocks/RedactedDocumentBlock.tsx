'use client';

import { useState } from 'react';
import type { RedactedDocumentBlock as RedactedDocumentBlockType } from '@/lib/types/content';
import { FileText, Lock, Unlock, Lightbulb } from 'lucide-react';

interface Props {
  block: RedactedDocumentBlockType;
  onComplete?: () => void;
}

export default function RedactedDocumentBlockComponent({ block, onComplete }: Props) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [activeRedaction, setActiveRedaction] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [wrongGuess, setWrongGuess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const allRevealed = revealedIds.size === block.redactions.length;

  const handleGuess = (redactionId: string) => {
    const redaction = block.redactions.find(r => r.id === redactionId);
    if (!redaction) return;

    const guess = inputValue.trim().toLowerCase();
    const correct = redaction.answer.toLowerCase() === guess ||
      redaction.alternatives?.some(a => a.toLowerCase() === guess);

    if (correct) {
      setRevealedIds(prev => {
        const next = new Set(prev);
        next.add(redactionId);
        return next;
      });
      setActiveRedaction(null);
      setInputValue('');
      setWrongGuess(false);
      setShowHint(false);

      // Check if all revealed
      if (revealedIds.size + 1 === block.redactions.length) {
        onComplete?.();
      }
    } else {
      setWrongGuess(true);
      setTimeout(() => setWrongGuess(false), 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && activeRedaction) {
      handleGuess(activeRedaction);
    }
    if (e.key === 'Escape') {
      setActiveRedaction(null);
      setInputValue('');
    }
  };

  // Render content with redacted parts
  const renderContent = () => {
    let text = block.content;
    const parts: (string | { id: string; revealed: boolean; answer: string })[] = [];

    // Find all [REDACTED:id] markers and split
    const regex = /\[REDACTED:(\w+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      const id = match[1];
      const redaction = block.redactions.find(r => r.id === id);
      parts.push({
        id,
        revealed: revealedIds.has(id),
        answer: redaction?.answer || '???',
      });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.map((part, i) => {
      if (typeof part === 'string') {
        return <span key={i} className="whitespace-pre-line">{part}</span>;
      }

      if (part.revealed) {
        return (
          <span
            key={i}
            className="inline-block px-2 py-0.5 bg-green-100 text-green-800 font-semibold rounded border border-green-300 mx-0.5 animate-fade-in"
          >
            {part.answer}
          </span>
        );
      }

      const isActive = activeRedaction === part.id;
      return (
        <button
          key={i}
          onClick={() => {
            setActiveRedaction(part.id);
            setInputValue('');
            setShowHint(false);
          }}
          className={`
            inline-block px-2 py-0.5 rounded mx-0.5 transition-all font-mono
            ${isActive
              ? 'bg-amber-200 border-2 border-amber-400 text-amber-900'
              : 'bg-gray-800 text-gray-800 hover:bg-gray-700 border-2 border-gray-700 cursor-pointer'
            }
          `}
        >
          {isActive ? '???' : '████'}
        </button>
      );
    });
  };

  const activeRedactionData = activeRedaction
    ? block.redactions.find(r => r.id === activeRedaction)
    : null;

  return (
    <div className="mb-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-amber-700" aria-hidden="true" />
          <h3 className="text-lg font-bold text-gray-900">{block.title || 'Tài liệu giải mật'}</h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Unlock className="w-4 h-4" aria-hidden="true" />
          <span>{revealedIds.size}/{block.redactions.length}</span>
        </div>
      </div>

      {block.instruction && (
        <p className="text-gray-600 text-sm mb-4 italic">{block.instruction}</p>
      )}

      {/* Document */}
      <div className="bg-white/80 rounded-xl p-5 mb-4 border border-amber-100">
        <h4 className="text-center font-bold text-gray-900 mb-1 text-lg">{block.documentTitle}</h4>
        <div className="border-b-2 border-gray-300 mb-4 pb-1 text-center text-xs text-gray-400 tracking-widest uppercase">
          {allRevealed ? 'ĐÃ GIẢI MẬT' : 'TỐI MẬT'}
        </div>
        <div className="text-gray-700 leading-relaxed text-[15px]">
          {renderContent()}
        </div>
      </div>

      {/* Active redaction input */}
      {activeRedaction && !allRevealed && (
        <div className="bg-white rounded-xl p-4 border-2 border-amber-300 mb-3">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập từ bị che..."
              aria-label="Nhập từ bị che để đoán"
              autoFocus
              className={`
                flex-1 p-2.5 border-2 rounded-lg focus:outline-none
                ${wrongGuess ? 'border-red-400 bg-red-50 animate-shake' : 'border-gray-200 focus:border-amber-400'}
              `}
            />
            <button
              onClick={() => handleGuess(activeRedaction)}
              disabled={!inputValue.trim()}
              className="px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Đoán
            </button>
          </div>

          {wrongGuess && (
            <p className="text-red-600 text-sm font-medium">Chưa đúng, thử lại!</p>
          )}

          {activeRedactionData?.hint && (
            <div className="mt-2">
              {showHint ? (
                <div className="flex items-start gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-yellow-800 text-sm">{activeRedactionData.hint}</p>
                </div>
              ) : (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-sm text-amber-600 hover:text-amber-800 font-medium flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
                  Xem gợi ý
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-amber-500 transition-all duration-500"
          style={{ width: `${(revealedIds.size / block.redactions.length) * 100}%` }}
        />
      </div>

      {/* Completion context */}
      {allRevealed && (
        <div className="mt-4 p-5 bg-green-50 border-2 border-green-200 rounded-2xl" aria-live="polite">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-green-600" aria-hidden="true" />
            <h4 className="font-bold text-green-800">Tài liệu đã được giải mật hoàn toàn!</h4>
          </div>
          <p className="text-green-700 leading-relaxed">{block.context}</p>
        </div>
      )}
    </div>
  );
}
