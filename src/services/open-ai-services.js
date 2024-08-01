const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_KEY } = require('../config/server-config');
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

const AppError = require('../utils/errors/app-error');
const {
  StatusCodes,
  HTTP_VERSION_NOT_SUPPORTED,
} = require('http-status-codes');
const { CourseRepository, TopicRepository } = require('../repositories');
const { scrapeGoogleSearch } = require('./scrap-services');

const topicRepository = new TopicRepository();

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function getQnAs(title, topic, userPrompt) {
  try {
    const prompt = `Generate some ${userPrompt} questions and answers on ${topic} from ${title},
    The markdown content should be properly formated so that its readable. This should contain some critical questions as well. Format the response in JSON as follows:
    {"questions": [{"question": "question 1","ans": "answer"},{"question": "question 2","ans": "answer"}...]}`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    let questions = response.trim().replace(/^```json\n|```$/g, '');
    questions = JSON.parse(questions);
    return questions.questions;
  } catch (error) {
    console.log('keynotes error', error);
  }
}

async function getKeyNotes(title) {
  const keyPrompt = `Generate a summary on the topic "${title}", using references from the subtopics containing the following sections:
- Important definations & formulas
- Differences , this vs that 
- Essential concepts (definations)
- Important topics to keep in mind
- Important questions
- Critical dates and events (if applicable)
- Notable figures and their contributions (if applicable)
 The markdown content should be properly formated so that its readable. Dont put JSON inside content feild. The keynotes should serve as review notes. Format the response in JSON as follows:
{"keyNotes": [{"title": "title 1","content": "content"},{"title": "title 2","content": "content"}...]}`;

  try {
    const result = await model.generateContent(keyPrompt);
    const response = await result.response.text();
    let keyNotes = response.trim().replace(/^```json\n|```$/g, '');
    keyNotes = JSON.parse(keyNotes);
    return keyNotes.keyNotes;
  } catch (error) {
    console.log('keynotes error', error);
  }
}

async function getRoadMap(title, time) {
  const roadMapPrompt = `generate a roadmap for ${title} in JSON format based on the provided time.

The roadmap should include units with titles, estimated time, and topics.

Determine the number of units based on ${time}:
  * For ${time} < 10, create 2-3 units.
  * For 10 <= ${time} < 20, create 4-6 units.
  * For ${time} >= 20, create 6+ units.

Allocate time to each unit proportionally based on the total time and number of units.

For each unit:
  * Generate a title relevant to the overall topic.
  * Estimate time based on the allocated time.
  * Create topics related to the unit's title.
  
 Here is the example: '{"units": [{"title": "Unit 1","time": "25 mins","topics": ["Topic 1", "Topic 2", "Topic 3"]},{"title": "Unit 2","time": "1 hour","topics": ["Topic 1", "Topic 2", "Topic 3"]}]}' just return JSON dont give additional texts or explanations`;

  try {
    const result = await model.generateContent(roadMapPrompt);
    const response = await result.response;
    let units = await response.text();
    units = units.trim().replace(/^```json\n|```$/g, '');
    units = JSON.parse(units);

    return units.units;
  } catch (error) {
    if (error.response) {
      console.error('genAI error response:', error.response.data);
    } else {
      console.error('An error occurred:', error.message);
    }
    throw new AppError(
      'Something went wrong while generating the roadmap. Please try again later.',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getTopic(id, subject, title, time) {
  try {
    const prompt = `## ${title} A subtopic of ${subject}
    Content with Flair:

    Break the mold: Instead of bullet points everywhere, use a mix of formats like short paragraphs, concise explanations, and even fun facts.
    Hook 'em early: Start with an interesting anecdote, a thought-provoking question, or a relevant image to grab the reader's attention.
    Examples are king: Use real-world examples, case studies, or relatable scenarios to illustrate the concept.

    For all subjects: Leverage images, infographics, tables, graphs to visually explain complex points.
    For specific subjects:
    CSE (C++): Include relevant code snippets with clear comments explaining each line's purpose (formatted as code blocks).
    Mathematics: Utilize diagrams, charts, or equations (formatted with LaTeX or Mermaid syntax) to enhance understanding.
    Sciences: Integrate interactive elements like simulations or visualizations (depending on the platform) to make the learning experience dynamic.
    Prompt Tweaks:

    Maintain a conversational style: Imagine explaining the topic to a curious friend.
    Embrace enthusiasm: Show excitement for the subject and its applications.
    Tailor the tone: Adjust the formality depending on the target audience (e.g., more playful for kids, more professional for business topics, and a neutral tone for engineering topics).

    Keep it concise and information filled.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let data = await response.text();

    const suggestedVideos = await scrapeGoogleSearch(subject, title);
    if (!data || data == null)
      data = 'Gemini model couldnt generate for some reason';

    const topic = await topicRepository.create({
      courseId: id,
      title: title,
      markdownText: data,
      suggestedVideos: suggestedVideos,
    });
    return topic;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.response) {
      console.error('genAI error response:', error.response);
    } else {
      console.error('An error occurred:', error.message);
    }
    throw new AppError(
      'Cannot create a new Course object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getSummary(title) {
  try {
    const prompt = `Summarize the topic ${title}, provide summary as a heading and content, keypoints, and formulas if exisits. Provide heading and content in a json object array.
    Return the data in properly formatted markdown language, ensuring it supports react-markdown. Make sure to include proper headings, subheadings, and spaces between paragraphs for improved readability and tables should be properly formatted for react-markdown.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let data = await response.text();
    return data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.response) {
      console.error('genAI error response:', error.response);
    } else {
      console.error('An error occurred:', error.message);
    }
    throw new AppError(
      'Cannot create a new Course object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getImproved(object) {
  try {
    const prompt = `Here is a blog model with data provided by the user: ${JSON.stringify(
      object
    )}. Can you improve the content of the entire blog without fabricating new details, just join all the data fields and maybe write full forms if something is written in short form to make it more readable.Do very minor changes in the text just to make it readable. Blog might contain hindi words dont try to change them. Return in nicely formated markdown language`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let data = await response.text();
    return data;
  } catch (error) {
    if (error.response) {
      console.error('genAI error response:', error.response);
    } else {
      console.error('An error occurred:', error.message);
    }
    throw new AppError(
      'Something went wrong while generating the topic content. Please try again later.',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getKeyNotes,
  getQnAs,
  getRoadMap,
  getTopic,
  getSummary,
  getImproved,
};
