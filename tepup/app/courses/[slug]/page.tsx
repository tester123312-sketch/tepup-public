import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import LearningPath from '@/components/LearningPath';
import { getCourseBySlug, getStoriesByCourse, getCharacterBySlug } from '@/lib/services/content-service';
import {
  Lightbulb,
  Binary,
  Receipt,
  Building,
  PieChart,
  BookOpen,
  Scale,
  Coins,
  GraduationCap,
  Dumbbell,
  Headphones,
  Store,
  Briefcase,
  Landmark,
} from 'lucide-react';

const characterIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'graduation-cap': GraduationCap,
  'briefcase': Briefcase,
  'store': Store,
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  lightbulb: Lightbulb,
  binary: Binary,
  receipt: Receipt,
  building: Building,
  'pie-chart': PieChart,
  'book-open': BookOpen,
  scale: Scale,
  coins: Coins,
  landmark: Landmark,
};

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const [course, relatedStories] = await Promise.all([
    getCourseBySlug(slug),
    getStoriesByCourse(slug),
  ]);

  // Only fetch characters that are actually needed for the related stories
  const uniqueCharacterSlugs = [...new Set(relatedStories.map(s => s.characterId))];
  const characterResults = await Promise.all(
    uniqueCharacterSlugs.map(slug => getCharacterBySlug(slug))
  );
  const charactersMap = new Map(
    characterResults.filter(Boolean).map(c => [c!.slug, c!])
  );

  if (!course) {
    notFound();
  }

  const IconComponent = iconMap[course.icon] || BookOpen;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <BackButton fallbackUrl="/" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              {/* Course Icon */}
              <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                <IconComponent className="w-12 h-12 text-blue-500" />
              </div>

              {/* Course Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {course.name}
              </h1>

              {/* Course Description */}
              <p className="text-gray-600 mb-6">{course.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>{course.lessonsCount} Bài học</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" />
                  <span>{course.exercisesCount} Bài tập</span>
                </div>
              </div>
            </div>

            {/* Related Stories */}
            {relatedStories.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Headphones className="w-4 h-4 text-purple-500" />
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Câu chuyện liên quan
                  </h3>
                </div>
                <div className="space-y-3">
                  {relatedStories.map((story) => {
                    const character = charactersMap.get(story.characterId);
                    if (!character) return null;

                    const CharacterIcon = characterIconMap[character.icon] || GraduationCap;

                    // Color mapping for character
                    const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
                      'text-teal-600': { bg: 'bg-teal-50', text: 'text-teal-600', border: 'hover:border-teal-300' },
                      'text-blue-600': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'hover:border-blue-300' },
                      'text-orange-600': { bg: 'bg-orange-50', text: 'text-orange-600', border: 'hover:border-orange-300' },
                    };
                    const colors = colorClasses[character.color] || colorClasses['text-blue-600'];

                    return (
                      <Link
                        key={story.slug}
                        href={`/story/${character.slug}/${story.slug}`}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 ${colors.border} bg-white transition-all hover:shadow-md group`}
                      >
                        <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                          <CharacterIcon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors truncate">
                            {story.title}
                          </p>
                          <p className="text-sm text-gray-500">của {character.name}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Learning Path */}
          <div className="lg:col-span-2">
            <LearningPath levels={course.levels} />
          </div>
        </div>
      </main>
    </div>
  );
}
