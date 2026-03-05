'use client';

import { useState } from 'react';
import type { HiddenPatternBlock as HiddenPatternBlockType } from '@/lib/types/content';
import { Search, ArrowUpDown, Check, X } from 'lucide-react';

interface Props {
  block: HiddenPatternBlockType;
  onComplete?: () => void;
}

export default function HiddenPatternBlockComponent({ block, onComplete }: Props) {
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const handleSort = (colIndex: number) => {
    if (checked) return;
    if (sortColumn === colIndex) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(colIndex);
      setSortAsc(true);
    }
  };

  const sortedRows = [...block.table.rows];
  if (sortColumn !== null) {
    sortedRows.sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB), 'vi')
        : String(valB).localeCompare(String(valA), 'vi');
    });
  }

  const isCorrect = checked && block.options.find(o => o.id === selectedAnswer)?.isCorrect;

  const handleCheck = () => {
    setChecked(true);
    if (block.options.find(o => o.id === selectedAnswer)?.isCorrect) {
      onComplete?.();
    }
  };

  return (
    <div className="mb-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-6 h-6 text-emerald-600" aria-hidden="true" />
        <h3 className="text-lg font-bold text-gray-900">{block.title || 'Tìm pattern ẩn'}</h3>
      </div>

      <p className="text-gray-700 mb-4">{block.instruction}</p>

      {/* Data table */}
      <div className="overflow-x-auto mb-6 -mx-2">
        <table className="w-full text-sm">
          <thead>
            <tr>
              {block.table.headers.map((header, i) => {
                const isHighlighted = checked && isCorrect && block.highlightColumns?.includes(i);
                return (
                  <th
                    key={i}
                    onClick={() => handleSort(i)}
                    className={`
                      px-3 py-2.5 text-left font-semibold cursor-pointer select-none
                      transition-colors border-b-2
                      ${isHighlighted
                        ? 'bg-emerald-200 border-emerald-400 text-emerald-900'
                        : 'bg-white/60 border-gray-200 text-gray-700 hover:bg-white/80'
                      }
                      ${i === 0 ? 'rounded-tl-lg' : ''}
                      ${i === block.table.headers.length - 1 ? 'rounded-tr-lg' : ''}
                    `}
                  >
                    <div className="flex items-center gap-1">
                      {header}
                      <ArrowUpDown className={`w-3.5 h-3.5 ${sortColumn === i ? 'text-emerald-600' : 'text-gray-300'}`} aria-hidden="true" />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white/40' : 'bg-white/70'}>
                {row.map((cell, cellIdx) => {
                  const isHighlighted = checked && isCorrect && block.highlightColumns?.includes(cellIdx);
                  return (
                    <td
                      key={cellIdx}
                      className={`
                        px-3 py-2 border-b border-gray-100 transition-colors
                        ${isHighlighted ? 'bg-emerald-100 font-semibold text-emerald-900' : 'text-gray-700'}
                        ${typeof cell === 'number' ? 'tabular-nums text-right' : ''}
                      `}
                    >
                      {typeof cell === 'number' ? cell.toLocaleString('vi-VN') : cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sort hint */}
      {!checked && (
        <p className="text-xs text-gray-400 mb-4 italic">💡 Click vào tiêu đề cột để sắp xếp dữ liệu</p>
      )}

      {/* Question */}
      <div className="bg-white/60 rounded-xl p-4">
        <p className="text-gray-900 font-medium mb-3">{block.question}</p>

        <div className="space-y-2">
          {block.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const showCorrect = checked && option.isCorrect;
            const showWrong = checked && isSelected && !option.isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => !checked && setSelectedAnswer(option.id)}
                disabled={checked}
                className={`
                  w-full p-3 text-left rounded-xl border-2 transition-all text-sm
                  ${showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showWrong
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                  ${checked ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-2">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${showCorrect ? 'border-green-500 bg-green-500'
                      : showWrong ? 'border-red-500 bg-red-500'
                      : isSelected ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300'}
                  `}>
                    {showCorrect && <Check className="w-3 h-3 text-white" aria-hidden="true" />}
                    {showWrong && <X className="w-3 h-3 text-white" aria-hidden="true" />}
                    {isSelected && !checked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <span className={`${showCorrect ? 'text-green-700 font-medium' : showWrong ? 'text-red-700' : isSelected ? 'text-emerald-700 font-medium' : 'text-gray-700'}`}>
                    {option.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Check button */}
        {!checked && selectedAnswer && (
          <button
            onClick={handleCheck}
            className="mt-3 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Kiểm tra
          </button>
        )}

        {/* Explanation */}
        {checked && (
          <div aria-live="polite" className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
            <p className={`${isCorrect ? 'text-green-700' : 'text-blue-700'} leading-relaxed`}>
              <span className="font-semibold">{isCorrect ? 'Chính xác! ' : 'Giải thích: '}</span>
              {block.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
