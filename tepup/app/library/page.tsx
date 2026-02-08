'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { BookOpen, Search, Filter, Clock, ChevronRight, X } from 'lucide-react';

interface LibraryDocument {
  id: string;
  title: string;
  description: string;
  category: string | null;
  slug: string;
  content: {
    sections: {
      heading?: string;
      paragraphs: string[];
    }[];
    relatedConcepts?: string[];
    furtherReading?: string[];
  };
}

export default function LibraryPage() {
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<LibraryDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<LibraryDocument | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    // Client-side filtering
    let filtered = documents;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(search) ||
          doc.description.toLowerCase().includes(search)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((doc) => doc.category === categoryFilter);
    }

    setFilteredDocuments(filtered);
  }, [documents, searchTerm, categoryFilter]);

  // Handle ESC key to close
  useEffect(() => {
    if (!selectedDocument) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDocument(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedDocument]);

  async function fetchDocuments() {
    try {
      const res = await fetch('/api/admin/library');
      const data = await res.json();
      if (data.data) {
        const activeDocuments = data.data.filter((doc: any) => doc.isActive);
        setDocuments(activeDocuments);
        setFilteredDocuments(activeDocuments);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(
            activeDocuments
              .map((doc: LibraryDocument) => doc.category)
              .filter((cat: string | null): cat is string => cat !== null)
          )
        ).sort();
        setCategories(uniqueCategories as string[]);
      }
    } catch (err) {
      console.error('Error fetching library documents:', err);
    } finally {
      setLoading(false);
    }
  }

  function estimateReadTime(doc: LibraryDocument): string {
    const wordCount = doc.content.sections.reduce((total, section) => {
      return (
        total +
        section.paragraphs.reduce((sum, para) => sum + para.split(' ').length, 0)
      );
    }, 0);
    const minutes = Math.ceil(wordCount / 200); // Average reading speed
    return `${minutes} phút`;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thư viện</h1>
          <p className="text-gray-500 mt-1">
            Kho tài liệu kiến thức phong phú và đa dạng
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="relative sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Documents Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                {searchTerm || categoryFilter
                  ? 'Không tìm thấy tài liệu nào'
                  : 'Chưa có tài liệu nào trong thư viện'}
              </div>
            ) : (
              filteredDocuments.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className="bg-white border-2 border-purple-100 rounded-2xl p-5 hover:border-purple-300 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {doc.category && (
                        <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-2">
                          {doc.category}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {estimateReadTime(doc)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-purple-600" />
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </main>

      {/* Document Side Panel / Modal */}
      {selectedDocument && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setSelectedDocument(null)}
          />

          {/* Side Panel (Desktop) or Modal (Mobile) */}
          <div
            className={`
              fixed z-50 bg-white shadow-2xl
              ${
                isMobile
                  ? 'inset-0 animate-scale-in rounded-none'
                  : 'top-0 right-0 bottom-0 w-full sm:w-[600px] animate-slide-in-right'
              }
            `}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-700">Tài liệu</span>
                </div>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* Title & Meta */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-3xl font-bold text-gray-900 flex-1">
                      {selectedDocument.title}
                    </h2>
                    <span className="flex items-center gap-1 text-sm text-gray-500 flex-shrink-0 ml-4">
                      <Clock className="w-4 h-4" />
                      {estimateReadTime(selectedDocument)}
                    </span>
                  </div>
                  {selectedDocument.category && (
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                      {selectedDocument.category}
                    </span>
                  )}
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Document Sections */}
                <div className="space-y-6">
                  {selectedDocument.content.sections.map((section, idx) => (
                    <div key={idx}>
                      {section.heading && (
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {section.heading}
                        </h3>
                      )}
                      <div className="space-y-3">
                        {section.paragraphs.map((para, pIdx) => (
                          <p key={pIdx} className="text-gray-700 leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Related Concepts */}
                {selectedDocument.content.relatedConcepts &&
                  selectedDocument.content.relatedConcepts.length > 0 && (
                    <>
                      <hr className="my-6 border-gray-200" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Khái niệm liên quan
                        </h4>
                        <ul className="space-y-2">
                          {selectedDocument.content.relatedConcepts.map(
                            (concept, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span className="text-gray-700">{concept}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </>
                  )}

                {/* Further Reading */}
                {selectedDocument.content.furtherReading &&
                  selectedDocument.content.furtherReading.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Đọc thêm
                      </h4>
                      <ul className="space-y-2">
                        {selectedDocument.content.furtherReading.map(
                          (item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-600 mt-1">•</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
