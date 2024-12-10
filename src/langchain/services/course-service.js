const DocumentLoader = require('../utils/document-loader');
const TextSplitter = require('../utils/text-splitter.js');
const PineconeVectorStore = require('../utils/pinecone-vector-store');
const { ExtractionChain } = require('../chains/course-extraction-chain');
const { RetrievalChain } = require('../chains/retrieval-chain');
const { Pinecone } = require('@pinecone-database/pinecone');

const path = require('path');
const fs = require('fs');

class CourseService {
  constructor(embeddings, model) {
    this.embeddings = embeddings;
    this.model = model;
    this.pineconeIndex = new Pinecone().Index(process.env.PINECONE_INDEX);
  }

  async saveCourse(userId, title) {
    try {
      console.log('Saving course...', userId, title);
      const filePath = path.join(__dirname, `../../config/uploads/${userId}/${title}`);

      // Load and split documents
      const directoryLoader = new DocumentLoader(filePath);
      const directoryDocs = await directoryLoader.load();

      const textSplitter = new TextSplitter();
      const splitDocs = await textSplitter.split(directoryDocs);

      // Clean up uploaded files
      await fs.promises.rm(filePath, { recursive: true, force: true });

      console.log('Split docs:', splitDocs.length);

      // Add metadata
      const documentsWithMetadata = splitDocs.map((doc) => ({
        ...doc,
        metadata: {
          ...doc.metadata,
          organizationId: `${userId}_${title}`,
          fileName: title,
        },
      }));

      // Save to vector store
      const vectorStore = await PineconeVectorStore.fromExistingIndex(
        this.embeddings,
        this.pineconeIndex,
        `${userId}_${title}`
      );
      console.log('Adding documents to vector store...');

      await vectorStore.addDocuments(documentsWithMetadata);

      // Extract units
      const extractionChain = new ExtractionChain(this.model);

      const { units, summary } = await extractionChain.extract(splitDocs);

      return { units: JSON.parse(units), keyNotes: summary };
    } catch (error) {
      console.error('Error saving course:', error);
      throw error;
    }
  }

  async getAnswer(userId, title, input) {
    try {
      const retrievalChain = new RetrievalChain(
        this.model,
        this.embeddings,
        this.pineconeIndex,
        userId,
        title
      );
      const answer = await retrievalChain.retrieve(input);

      return answer;
    } catch (error) {
      console.error('Error getting answer:', error);
      throw error;
    }
  }

  async getContext(userId, title, input) {
    const vectorStore = await PineconeVectorStore.fromExistingIndex(
      this.embeddings,
      this.pineconeIndex,
      `${userId}_${title}`
    );

    input = JSON.stringify(input);

    const retriever = vectorStore.asRetriever({
      k: 4,
      filter: {
        organizationId: `${userId}_${title}`,
      },
    });

    const context = await retriever.invoke(input);
    const contextString = context.map((doc) => doc.pageContent).join('\n');
    return contextString;
  }
}

module.exports = CourseService;
