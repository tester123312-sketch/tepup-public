// Content types shared between data layer and UI

export interface TextBlock {
  type: 'text';
  title?: string;
  paragraphs: string[];
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface CalloutBlock {
  type: 'callout';
  icon?: string;
  title?: string;
  text: string;
  variant?: 'info' | 'warning' | 'success';
}

export interface QuestionBlock {
  type: 'question';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

export interface LibraryDocumentBlock {
  type: 'library-document';
  mode?: 'reference' | 'inline'; // Optional for backward compatibility
  // Reference mode fields
  documentId?: string;
  documentSlug?: string; // Used in static files, resolved to documentId during migration
  // Inline mode fields (all optional for reference mode)
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
}

// === NHÓM A: Công cụ tính toán ===

export interface CalculatorBlock {
  type: 'calculator';
  title?: string;
  description?: string;
  calculatorType: 'tax' | 'compound-interest' | 'inflation' | 'custom';
  inputs: {
    id: string;
    label: string;
    type: 'number' | 'select';
    unit?: string;
    defaultValue: number;
    min?: number;
    max?: number;
    step?: number;
    options?: { value: number; label: string }[];
  }[];
  formula: string;
  outputs: {
    id: string;
    label: string;
    unit?: string;
    formula: string;
    highlight?: boolean;
  }[];
  presets?: {
    label: string;
    values: Record<string, number>;
  }[];
  insight?: string;
}

export interface SliderSimulatorBlock {
  type: 'slider-simulator';
  title?: string;
  description?: string;
  sliders: {
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit?: string;
  }[];
  outputs: {
    id: string;
    label: string;
    formula: string;
    unit?: string;
    format?: 'number' | 'percent' | 'currency';
  }[];
  chart?: {
    type: 'bar';
    bars: {
      label: string;
      formula: string;
      color?: string;
    }[];
  };
  breakpoints?: {
    condition: string;
    message: string;
    variant: 'info' | 'warning' | 'success';
  }[];
}

export interface BudgetAllocatorBlock {
  type: 'budget-allocator';
  title?: string;
  description?: string;
  totalBudget: number;
  unit?: string;
  categories: {
    id: string;
    label: string;
    icon?: string;
    color: string;
    defaultValue: number;
    minValue?: number;
    description?: string;
  }[];
  outcomes: {
    condition: string;
    title: string;
    description: string;
    variant: 'good' | 'neutral' | 'bad';
  }[];
  comparison?: {
    label: string;
    values: Record<string, number>;
  };
}

// === NHÓM B: Tư duy phản biện ===

export interface BiasDetectorBlock {
  type: 'bias-detector';
  title?: string;
  instruction: string;
  article: {
    text: string;
    source?: string;
  };
  segments: {
    id: string;
    text: string;
    startIndex: number;
    biasType: string;
    explanation: string;
  }[];
  biasOptions: { id: string; label: string }[];
}

export interface StatTrickBlock {
  type: 'stat-trick';
  title?: string;
  instruction: string;
  chart: {
    type: 'bar' | 'comparison';
    data: { label: string; value: number; displayValue?: string }[];
    yAxisStart?: number;
    title?: string;
  };
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  reveal: {
    explanation: string;
    correctedChart: {
      type: 'bar' | 'comparison';
      data: { label: string; value: number; displayValue?: string }[];
      yAxisStart?: number;
      title?: string;
    };
  };
}

export interface PerspectiveSwitchBlock {
  type: 'perspective-switch';
  title?: string;
  event: string;
  perspectives: {
    id: string;
    role: string;
    icon?: string;
    narrative: string;
  }[];
  question: {
    text: string;
    options: { id: string; text: string; isCorrect: boolean }[];
    explanation: string;
  };
}

// === NHÓM C: Mini-game / Puzzle ===

export interface HotColdGuessBlock {
  type: 'hot-cold-guess';
  title?: string;
  question: string;
  answer: number;
  unit: string;
  tolerance: number;
  hints: string[];
  context: string;
}

export interface RedactedDocumentBlock {
  type: 'redacted-document';
  title?: string;
  instruction?: string;
  documentTitle: string;
  content: string;
  redactions: {
    id: string;
    answer: string;
    hint?: string;
    alternatives?: string[];
  }[];
  context: string;
}

export interface HiddenPatternBlock {
  type: 'hidden-pattern';
  title?: string;
  instruction: string;
  table: {
    headers: string[];
    rows: (string | number)[][];
  };
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  highlightColumns?: number[];
}

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | CalloutBlock
  | QuestionBlock
  | LibraryDocumentBlock
  | CalculatorBlock
  | SliderSimulatorBlock
  | BudgetAllocatorBlock
  | BiasDetectorBlock
  | StatTrickBlock
  | PerspectiveSwitchBlock
  | HotColdGuessBlock
  | RedactedDocumentBlock
  | HiddenPatternBlock;

// Lesson types for UI consumption
export interface LessonDisplay {
  id: string;
  slug: string;
  name: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface LevelDisplay {
  id: string;
  name: string;
  lessons: LessonDisplay[];
}

export interface CourseDisplay {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  lessonsCount: number;
  exercisesCount: number;
  isNew: boolean;
  levels: LevelDisplay[];
}

export interface CategoryDisplay {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  courses: CourseDisplay[];
}

export interface ExerciseDisplay {
  id: string;
  lessonId: string;
  type: 'multiple-choice' | 'visual-select';
  title: string;
  instruction: string;
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  visualData?: {
    question: string;
    correctAnswer: string;
  };
}

export interface LessonContentDisplay {
  lessonId: string;
  title: string;
  blocks: ContentBlock[];
}

// Character and Story types
export interface CharacterDisplay {
  id: string;
  slug: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  stories: string[]; // story slugs
}

export interface ChapterDisplay {
  id: string;
  slug: string;
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface StoryPartDisplay {
  id: string;
  name: string;
  chapters: ChapterDisplay[];
}

export interface StoryDisplay {
  id: string;
  slug: string;
  characterId: string;
  title: string;
  teaser: string;
  icon: string;
  estimatedTime: string;
  chaptersCount: number;
  parts: StoryPartDisplay[];
  relatedCourses: string[]; // course slugs
}

export interface ChapterContentDisplay {
  chapterId: string;
  title: string;
  blocks: ContentBlock[];
}

// Context types for lesson/chapter retrieval
export interface LessonWithContext {
  lesson: LessonDisplay;
  course: CourseDisplay;
  level: LevelDisplay;
}

export interface ChapterWithContext {
  chapter: ChapterDisplay;
  story: StoryDisplay;
  part: StoryPartDisplay;
}
