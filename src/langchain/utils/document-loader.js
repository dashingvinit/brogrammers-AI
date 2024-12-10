const { DirectoryLoader } = require('langchain/document_loaders/fs/directory');
const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');

class DocumentLoader {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async load() {
    const directoryLoader = new DirectoryLoader(this.filePath, {
      '.pdf': (path) => new PDFLoader(path),
    });

    const directoryDocs = await directoryLoader.load();

    return directoryDocs;
  }
}

module.exports = DocumentLoader;
