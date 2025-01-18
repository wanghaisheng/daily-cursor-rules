export async function fetchAndParseMarkdown(url) {
  try {
    const response = await fetch(url);
    const markdownText = await response.text();
    return parseMarkdown(markdownText, url);
  } catch (error) {
    console.error('Error fetching markdown:', error);
    return null;
  }
}

function parseMarkdown(markdown, baseUrl) {
  const lines = markdown.split('\n');
  const parsedContent = {
    title: '',
    intro: '',
    howTo: '',
    whyCursorrules: [],
    lastUpdated: new Date().toISOString(),
    rules: [] 
  };

  let currentSection = null;
  let currentMainCategory = '';
  let currentSubcategory = '';

  for (const line of lines) {
    // Extract title
    if (line.startsWith('# ')) {
      parsedContent.title = line.replace('# ', '').trim();
      continue;
    }

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
        const resolvedLink = new URL(originalLink, baseUrl).href;

        parsedContent.rules.push({
          name: name,
          link: resolvedLink,
          mainCategory: currentMainCategory,
          subcategory: currentSubcategory
        });
      }
    }
    
    // Content parsing based on sections
    if (currentSection !== 'rules'){
        
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
}