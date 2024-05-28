import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(topic):
    base_url = "https://en.wikipedia.org/wiki/"
    url = base_url + topic.replace(" ", "_")
    response = requests.get(url)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        content = soup.find('div', {'class': 'mw-parser-output'})
        paragraphs = content.find_all('p')
        
        topic_data = ""
        for p in paragraphs:
            topic_data += p.text
        return topic_data.strip()
    else:
        return None

# Example usage
topic = "NFA to DFA conversion"
wikipedia_data = scrape_wikipedia(topic)
print(wikipedia_data[:1000])  # Print the first 500 characters
