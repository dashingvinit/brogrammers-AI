const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeGoogleSearch(query) {
  try {
    const url = `https://www.google.com/search?q=${query.replace(
      ' ',
      '+'
    )}&tbm=vid`;

    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
    };
    const response = await axios.get(url, { headers });

    const $ = cheerio.load(response.data);

    // Find all search result links
    const searchResults = $('div.g');

    // Extract YouTube video URLs from search results, limit to top 5
    const suggestedVideos = [];
    let count = 0;
    searchResults.each((index, result) => {
      if (count >= 5) {
        return false; // Break out of the loop
      }
      const link = $(result)
        .find('a[href^="https://www.youtube.com"]')
        .attr('href');
      if (link) {
        const videoIdMatch = link.match(/(?<=v=)[^&#]+/);
        if (videoIdMatch) {
          const videoId = videoIdMatch[0];
          suggestedVideos.push(`https://www.youtube.com/embed/${videoId}`);
          count++;
        }
      }
    });

    return suggestedVideos;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

module.exports = {
  scrapeGoogleSearch,
};
