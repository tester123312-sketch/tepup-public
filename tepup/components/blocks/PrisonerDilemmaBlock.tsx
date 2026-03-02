'use client';

import { useState, useMemo } from 'react';
import type { PrisonerDilemmaBlock as PrisonerDilemmaBlockType } from '@/lib/types/content';

interface Props {
  block: PrisonerDilemmaBlockType;
  onComplete?: () => void;
}

type Choice = 'cooperate' | 'defect';

interface RoundResult {
  playerChoice: Choice;
  opponentChoice: Choice;
  playerScore: number;
  opponentScore: number;
}

export default function PrisonerDilemmaBlockComponent({ block, onComplete }: Props) {
  const [currentRound, setCurrentRound] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const getOpponentChoice = (round: number, playerHistory: Choice[]): Choice => {
    switch (block.opponentStrategy) {
      case 'always-cooperate': return 'cooperate';
      case 'always-defect': return 'defect';
      case 'tit-for-tat':
        return round === 0 ? 'cooperate' : playerHistory[round - 1];
      case 'random':
        return Math.random() > 0.5 ? 'cooperate' : 'defect';
      default: return 'cooperate';
    }
  };

  const getPayoff = (playerChoice: Choice, opponentChoice: Choice): [number, number] => {
    if (playerChoice === 'cooperate' && opponentChoice === 'cooperate') return block.payoffMatrix.bothCooperate;
    if (playerChoice === 'defect' && opponentChoice === 'defect') return block.payoffMatrix.bothDefect;
    if (playerChoice === 'cooperate') return block.payoffMatrix.oneCooperates;
    return [block.payoffMatrix.oneCooperates[1], block.payoffMatrix.oneCooperates[0]];
  };

  const handleChoice = (choice: Choice) => {
    const playerHistory = results.map(r => r.playerChoice);
    const opponentChoice = getOpponentChoice(currentRound, playerHistory);
    const [playerScore, opponentScore] = getPayoff(choice, opponentChoice);

    const newResult: RoundResult = {
      playerChoice: choice,
      opponentChoice,
      playerScore,
      opponentScore,
    };

    setResults(prev => [...prev, newResult]);

    if (currentRound >= block.rounds - 1) {
      setIsFinished(true);
      onComplete?.();
    } else {
      setCurrentRound(prev => prev + 1);
    }
  };

  const totalPlayerScore = results.reduce((sum, r) => sum + r.playerScore, 0);
  const totalOpponentScore = results.reduce((sum, r) => sum + r.opponentScore, 0);

  const player = block.players[0] || { name: 'Bạn', icon: '🧑' };
  const opponent = block.players[1] || { name: 'Đối thủ', icon: '🤖' };

  return (
    <div className="my-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-4">
        <h3 className="text-white font-bold text-lg">{block.title || 'Thế lưỡng nan'}</h3>
        <p className="text-white/70 text-sm mt-1">Vòng {Math.min(currentRound + 1, block.rounds)}/{block.rounds}</p>
      </div>

      <div className="p-5">
        {/* Scenario */}
        <div className="bg-violet-50 rounded-xl p-3 mb-4 border border-violet-100">
          <p className="text-sm text-gray-700">{block.scenario}</p>
        </div>

        {/* Payoff matrix */}
        <div className="mb-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th className="p-2"></th>
                <th className="p-2 text-center bg-green-50 rounded-tl-lg">{opponent.icon} Hợp tác</th>
                <th className="p-2 text-center bg-red-50 rounded-tr-lg">{opponent.icon} Phản bội</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 font-semibold bg-green-50 rounded-tl-lg">{player.icon} Hợp tác</td>
                <td className="p-2 text-center bg-green-50 border border-green-200">
                  <span className="text-green-700 font-bold">{block.payoffMatrix.bothCooperate[0]}</span>
                  <span className="text-gray-400"> / </span>
                  <span className="text-green-700 font-bold">{block.payoffMatrix.bothCooperate[1]}</span>
                </td>
                <td className="p-2 text-center bg-yellow-50 border border-yellow-200">
                  <span className="text-red-600 font-bold">{block.payoffMatrix.oneCooperates[0]}</span>
                  <span className="text-gray-400"> / </span>
                  <span className="text-green-700 font-bold">{block.payoffMatrix.oneCooperates[1]}</span>
                </td>
              </tr>
              <tr>
                <td className="p-2 font-semibold bg-red-50 rounded-bl-lg">{player.icon} Phản bội</td>
                <td className="p-2 text-center bg-yellow-50 border border-yellow-200">
                  <span className="text-green-700 font-bold">{block.payoffMatrix.oneCooperates[1]}</span>
                  <span className="text-gray-400"> / </span>
                  <span className="text-red-600 font-bold">{block.payoffMatrix.oneCooperates[0]}</span>
                </td>
                <td className="p-2 text-center bg-red-50 border border-red-200">
                  <span className="text-orange-600 font-bold">{block.payoffMatrix.bothDefect[0]}</span>
                  <span className="text-gray-400"> / </span>
                  <span className="text-orange-600 font-bold">{block.payoffMatrix.bothDefect[1]}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-1 text-center">Điểm: Bạn / Đối thủ</p>
        </div>

        {/* Score board */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center border border-blue-200">
            <p className="text-xs text-gray-500">{player.icon} {player.name}</p>
            <p className="text-2xl font-bold text-blue-700">{totalPlayerScore}</p>
          </div>
          <div className="flex-1 bg-purple-50 rounded-xl p-3 text-center border border-purple-200">
            <p className="text-xs text-gray-500">{opponent.icon} {opponent.name}</p>
            <p className="text-2xl font-bold text-purple-700">{totalOpponentScore}</p>
          </div>
        </div>

        {/* Round history */}
        {results.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-1.5 flex-wrap">
              {results.map((r, i) => (
                <div key={i} className="flex items-center gap-0.5 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-[10px] text-gray-400">V{i + 1}</span>
                  <span className={`text-xs font-bold ${r.playerChoice === 'cooperate' ? 'text-green-600' : 'text-red-600'}`}>
                    {r.playerChoice === 'cooperate' ? '🤝' : '🗡️'}
                  </span>
                  <span className="text-[10px] text-gray-300">vs</span>
                  <span className={`text-xs font-bold ${r.opponentChoice === 'cooperate' ? 'text-green-600' : 'text-red-600'}`}>
                    {r.opponentChoice === 'cooperate' ? '🤝' : '🗡️'}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    ({r.playerScore}/{r.opponentScore})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Choice buttons */}
        {!isFinished && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleChoice('cooperate')}
              className="p-4 rounded-xl border-2 border-green-300 bg-green-50 hover:bg-green-100 transition-all text-center"
            >
              <span className="text-2xl mb-1 block">🤝</span>
              <span className="font-semibold text-green-700">Hợp tác</span>
            </button>
            <button
              onClick={() => handleChoice('defect')}
              className="p-4 rounded-xl border-2 border-red-300 bg-red-50 hover:bg-red-100 transition-all text-center"
            >
              <span className="text-2xl mb-1 block">🗡️</span>
              <span className="font-semibold text-red-700">Phản bội</span>
            </button>
          </div>
        )}

        {/* Results */}
        {isFinished && (
          <div>
            <div className={`p-4 rounded-xl text-center mb-4 ${
              totalPlayerScore > totalOpponentScore ? 'bg-green-50 border border-green-200' :
              totalPlayerScore === totalOpponentScore ? 'bg-yellow-50 border border-yellow-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <p className="font-bold text-lg text-gray-800">
                {totalPlayerScore > totalOpponentScore ? 'Bạn thắng!' :
                 totalPlayerScore === totalOpponentScore ? 'Hòa!' : 'Đối thủ thắng!'}
              </p>
              <p className="text-sm text-gray-500">
                {player.name}: {totalPlayerScore} điểm | {opponent.name}: {totalOpponentScore} điểm
              </p>
            </div>

            {!showExplanation ? (
              <button
                onClick={() => setShowExplanation(true)}
                className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
              >
                Xem bài học
              </button>
            ) : (
              <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                <p className="text-sm font-semibold text-violet-700 mb-1">Bài học từ Lý thuyết Trò chơi</p>
                <p className="text-sm text-gray-700 leading-relaxed">{block.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
