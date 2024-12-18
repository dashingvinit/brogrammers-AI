const { StatusCodes } = require('http-status-codes');
const { ProblemServices, SolutionServices, LangChainService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

const langChainService = new LangChainService();

async function getProblem(req, res) {
  try {
    const data = await ProblemServices.getProblem(req.params.id);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getExplanation(req, res) {
  try {
    const data = await langChainService.problemExplainer(req.body.data);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getHint(req, res) {
  try {
    const data = await langChainService.hintGenerator(
      req.body.problemStatement,
      req.body.prevHints
    );
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getVisual(req, res) {
  try {
    const data = await langChainService.codeExplainer(req.body.data);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function analyze(req, res) {
  try {
    let data = await langChainService.codeComplexityAnalyzer(req.body.data);
    const json = JSON.parse(data);
    successResponse.data = json;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getFeedback(req, res) {
  try {
    const data = await langChainService.feedbackReport(req.body.data);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function patchProblem(req, res) {
  try {
    const data = await ProblemServices.patchProblem(req.params.id, req.body);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  getProblem,
  patchProblem,
  getExplanation,
  getHint,
  getVisual,
  analyze,
  getFeedback,
};
