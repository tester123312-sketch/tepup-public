'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import BlockEditor, { ContentBlock } from '@/components/admin/editor/BlockEditor';

interface LessonInfo {
  id: string;
  name: string;
  course: { id: string; name: string };
  level: { id: string; name: string };
}

interface LessonContent {
  title: string;
  blocks: ContentBlock[];
}

export default function LessonContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: lessonId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [lesson, setLesson] = useState<LessonInfo | null>(null);
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [lessonId]);

  async function fetchContent() {
    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}/content`);
      const data = await res.json();

      if (!res.ok) {
        setError('Không thể tải nội dung');
        return;
      }

      setLesson(data.data.lesson);
      setTitle(data.data.content.title);
      setBlocks(data.data.content.blocks || []);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, blocks }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Không thể lưu nội dung');
        return;
      }

      // Show success briefly
      alert('Đã lưu nội dung!');
    } catch (err) {
      console.error('Error saving content:', err);
      setError('Đã xảy ra lỗi khi lưu');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/courses/${lesson?.course.id}/levels`}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Nội dung bài học
            </h1>
            <p className="text-gray-600 mt-1">
              {lesson?.course.name} &gt; {lesson?.level.name} &gt; {lesson?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              showPreview
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{showPreview ? 'Ẩn preview' : 'Xem trước'}</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Đang lưu...' : 'Lưu'}</span>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className={showPreview ? '' : 'lg:col-span-2'}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề bài học
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tiêu đề..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Block Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Nội dung
              </label>
              <BlockEditor blocks={blocks} onChange={setBlocks} />
            </div>
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Xem trước
              </h3>
              <div className="prose prose-sm max-w-none">
                <h1 className="text-xl font-bold mb-4">{title || 'Chưa có tiêu đề'}</h1>
                {blocks.length === 0 ? (
                  <p className="text-gray-400">Chưa có nội dung</p>
                ) : (
                  blocks.map((block, index) => (
                    <div key={index} className="mb-4">
                      {block.type === 'text' && (
                        <div>
                          {block.title && (
                            <h2 className="text-lg font-semibold mb-2">
                              {block.title}
                            </h2>
                          )}
                          {block.paragraphs.map((p, i) => (
                            <p key={i} className="text-gray-700 mb-2">
                              {p || <span className="text-gray-300">...</span>}
                            </p>
                          ))}
                        </div>
                      )}
                      {block.type === 'image' && block.src && (
                        <figure>
                          <img
                            src={block.src}
                            alt={block.alt}
                            className="rounded-lg max-w-full"
                          />
                          {block.caption && (
                            <figcaption className="text-sm text-gray-500 mt-1">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                      {block.type === 'callout' && (
                        <div
                          className={`p-4 rounded-xl ${
                            block.variant === 'warning'
                              ? 'bg-yellow-50 border border-yellow-200'
                              : block.variant === 'success'
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-blue-50 border border-blue-200'
                          }`}
                        >
                          {block.title && (
                            <p className="font-medium mb-1">{block.title}</p>
                          )}
                          <p className="text-sm">{block.text}</p>
                        </div>
                      )}
                      {block.type === 'question' && (
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="font-medium mb-3">{block.question}</p>
                          <div className="space-y-2">
                            {block.options.map((opt) => (
                              <div
                                key={opt.id}
                                className={`px-3 py-2 rounded-lg ${
                                  opt.isCorrect
                                    ? 'bg-green-100 border border-green-300'
                                    : 'bg-white border border-gray-200'
                                }`}
                              >
                                {opt.text || '...'}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
