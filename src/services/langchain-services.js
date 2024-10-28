const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { ChatMistralAI } = require('@langchain/mistralai');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { ChatPromptTemplate } = require('@langchain/core/prompts');

const model = new ChatMistralAI({
  apiKey: '5HZOdqa3f0brHUDjHdkBuMXM3wQfTcZQ',
  model: 'mistral-large-latest',
  temperature: 0,
});
const parser = new StringOutputParser();

const messages = [
  new SystemMessage(`Translate the following from English into Italian`),
  new HumanMessage('Hello'),
];

async function translateAndPrint() {
  try {
    const chain = model.pipe(parser);
    const result = await chain.invoke(messages);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

translateAndPrint();
