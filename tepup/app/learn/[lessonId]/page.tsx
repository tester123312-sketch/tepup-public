'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { X, Zap, Check, XCircle, Lightbulb, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import type {
  ContentBlock,
  LessonContentDisplay,
  LessonWithContext,
  ChapterWithContext,
  ChapterContentDisplay,
} from '@/lib/types/content';
import { useProgress } from '@/lib/contexts/ProgressContext';

// Content Block Components
function TextBlockComponent({ block }: { block: { type: 'text'; title?: string; paragraphs: string[] } }) {
  return (
    <div className="mb-6">
      {block.title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{block.title}</h2>
      )}
      <div className="space-y-4">
        {block.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

function CalloutBlockComponent({ block }: { block: { type: 'callout'; icon?: string; title?: string; text: string; variant?: 'info' | 'warning' | 'success' } }) {
  const variants = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      text: 'text-blue-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-500',
      title: 'text-yellow-800',
      text: 'text-yellow-700',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-500',
      title: 'text-green-800',
      text: 'text-green-700',
    },
  };

  const variant = variants[block.variant || 'info'];
  
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    lightbulb: Lightbulb,
    message: MessageCircle,
    warning: AlertCircle,
    check: CheckCircle,
  };
  
  const IconComponent = iconMap[block.icon || 'lightbulb'] || Lightbulb;

  return (
    <div className={`${variant.bg} ${variant.border} border-2 rounded-2xl p-5 mb-6`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 mt-0.5`}>
          <IconComponent className={`w-6 h-6 ${variant.icon}`} />
        </div>
        <div>
          {block.title && (
            <h3 className={`font-semibold ${variant.title} mb-1`}>{block.title}</h3>
          )}
          <p className={`${variant.text} leading-relaxed`}>{block.text}</p>
        </div>
      </div>
    </div>
  );
}

function QuestionBlockComponent({
  block,
  onSelect,
  isChecked,
  selectedAnswer,
  isCorrect,
  explanationRef,
}: {
  block: { type: 'question'; question: string; options: { id: string; text: string; isCorrect: boolean }[]; explanation?: string };
  onSelect: (optionId: string) => void;
  isChecked: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  explanationRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="mb-6">
      <p className="text-lg text-gray-900 mb-4 font-medium">{block.question}</p>

      <div className="space-y-3">
        {block.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const showCorrect = isChecked && option.isCorrect;
          const showWrong = isChecked && isSelected && !option.isCorrect;

          return (
            <button
              key={option.id}
              onClick={() => !isChecked && onSelect(option.id)}
              disabled={isChecked}
              className={`
                w-full p-4 text-left rounded-xl border-2 transition-all
                ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showWrong
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
                ${isChecked ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${
                      showCorrect
                        ? 'border-green-500 bg-green-500'
                        : showWrong
                        ? 'border-red-500 bg-red-500'
                        : isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }
                  `}
                >
                  {showCorrect && <Check className="w-4 h-4 text-white" />}
                  {showWrong && <X className="w-4 h-4 text-white" />}
                  {isSelected && !isChecked && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`${showCorrect ? 'text-green-700 font-medium' : showWrong ? 'text-red-700' : isSelected ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation after checking */}
      {isChecked && block.explanation && (
        <div
          ref={explanationRef}
          className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}
        >
          <p className={`${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
            <span className="font-semibold">{isCorrect ? 'Chính xác! ' : 'Giải thích: '}</span>
            {block.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

interface LessonApiResponse {
  lesson: LessonWithContext['lesson'];
  course: LessonWithContext['course'];
  level: LessonWithContext['level'];
  content: LessonContentDisplay | null;
}

interface ChapterApiResponse {
  chapter: ChapterWithContext['chapter'];
  story: ChapterWithContext['story'];
  part: ChapterWithContext['part'];
  content: ChapterContentDisplay | null;
}

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  const contentEndRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const { markCompleted } = useProgress();

  // State
  const [visibleBlocks, setVisibleBlocks] = useState(1);
  const [points, setPoints] = useState(0);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonData, setLessonData] = useState<LessonApiResponse | null>(null);
  const [chapterData, setChapterData] = useState<ChapterApiResponse | null>(null);
  // Track both selection and checked state separately
  const [questionStates, setQuestionStates] = useState<Record<number, {
    selected: string | null;
    checked: boolean;
    correct: boolean | null
  }>>({});

  // Fetch lesson or chapter data from API
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Try fetching as lesson first
        const lessonRes = await fetch(`/api/content/lessons/${lessonId}`);
        if (lessonRes.ok) {
          const data = await lessonRes.json();
          setLessonData(data);
          setChapterData(null);
        } else {
          // Try fetching as chapter
          const chapterRes = await fetch(`/api/content/chapters/${lessonId}`);
          if (chapterRes.ok) {
            const data = await chapterRes.json();
            setChapterData(data);
            setLessonData(null);
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [lessonId]);

  // Get content from loaded data
  const lessonContent = lessonData?.content || chapterData?.content;

  // Get title
  const contentTitle = lessonContent?.title || lessonData?.lesson?.name || chapterData?.chapter?.title || 'Bài học';

  // Generate default content if none exists
  const defaultContent: LessonContentDisplay = {
    lessonId: lessonId,
    title: contentTitle,
    blocks: [
      {
        type: 'text',
        title: contentTitle,
        paragraphs: [
          'Đây là nội dung mẫu cho bài học này.',
          'Trong tương lai, nội dung sẽ được cập nhật với bài giảng chi tiết.',
        ],
      },
      {
        type: 'callout',
        icon: 'lightbulb',
        title: 'Gợi ý',
        text: 'Hãy đọc kỹ nội dung trước khi trả lời câu hỏi.',
        variant: 'info',
      },
      {
        type: 'question',
        question: 'Đây là câu hỏi mẫu. Chọn đáp án đúng:',
        options: [
          { id: 'a', text: 'Đáp án A - Đây là đáp án đúng', isCorrect: true },
          { id: 'b', text: 'Đáp án B', isCorrect: false },
          { id: 'c', text: 'Đáp án C', isCorrect: false },
          { id: 'd', text: 'Đáp án D', isCorrect: false },
        ],
        explanation: 'Đây là giải thích cho đáp án đúng.',
      },
    ],
  };

  const content = lessonContent || defaultContent;
  const totalBlocks = content.blocks.length;
  const isComplete = visibleBlocks > totalBlocks;

  // Scroll to new content when revealed
  useEffect(() => {
    if (visibleBlocks > 1) {
      setTimeout(() => {
        contentEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [visibleBlocks]);

  const handleClose = () => {
    if (lessonData?.course) {
      router.push(`/courses/${lessonData.course.slug}`);
    } else if (chapterData?.story) {
      router.push(`/story/${chapterData.story.characterId}/${chapterData.story.slug}`);
    } else {
      router.back();
    }
  };

  // Handle selecting an answer (not checking yet)
  const handleSelect = (blockIndex: number, optionId: string) => {
    setQuestionStates(prev => ({
      ...prev,
      [blockIndex]: { 
        ...prev[blockIndex],
        selected: optionId, 
        checked: false, 
        correct: null 
      },
    }));
  };

  // Handle checking the answer
  const handleCheck = (blockIndex: number) => {
    const block = content.blocks[blockIndex] as { type: 'question'; options: { id: string; isCorrect: boolean }[]; explanation?: string };
    const selectedId = questionStates[blockIndex]?.selected;
    const isCorrect = block.options.find(o => o.id === selectedId)?.isCorrect || false;

    setQuestionStates(prev => ({
      ...prev,
      [blockIndex]: {
        ...prev[blockIndex],
        checked: true,
        correct: isCorrect
      },
    }));

    if (isCorrect) {
      setPoints(prev => prev + 10);
    }

    // Scroll to explanation after a short delay to allow it to render
    if (block.explanation) {
      setTimeout(() => {
        explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleContinue = () => {
    if (isComplete) {
      // Mark as complete before closing
      if (!isMarkingComplete) {
        setIsMarkingComplete(true);
        // Determine content type based on whether it's a lesson or chapter
        const contentType = chapterData ? 'chapter' : 'lesson';
        markCompleted(contentType, lessonId, points);
      }
      handleClose();
    } else {
      setVisibleBlocks(prev => prev + 1);
    }
  };

  // Determine current state for button
  const currentBlockIndex = visibleBlocks - 1;
  const currentBlock = content.blocks[currentBlockIndex];
  const isCurrentBlockQuestion = currentBlock?.type === 'question';
  const currentQuestionState = questionStates[currentBlockIndex];
  
  // Button state logic
  const hasSelected = currentQuestionState?.selected !== null && currentQuestionState?.selected !== undefined;
  const hasChecked = currentQuestionState?.checked || false;
  
  // Determine what the button should do and display
  let buttonText = 'Tiếp tục';
  let buttonAction: () => void | Promise<void> = handleContinue;
  let buttonDisabled = false;
  let buttonStyle = 'bg-gray-900 text-white hover:bg-gray-800';

  if (isComplete) {
    buttonText = 'Hoàn thành';
    buttonStyle = 'bg-green-500 text-white hover:bg-green-600';
  } else if (isCurrentBlockQuestion) {
    if (!hasSelected) {
      // No answer selected yet
      buttonText = 'Chọn đáp án';
      buttonDisabled = true;
      buttonStyle = 'bg-gray-200 text-gray-400 cursor-not-allowed';
    } else if (!hasChecked) {
      // Answer selected, not checked yet
      buttonText = 'Kiểm tra';
      buttonAction = () => handleCheck(currentBlockIndex);
      buttonStyle = 'bg-blue-500 text-white hover:bg-blue-600';
    } else {
      // Already checked, can continue
      buttonText = 'Tiếp tục';
      buttonAction = handleContinue;
    }
  }

  // Calculate progress
  const progress = Math.min((visibleBlocks / totalBlocks) * 100, 100);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Đang tải bài học...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 mx-8">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Progress Dots */}
              <div className="flex gap-1">
                {content.blocks.slice(0, Math.min(5, totalBlocks)).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index < visibleBlocks ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
                {totalBlocks > 5 && <span className="text-xs text-gray-400">+{totalBlocks - 5}</span>}
              </div>
            </div>
          </div>

          {/* Points */}
          <div className="flex items-center gap-1 text-gray-600">
            <span className="font-semibold">{points}</span>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Render visible blocks */}
          {content.blocks.slice(0, visibleBlocks).map((block, index) => (
            <div key={index} className="animate-fade-in">
              {block.type === 'text' && <TextBlockComponent block={block} />}
              {block.type === 'callout' && <CalloutBlockComponent block={block} />}
              {block.type === 'question' && (
                <QuestionBlockComponent
                  block={block}
                  onSelect={(optionId) => handleSelect(index, optionId)}
                  isChecked={questionStates[index]?.checked || false}
                  selectedAnswer={questionStates[index]?.selected || null}
                  isCorrect={questionStates[index]?.correct || null}
                  explanationRef={index === currentBlockIndex ? explanationRef : undefined}
                />
              )}
            </div>
          ))}
          
          {/* Scroll target */}
          <div ref={contentEndRef} />
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={buttonAction}
            disabled={buttonDisabled}
            className={`
              w-full py-4 rounded-xl font-semibold text-lg transition-all
              ${buttonStyle}
            `}
          >
            {buttonText}
          </button>
        </div>
      </footer>
    </div>
  );
}
