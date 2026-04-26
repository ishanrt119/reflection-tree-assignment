import QuestionNode from './QuestionNode';
import ReflectionNode from './ReflectionNode';
import BasicNode from './BasicNode';
import SummaryNode from './SummaryNode';

export default function NodeRenderer({ node, onNext, onAnswer, answers, onRestart }) {
  switch (node.type) {
    case 'start':
    case 'bridge':
    case 'end':
      return <BasicNode node={node} onNext={onNext} onRestart={onRestart} />;
    case 'question':
      return <QuestionNode node={node} onAnswer={onAnswer} />;
    case 'reflection':
      return <ReflectionNode node={node} onNext={onNext} answers={answers} />;
    case 'summary':
      return <SummaryNode node={node} onNext={onNext} answers={answers} onRestart={onRestart} />;
    default:
      return <div>Unknown node type: {node.type}</div>;
  }
}
