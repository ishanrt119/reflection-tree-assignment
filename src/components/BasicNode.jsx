import { LucideCheckCircle } from 'lucide-react';

export default function BasicNode({ node, onNext, onRestart }) {
  const isEnd = node.type === 'end';
  
  return (
    <div key={node.id} className="animate-fade-in text-center flex flex-col items-center justify-center py-8">
      {isEnd ? (
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <LucideCheckCircle className="w-8 h-8 text-green-500" />
        </div>
      ) : null}

      <h2 className="text-2xl font-semibold text-slate-800 leading-relaxed mb-10 max-w-lg">
        {node.text}
      </h2>
      
      {node.next && !isEnd && (
        <button
          onClick={() => onNext(node.next)}
          className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-lg shadow-sm"
        >
          {node.type === 'start' ? 'Begin Reflection' : 'Continue'}
        </button>
      )}

      {isEnd && (
        <button
          onClick={onRestart}
          className="px-8 py-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-lg"
        >
          Return Home
        </button>
      )}
    </div>
  );
}
