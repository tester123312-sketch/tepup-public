import { Brain, TrendingUp, Landmark } from 'lucide-react';
import type { CategoryDisplay } from '@/lib/types/content';
import CourseCard from './CourseCard';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  'trending-up': TrendingUp,
  landmark: Landmark,
};

interface CategorySectionProps {
  category: CategoryDisplay;
}

export default function CategorySection({ category }: CategorySectionProps) {
  const IconComponent = categoryIcons[category.icon] || Brain;

  return (
    <section className="py-8">
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
          <IconComponent className="w-7 h-7 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
          <p className="text-gray-500">{category.description}</p>
        </div>
      </div>

      {/* Course Cards Container */}
      <div className="bg-gray-50 rounded-3xl p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {category.courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
