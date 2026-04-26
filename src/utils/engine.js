export const evaluateCondition = (condition, answers) => {
  if (!condition) return true;

  const orParts = condition.split('||').map(s => s.trim());
  for (const part of orParts) {
    const andParts = part.split('&&').map(s => s.trim());
    let andResult = true;
    for (const subPart of andParts) {
      const match = subPart.match(/([a-zA-Z0-9_]+)\.answer\s*==\s*'([^']+)'/);
      if (match) {
        const [, nodeId, value] = match;
        if (answers[nodeId]?.id !== value) {
          andResult = false;
          break;
        }
      } else {
        andResult = false;
        break;
      }
    }
    if (andResult) return true;
  }
  return false;
};

export const interpolateText = (text, answers) => {
  if (!text) return '';
  return text.replace(/\{([a-zA-Z0-9_]+)\.answer_text\}/g, (match, nodeId) => {
    return answers[nodeId]?.text || match;
  });
};
