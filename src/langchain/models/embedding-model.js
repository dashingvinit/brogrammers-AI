const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { TaskType } = require('@google/generative-ai');
const { GEMINI_KEY } = require('../../config/server-config');

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: GEMINI_KEY,
  model: 'text-embedding-004',
  taskType: TaskType.RETRIEVAL_DOCUMENT,
});

module.exports = embeddings;
