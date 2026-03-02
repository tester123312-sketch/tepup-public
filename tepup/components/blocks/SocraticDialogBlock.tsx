'use client';

import { useState } from 'react';
import type { SocraticDialogBlock as SocraticDialogBlockType } from '@/lib/types/content';

interface Props {
  block: SocraticDialogBlockType;
  onComplete?: () => void;
}

interface Message {
  type: 'ai' | 'user';
  text: string;
  isDeepening?: boolean;
}

export default function SocraticDialogBlockComponent({ block, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', text: block.introduction },
  ]);
  const [isFinished, setIsFinished] = useState(false);
  const [showRevelation, setShowRevelation] = useState(false);

  const currentQuestion = block.steps[currentStep];
  const isLastStep = currentStep >= block.steps.length - 1;

  const handleSelect = (optionId: string) => {
    const option = currentQuestion.options.find(o => o.id === optionId);
    if (!option) return;

    const newMessages: Message[] = [
      ...messages,
      { type: 'ai', text: currentQuestion.question },
      { type: 'user', text: option.text },
      { type: 'ai', text: option.followUp, isDeepening: option.isDeepening },
    ];

    setMessages(newMessages);

    if (isLastStep) {
      setIsFinished(true);
      onComplete?.();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🏛️</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{block.title || 'Đối thoại Socratic'}</h3>
            <p className="text-white/70 text-xs">{block.concept}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Chat messages */}
        <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.type === 'user'
                  ? 'bg-emerald-500 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}>
                {msg.type === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs">🏛️</span>
                    <span className="text-xs font-semibold text-gray-500">Socrates</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.isDeepening && (
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Đi sâu hơn</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Current question options or finished state */}
        {!isFinished && currentQuestion && (
          <div>
            <div className="bg-emerald-50 rounded-xl p-3 mb-3 border border-emerald-100">
              <p className="text-sm font-medium text-emerald-800">{currentQuestion.question}</p>
            </div>
            <div className="space-y-2">
              {currentQuestion.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all text-left text-sm text-gray-700"
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-center">
              <span className="text-xs text-gray-400">Bước {currentStep + 1}/{block.steps.length}</span>
            </div>
          </div>
        )}

        {isFinished && (
          <div>
            {!showRevelation ? (
              <button
                onClick={() => setShowRevelation(true)}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Xem kết luận
              </button>
            ) : (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💡</span>
                  <span className="font-semibold text-emerald-800">Insight</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{block.revelation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
