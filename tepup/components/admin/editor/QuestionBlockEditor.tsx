'use client';

import { Plus, Trash2, Check } from 'lucide-react';
import type { QuestionBlock } from './BlockEditor';

interface QuestionBlockEditorProps {
  block: QuestionBlock;
  onChange: (block: QuestionBlock) => void;
}

export default function QuestionBlockEditor({
  block,
  onChange,
}: QuestionBlockEditorProps) {
  function updateOptionText(index: number, text: string) {
    const options = [...block.options];
    options[index] = { ...options[index], text };
    onChange({ ...block, options });
  }

  function setCorrectOption(index: number) {
    const options = block.options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    onChange({ ...block, options });
  }

  function addOption() {
    const newId = String(block.options.length + 1);
    onChange({
      ...block,
      options: [...block.options, { id: newId, text: '', isCorrect: false }],
    });
  }

  function removeOption(index: number) {
    if (block.options.length <= 2) return;
    const options = block.options.filter((_, i) => i !== index);
    // Ensure at least one correct answer
    if (!options.some((opt) => opt.isCorrect)) {
      options[0].isCorrect = true;
    }
    onChange({ ...block, options });
  }

  return (
    <div className="space-y-4">
      {/* Question */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Câu hỏi <span className="text-red-500">*</span>
        </label>
        <textarea
          value={block.question}
          onChange={(e) => onChange({ ...block, question: e.target.value })}
          placeholder="Nhập câu hỏi..."
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Các lựa chọn
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Chọn dấu tích để đánh dấu đáp án đúng
        </p>
        <div className="space-y-2">
          {block.options.map((option, index) => (
            <div key={option.id} className="flex items-center gap-2">
              <button
                onClick={() => setCorrectOption(index)}
                className={`p-2 rounded-lg border transition-colors ${
                  option.isCorrect
                    ? 'bg-green-100 border-green-300 text-green-600'
                    : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'
                }`}
                title={option.isCorrect ? 'Đáp án đúng' : 'Đặt làm đáp án đúng'}
              >
                <Check className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={option.text}
                onChange={(e) => updateOptionText(index, e.target.value)}
                placeholder={`Lựa chọn ${index + 1}...`}
                className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  option.isCorrect ? 'border-green-300 bg-green-50' : 'border-gray-200'
                }`}
              />
              {block.options.length > 2 && (
                <button
                  onClick={() => removeOption(index)}
                  className="p-2 text-gray-400 hover:text-red-500"
                  title="Xóa lựa chọn"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        {block.options.length < 6 && (
          <button
            onClick={addOption}
            className="mt-2 flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm lựa chọn</span>
          </button>
        )}
      </div>

      {/* Explanation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Giải thích (tùy chọn)
        </label>
        <textarea
          value={block.explanation || ''}
          onChange={(e) =>
            onChange({ ...block, explanation: e.target.value || undefined })
          }
          placeholder="Giải thích hiển thị sau khi trả lời..."
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    </div>
  );
}
