const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const chains = require('../langchain/chains/code-chain');

class CodeAnalysisService {
  async executeChain(chainFunc, ...args) {
    try {
      const { messages, pipeline } = chainFunc(...args);
      const response = await pipeline.invoke(messages);
      return response;
    } catch (error) {
      throw new AppError('Error during chain execution', StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
  }

  async codeExplainer(code) {
    return this.executeChain(chains.codeExplainerChain, code);
  }

  async problemExplainer(problemStatement) {
    return this.executeChain(chains.problemExplainerChain, problemStatement);
  }

  async codeComplexityAnalyzer(code) {
    return await this.executeChain(chains.codeComplexityChain, code);
  }

  async feedbackReport(code) {
    return this.executeChain(chains.feedbackReportChain, code);
  }

  async hintGenerator(problemStatement, previousHint) {
    return this.executeChain(chains.hintGeneratorChain, problemStatement, previousHint);
  }
}

module.exports = CodeAnalysisService;
