import { Sparkles } from 'lucide-react';
import CharacterCard from './CharacterCard';
import type { CharacterDisplay } from '@/lib/types/content';

interface StorySectionProps {
  characters: CharacterDisplay[];
}

export default function StorySection({ characters }: StorySectionProps) {
  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Học theo Câu chuyện</h2>
          <p className="text-gray-500 text-sm">Khám phá kiến thức qua hành trình của các nhân vật</p>
        </div>
      </div>

      {/* Character Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  );
}
