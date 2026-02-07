import Header from '@/components/Header';
import StorySection from '@/components/StorySection';
import CategorySection from '@/components/CategorySection';
import { getCategories, getCharacters } from '@/lib/services/content-service';

export default async function CoursesPage() {
  const [categories, characters] = await Promise.all([
    getCategories(),
    getCharacters(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lộ trình Học</h1>
          <p className="text-gray-500 mt-1">Từng bước nắm vững kiến thức</p>
        </div>

        {/* Story-based Learning Section */}
        <StorySection characters={characters} />

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Category Sections */}
        <div className="space-y-4">
          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
}
