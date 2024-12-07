const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { GEMINI_KEY } = require('../../config/server-config');

class GeminiModelFactory {
  static createModel(options = {}) {
    return new ChatGoogleGenerativeAI({
      apiKey: GEMINI_KEY,
      modelName: 'gemini-1.5-flash',
      maxOutputTokens: 2048,
      ...options,
    });
  }
}

module.exports = GeminiModelFactory;
