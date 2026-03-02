'use client';

import { useState } from 'react';
import type { DecisionTreeBlock as DecisionTreeBlockType } from '@/lib/types/content';

interface Props {
  block: DecisionTreeBlockType;
  onComplete?: () => void;
}

interface HistoryEntry {
  nodeId: string;
  choiceId: string;
  choiceText: string;
  consequence?: string;
}

export default function DecisionTreeBlockComponent({ block, onComplete }: Props) {
  const [currentNodeId, setCurrentNodeId] = useState(block.startNodeId);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showConsequence, setShowConsequence] = useState(false);
  const [pendingChoice, setPendingChoice] = useState<{ nodeId: string; choice: DecisionTreeBlockType['nodes'][0]['choices'][0] } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentNode = block.nodes.find(n => n.id === currentNodeId);
  const endingNode = isFinished ? currentNode : null;

  const handleChoice = (choice: DecisionTreeBlockType['nodes'][0]['choices'][0]) => {
    setPendingChoice({ nodeId: currentNodeId, choice });
    if (choice.consequence) {
      setShowConsequence(true);
    } else {
      applyChoice(currentNodeId, choice);
    }
  };

  const applyChoice = (nodeId: string, choice: DecisionTreeBlockType['nodes'][0]['choices'][0]) => {
    setHistory(prev => [...prev, {
      nodeId,
      choiceId: choice.id,
      choiceText: choice.text,
      consequence: choice.consequence,
    }]);

    if (!choice.nextNodeId) {
      // Find current node and check if it's ending
      const nextNode = block.nodes.find(n => n.id === nodeId);
      if (nextNode?.isEnding) {
        setIsFinished(true);
        onComplete?.();
      }
      return;
    }

    const nextNode = block.nodes.find(n => n.id === choice.nextNodeId);
    if (nextNode?.isEnding) {
      setCurrentNodeId(choice.nextNodeId);
      setIsFinished(true);
      onComplete?.();
    } else {
      setCurrentNodeId(choice.nextNodeId!);
    }

    setShowConsequence(false);
    setPendingChoice(null);
  };

  const handleContinueAfterConsequence = () => {
    if (pendingChoice) {
      applyChoice(pendingChoice.nodeId, pendingChoice.choice);
    }
  };

  const endingColorMap = {
    good: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: '🎉' },
    neutral: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: '🤔' },
    bad: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: '😔' },
  };

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-4">
        <h3 className="text-white font-bold text-lg">{block.title || 'Kịch bản Phân nhánh'}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{block.role}</span>
          <span className="text-white/50 text-xs">Bước {history.length + 1}</span>
        </div>
      </div>

      <div className="p-5">
        {/* History trail */}
        {history.length > 0 && !isFinished && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              {history.map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-600 max-w-[120px] truncate">
                    {entry.choiceText}
                  </span>
                  {i < history.length - 1 && <span className="text-gray-300 text-xs">→</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Consequence overlay */}
        {showConsequence && pendingChoice && (
          <div className="mb-4">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 mb-1">Hệ quả</p>
              <p className="text-sm text-gray-700">{pendingChoice.choice.consequence}</p>
            </div>
            <button
              onClick={handleContinueAfterConsequence}
              className="w-full py-3 mt-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Tiếp tục →
            </button>
          </div>
        )}

        {/* Current situation */}
        {!showConsequence && !isFinished && currentNode && (
          <>
            {/* Scenario (first node only) */}
            {history.length === 0 && (
              <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                <p className="text-sm text-gray-700 leading-relaxed">{block.scenario}</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
              <p className="text-gray-800 text-sm leading-relaxed">{currentNode.text}</p>
            </div>

            <p className="text-sm font-medium text-gray-600 mb-2">Bạn sẽ làm gì?</p>
            <div className="space-y-2">
              {currentNode.choices.map(choice => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 hover:border-slate-400 hover:bg-slate-50 transition-all text-left text-sm text-gray-700"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Ending */}
        {isFinished && endingNode && (
          <div>
            {/* Full journey */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Hành trình của bạn:</p>
              <div className="space-y-1.5">
                {history.map((entry, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{entry.choiceText}</p>
                      {entry.consequence && (
                        <p className="text-xs text-gray-400 mt-0.5">→ {entry.consequence}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ending card */}
            {endingNode.endingType && (
              <div className={`p-5 rounded-xl border ${endingColorMap[endingNode.endingType].bg} ${endingColorMap[endingNode.endingType].border}`}>
                <div className="text-center mb-3">
                  <span className="text-4xl">{endingColorMap[endingNode.endingType].icon}</span>
                </div>
                <p className={`text-center font-bold text-lg ${endingColorMap[endingNode.endingType].text}`}>
                  {endingNode.endingType === 'good' ? 'Kết quả tốt!' :
                   endingNode.endingType === 'neutral' ? 'Kết quả trung tính' : 'Kết quả không tốt'}
                </p>
                {endingNode.endingSummary && (
                  <p className="text-sm text-gray-700 text-center mt-2 leading-relaxed">{endingNode.endingSummary}</p>
                )}
                {endingNode.text && (
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{endingNode.text}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
