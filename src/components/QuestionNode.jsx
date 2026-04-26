export default function QuestionNode({ node, onAnswer }) {
  return (
    <div key={node.id} className="animate-fade-in flex flex-col h-full justify-between">
      <div>
        <span className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-3 block">Question</span>
        <h2 className="text-2xl font-semibold text-slate-800 leading-snug mb-8">
          {node.text}
        </h2>
      </div>
      
      <div className="flex flex-col gap-3 mt-4">
        {node.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(node.id, option, node.next)}
            className="text-left w-full p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 text-slate-700 text-lg group"
          >
            <span className="font-medium text-slate-400 group-hover:text-blue-500 mr-3">{option.id}.</span>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
