'use client';

import { useState } from 'react';
import type { CauseEffectChainBlock as CauseEffectChainBlockType } from '@/lib/types/content';

interface Props {
  block: CauseEffectChainBlockType;
  onComplete?: () => void;
}

interface Connection {
  fromId: string;
  toId: string;
}

export default function CauseEffectChainBlockComponent({ block, onComplete }: Props) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedFrom, setSelectedFrom] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleNodeClick = (nodeId: string) => {
    if (hasSubmitted) return;

    if (!selectedFrom) {
      setSelectedFrom(nodeId);
    } else if (selectedFrom === nodeId) {
      setSelectedFrom(null);
    } else {
      // Check if connection already exists
      const exists = connections.some(c => c.fromId === selectedFrom && c.toId === nodeId);
      if (exists) {
        setConnections(prev => prev.filter(c => !(c.fromId === selectedFrom && c.toId === nodeId)));
      } else {
        setConnections(prev => [...prev, { fromId: selectedFrom, toId: nodeId }]);
      }
      setSelectedFrom(null);
    }
  };

  const handleRemoveConnection = (fromId: string, toId: string) => {
    if (hasSubmitted) return;
    setConnections(prev => prev.filter(c => !(c.fromId === fromId && c.toId === toId)));
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    onComplete?.();
  };

  const isConnectionCorrect = (conn: Connection) => {
    return block.correctConnections.some(
      c => c.fromId === conn.fromId && c.toId === conn.toId
    );
  };

  const getMissingConnections = () => {
    return block.correctConnections.filter(
      correct => !connections.some(c => c.fromId === correct.fromId && c.toId === correct.toId)
    );
  };

  const correctCount = hasSubmitted
    ? connections.filter(isConnectionCorrect).length
    : 0;
  const extraCount = hasSubmitted
    ? connections.filter(c => !isConnectionCorrect(c)).length
    : 0;
  const missingCount = hasSubmitted ? getMissingConnections().length : 0;

  const getNodeConnections = (nodeId: string) => {
    const outgoing = connections.filter(c => c.fromId === nodeId);
    const incoming = connections.filter(c => c.toId === nodeId);
    return { outgoing, incoming };
  };

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
        <h3 className="text-white font-bold text-lg">{block.title || 'Chuỗi Nhân-Quả'}</h3>
        {block.instruction && <p className="text-white/70 text-sm mt-1">{block.instruction}</p>}
      </div>

      <div className="p-5">
        {!hasSubmitted && (
          <div className="bg-orange-50 rounded-xl p-3 mb-4 border border-orange-100">
            <p className="text-sm text-gray-700">
              {selectedFrom
                ? `Đã chọn "${block.nodes.find(n => n.id === selectedFrom)?.text}". Click vào nút tiếp theo để nối.`
                : 'Click vào nút nguyên nhân trước, rồi click vào nút hệ quả để tạo liên kết.'}
            </p>
          </div>
        )}

        {/* Nodes */}
        <div className="flex flex-wrap gap-3 mb-4 justify-center">
          {block.nodes.map(node => {
            const isSelected = selectedFrom === node.id;
            const { outgoing, incoming } = getNodeConnections(node.id);
            const hasConnections = outgoing.length > 0 || incoming.length > 0;

            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                disabled={hasSubmitted}
                className={`px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium max-w-[200px] ${
                  isSelected
                    ? 'border-orange-500 bg-orange-100 text-orange-800 scale-105 shadow-md'
                    : hasSubmitted
                    ? 'border-gray-200 bg-gray-50 text-gray-700'
                    : hasConnections
                    ? 'border-blue-300 bg-blue-50 text-blue-800 hover:border-blue-400'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                {node.category && (
                  <span className="text-[10px] text-gray-400 block mb-0.5">{node.category}</span>
                )}
                {node.text}
              </button>
            );
          })}
        </div>

        {/* Connection list */}
        {connections.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Liên kết đã tạo ({connections.length}):
            </p>
            <div className="space-y-1.5">
              {connections.map((conn, i) => {
                const fromNode = block.nodes.find(n => n.id === conn.fromId);
                const toNode = block.nodes.find(n => n.id === conn.toId);
                const correct = hasSubmitted ? isConnectionCorrect(conn) : null;

                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                      correct === true ? 'bg-green-50 border border-green-200' :
                      correct === false ? 'bg-red-50 border border-red-200' :
                      'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <span className="font-medium text-gray-800">{fromNode?.text}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-medium text-gray-800">{toNode?.text}</span>
                    {hasSubmitted && (
                      <span className="ml-auto text-xs">
                        {correct ? '✅' : '❌'}
                      </span>
                    )}
                    {!hasSubmitted && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveConnection(conn.fromId, conn.toId);
                        }}
                        className="ml-auto text-gray-400 hover:text-red-500 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Missing connections (after submit) */}
        {hasSubmitted && missingCount > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Liên kết bị thiếu:</p>
            <div className="space-y-1.5">
              {getMissingConnections().map((conn, i) => {
                const fromNode = block.nodes.find(n => n.id === conn.fromId);
                const toNode = block.nodes.find(n => n.id === conn.toId);
                return (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-yellow-50 border border-yellow-200 text-sm">
                    <span className="font-medium text-yellow-800">{fromNode?.text}</span>
                    <span className="text-yellow-400">→</span>
                    <span className="font-medium text-yellow-800">{toNode?.text}</span>
                    <span className="ml-auto text-xs">⚠️ Thiếu</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Submit */}
        {!hasSubmitted && connections.length > 0 && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
          >
            Kiểm tra chuỗi nhân-quả
          </button>
        )}

        {!hasSubmitted && connections.length === 0 && (
          <p className="text-sm text-gray-400 text-center">Tạo ít nhất 1 liên kết để kiểm tra</p>
        )}

        {/* Results */}
        {hasSubmitted && (
          <div className="space-y-3" aria-live="polite">
            <div className={`p-4 rounded-xl text-center ${
              correctCount === block.correctConnections.length && extraCount === 0
                ? 'bg-green-50 border border-green-200'
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <p className={`font-semibold ${
                correctCount === block.correctConnections.length && extraCount === 0
                  ? 'text-green-700' : 'text-blue-700'
              }`}>
                {correctCount}/{block.correctConnections.length} liên kết đúng
                {extraCount > 0 && ` | ${extraCount} liên kết thừa`}
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <p className="text-sm font-semibold text-orange-700 mb-1">Giải thích</p>
              <p className="text-sm text-gray-700 leading-relaxed">{block.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
