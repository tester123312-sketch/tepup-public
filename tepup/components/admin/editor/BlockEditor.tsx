'use client';

import { useState } from 'react';
import {
  Plus,
  GripVertical,
  Trash2,
  Type,
  Image,
  MessageSquare,
  HelpCircle,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import TextBlockEditor from './TextBlockEditor';
import ImageBlockEditor from './ImageBlockEditor';
import CalloutBlockEditor from './CalloutBlockEditor';
import QuestionBlockEditor from './QuestionBlockEditor';

export interface TextBlock {
  type: 'text';
  title?: string;
  paragraphs: string[];
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface CalloutBlock {
  type: 'callout';
  icon?: string;
  title?: string;
  text: string;
  variant?: 'info' | 'warning' | 'success';
}

export interface QuestionBlock {
  type: 'question';
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation?: string;
}

export type ContentBlock = TextBlock | ImageBlock | CalloutBlock | QuestionBlock;

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const blockTypes = [
  { type: 'text', label: 'Văn bản', icon: Type },
  { type: 'image', label: 'Hình ảnh', icon: Image },
  { type: 'callout', label: 'Callout', icon: MessageSquare },
  { type: 'question', label: 'Câu hỏi', icon: HelpCircle },
];

function createEmptyBlock(type: string): ContentBlock {
  switch (type) {
    case 'text':
      return { type: 'text', paragraphs: [''] };
    case 'image':
      return { type: 'image', src: '', alt: '' };
    case 'callout':
      return { type: 'callout', text: '', variant: 'info' };
    case 'question':
      return {
        type: 'question',
        question: '',
        options: [
          { id: '1', text: '', isCorrect: true },
          { id: '2', text: '', isCorrect: false },
        ],
      };
    default:
      return { type: 'text', paragraphs: [''] };
  }
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [showAddMenu, setShowAddMenu] = useState<number | null>(null);

  function addBlock(type: string, index: number) {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 0, createEmptyBlock(type));
    onChange(newBlocks);
    setShowAddMenu(null);
  }

  function updateBlock(index: number, block: ContentBlock) {
    const newBlocks = [...blocks];
    newBlocks[index] = block;
    onChange(newBlocks);
  }

  function removeBlock(index: number) {
    const newBlocks = blocks.filter((_, i) => i !== index);
    onChange(newBlocks);
  }

  function moveBlock(index: number, direction: 'up' | 'down') {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[newIndex]] = [
      newBlocks[newIndex],
      newBlocks[index],
    ];
    onChange(newBlocks);
  }

  function renderBlockEditor(block: ContentBlock, index: number) {
    switch (block.type) {
      case 'text':
        return (
          <TextBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'image':
        return (
          <ImageBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'callout':
        return (
          <CalloutBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'question':
        return (
          <QuestionBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      default:
        return null;
    }
  }

  function getBlockLabel(type: string) {
    return blockTypes.find((b) => b.type === type)?.label || type;
  }

  return (
    <div className="space-y-4">
      {/* Add block at start */}
      <div className="relative">
        <button
          onClick={() => setShowAddMenu(showAddMenu === 0 ? null : 0)}
          className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm block</span>
        </button>

        {showAddMenu === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-2">
            <div className="grid grid-cols-2 gap-2">
              {blockTypes.map((bt) => {
                const Icon = bt.icon;
                return (
                  <button
                    key={bt.type}
                    onClick={() => addBlock(bt.type, 0)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{bt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Blocks */}
      {blocks.map((block, index) => (
        <div key={index} className="relative group">
          {/* Block wrapper */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Block header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-600">
                  {getBlockLabel(block.type)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Di chuyển lên"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === blocks.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Di chuyển xuống"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeBlock(index)}
                  className="p-1 text-gray-400 hover:text-red-500"
                  title="Xóa block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Block content */}
            <div className="p-4">{renderBlockEditor(block, index)}</div>
          </div>

          {/* Add block button after each block */}
          <div className="relative mt-2">
            <button
              onClick={() =>
                setShowAddMenu(showAddMenu === index + 1 ? null : index + 1)
              }
              className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm block</span>
            </button>

            {showAddMenu === index + 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-2">
                <div className="grid grid-cols-2 gap-2">
                  {blockTypes.map((bt) => {
                    const Icon = bt.icon;
                    return (
                      <button
                        key={bt.type}
                        onClick={() => addBlock(bt.type, index + 1)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{bt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {blocks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Chưa có nội dung. Nhấn &quot;Thêm block&quot; để bắt đầu.
        </div>
      )}
    </div>
  );
}
