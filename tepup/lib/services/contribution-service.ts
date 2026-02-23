import { prisma } from '@/lib/prisma';
import type { ContentBlock } from '@/components/admin/editor/BlockEditor';
import { checkAndPromote } from './promotion-service';

interface CourseContributionData {
  course: {
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    icon: string;
  };
  levels: {
    name: string;
    sortOrder: number;
    lessons: {
      name: string;
      sortOrder: number;
      content: {
        title: string;
        blocks: ContentBlock[];
      };
    }[];
  }[];
}

export async function publishContribution(contributionId: string, reviewerId: string) {
  const contribution = await prisma.contribution.findUnique({
    where: { id: contributionId },
  });

  if (!contribution) throw new Error('Contribution not found');
  if (contribution.status !== 'PENDING_REVIEW') throw new Error('Contribution is not pending review');

  const data = contribution.data as unknown;

  switch (contribution.type) {
    case 'NEW_COURSE':
      await publishNewCourse(data as CourseContributionData);
      break;
    case 'EDIT_LESSON_CONTENT':
      await publishEditLessonContent(contribution.targetId!, data as { blocks: ContentBlock[] });
      break;
    default:
      throw new Error(`Unsupported contribution type: ${contribution.type}`);
  }

  // Update contribution status
  await prisma.contribution.update({
    where: { id: contributionId },
    data: {
      status: 'APPROVED',
      resolvedAt: new Date(),
    },
  });

  // Create review record
  await prisma.review.create({
    data: {
      contributionId,
      reviewerId,
      action: 'APPROVED',
    },
  });

  // Check if contributor qualifies for auto-promotion
  await checkAndPromote(contribution.contributorId);
}

async function publishNewCourse(data: CourseContributionData) {
  const { course, levels } = data;

  // Get next sortOrder for the category
  const maxSortOrder = await prisma.course.aggregate({
    _max: { sortOrder: true },
    where: { categoryId: course.categoryId },
  });

  await prisma.$transaction(async (tx) => {
    // Create course
    const newCourse = await tx.course.create({
      data: {
        name: course.name,
        slug: course.slug,
        description: course.description,
        icon: course.icon || 'book-open',
        categoryId: course.categoryId,
        sortOrder: (maxSortOrder._max.sortOrder ?? 0) + 1,
        isActive: true,
        isNew: true,
      },
    });

    // Create levels and lessons
    for (const level of levels) {
      const newLevel = await tx.level.create({
        data: {
          name: level.name,
          courseId: newCourse.id,
          sortOrder: level.sortOrder,
        },
      });

      for (const lesson of level.lessons) {
        const lessonSlug = `${course.slug}-l${level.sortOrder + 1}-${lesson.sortOrder + 1}`;

        const newLesson = await tx.lesson.create({
          data: {
            name: lesson.name,
            slug: lessonSlug,
            levelId: newLevel.id,
            sortOrder: lesson.sortOrder,
            isActive: true,
          },
        });

        if (lesson.content.blocks.length > 0 || lesson.content.title) {
          await tx.lessonContent.create({
            data: {
              lessonId: newLesson.id,
              title: lesson.content.title || lesson.name,
              blocks: JSON.parse(JSON.stringify(lesson.content.blocks)),
            },
          });
        }
      }
    }
  });
}

async function publishEditLessonContent(lessonId: string, data: { blocks: ContentBlock[] }) {
  await prisma.lessonContent.update({
    where: { lessonId },
    data: {
      blocks: JSON.parse(JSON.stringify(data.blocks)),
    },
  });
}

export async function rejectContribution(
  contributionId: string,
  reviewerId: string,
  feedback: string,
  action: 'REJECTED' | 'CHANGES_REQUESTED'
) {
  await prisma.contribution.update({
    where: { id: contributionId },
    data: {
      status: action,
      resolvedAt: new Date(),
    },
  });

  await prisma.review.create({
    data: {
      contributionId,
      reviewerId,
      action,
      feedback,
    },
  });
}
