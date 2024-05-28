import requests
from bs4 import BeautifulSoup
import re
import json

def scrape_google_search(query):
    try:
        url = f"https://www.google.com/search?q={query.replace(' ', '+')}"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all search result links
        search_results = soup.select('div.g')
        
        # Extract YouTube video URLs from search results, limit to top 5
        suggested_videos = []
        count = 0
        for result in search_results:
            if count >= 5:
                break
            link = result.find('a', href=True)['href']
            if 'youtube.com' in link:
                video_id = re.search(r'(?<=v=)[^&#]+', link)
                if video_id:
                    suggested_videos.append(f"https://www.youtube.com/embed/{video_id.group(0)}")
                    count += 1
        
        return suggested_videos
    
    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return []

# Example usage
query = "dfa to nfa videos"
suggested_videos = scrape_google_search(query)
# print("Suggested videos:", suggested_videos)

# Convert to JSON object if needed
json_result = json.dumps({"suggested_videos": suggested_videos})
print("JSON Result:", json_result)
