const { ChatPromptTemplate } = require('@langchain/core/prompts');
const { createStuffDocumentsChain } = require('langchain/chains/combine_documents');
const { createRetrievalChain } = require('langchain/chains/retrieval');
const { PineconeStore } = require('@langchain/pinecone');

class RetrievalChain {
  constructor(model, embeddings, pineconeIndex, userId, title) {
    this.model = model;
    this.embeddings = embeddings;
    this.pineconeIndex = pineconeIndex;
    this.userId = userId;
    this.title = title;
  }

  _createPrompt() {
    return ChatPromptTemplate.fromTemplate(`
      Answer the following question if the context is not relevant answer with "Could not find the answer in the course" if user greets or something like that respond accordingly, output should be in markdown format with lists:
      Context: {context}
      Question: {input}
    `);
  }

  async retrieve(input) {
    const prompt = this._createPrompt();

    const chain = await createStuffDocumentsChain({
      llm: this.model,
      prompt,
    });

    const vectorStore = await PineconeStore.fromExistingIndex(this.embeddings, {
      pineconeIndex: this.pineconeIndex,
      maxConcurrency: 5,
      namespace: `${this.userId}_${this.title}`,
    });

    const retriever = vectorStore.asRetriever({
      k: 10,
      filter: {
        organizationId: `${this.userId}_${this.title}`,
      },
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: chain,
      retriever,
    });

    const res = await retrievalChain.invoke({ input });
    return res.answer;
  }
}

module.exports = { RetrievalChain };
