const { SystemMessage, HumanMessage } = require('@langchain/core/messages');

const PROMPT_TEMPLATES = {
  CODE_EXPLAINER: (code) => [
    new SystemMessage(`
      Explain the following code in simple terms. Format your response in markdown with:
      - A brief overview as the first paragraph
      - Use ### for section headers
      - Code examples in \`\`\`language blocks
      - Bullet points for key concepts
      - Clear paragraph breaks between sections
    `),
    new HumanMessage(code),
  ],

  PROBLEM_EXPLAINER: (problemStatement) => [
    new SystemMessage(`
      Provide a detailed explanation for the following problem statement. Format your response in markdown with:
      - ### Problem Understanding as first section
      - ### Key Concepts as second section
      - Use bullet points for listing important points
      - dont include solution
    `),
    new HumanMessage(problemStatement),
  ],

  CODE_COMPLEXITY: (code) => [
    new SystemMessage(`
     Analyze the provided code and return the worst-case time complexity and space complexity in Big O notation. Respond strictly in the following JSON format: {"tc": "O(n)", "sc": "O(1)"}. Use standard notations: O(1), O(logn), O(n), O(nlogn), O(n^2), O(n^3), O(2^n). Do not include any additional text or explanations.
    `),
    new HumanMessage(code),
  ],

  FEEDBACK_REPORT: (code) => [
    new SystemMessage(`
      Provide a feedback report for this code. Format your response in markdown with:
      - ### Code Quality Overview as first section
      - ### Strengths as second section
      - ### Areas for Improvement as third section
      - ### Recommendations as fourth section
      - Use bullet points for specific feedback items
      - Include code examples in \`\`\`language blocks
    `),
    new HumanMessage(code),
  ],

  HINT_GENERATOR: (problemStatement, previousHint) => [
    new SystemMessage(`
      Provide a hint for the following problem. Format your response in markdown with:
      - Start with a ### Hint header
      - Use bullet points for step-by-step guidance
      - Include relevant concepts in *italic*
      - Put example cases in \`code blocks\`
      - Keep hints subtle but helpful
    `),
    new HumanMessage(`Problem: ${problemStatement}`),
    new HumanMessage(`Previous Hint: ${previousHint || 'Start with the first hint'}`),
  ],
};

module.exports = PROMPT_TEMPLATES;
