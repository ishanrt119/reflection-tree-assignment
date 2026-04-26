import { interpolateText } from '../utils/engine';

export default function SummaryNode({ node, onNext, answers, onRestart }) {
  const text = interpolateText(node.text, answers);
  const paragraphs = text.split('\n\n');

  return (
    <div key={node.id} className="animate-fade-in">
      <span className="text-sm font-semibold text-blue-500 tracking-wider uppercase mb-3 block">Daily Synthesis</span>
      
      <div className="space-y-6 mb-10">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-lg text-slate-700 leading-relaxed">{p}</p>
        ))}
      </div>
      
      <div className="flex justify-end gap-3">
        <button
          onClick={onRestart}
          className="px-6 py-3 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
        >
          Restart
        </button>
        <button
          onClick={() => onNext(node.next)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
        >
          Complete Session
        </button>
      </div>
    </div>
  );
}
