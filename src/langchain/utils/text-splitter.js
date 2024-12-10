const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');

class TextSplitter {
  constructor(chunkSize = 1000, chunkOverlap = 50) {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });
  }

  async split(documents) {
    return await this.splitter.splitDocuments(documents);
  }
}

module.exports = TextSplitter;
