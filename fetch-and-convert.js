import fs from 'fs/promises';
import fetch from 'node-fetch';

async function fetchRuleContent(url) {
  try {
    const response = await fetch(url);
    const content = await response.text();
    
    // Sanitize and limit content if needed
    return content.trim().length > 0 ? content : 'No detailed content available.';
  } catch (error) {
    console.error(`Error fetching rule content from ${url}:`, error);
    return 'Unable to fetch rule content.';
  }
}

async function fetchAndParseMarkdown(url) {
  try {
    const response = await fetch(url);
    const markdownText = await response.text();
    const lines = markdownText.split('\n');
    
    // First, try to load existing data to preserve static sections
    let existingData = {};
    try {
      existingData = JSON.parse(await fs.readFile('./data/cursorrules.json', 'utf8'));
    } catch (error) {
      console.log('No existing data found, creating new data structure');
    }

    const parsedContent = {
      title: existingData.title || '',
      intro: existingData.intro || '',
      howTo: existingData.howTo || '',
      whyCursorrules: existingData.whyCursorrules || [],
      lastUpdated: new Date().toISOString(),
      rules: [] 
    };

    let currentSection = null;
    let currentMainCategory = '';
    let currentSubcategory = '';

    for (const line of lines) {
        // Section detection
      if (line.startsWith('## ')) {
        const sectionName = line.replace('## ', '').trim().toLowerCase();
        
          if (sectionName === 'rules') {
          currentSection = 'rules';
          continue;
        } else {
          currentSection = null;
        }
      }

      // In rules section, handle main categories and subcategories
        if (currentSection === 'rules') {
          // Main category detection (first level heading in rules)
          if (line.startsWith('## ')) {
            currentMainCategory = line.replace('## ', '').trim();
            currentSubcategory = ''; // Reset subcategory
            continue;
          }

          // Subcategory detection (second level heading in rules)
          if (line.startsWith('### ')) {
            currentSubcategory = line.replace('### ', '').trim();
            continue;
          }

          // Rule parsing
          const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            const name = linkMatch[1];
            const originalLink = linkMatch[2];
            
            // Resolve relative URLs
            const resolvedLink = new URL(originalLink, url).href;

            // Fetch rule content
            const ruleContent = await fetchRuleContent(resolvedLink);

            parsedContent.rules.push({
              name: name,
              link: resolvedLink,
              mainCategory: currentMainCategory,
              subcategory: currentSubcategory,
              content: ruleContent || 'Unable to fetch rule content'
            });
          }
        }
     //Content parsing based on sections
        if (currentSection !== 'rules'){
           if (line.startsWith('# ')) {
             parsedContent.title = line.replace('# ', '').trim();
             continue;
           }
           
          if (line.startsWith('## intro')) {
             currentSection = 'intro';
             continue;
          } else if (line.startsWith('## how to')) {
             currentSection = 'howTo';
             continue;
          } else if (line.startsWith('## why .cursorrules?')) {
             currentSection = 'whyCursorrules';
             continue;
          }
          
          if (currentSection === 'intro' && line.trim() !== '') {
              parsedContent.intro += line.trim() + ' ';
          }
         
         if (currentSection === 'howTo' && line.trim() !== '') {
              parsedContent.howTo += line.trim() + ' ';
         }
         
          if (currentSection === 'whyCursorrules' && line.trim() !== '' && line.indexOf('##') === -1) {
              parsedContent.whyCursorrules.push(line.trim());
          }
       }
    }
     // Trim and clean up text fields
    parsedContent.intro = parsedContent.intro.trim();
    parsedContent.howTo = parsedContent.howTo.trim();

    return parsedContent;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return null;
  }
}

async function saveJsonData() {
  const markdownUrl = 'https://raw.githubusercontent.com/PatrickJS/awesome-cursorrules/main/README.md';
  
  try {
    const parsedContent = await fetchAndParseMarkdown(markdownUrl);
    
    if (parsedContent) {
      // Ensure the data directory exists
      await fs.mkdir('./data', { recursive: true });
      
      // Save the parsed content to a JSON file
      await fs.writeFile(
        './data/cursorrules.json', 
        JSON.stringify(parsedContent, null, 2)
      );
      
      console.log('Rules data successfully fetched and updated');
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Run the save function
saveJsonData();