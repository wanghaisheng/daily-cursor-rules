import { fetchAndParseMarkdown } from './markdown-parser.js';
import { renderSite } from './site-renderer.js';

// Add smooth scrolling and active link highlighting
function setupNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const sections = new Map([
    ['#rules-container', document.getElementById('rules-container')],
    ['#setup-guide', document.getElementById('setup-guide')],
    ['#twitter-feed', document.getElementById('twitter-feed')],
    ['#youtube-feed', document.getElementById('youtube-feed')],
    ['#jike-feed', document.getElementById('jike-feed')]
  ]);

  function highlightActiveLink() {
    let foundActive = false;
    
    sections.forEach((section, hash) => {
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= 100;
      
      const link = document.querySelector(`.nav-link[href="${hash}"]`);
      if (!link) return;
      
      if (isInView && !foundActive) {
        link.classList.add('active');
        foundActive = true;
      } else {
        link.classList.remove('active');
      }
    });
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', highlightActiveLink);
  window.addEventListener('resize', highlightActiveLink);
}

// Add to main function
async function main() {
  setupNavigation();
  const markdownUrl = 'https://raw.githubusercontent.com/PatrickJS/awesome-cursorrules/main/README.md';
  const parsedContent = await fetchAndParseMarkdown(markdownUrl);
  renderSite(parsedContent);
}

main().catch(console.error);