const CourseService = require('./services/course-service');
const { embeddings, GeminiModelFactory } = require('./models');
const model = GeminiModelFactory.createModel();

const courseService = new CourseService(embeddings, model);
module.exports = courseService;

// const GeminiModelFactory = require('./models/gemini-model');
// const embeddings = require('./models/embedding-model');
// const fs = require('fs');

// const { ChatPromptTemplate } = require('@langchain/core/prompts');
// const OutputParserFactory = require('./utils/output-parser');
// const parser = OutputParserFactory.createStringParser();
// const jsonParser = OutputParserFactory.parseComplexityResponse;

// const { SystemMessage, HumanMessage } = require('@langchain/core/messages');
// const { createStuffDocumentsChain } = require('langchain/chains/combine_documents');
// const { createRetrievalChain } = require('langchain/chains/retrieval');

// const { DirectoryLoader } = require('langchain/document_loaders/fs/directory');
// const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');
// const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
// const path = require('path');

// const { PineconeStore } = require('@langchain/pinecone');
// const { Pinecone } = require('@pinecone-database/pinecone');

// const pinecone = new Pinecone();
// const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

// const model = GeminiModelFactory.createModel();

// const dotenv = require('dotenv');
// dotenv.config();

// const saveCourse = async (userId, title) => {
//   console.log('Saving course...', new Date().toISOString());
//   const filePath = path.join(__dirname, `../config/uploads/${userId}/${title}`);
//   const directoryLoader = new DirectoryLoader(filePath, {
//     '.pdf': (path) => new PDFLoader(path),
//   });

//   const directoryDocs = await directoryLoader.load();

//   const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 1000,
//     chunkOverlap: 50,
//   });

//   const splitDocs = await textSplitter.splitDocuments(directoryDocs);
//   const documentsWithMetadata = splitDocs.map((doc) => ({
//     ...doc,
//     metadata: {
//       ...doc.metadata,
//       organizationId: `${userId}_${title}`,
//       fileName: title,
//     },
//   }));
//   const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
//     pineconeIndex,
//     maxConcurrency: 5,
//     namespace: `${userId}_${title}`,
//   });
//   await vectorStore.addDocuments(documentsWithMetadata);
//   const { units, summary } = await extractUnit(splitDocs);

//   await fs.promises.rm(filePath, { recursive: true, force: true });

//   return { units: JSON.parse(units), keyNotes: summary };
// };

// const getAnswer = async (userId, title, input) => {
//   const prompt = ChatPromptTemplate.fromTemplate(`
//         Answer the following question if the context is not relevant answer with "Not in your course but here is what I know about it" if user is greets or something like that respond accordingly:
//         Context: {context}
//         Question: {input}
//       `);

//   const chain = await createStuffDocumentsChain({
//     llm: model,
//     prompt,
//   });

// const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
//   pineconeIndex,
//   maxConcurrency: 5,
//   namespace: `${userId}_${title}`,
// });

// const retriever = vectorStore.asRetriever({
//   k: 10,
//   filter: {
//     organizationId: `${userId}_${title}`,
//   },
// });

// const retrievalChain = await createRetrievalChain({
//   combineDocsChain: chain,
//   retriever,
// });

//   const res = await retrievalChain.invoke({
//     input: input,
//   });

//   return res.answer;
// };

// const extractUnit = async (splitDocs) => {
//   console.log('Extracting units...');
//   const extractionPrompt = (documentChunk) => [
//     new SystemMessage(`
//           Analyze the given document chunk and extract:
//           - Potential Course Units (if applicable)
//           - Specific Topics within those units
//           - Try grouping subtopics that are definations of the topic.
//           - To make it concise, in the cover section, give a description of what it needs to cover.
//           - If a topic is not related to the course, ignore it
//           - keep it simple and concise
//           - Generate a summary of the entire chunk.(if applicable else ignore)
//           - Give a title to the summary. (if applicable else ignore)

//           Response Format:
//           - If no clear units/topics are found, return an empty array
//           - Provide a structured JSON response with the following schema:

//               {
//                 [
//                   {
//                     "title": "Unit Name",
//                     topics: [
//                     { name: { type: String },
//                      cover: { short desc what it needs to cover.} //short description of what it needs to cover.
//                     }
//                     ],
//                   },
//                 ],
//                   "summary": { title: { type: String }, content: { type: String } } //summary of the entire chunk.
//               }

//           Guidelines:
//           - Be concise and precise
//           - Only extract units/topics that are explicitly present in the text
//           - Merge subtopics that are just definations of the topic.
//           - If the chunk seems to be part of a larger context, provide a best-effort extraction
//           - Ignore headers, footers, and non-content text
//         `),
//     new HumanMessage(documentChunk.pageContent),
//   ];

//   const consolidationPrompt = (extractedUnits) => [
//     new SystemMessage(`
//       Task: Consolidate and Refine Extracted Course Units and Topics

//       Input: An array of extracted units from multiple document chunks

//       Objectives:
//       1. Remove Duplicate Units and Topics
//       2. Merge Similar or Related Units
//       3. Create a Concise and Comprehensive Course Structure

//       Consolidation Guidelines:
//       - Identify and eliminate exact duplicate units and topics
//       - Merge units with highly similar names or overlapping content
//       - Preserve the most comprehensive and representative unit names
//       - Ensure no redundant or repetitive topics remain
//       - Prioritize clarity and educational progression
//       - Clean up unnecessary topics and subtopics, and merge them if they are just definations of the topic.

//       Output Format: Return a JSON object with the following structure:

//       units:[
//             {
//               title: "Consolidated Unit Name",
//             topics: [{ name: { type: String }, cover: { type: String } }]
//           }
//         ]

//       Important Constraints:
//       - Maintain the original intent and scope of the extracted units
//       - If unsure about merging, prefer keeping units separate
//       - Aim for a logical and coherent course structure
//     `),
//     new HumanMessage(JSON.stringify(extractedUnits)),
//   ];

//   const extractedUnitsRaw = [];
//   const extractedSummary = [];

//   // Extract units from each document chunk
//   for (const doc of splitDocs) {
//     const chain = model.pipe(parser);
//     const res = await chain.invoke(extractionPrompt(doc));
//     // Only add non-empty results
//     if (res && res.length > 0) {
//       extractedUnitsRaw.push(...res);
//       const summary = JSON.parse(jsonParser(res));
//       if (summary.summary != undefined) extractedSummary.push(summary.summary);
//     }
//   }

//   console.log('Summarizing units...');
//   // Consolidate the extracted units
//   const chain = model.pipe(parser);
//   const consolidatedUnits = await chain.invoke(consolidationPrompt(extractedUnitsRaw));
//   console.log('finished extracting units at time:', new Date().toISOString());
//   return { units: jsonParser(consolidatedUnits), summary: extractedSummary };
// };

// module.exports = {
//   saveCourse,
//   getAnswer,
// };
