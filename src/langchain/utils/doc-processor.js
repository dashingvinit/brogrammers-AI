const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const path = require('path');

const loadPDF = (filePath) => {
  const loader = new PDFLoader(filePath);
  return loader.load();
};

const splitDocument = async (docs, chunkSize = 1000, chunkOverlap = 200) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
  });
  return await textSplitter.splitDocuments(docs);
};

module.exports = {
  loadPDF,
  splitDocument,
};
