'use client';

import Link from 'next/link';
import {
  Lightbulb,
  Binary,
  Receipt,
  Building,
  PieChart,
  BookOpen,
  Scale,
  Coins,
  TrendingUp,
  Brain,
  Landmark,
} from 'lucide-react';
import type { CourseDisplay } from '@/lib/types/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  lightbulb: Lightbulb,
  binary: Binary,
  receipt: Receipt,
  building: Building,
  'pie-chart': PieChart,
  'book-open': BookOpen,
  scale: Scale,
  coins: Coins,
  'trending-up': TrendingUp,
  brain: Brain,
  landmark: Landmark,
};

interface CourseCardProps {
  course: CourseDisplay;
}

export default function CourseCard({ course }: CourseCardProps) {
  const IconComponent = iconMap[course.icon] || BookOpen;

  return (
    <Link href={`/courses/${course.slug}`} className="group">
      <div className="relative bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1">
        {/* NEW Badge */}
        {course.isNew && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}

        {/* Icon */}
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
          <IconComponent className="w-10 h-10 text-blue-500" />
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {course.name}
        </h3>
      </div>
    </Link>
  );
}
