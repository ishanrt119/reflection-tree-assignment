import { interpolateText } from '../utils/engine';

export default function ReflectionNode({ node, onNext, answers }) {
  const text = interpolateText(node.text, answers);

  return (
    <div key={node.id} className="animate-fade-in">
      <span className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-3 block">Observation</span>
      <h2 className="text-xl font-medium text-slate-700 leading-relaxed mb-10">
        {text}
      </h2>
      
      <div className="flex justify-end">
        <button
          onClick={() => onNext(node.next)}
          className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
