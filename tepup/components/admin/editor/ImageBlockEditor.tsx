'use client';

import { Image } from 'lucide-react';
import type { ImageBlock } from './BlockEditor';

interface ImageBlockEditorProps {
  block: ImageBlock;
  onChange: (block: ImageBlock) => void;
}

export default function ImageBlockEditor({
  block,
  onChange,
}: ImageBlockEditorProps) {
  return (
    <div className="space-y-4">
      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL hình ảnh <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={block.src}
          onChange={(e) => onChange({ ...block, src: e.target.value })}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Preview */}
      {block.src && (
        <div className="relative">
          <img
            src={block.src}
            alt={block.alt || 'Preview'}
            className="max-w-full h-auto rounded-lg border border-gray-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {!block.src && (
        <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-400">
            <Image className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Nhập URL để xem trước</p>
          </div>
        </div>
      )}

      {/* Alt text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mô tả (alt text) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={block.alt}
          onChange={(e) => onChange({ ...block, alt: e.target.value })}
          placeholder="Mô tả hình ảnh cho accessibility..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Caption */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chú thích (tùy chọn)
        </label>
        <input
          type="text"
          value={block.caption || ''}
          onChange={(e) =>
            onChange({ ...block, caption: e.target.value || undefined })
          }
          placeholder="Chú thích hiển thị dưới hình..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
