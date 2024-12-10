const { SystemMessage, HumanMessage } = require('@langchain/core/messages');

const COURSE_PROMPT = {
  _createExtractionPrompt: (documentChunk) => [
    new SystemMessage(`
        Analyze the given document chunk to extract potential course structure. Group topics within units and combine their descriptions into a single summary.
  
        Output Format:
        {
          units: [
            {
              title: "Unit Name",
              topics: [
                { 
                  name: "Topic names",
                  cover: "All the topics within that needs to be covered" 
                }
              ]
            }
          ],
          summary: { 
            title: String, 
            content: String 
          }
        }
  
        Guidelines:
        - Identify key units based on the chunk's content.
        - Group related topics under each unit.
        - Write the combined description of grouped topics under the 'topicsSummary' field.
        - Ensure the response is concise and coherent.
      `),
    new HumanMessage(documentChunk.pageContent),
  ],

  _createConsolidationPrompt: (extractedUnits) => [
    new SystemMessage(`
        Task: Consolidate and Refine Extracted Units and Topics Summaries
  
        Objectives:
        1. Remove duplicate or redundant units.
        2. Merge related units.
        3. Topic name should containt the topics it covers.
        4. Topic cover should be a concise description of all the topics it covers.
        5. Ensure the response is concise and coherent.
  
        Output Format:
        {
          units: [
            {
              title: "Consolidated Unit Name",
              topics: [
                { 
                  name: "Topic name" , 
                  cover: "All the topics within that needs to be covered" 
                }
              ]
            }
          ]
        }
      `),
    new HumanMessage(JSON.stringify(extractedUnits)),
  ],
};
module.exports = COURSE_PROMPT;
