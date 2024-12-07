import { ChatMistralAI } from '@langchain/mistralai';
const { MISTRAL_KEY } = require('../config/server-config');

export const createMistralChatModel = () => {
  return new ChatMistralAI({
    apiKey: MISTRAL_KEY,
    modelName: 'mistral-7b-latest',
  });
};
