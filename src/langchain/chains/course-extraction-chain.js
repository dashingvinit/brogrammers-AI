const COURSE_PROMPT = require('../prompts/course-prompts');
const OutputParserFactory = require('../utils/output-parser');

class ExtractionChain {
  constructor(model) {
    this.model = model;
    this.parser = OutputParserFactory.createStringParser();
    this.jsonParser = OutputParserFactory.parseComplexityResponse;
  }

  async extract(splitDocs) {
    const extractedUnitsRaw = [];
    const extractedSummary = [];

    // Extract units from each document chunk
    for (const doc of splitDocs) {
      let res = await this.model
        .pipe(this.parser)
        .invoke(COURSE_PROMPT._createExtractionPrompt(doc));
      if (res && res.length > 0) {
        res = JSON.parse(this.jsonParser(res));
        extractedUnitsRaw.push(res.units);
        if (res.summary) extractedSummary.push(res.summary);
      }
    }

    // Consolidate the extracted units
    const chain = this.model.pipe(this.parser);
    const consolidatedUnits = await chain.invoke(
      COURSE_PROMPT._createConsolidationPrompt(extractedUnitsRaw)
    );

    return {
      units: this.jsonParser(consolidatedUnits),
      summary: extractedSummary,
    };
  }
}

module.exports = { ExtractionChain };
