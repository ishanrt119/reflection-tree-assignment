import { useState, useEffect } from 'react';
import NodeRenderer from './components/NodeRenderer';
import treeData from '../reflection_tree.json';

export default function App() {
  const [currentNodeId, setCurrentNodeId] = useState('node_1');
  const [answers, setAnswers] = useState({});
  const [signals, setSignals] = useState({
    locus: { victim: 0, victor: 0, situational: 0 },
    orientation: { entitlement: 0, contribution: 0, balanced: 0 },
    radius: { self: 0, others: 0, balanced: 0 }
  });

  const currentNode = treeData.nodes.find(n => n.id === currentNodeId);

  useEffect(() => {
    if (currentNode && currentNode.type === 'decision') {
      import('./utils/engine').then(({ evaluateCondition }) => {
        for (const route of currentNode.routing) {
          if (evaluateCondition(route.condition, answers)) {
            setCurrentNodeId(route.next);
            return;
          }
        }
      });
    }
  }, [currentNodeId, answers, currentNode]);

  const handleNext = (nextNodeId) => {
    setCurrentNodeId(nextNodeId);
  };

  const handleAnswer = (nodeId, option, nextNodeId) => {
    setAnswers(prev => ({
      ...prev,
      [nodeId]: { id: option.id, text: option.text }
    }));

    if (option.signal) {
      setSignals(prev => {
        const newSignals = { ...prev };
        newSignals[option.signal.axis][option.signal.value] += option.signal.weight;
        return newSignals;
      });
    }

    setCurrentNodeId(nextNodeId);
  };

  const handleRestart = () => {
    setCurrentNodeId('node_1');
    setAnswers({});
    setSignals({
      locus: { victim: 0, victor: 0, situational: 0 },
      orientation: { entitlement: 0, contribution: 0, balanced: 0 },
      radius: { self: 0, others: 0, balanced: 0 }
    });
  };

  if (!currentNode || currentNode.type === 'decision') {
    return null;
  }

  // Simple progress calculation based on node ID (very rough estimate)
  // We can just track how many questions have been answered.
  const progress = Math.min(100, Math.floor((Object.keys(answers).length / 7) * 100));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl mb-4">
        <h1 className="text-xl font-medium text-slate-400">Daily Reflection</h1>
      </div>
      
      <main className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-12 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <NodeRenderer 
          node={currentNode} 
          onNext={handleNext}
          onAnswer={handleAnswer}
          answers={answers}
          onRestart={handleRestart}
        />
      </main>
    </div>
  );
}
