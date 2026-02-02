/**
 * Content service that fetches data from the database.
 * Replaces the static data imports from /data/courses.ts
 */

import { prisma } from '../prisma';
import { unstable_cache } from 'next/cache';
import type {
  CategoryDisplay,
  CourseDisplay,
  LevelDisplay,
  LessonDisplay,
  LessonContentDisplay,
  ExerciseDisplay,
  CharacterDisplay,
  StoryDisplay,
  StoryPartDisplay,
  ChapterDisplay,
  ChapterContentDisplay,
  LessonWithContext,
  ChapterWithContext,
  ContentBlock,
} from '../types/content';

// Cache duration in seconds
const CACHE_DURATION = 60; // 1 minute

// ============================================================
// Category & Course Functions
// ============================================================

// Lightweight query for homepage - only fetch what's needed for cards
async function getCategoriesLightweight(): Promise<CategoryDisplay[]> {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      courses: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: {
          levels: {
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              name: true,
              _count: {
                select: { lessons: { where: { isActive: true } } }
              },
              lessons: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
                select: {
                  id: true,
                  slug: true,
                  name: true,
                  _count: {
                    select: { exercises: true }
                  }
                },
              },
            },
          },
        },
      },
    },
  });

  return categories.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    name: cat.name,
    description: cat.description || '',
    icon: cat.icon,
    courses: cat.courses.map((course) => {
      const lessonsCount = course.levels.reduce(
        (sum, lvl) => sum + lvl._count.lessons,
        0
      );
      const exercisesCount = course.levels.reduce(
        (sum, lvl) =>
          sum + lvl.lessons.reduce((s, les) => s + les._count.exercises, 0),
        0
      );

      return {
        id: course.id,
        slug: course.slug,
        name: course.name,
        description: course.description || '',
        icon: course.icon,
        isNew: course.isNew,
        lessonsCount,
        exercisesCount,
        levels: course.levels.map((lvl) => ({
          id: lvl.id,
          name: lvl.name,
          lessons: lvl.lessons.map((les) => ({
            id: les.id,
            slug: les.slug || les.id,
            name: les.name,
            isCompleted: false, // Will be set by client based on user progress
            isLocked: false, // Will be set by client based on user progress
          })),
        })),
      };
    }),
  }));
}

// Cached version of getCategories
export const getCategories = unstable_cache(
  getCategoriesLightweight,
  ['categories'],
  { revalidate: CACHE_DURATION }
);

async function getCourseBySlugInternal(slug: string): Promise<CourseDisplay | null> {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      levels: {
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          name: true,
          _count: {
            select: { lessons: { where: { isActive: true } } }
          },
          lessons: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              slug: true,
              name: true,
              _count: {
                select: { exercises: true }
              }
            },
          },
        },
      },
    },
  });

  if (!course) return null;

  const lessonsCount = course.levels.reduce(
    (sum, lvl) => sum + lvl._count.lessons,
    0
  );
  const exercisesCount = course.levels.reduce(
    (sum, lvl) =>
      sum + lvl.lessons.reduce((s, les) => s + les._count.exercises, 0),
    0
  );

  return {
    id: course.id,
    slug: course.slug,
    name: course.name,
    description: course.description || '',
    icon: course.icon,
    isNew: course.isNew,
    lessonsCount,
    exercisesCount,
    levels: course.levels.map((lvl) => ({
      id: lvl.id,
      name: lvl.name,
      lessons: lvl.lessons.map((les) => ({
        id: les.id,
        slug: les.slug || les.id,
        name: les.name,
        isCompleted: false,
        isLocked: false,
      })),
    })),
  };
}

// Cached version
export const getCourseBySlug = unstable_cache(
  getCourseBySlugInternal,
  ['course-by-slug'],
  { revalidate: CACHE_DURATION }
);

// ============================================================
// Lesson Functions
// ============================================================

export async function getLessonBySlug(slug: string): Promise<LessonWithContext | null> {
  const lesson = await prisma.lesson.findFirst({
    where: { slug },
    include: {
      level: {
        include: {
          course: true,
          lessons: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
          },
        },
      },
    },
  });

  if (!lesson) return null;

  return {
    lesson: {
      id: lesson.id,
      slug: lesson.slug || lesson.id,
      name: lesson.name,
      isCompleted: false,
      isLocked: false,
    },
    course: {
      id: lesson.level.course.id,
      slug: lesson.level.course.slug,
      name: lesson.level.course.name,
      description: lesson.level.course.description || '',
      icon: lesson.level.course.icon,
      isNew: lesson.level.course.isNew,
      lessonsCount: 0,
      exercisesCount: 0,
      levels: [],
    },
    level: {
      id: lesson.level.id,
      name: lesson.level.name,
      lessons: lesson.level.lessons.map((l) => ({
        id: l.id,
        slug: l.slug || l.id,
        name: l.name,
        isCompleted: false,
        isLocked: false,
      })),
    },
  };
}

export async function getLessonContent(slug: string): Promise<LessonContentDisplay | null> {
  const lesson = await prisma.lesson.findFirst({
    where: { slug },
    include: {
      content: true,
    },
  });

  if (!lesson?.content) return null;

  return {
    lessonId: lesson.slug || lesson.id,
    title: lesson.content.title,
    blocks: lesson.content.blocks as unknown as unknown as ContentBlock[],
  };
}

export async function getExercisesForLesson(slug: string): Promise<ExerciseDisplay[]> {
  const lesson = await prisma.lesson.findFirst({
    where: { slug },
    include: {
      exercises: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  if (!lesson) return [];

  return lesson.exercises.map((ex) => ({
    id: ex.id,
    lessonId: lesson.slug || lesson.id,
    type: ex.type as 'multiple-choice' | 'visual-select',
    title: ex.title,
    instruction: ex.instruction,
    options: ex.options as ExerciseDisplay['options'],
    visualData: ex.visualData as ExerciseDisplay['visualData'],
  }));
}

// ============================================================
// Character Functions
// ============================================================

async function getCharactersInternal(): Promise<CharacterDisplay[]> {
  const characters = await prisma.character.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      slug: true,
      name: true,
      role: true,
      description: true,
      icon: true,
      color: true,
      bgColor: true,
      stories: {
        where: { isActive: true },
        select: { slug: true },
      },
    },
  });

  return characters.map((char) => ({
    id: char.id,
    slug: char.slug,
    name: char.name,
    role: char.role,
    description: char.description || '',
    icon: char.icon,
    color: char.color,
    bgColor: char.bgColor,
    stories: char.stories.map((s) => s.slug),
  }));
}

// Cached version
export const getCharacters = unstable_cache(
  getCharactersInternal,
  ['characters'],
  { revalidate: CACHE_DURATION }
);

async function getCharacterBySlugInternal(slug: string): Promise<CharacterDisplay | null> {
  const character = await prisma.character.findFirst({
    where: { slug, isActive: true },
    select: {
      id: true,
      slug: true,
      name: true,
      role: true,
      description: true,
      icon: true,
      color: true,
      bgColor: true,
      stories: {
        where: { isActive: true },
        select: { slug: true },
      },
    },
  });

  if (!character) return null;

  return {
    id: character.id,
    slug: character.slug,
    name: character.name,
    role: character.role,
    description: character.description || '',
    icon: character.icon,
    color: character.color,
    bgColor: character.bgColor,
    stories: character.stories.map((s) => s.slug),
  };
}

// Cached version
export const getCharacterBySlug = unstable_cache(
  getCharacterBySlugInternal,
  ['character-by-slug'],
  { revalidate: CACHE_DURATION }
);

// ============================================================
// Story Functions
// ============================================================

async function getStoriesByCharacterInternal(characterSlug: string): Promise<StoryDisplay[]> {
  const character = await prisma.character.findFirst({
    where: { slug: characterSlug },
    select: { id: true },
  });

  if (!character) return [];

  const stories = await prisma.story.findMany({
    where: { characterId: character.id, isActive: true },
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      slug: true,
      title: true,
      teaser: true,
      icon: true,
      estimatedTime: true,
      relatedCourses: true,
      parts: {
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          name: true,
          _count: {
            select: { chapters: { where: { isActive: true } } }
          },
          chapters: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              slug: true,
              title: true,
            },
          },
        },
      },
    },
  });

  return stories.map((story) => {
    const chaptersCount = story.parts.reduce(
      (sum, part) => sum + part._count.chapters,
      0
    );

    return {
      id: story.id,
      slug: story.slug,
      characterId: characterSlug,
      title: story.title,
      teaser: story.teaser || '',
      icon: story.icon,
      estimatedTime: story.estimatedTime,
      chaptersCount,
      relatedCourses: story.relatedCourses,
      parts: story.parts.map((part) => ({
        id: part.id,
        name: part.name,
        chapters: part.chapters.map((ch) => ({
          id: ch.id,
          slug: ch.slug || ch.id,
          title: ch.title,
          isCompleted: false,
          isLocked: false,
        })),
      })),
    };
  });
}

// Cached version
export const getStoriesByCharacter = unstable_cache(
  getStoriesByCharacterInternal,
  ['stories-by-character'],
  { revalidate: CACHE_DURATION }
);

async function getStoryBySlugInternal(slug: string): Promise<StoryDisplay | null> {
  const story = await prisma.story.findFirst({
    where: { slug, isActive: true },
    select: {
      id: true,
      slug: true,
      title: true,
      teaser: true,
      icon: true,
      estimatedTime: true,
      relatedCourses: true,
      character: {
        select: { slug: true },
      },
      parts: {
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          name: true,
          _count: {
            select: { chapters: { where: { isActive: true } } }
          },
          chapters: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              slug: true,
              title: true,
            },
          },
        },
      },
    },
  });

  if (!story) return null;

  const chaptersCount = story.parts.reduce(
    (sum, part) => sum + part._count.chapters,
    0
  );

  return {
    id: story.id,
    slug: story.slug,
    characterId: story.character.slug,
    title: story.title,
    teaser: story.teaser || '',
    icon: story.icon,
    estimatedTime: story.estimatedTime,
    chaptersCount,
    relatedCourses: story.relatedCourses,
    parts: story.parts.map((part) => ({
      id: part.id,
      name: part.name,
      chapters: part.chapters.map((ch) => ({
        id: ch.id,
        slug: ch.slug || ch.id,
        title: ch.title,
        isCompleted: false,
        isLocked: false,
      })),
    })),
  };
}

// Cached version
export const getStoryBySlug = unstable_cache(
  getStoryBySlugInternal,
  ['story-by-slug'],
  { revalidate: CACHE_DURATION }
);

async function getStoriesByCourseInternal(courseSlug: string): Promise<StoryDisplay[]> {
  // First, get the course ID from slug
  const course = await prisma.course.findFirst({
    where: { slug: courseSlug },
    select: { id: true },
  });

  if (!course) return [];

  // Query through the recommendation join table
  const recommendations = await prisma.courseStoryRecommendation.findMany({
    where: { courseId: course.id },
    orderBy: { sortOrder: 'asc' },
    select: {
      story: {
        select: {
          id: true,
          slug: true,
          title: true,
          teaser: true,
          icon: true,
          estimatedTime: true,
          relatedCourses: true,
          isActive: true,
          character: {
            select: { slug: true },
          },
          parts: {
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              name: true,
              _count: {
                select: { chapters: { where: { isActive: true } } }
              },
              chapters: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
                select: {
                  id: true,
                  slug: true,
                  title: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return recommendations
    .filter((rec) => rec.story.isActive)
    .map((rec) => {
      const story = rec.story;
      const chaptersCount = story.parts.reduce(
        (sum, part) => sum + part._count.chapters,
        0
      );

      return {
        id: story.id,
        slug: story.slug,
        characterId: story.character.slug,
        title: story.title,
        teaser: story.teaser || '',
        icon: story.icon,
        estimatedTime: story.estimatedTime,
        chaptersCount,
        relatedCourses: story.relatedCourses,
        parts: story.parts.map((part) => ({
          id: part.id,
          name: part.name,
          chapters: part.chapters.map((ch) => ({
            id: ch.id,
            slug: ch.slug || ch.id,
            title: ch.title,
            isCompleted: false,
            isLocked: false,
          })),
        })),
      };
    });
}

// Cached version
export const getStoriesByCourse = unstable_cache(
  getStoriesByCourseInternal,
  ['stories-by-course'],
  { revalidate: CACHE_DURATION }
);

// Get courses recommended for a story
async function getCoursesByStoryInternal(storySlug: string): Promise<CourseDisplay[]> {
  // First, get the story ID from slug
  const story = await prisma.story.findFirst({
    where: { slug: storySlug },
    select: { id: true },
  });

  if (!story) return [];

  // Query through the recommendation join table
  const recommendations = await prisma.courseStoryRecommendation.findMany({
    where: { storyId: story.id },
    orderBy: { sortOrder: 'asc' },
    select: {
      course: {
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          icon: true,
          isNew: true,
          isActive: true,
          levels: {
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              name: true,
              _count: {
                select: { lessons: { where: { isActive: true } } }
              },
              lessons: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
                select: {
                  id: true,
                  slug: true,
                  name: true,
                  _count: {
                    select: { exercises: true }
                  }
                },
              },
            },
          },
        },
      },
    },
  });

  return recommendations
    .filter((rec) => rec.course.isActive)
    .map((rec) => {
      const course = rec.course;
      const lessonsCount = course.levels.reduce(
        (sum, lvl) => sum + lvl._count.lessons,
        0
      );
      const exercisesCount = course.levels.reduce(
        (sum, lvl) =>
          sum + lvl.lessons.reduce((s, les) => s + les._count.exercises, 0),
        0
      );

      return {
        id: course.id,
        slug: course.slug,
        name: course.name,
        description: course.description || '',
        icon: course.icon,
        isNew: course.isNew,
        lessonsCount,
        exercisesCount,
        levels: course.levels.map((lvl) => ({
          id: lvl.id,
          name: lvl.name,
          lessons: lvl.lessons.map((les) => ({
            id: les.id,
            slug: les.slug || les.id,
            name: les.name,
            isCompleted: false,
            isLocked: false,
          })),
        })),
      };
    });
}

// Cached version
export const getCoursesByStory = unstable_cache(
  getCoursesByStoryInternal,
  ['courses-by-story'],
  { revalidate: CACHE_DURATION }
);

// ============================================================
// Chapter Functions
// ============================================================

export async function getChapterBySlug(slug: string): Promise<ChapterWithContext | null> {
  const chapter = await prisma.chapter.findFirst({
    where: { slug },
    include: {
      part: {
        include: {
          story: {
            include: {
              character: true,
              parts: {
                orderBy: { sortOrder: 'asc' },
                include: {
                  chapters: {
                    where: { isActive: true },
                    orderBy: { sortOrder: 'asc' },
                  },
                },
              },
            },
          },
          chapters: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
          },
        },
      },
    },
  });

  if (!chapter) return null;

  const story = chapter.part.story;
  const chaptersCount = story.parts.reduce(
    (sum, part) => sum + part.chapters.length,
    0
  );

  return {
    chapter: {
      id: chapter.id,
      slug: chapter.slug || chapter.id,
      title: chapter.title,
      isCompleted: false,
      isLocked: false,
    },
    story: {
      id: story.id,
      slug: story.slug,
      characterId: story.character.slug,
      title: story.title,
      teaser: story.teaser || '',
      icon: story.icon,
      estimatedTime: story.estimatedTime,
      chaptersCount,
      relatedCourses: story.relatedCourses,
      parts: story.parts.map((part) => ({
        id: part.id,
        name: part.name,
        chapters: part.chapters.map((ch) => ({
          id: ch.id,
          slug: ch.slug || ch.id,
          title: ch.title,
          isCompleted: false,
          isLocked: false,
        })),
      })),
    },
    part: {
      id: chapter.part.id,
      name: chapter.part.name,
      chapters: chapter.part.chapters.map((ch) => ({
        id: ch.id,
        slug: ch.slug || ch.id,
        title: ch.title,
        isCompleted: false,
        isLocked: false,
      })),
    },
  };
}

export async function getChapterContent(slug: string): Promise<ChapterContentDisplay | null> {
  const chapter = await prisma.chapter.findFirst({
    where: { slug },
    include: {
      content: true,
    },
  });

  if (!chapter?.content) return null;

  return {
    chapterId: chapter.slug || chapter.id,
    title: chapter.content.title,
    blocks: chapter.content.blocks as unknown as ContentBlock[],
  };
}
