const GeminiModelFactory = require('../models/gemini-model');
const PROMPT_TEMPLATES = require('../prompts/code-prompt');
const OutputParserFactory = require('../utils/output-parser');

const model = GeminiModelFactory.createModel();
const parser = OutputParserFactory.createStringParser();
const complexityParser = OutputParserFactory.parseComplexityResponse;

const chains = {
  codeExplainerChain: (code) => ({
    messages: PROMPT_TEMPLATES.CODE_EXPLAINER(code),
    pipeline: model.pipe(parser),
  }),

  problemExplainerChain: (problemStatement) => ({
    messages: PROMPT_TEMPLATES.PROBLEM_EXPLAINER(problemStatement),
    pipeline: model.pipe(parser),
  }),

  codeComplexityChain: (code) => ({
    messages: PROMPT_TEMPLATES.CODE_COMPLEXITY(code),
    pipeline: model.pipe(parser).pipe(complexityParser),
  }),

  feedbackReportChain: (code) => ({
    messages: PROMPT_TEMPLATES.FEEDBACK_REPORT(code),
    pipeline: model.pipe(parser),
  }),

  hintGeneratorChain: (problemStatement, previousHint) => ({
    messages: PROMPT_TEMPLATES.HINT_GENERATOR(problemStatement, previousHint),
    pipeline: model.pipe(parser),
  }),
};

module.exports = chains;
