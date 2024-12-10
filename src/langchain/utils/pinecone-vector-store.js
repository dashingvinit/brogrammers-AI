const { PineconeStore } = require('@langchain/pinecone');

class PineconeVectorStore {
  static async fromExistingIndex(embeddings, pineconeIndex, namespace) {
    return await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
      namespace,
    });
  }

  async addDocuments(documents) {
    await this.vectorStore.addDocuments(documents);
  }
}

module.exports = PineconeVectorStore;
