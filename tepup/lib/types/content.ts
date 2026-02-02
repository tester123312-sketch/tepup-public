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

export type ContentBlock = TextBlock | ImageBlock | CalloutBlock | QuestionBlock;

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
