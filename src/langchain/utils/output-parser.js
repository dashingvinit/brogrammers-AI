const { StringOutputParser } = require('@langchain/core/output_parsers');

class OutputParserFactory {
  static createStringParser() {
    return new StringOutputParser();
  }

  static parseComplexityResponse(response) {
    return response
      .replace(/```json|```/g, '')
      .replace(/\n/g, '')
      .trim();
  }
}

module.exports = OutputParserFactory;
