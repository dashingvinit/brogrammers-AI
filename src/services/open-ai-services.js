const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_KEY } = require('../config/server-config');
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { CourseRepository, TopicRepository } = require('../repositories');
const { scrapeGoogleSearch } = require('./scrap-services');

const courseRepository = new CourseRepository();
const topicRepository = new TopicRepository();

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

async function getRoadMap(title, syllabus, userId, time) {
  try {
    const prompt = `give a content table on the topic ${title} which includes these subtopics ${syllabus} and covers all the topics that can be completed in total ${time} and give each topic's time based roadmap. The roadmap should be structured and the output should be in JSON format like this, here is the example '{"units": [{"title": "Unit 1","time": "6 hours","topics": ["Topic 1", "Topic 2", "Topic 3"]},{"title": "Unit 2","time": "5 hours","topics": ["Topic 1", "Topic 2", "Topic 3"]}]}' just return JSON dont give additional texts or explanations`;

    // Generate content using the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let units = await response.text();

    units = units.trim().replace(/^```json\n|```$/g, '');
    units = JSON.parse(units);

    // Create the course
    const course = await courseRepository.create({
      userId: userId,
      title: title,
      units: units.units,
    });

    return course;
  } catch (error) {
    if (error.response) {
      // Handle errors returned by genAI
      console.error('genAI error response:', error.response.data);
    } else {
      // Handle other errors
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
    const prompt = `Elaborate the ${title} which is a subtopic of ${subject} and provide suitable explanations and examples, such as code snippets, bullet points, graphs, illustrations, or anything that react-markdown supports.Keep the content concise and readable. The explanation should be completed. Use img and videos if possible in markdown.
    Return the data in properly formatted markdown language, ensuring it supports react-markdown. Make sure to include proper headings, subheadings, for improved readability and tables should be properly formatted for react-markdown.`;

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

async function getSummary(title) {
  try {
    const prompt = `Summarize the topic ${title}, provide summary as a heading and content, keypoints, and formulas if exisits. Provide heading and content in a json object array.
    Return the data in properly formatted markdown language, ensuring it supports react-markdown. Make sure to include proper headings, subheadings, and spaces between paragraphs for improved readability and tables should be properly formatted for react-markdown.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let data = await response.text();
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

async function getImproved(object) {
  try {
    const prompt = `Here is a blog model with data provided by the user: ${JSON.stringify(
      object
    )}. Can you improve the content of the entire blog without adding anything fake, just improve the language and sentence formation to make it more readable and engaging? Return in nicely formated markdown language`;

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
  getRoadMap,
  getTopic,
  getSummary,
  getImproved,
};
