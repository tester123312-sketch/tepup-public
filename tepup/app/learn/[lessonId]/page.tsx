'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { X, Check, Lightbulb, MessageCircle, AlertCircle, CheckCircle, BookOpen, ChevronRight, Clock } from 'lucide-react';
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
          <p key={index} className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
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
          <p className={`${variant.text} leading-relaxed whitespace-pre-line`}>{block.text}</p>
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
      <p className="text-lg text-gray-900 mb-4 font-medium whitespace-pre-line">{block.question}</p>

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
          <p className={`${isCorrect ? 'text-green-700' : 'text-blue-700'} whitespace-pre-line`}>
            <span className="font-semibold">{isCorrect ? 'Chính xác! ' : 'Giải thích: '}</span>
            {block.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

function LibraryDocumentBlockComponent({
  block,
}: {
  block: {
    type: 'library-document';
    mode?: 'reference' | 'inline';
    documentId?: string;
    title?: string;
    description?: string;
    category?: string;
    estimatedReadTime?: string;
    documentContent?: {
      sections: {
        heading?: string;
        paragraphs: string[];
      }[];
      relatedConcepts?: string[];
      furtherReading?: string[];
    };
  };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [libraryDocument, setLibraryDocument] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Determine mode (backward compatible: no mode = inline)
  const mode = block.mode || 'inline';

  // Fetch document if reference mode
  useEffect(() => {
    if (mode === 'reference' && block.documentId) {
      fetchDocument();
    }
  }, [mode, block.documentId]);

  async function fetchDocument() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/library/${block.documentId}`);
      const data = await res.json();
      if (!res.ok) {
        setError('Không thể tải tài liệu');
        return;
      }
      setLibraryDocument(data.data);
    } catch (err) {
      console.error('Error fetching document:', err);
      setError('Đã xảy ra lỗi khi tải tài liệu');
    } finally {
      setLoading(false);
    }
  }

  // Get display data based on mode
  const displayData = mode === 'reference' && libraryDocument
    ? {
        title: libraryDocument.title,
        description: libraryDocument.description,
        category: libraryDocument.category,
        estimatedReadTime: null, // Can calculate from content
        documentContent: libraryDocument.content,
      }
    : {
        title: block.title || '',
        description: block.description || '',
        category: block.category,
        estimatedReadTime: block.estimatedReadTime,
        documentContent: block.documentContent || { sections: [] },
      };

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.document.addEventListener('keydown', handleEscape);
    return () => window.document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Show error state
  if (mode === 'reference' && error) {
    return (
      <div className="mb-6 p-5 bg-red-50 border-2 border-red-200 rounded-2xl">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  // Show loading state for reference mode
  if (mode === 'reference' && loading) {
    return (
      <div className="mb-6 p-5 bg-purple-50 border-2 border-purple-200 rounded-2xl flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-purple-700">Đang tải tài liệu...</span>
      </div>
    );
  }

  // Don't render if reference mode and no document loaded yet
  if (mode === 'reference' && !libraryDocument) {
    return null;
  }

  return (
    <>
      {/* Collapsed Preview */}
      <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-2xl p-5">
        <div className="flex items-start gap-3 mb-3">
          <BookOpen className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            {displayData.category && (
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-2">
                {displayData.category}
              </span>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {displayData.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {displayData.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
          >
            <span>Xem tài liệu</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {displayData.estimatedReadTime && (
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {displayData.estimatedReadTime}
            </span>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Panel (Desktop) or Modal (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 sm:inset-auto sm:top-0 sm:right-0 sm:bottom-0 sm:w-[600px] z-50 bg-white shadow-2xl animate-scale-in sm:animate-slide-in-right rounded-none sm:rounded-none"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-700">Tài liệu</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Title & Meta */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900 flex-1">
                    {displayData.title}
                  </h2>
                  {displayData.estimatedReadTime && (
                    <span className="flex items-center gap-1 text-sm text-gray-500 flex-shrink-0 ml-4">
                      <Clock className="w-4 h-4" />
                      {displayData.estimatedReadTime}
                    </span>
                  )}
                </div>
                {displayData.category && (
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                    {displayData.category}
                  </span>
                )}
              </div>

              <hr className="my-6 border-gray-200" />

              {/* Document Sections */}
              <div className="space-y-6">
                {displayData.documentContent.sections.map((section: { heading?: string; paragraphs: string[] }, idx: number) => (
                  <div key={idx}>
                    {section.heading && (
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {section.heading}
                      </h3>
                    )}
                    <div className="space-y-3">
                      {section.paragraphs.map((para: string, pIdx: number) => (
                        <p key={pIdx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Related Concepts */}
              {displayData.documentContent.relatedConcepts &&
               displayData.documentContent.relatedConcepts.length > 0 && (
                <>
                  <hr className="my-6 border-gray-200" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Khái niệm liên quan
                    </h4>
                    <ul className="space-y-2">
                      {displayData.documentContent.relatedConcepts.map((concept: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span className="text-gray-700">{concept}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Further Reading */}
              {displayData.documentContent.furtherReading &&
               displayData.documentContent.furtherReading.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Đọc thêm
                  </h4>
                  <ul className="space-y-2">
                    {displayData.documentContent.furtherReading.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
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
      {
        type: 'library-document',
        title: 'Chủ nghĩa tư bản',
        category: 'Định nghĩa',
        description: 'Hệ thống kinh tế dựa trên sở hữu tư nhân về tư liệu sản xuất và vận hành theo cơ chế thị trường tự do.',
        estimatedReadTime: '4 phút',
        documentContent: {
          sections: [
            {
              heading: 'Định nghĩa',
              paragraphs: [
                'Chủ nghĩa tư bản là một hệ thống kinh tế - xã hội trong đó tư liệu sản xuất (như nhà máy, máy móc, đất đai) thuộc sở hữu tư nhân thay vì sở hữu nhà nước hoặc tập thể.',
                'Trong chủ nghĩa tư bản, sản xuất và phân phối hàng hóa được điều tiết chủ yếu bởi cơ chế thị trường tự do, dựa trên quan hệ cung cầu, thay vì bởi kế hoạch hóa tập trung từ nhà nước.',
              ],
            },
            {
              heading: 'Đặc điểm chính',
              paragraphs: [
                'Quyền sở hữu tư nhân: Cá nhân và doanh nghiệp có quyền sở hữu, mua bán, và sử dụng tư liệu sản xuất để tạo ra lợi nhuận.',
                'Thị trường tự do: Giá cả và sản xuất được xác định bởi quan hệ cung cầu trên thị trường, ít có sự can thiệp của nhà nước.',
                'Cạnh tranh: Các doanh nghiệp cạnh tranh với nhau để thu hút khách hàng, thúc đẩy sáng tạo và hiệu quả kinh tế.',
                'Động lực lợi nhuận: Mục tiêu chính của hoạt động kinh tế là tối đa hóa lợi nhuận cho chủ sở hữu.',
              ],
            },
            {
              heading: 'Lịch sử hình thành',
              paragraphs: [
                'Chủ nghĩa tư bản bắt đầu hình thành ở châu Âu từ thế kỷ 16-17 thông qua quá trình công nghiệp hóa và phát triển thương mại quốc tế.',
                'Các nhà tư tưởng như Adam Smith đã đưa ra các lý thuyết nền tảng về thị trường tự do và "bàn tay vô hình" điều tiết nền kinh tế.',
              ],
            },
          ],
          relatedConcepts: [
            'Thị trường tự do',
            'Sở hữu tư nhân',
            'Chủ nghĩa xã hội',
            'Kinh tế thị trường',
            'Cạnh tranh kinh tế',
          ],
          furtherReading: [
            'Lịch sử phát triển chủ nghĩa tư bản từ thế kỷ 16',
            'So sánh chủ nghĩa tư bản và chủ nghĩa xã hội',
            'Vai trò của nhà nước trong nền kinh tế tư bản',
            'Các trường phái kinh tế tư bản chủ nghĩa',
          ],
        },
      },
      {
        type: 'library-document',
        title: 'Cung và Cầu',
        category: 'Khái niệm cơ bản',
        description: 'Hai lực lượng chính quyết định giá cả và số lượng hàng hóa trong nền kinh tế thị trường.',
        estimatedReadTime: '2 phút',
        documentContent: {
          sections: [
            {
              paragraphs: [
                'Cung và cầu là hai khái niệm cơ bản nhất trong kinh tế học, giải thích cách thị trường hoạt động và xác định giá cả.',
                'Cung (Supply): Số lượng hàng hóa mà người bán sẵn sàng cung cấp ở mỗi mức giá.',
                'Cầu (Demand): Số lượng hàng hóa mà người mua muốn mua ở mỗi mức giá.',
                'Điểm cân bằng xảy ra khi cung bằng cầu, xác định giá thị trường và số lượng giao dịch.',
              ],
            },
          ],
          relatedConcepts: [
            'Giá cân bằng',
            'Đường cung',
            'Đường cầu',
            'Thị trường',
          ],
        },
      },
      {
        type: 'library-document',
        title: 'Lạm phát',
        description: 'Hiện tượng giá cả hàng hóa và dịch vụ tăng liên tục theo thời gian.',
        documentContent: {
          sections: [
            {
              paragraphs: [
                'Lạm phát là sự gia tăng liên tục và bền vững của mức giá chung trong nền kinh tế.',
                'Được đo lường bằng chỉ số giá tiêu dùng (CPI).',
                'Nguyên nhân bao gồm: cung tiền tăng, cầu vượt cung, chi phí sản xuất tăng.',
              ],
            },
          ],
        },
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
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Render visible blocks */}
          {content.blocks.slice(0, visibleBlocks).map((block, index) => (
            <div key={index} className="animate-fade-in" ref={index === visibleBlocks - 1 ? contentEndRef : undefined}>
              {block.type === 'text' && <TextBlockComponent block={block} />}
              {block.type === 'callout' && <CalloutBlockComponent block={block} />}
              {block.type === 'library-document' && <LibraryDocumentBlockComponent block={block} />}
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
