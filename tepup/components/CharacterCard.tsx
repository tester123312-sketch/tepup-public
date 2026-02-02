'use client';

import Link from 'next/link';
import { GraduationCap, Briefcase, Store, ArrowRight } from 'lucide-react';
import type { CharacterDisplay } from '@/lib/types/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'graduation-cap': GraduationCap,
  'briefcase': Briefcase,
  'store': Store,
};

interface CharacterCardProps {
  character: CharacterDisplay;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const IconComponent = iconMap[character.icon] || GraduationCap;

  // Map color classes
  const colorClasses: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
    'text-teal-600': {
      bg: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-200 hover:border-teal-300',
      iconBg: 'bg-teal-100',
    },
    'text-blue-600': {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200 hover:border-blue-300',
      iconBg: 'bg-blue-100',
    },
    'text-orange-600': {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200 hover:border-orange-300',
      iconBg: 'bg-orange-100',
    },
  };

  const colors = colorClasses[character.color] || colorClasses['text-blue-600'];

  return (
    <Link href={`/story/${character.slug}`} className="group block">
      <div
        className={`
          relative overflow-hidden rounded-2xl border-2 ${colors.border} ${colors.bg}
          p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        `}
      >
        <div className="flex items-start gap-4">
          {/* Avatar/Icon */}
          <div
            className={`
              flex-shrink-0 w-16 h-16 rounded-2xl ${colors.iconBg}
              flex items-center justify-center
            `}
          >
            <IconComponent className={`w-8 h-8 ${colors.text}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Name & Role */}
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-lg">{character.name}</h3>
              <p className={`text-sm font-medium ${colors.text}`}>{character.role}</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              "{character.description}"
            </p>

            {/* CTA */}
            <div
              className={`
                inline-flex items-center gap-1 text-sm font-semibold ${colors.text}
                group-hover:gap-2 transition-all
              `}
            >
              <span>Khám phá hành trình</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
