import Link from 'next/link';
import Header from '@/components/Header';
import { getCategories } from '@/lib/services/content-service';
import { BookOpen, Map, Shield, ArrowRight, Sparkles } from 'lucide-react';

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              {/* Slogan */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
                <span className="block text-teal-500">Tép riu</span>
                <span className="block text-blue-500">stép up</span>
                <span className="block text-orange-500">stép out</span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
                TepUp là nơi nằm ngoài ao làng quen thuộc, nơi những &ldquo;tép riu&rdquo; có thể tự do học hỏi và thể hiện chính kiến một cách an toàn.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition-colors text-lg"
                >
                  Bắt đầu học
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#gioi-thieu"
                  className="inline-flex items-center gap-2 px-8 py-4 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-colors text-lg"
                >
                  Tìm hiểu thêm
                </a>
              </div>
            </div>
          </div>

          {/* Decorative background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-40" />
          </div>
        </section>

        {/* Why Tepup Section */}
        <section id="gioi-thieu" className="bg-gray-50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Tại sao chọn Tepup?</h2>
              <p className="text-gray-500 text-lg">Học Khoa học Xã hội theo cách hoàn toàn mới</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-5">
                  <Sparkles className="w-7 h-7 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Học qua câu chuyện</h3>
                <p className="text-gray-600 leading-relaxed">
                  Kiến thức được truyền tải qua hành trình của các nhân vật thực tế, giúp bạn dễ dàng hiểu và nhớ lâu.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
                  <Map className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Lộ trình rõ ràng</h3>
                <p className="text-gray-600 leading-relaxed">
                  Từng bước nắm vững kiến thức từ cơ bản đến nâng cao, với bài tập thực hành xuyên suốt.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-5">
                  <Shield className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">An toàn & Tự do</h3>
                <p className="text-gray-600 leading-relaxed">
                  Không gian học tập an toàn để tìm hiểu và thể hiện chính kiến về các vấn đề xã hội.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Topics Section */}
        {categories.length > 0 && (
          <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Chủ đề nổi bật</h2>
                <p className="text-gray-500 text-lg">Khám phá các lĩnh vực Khoa học Xã hội</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href="/courses"
                    className="group flex items-start gap-4 bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                      )}
                      <p className="text-blue-500 text-sm font-medium mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        {category.courses.length} khóa học
                        <ArrowRight className="w-3.5 h-3.5" />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="bg-gray-900 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng khám phá?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Bắt đầu hành trình học tập Khoa học Xã hội cùng Tepup ngay hôm nay.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition-colors text-lg"
            >
              Bắt đầu ngay
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
