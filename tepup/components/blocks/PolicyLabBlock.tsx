'use client';

import { useState, useMemo } from 'react';
import type { PolicyLabBlock as PolicyLabBlockType } from '@/lib/types/content';

interface Props {
  block: PolicyLabBlockType;
  onComplete?: () => void;
}

function safeEval(formula: string, vars: Record<string, number>): number {
  try {
    let expr = formula;
    Object.entries(vars).forEach(([key, val]) => {
      expr = expr.replace(new RegExp(`\\b${key}\\b`, 'g'), String(val));
    });
    // Only allow numbers, operators, parentheses, Math functions
    if (!/^[\d\s+\-*/().,%<>=!&|?:Math.minmaxroundfloorceipowsqrtabs]+$/.test(expr)) return 0;
    return new Function(`return (${expr})`)() as number;
  } catch {
    return 0;
  }
}

export default function PolicyLabBlockComponent({ block, onComplete }: Props) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    block.policies.forEach(p => { initial[p.id] = p.defaultValue; });
    return initial;
  });
  const [hasInteracted, setHasInteracted] = useState(false);

  const indicators = useMemo(() => {
    return block.indicators.map(ind => ({
      ...ind,
      value: safeEval(ind.formula, values),
    }));
  }, [values, block.indicators]);

  const populations = useMemo(() => {
    return block.populations.map(pop => ({
      ...pop,
      impact: safeEval(pop.impactFormula, values),
    }));
  }, [values, block.populations]);

  const handleChange = (policyId: string, value: number) => {
    setValues(prev => ({ ...prev, [policyId]: value }));
    if (!hasInteracted) {
      setHasInteracted(true);
      onComplete?.();
    }
  };

  const formatValue = (value: number, format?: string) => {
    if (format === 'percent') return `${Math.round(value)}%`;
    return Math.round(value).toLocaleString('vi-VN');
  };

  const getImpactColor = (impact: number) => {
    if (impact > 60) return 'text-green-600 bg-green-50';
    if (impact > 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getImpactBar = (impact: number) => {
    if (impact > 60) return 'bg-green-400';
    if (impact > 30) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
        <h3 className="text-white font-bold text-lg">{block.title || 'Phòng thí nghiệm Chính sách'}</h3>
        {block.description && <p className="text-white/70 text-sm mt-1">{block.description}</p>}
      </div>

      <div className="p-5">
        {/* Context */}
        <div className="bg-indigo-50 rounded-xl p-3 mb-5 border border-indigo-100">
          <p className="text-sm text-gray-700">{block.context}</p>
        </div>

        {/* Policy sliders */}
        <div className="space-y-4 mb-6">
          <p className="text-sm font-semibold text-gray-700">Điều chỉnh chính sách:</p>
          {block.policies.map(policy => (
            <div key={policy.id} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {policy.icon && <span className="mr-1">{policy.icon}</span>}
                  {policy.label}
                </label>
                <span className="text-sm font-bold text-indigo-600">
                  {values[policy.id]}{policy.unit || ''}
                </span>
              </div>
              <input
                type="range"
                min={policy.min}
                max={policy.max}
                step={policy.step}
                value={values[policy.id]}
                onChange={(e) => handleChange(policy.id, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{policy.min}{policy.unit || ''}</span>
                <span>{policy.max}{policy.unit || ''}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Chỉ số tác động:</p>
          <div className="grid grid-cols-2 gap-3">
            {indicators.map(ind => {
              const inGoodRange = ind.goodRange
                ? ind.value >= ind.goodRange[0] && ind.value <= ind.goodRange[1]
                : true;
              return (
                <div key={ind.id} className={`p-3 rounded-xl border ${inGoodRange ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <p className="text-xs text-gray-500">{ind.icon && <span className="mr-1">{ind.icon}</span>}{ind.label}</p>
                  <p className={`text-xl font-bold ${inGoodRange ? 'text-green-700' : 'text-red-700'}`}>
                    {formatValue(ind.value, ind.format)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Population impact */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Tác động lên các nhóm dân cư:</p>
          <div className="space-y-2">
            {populations.map(pop => (
              <div key={pop.id} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{pop.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getImpactColor(pop.impact)}`}>
                    {pop.impact > 60 ? 'Tích cực' : pop.impact > 30 ? 'Trung bình' : 'Tiêu cực'}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${getImpactBar(pop.impact)}`}
                    style={{ width: `${Math.min(Math.max(pop.impact, 0), 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{pop.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insight */}
        {block.insight && hasInteracted && (
          <div className="mt-5 bg-indigo-50 rounded-xl p-3 border border-indigo-200">
            <p className="text-sm text-indigo-700">💡 {block.insight}</p>
          </div>
        )}
      </div>
    </div>
  );
}
