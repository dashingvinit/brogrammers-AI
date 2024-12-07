import { ChatOpenAI } from 'langchain/chat_models/openai';

export const createOpenAIChatModel = (temperature = 0.7) => {
  return new ChatOpenAI({
    temperature,
    modelName: 'gpt-3.5-turbo',
  });
};
