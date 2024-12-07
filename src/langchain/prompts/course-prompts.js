const { ChatPromptTemplate } = require('@langchain/core/prompts');

const documentPrompt = ChatPromptTemplate.fromTemplate(`
  Answer the following question:
  Context: {context}
  Question: {input}
`);

module.exports = {
  documentPrompt,
};
