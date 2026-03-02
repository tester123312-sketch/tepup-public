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
  BookOpen,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Calculator,
  SlidersHorizontal,
  PieChart,
  Eye,
  Users,
  Thermometer,
} from 'lucide-react';
import TextBlockEditor from './TextBlockEditor';
import ImageBlockEditor from './ImageBlockEditor';
import CalloutBlockEditor from './CalloutBlockEditor';
import QuestionBlockEditor from './QuestionBlockEditor';
import LibraryDocumentBlockEditor from './LibraryDocumentBlockEditor';
import CalculatorBlockEditor from './CalculatorBlockEditor';
import SliderSimulatorBlockEditor from './SliderSimulatorBlockEditor';
import BudgetAllocatorBlockEditor from './BudgetAllocatorBlockEditor';
import BiasDetectorBlockEditor from './BiasDetectorBlockEditor';
import PerspectiveSwitchBlockEditor from './PerspectiveSwitchBlockEditor';
import HotColdGuessBlockEditor from './HotColdGuessBlockEditor';

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

export interface LibraryDocumentBlock {
  type: 'library-document';
  mode?: 'reference' | 'inline';
  documentId?: string;
  documentSlug?: string;
  title?: string;
  description?: string;
  category?: string;
  estimatedReadTime?: string;
  documentContent?: {
    sections: { heading?: string; paragraphs: string[] }[];
    relatedConcepts?: string[];
    furtherReading?: string[];
  };
}

// === Gamification block types (A1, A2, A3, B1, B3, C1) ===

export interface CalculatorBlock {
  type: 'calculator';
  title?: string;
  description?: string;
  calculatorType: 'tax' | 'compound-interest' | 'inflation' | 'custom';
  inputs: {
    id: string;
    label: string;
    type: 'number' | 'select';
    unit?: string;
    defaultValue: number;
    min?: number;
    max?: number;
    step?: number;
  }[];
  formula: string;
  outputs: {
    id: string;
    label: string;
    unit?: string;
    formula: string;
    highlight?: boolean;
  }[];
  presets?: { label: string; values: Record<string, number> }[];
  insight?: string;
}

export interface SliderSimulatorBlock {
  type: 'slider-simulator';
  title?: string;
  description?: string;
  sliders: {
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit?: string;
  }[];
  outputs: {
    id: string;
    label: string;
    formula: string;
    unit?: string;
    format?: 'number' | 'percent' | 'currency';
  }[];
  chart?: {
    type: 'bar';
    bars: { label: string; formula: string; color?: string }[];
  };
  breakpoints?: {
    condition: string;
    message: string;
    variant: 'info' | 'warning' | 'success';
  }[];
}

export interface BudgetAllocatorBlock {
  type: 'budget-allocator';
  title?: string;
  description?: string;
  totalBudget: number;
  unit?: string;
  categories: {
    id: string;
    label: string;
    icon?: string;
    color: string;
    defaultValue: number;
    minValue?: number;
    description?: string;
  }[];
  outcomes: {
    condition: string;
    title: string;
    description: string;
    variant: 'good' | 'neutral' | 'bad';
  }[];
  comparison?: { label: string; values: Record<string, number> };
}

export interface BiasDetectorBlock {
  type: 'bias-detector';
  title?: string;
  instruction: string;
  article: { text: string; source?: string };
  segments: {
    id: string;
    text: string;
    startIndex: number;
    biasType: string;
    explanation: string;
  }[];
  biasOptions: { id: string; label: string }[];
}

export interface PerspectiveSwitchBlock {
  type: 'perspective-switch';
  title?: string;
  event: string;
  perspectives: { id: string; role: string; icon?: string; narrative: string }[];
  question?: {
    text: string;
    options: { id: string; text: string; isCorrect: boolean }[];
    explanation?: string;
  };
}

export interface HotColdGuessBlock {
  type: 'hot-cold-guess';
  title?: string;
  question: string;
  answer: number;
  unit?: string;
  tolerance?: number;
  hints?: string[];
  context?: string;
}

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | CalloutBlock
  | QuestionBlock
  | LibraryDocumentBlock
  | CalculatorBlock
  | SliderSimulatorBlock
  | BudgetAllocatorBlock
  | BiasDetectorBlock
  | PerspectiveSwitchBlock
  | HotColdGuessBlock;

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const blockTypes = [
  { type: 'text', label: 'Văn bản', icon: Type },
  { type: 'image', label: 'Hình ảnh', icon: Image },
  { type: 'callout', label: 'Callout', icon: MessageSquare },
  { type: 'question', label: 'Câu hỏi', icon: HelpCircle },
  { type: 'library-document', label: 'Tài liệu thư viện', icon: BookOpen },
  { type: 'calculator', label: 'Máy tính (A1)', icon: Calculator },
  { type: 'slider-simulator', label: 'Simulator (A2)', icon: SlidersHorizontal },
  { type: 'budget-allocator', label: 'Phân bổ ngân sách (A3)', icon: PieChart },
  { type: 'bias-detector', label: 'Phát hiện thiên lệch (B1)', icon: Eye },
  { type: 'perspective-switch', label: 'Đa góc nhìn (B3)', icon: Users },
  { type: 'hot-cold-guess', label: 'Hot/Cold Guess (C1)', icon: Thermometer },
];

// Color map for each block type — uses inline styles to avoid Tailwind dynamic class issues
const BLOCK_BORDER_COLOR: Record<string, string> = {
  'text':               '#60a5fa', // blue-400
  'image':              '#c084fc', // purple-400
  'callout':            '#fbbf24', // amber-400
  'question':           '#34d399', // emerald-400
  'library-document':   '#818cf8', // indigo-400
  'calculator':         '#fb923c', // orange-400
  'slider-simulator':   '#22d3ee', // cyan-400
  'budget-allocator':   '#fb7185', // rose-400
  'bias-detector':      '#f87171', // red-400
  'perspective-switch': '#a78bfa', // violet-400
  'hot-cold-guess':     '#2dd4bf', // teal-400
};

function getBlockBorderColor(type: string): string {
  return BLOCK_BORDER_COLOR[type] ?? '#9ca3af';
}

function getBlockIcon(type: string) {
  return blockTypes.find((b) => b.type === type)?.icon || Type;
}

function getBlockPreview(block: ContentBlock): string {
  switch (block.type) {
    case 'text':
      return block.title || block.paragraphs[0]?.slice(0, 60) || '(chưa có nội dung)';
    case 'image':
      return block.alt || block.src || '(chưa có hình)';
    case 'callout':
      return block.title || block.text?.slice(0, 60) || '(chưa có nội dung)';
    case 'question':
      return block.question?.slice(0, 60) || '(chưa có câu hỏi)';
    case 'library-document':
      return block.title || '(chưa có tiêu đề)';
    case 'calculator':
      return block.title || `Máy tính: ${block.calculatorType}`;
    case 'slider-simulator':
      return block.title || '(Simulator)';
    case 'budget-allocator':
      return block.title || '(Phân bổ ngân sách)';
    case 'bias-detector':
      return block.title || block.instruction?.slice(0, 60) || '(Bias detector)';
    case 'perspective-switch':
      return block.title || block.event?.slice(0, 60) || '(Đa góc nhìn)';
    case 'hot-cold-guess':
      return block.title || block.question?.slice(0, 60) || '(Hot/Cold Guess)';
    default:
      return '(block)';
  }
}

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
    case 'library-document':
      return {
        type: 'library-document',
        title: '',
        description: '',
        documentContent: {
          sections: [{ paragraphs: [''] }],
        },
      };
    case 'calculator':
      return {
        type: 'calculator',
        title: '',
        calculatorType: 'custom',
        inputs: [{ id: 'x', label: '', type: 'number', defaultValue: 0, min: 0, max: 100, step: 1 }],
        formula: 'x',
        outputs: [{ id: 'result', label: 'Kết quả', formula: 'x' }],
      } as CalculatorBlock;
    case 'slider-simulator':
      return {
        type: 'slider-simulator',
        title: '',
        sliders: [{ id: 'value', label: '', min: 0, max: 100, step: 1, defaultValue: 50 }],
        outputs: [{ id: 'result', label: 'Kết quả', formula: 'value', format: 'number' }],
      } as SliderSimulatorBlock;
    case 'budget-allocator':
      return {
        type: 'budget-allocator',
        title: '',
        totalBudget: 100,
        categories: [
          { id: 'cat1', label: '', color: 'blue', defaultValue: 50, minValue: 0 },
          { id: 'cat2', label: '', color: 'green', defaultValue: 50, minValue: 0 },
        ],
        outcomes: [],
      } as BudgetAllocatorBlock;
    case 'bias-detector':
      return {
        type: 'bias-detector',
        instruction: '',
        article: { text: '' },
        segments: [],
        biasOptions: [{ id: 'emotional', label: 'Ngôn ngữ cảm xúc' }],
      } as BiasDetectorBlock;
    case 'perspective-switch':
      return {
        type: 'perspective-switch',
        title: '',
        event: '',
        perspectives: [
          { id: 'p1', role: '', icon: '👤', narrative: '' },
          { id: 'p2', role: '', icon: '👤', narrative: '' },
        ],
      } as PerspectiveSwitchBlock;
    case 'hot-cold-guess':
      return {
        type: 'hot-cold-guess',
        title: '',
        question: '',
        answer: 0,
        unit: '',
        tolerance: 10,
        hints: [],
      } as HotColdGuessBlock;
    default:
      return { type: 'text', paragraphs: [''] };
  }
}

// Hover-activated separator between blocks
interface BlockSeparatorProps {
  insertIndex: number;
  showAddMenu: number | null;
  onToggleMenu: (index: number | null) => void;
  onAddBlock: (type: string, index: number) => void;
}

function BlockSeparator({ insertIndex, showAddMenu, onToggleMenu, onAddBlock }: BlockSeparatorProps) {
  const isOpen = showAddMenu === insertIndex;

  return (
    <div className="relative group/sep h-8 flex items-center">
      {/* Thin line — subtle by default, blue on hover */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-100 group-hover/sep:bg-blue-200 transition-colors" />

      {/* + button — hidden by default, shown on hover */}
      <button
        onClick={() => onToggleMenu(isOpen ? null : insertIndex)}
        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border border-gray-200
                   text-gray-300 flex items-center justify-center
                   opacity-0 group-hover/sep:opacity-100 group-hover/sep:border-blue-300 group-hover/sep:text-blue-500
                   transition-all hover:bg-blue-50 z-10"
        title="Thêm block"
      >
        <Plus className="w-3 h-3" />
      </button>

      {/* Block type dropdown */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-2 w-72">
          <div className="grid grid-cols-2 gap-1">
            {blockTypes.map((bt) => {
              const Icon = bt.icon;
              return (
                <button
                  key={bt.type}
                  onClick={() => onAddBlock(bt.type, insertIndex)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-sm">{bt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [showAddMenu, setShowAddMenu] = useState<number | null>(null);
  const [collapsedBlocks, setCollapsedBlocks] = useState<Set<number>>(new Set());

  function toggleCollapse(index: number) {
    setCollapsedBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

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
    setCollapsedBlocks(new Set());
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
    setCollapsedBlocks(new Set());
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
      case 'library-document':
        return (
          <LibraryDocumentBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'calculator':
        return (
          <CalculatorBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'slider-simulator':
        return (
          <SliderSimulatorBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'budget-allocator':
        return (
          <BudgetAllocatorBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'bias-detector':
        return (
          <BiasDetectorBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'perspective-switch':
        return (
          <PerspectiveSwitchBlockEditor
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        );
      case 'hot-cold-guess':
        return (
          <HotColdGuessBlockEditor
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
    <div>
      {blocks.length === 0 ? (
        /* Empty state: clear button */
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(showAddMenu === 0 ? null : 0)}
            className="w-full py-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors flex flex-col items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Thêm block mới</span>
            <span className="text-xs text-gray-300">Bài học chưa có nội dung</span>
          </button>

          {showAddMenu === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-2">
              <div className="grid grid-cols-2 gap-1">
                {blockTypes.map((bt) => {
                  const Icon = bt.icon;
                  return (
                    <button
                      key={bt.type}
                      onClick={() => addBlock(bt.type, 0)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                      <span className="text-sm">{bt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Has blocks: thin separator at top + blocks */
        <>
          <BlockSeparator
            insertIndex={0}
            showAddMenu={showAddMenu}
            onToggleMenu={setShowAddMenu}
            onAddBlock={addBlock}
          />

          {blocks.map((block, index) => {
            const isCollapsed = collapsedBlocks.has(index);
            const borderColor = getBlockBorderColor(block.type);
            const BlockIcon = getBlockIcon(block.type);
            const preview = getBlockPreview(block);

            return (
              <div key={index}>
                {/* Block card */}
                <div
                  className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden"
                  style={{ borderLeft: `4px solid ${borderColor}` }}
                >
                  {/* Block header */}
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
                    {/* Left: index + icon + label + preview */}
                    <div className="flex items-center gap-2 min-w-0">
                      <GripVertical className="w-4 h-4 text-gray-300 cursor-move shrink-0" />
                      <span className="text-xs font-mono text-gray-400 tabular-nums shrink-0 w-6">
                        #{index + 1}
                      </span>
                      <BlockIcon
                        className="w-4 h-4 shrink-0"
                        style={{ color: borderColor }}
                      />
                      <span className="text-sm font-medium text-gray-600 shrink-0">
                        {getBlockLabel(block.type)}
                      </span>
                      {isCollapsed && (
                        <span className="text-sm text-gray-400 truncate">
                          — {preview}
                        </span>
                      )}
                    </div>

                    {/* Right: collapse toggle | move up/down | delete */}
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Collapse toggle */}
                      <button
                        onClick={() => toggleCollapse(index)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}
                      >
                        {isCollapsed
                          ? <ChevronDown className="w-4 h-4" />
                          : <ChevronUp className="w-4 h-4" />
                        }
                      </button>

                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-200 mx-0.5" />

                      {/* Move up */}
                      <button
                        onClick={() => moveBlock(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      {/* Move down */}
                      <button
                        onClick={() => moveBlock(index, 'down')}
                        disabled={index === blocks.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => removeBlock(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Xóa block"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Block content — hidden when collapsed */}
                  {!isCollapsed && (
                    <div className="p-4">{renderBlockEditor(block, index)}</div>
                  )}
                </div>

                {/* Separator after each block */}
                <BlockSeparator
                  insertIndex={index + 1}
                  showAddMenu={showAddMenu}
                  onToggleMenu={setShowAddMenu}
                  onAddBlock={addBlock}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
