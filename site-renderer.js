export function renderSite(content) {
  if (!content) {
    // Handle initial loading state
    renderLoadingHero();
    return;
  }

  const navEl = document.getElementById('site-nav');
  const introEl = document.getElementById('intro');
  const howToEl = document.getElementById('how-to');
  const whyCursorrulesEl = document.getElementById('why-cursorrules');
  const rulesContainerEl = document.getElementById('rules-container');
  const paginationContainerEl = document.getElementById('pagination-container');
  const categoryFiltersEl = document.getElementById('category-filters');
  const searchInputEl = document.getElementById('search-input');
  const lastUpdatedDateEl = document.getElementById('last-updated-date');

  function renderLoadingHero() {
    const headerEl = document.getElementById('site-header');
    headerEl.innerHTML = `
      <div class="header-gradient rounded-lg shadow-2xl p-8 mb-6 animate-pulse">
        <div class="flex flex-col md:flex-row items-center justify-between relative z-10">
          <div class="md:w-2/3">
            <div class="h-10 bg-gray-300 mb-4 w-3/4 rounded"></div>
            <div class="h-8 bg-gray-300 mb-4 w-1/2 rounded"></div>
            <div class="h-6 bg-gray-300 mb-6 w-full rounded"></div>
            <div class="flex space-x-4">
              <div class="h-12 bg-gray-300 w-1/3 rounded"></div>
              <div class="h-12 bg-gray-300 w-1/3 rounded"></div>
            </div>
            
            <div class="mt-6 bg-gray-200 p-4 rounded-lg">
              <div class="h-6 bg-gray-300 mb-3 w-1/2 rounded"></div>
              <div class="h-4 bg-gray-300 w-full rounded"></div>
            </div>
          </div>
          
          <div class="hidden md:block">
            <div class="w-64 h-64 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        
        <div class="mt-4 text-sm opacity-70 flex items-center">
          <div class="h-4 bg-gray-300 w-1/4 rounded"></div>
        </div>
      </div>
    `;
  }

  function renderDynamicHero(content) {
    const headerEl = document.getElementById('site-header');
    headerEl.innerHTML = `
      <div class="header-gradient rounded-lg shadow-2xl p-8 mb-6">
        <div class="flex flex-col md:flex-row items-center justify-between relative z-10">
          <div class="md:w-2/3">
            <h1 class="text-4xl font-bold mb-4 flex items-center">
              <i class="ri-cursor-line mr-3 text-accent-primary"></i>${content.title || 'Cursor Rules'}
            </h1>
            <h2 class="text-2xl mb-4 opacity-90 font-semibold text-gray-700">
              ${content.intro ? content.intro.split(' ').slice(0, 15).join(' ') + '...' : 'Mastering the Art of Web Cursor Interaction Design'}
            </h2>
            <p class="text-lg mb-6 text-gray-600 leading-relaxed">
              ${content.howTo || 'Transform your web interfaces with strategic cursor behaviors. Learn how intelligent cursor design can dramatically enhance user experience, improve accessibility, and create more intuitive digital interactions.'}
            </p>
            <div class="flex space-x-4">
              <a href="https://github.com/PatrickJS/awesome-cursorrules" 
                 target="_blank" 
                 class="cta-button px-6 py-3 rounded-md flex items-center text-lg font-semibold">
                <i class="ri-github-fill mr-2"></i> Explore on GitHub
              </a>
              <a href="#rules-container" 
                 class="border border-tertiary-bg text-primary-text px-6 py-3 rounded-md hover:bg-accent-primary hover:text-white transition flex items-center text-lg font-semibold">
                <i class="ri-list-check mr-2"></i> Browse Cursor Rules
              </a>
            </div>
            
            <div class="mt-6 bg-secondary-bg p-4 rounded-lg">
              <h3 class="text-xl font-semibold mb-3 text-accent-primary">What Are Cursor Rules?</h3>
              <p class="text-primary-text opacity-90">
                ${content.whyCursorrules && content.whyCursorrules.length > 0 
                  ? content.whyCursorrules[0] 
                  : 'Cursor rules are advanced design guidelines that define how user cursors interact with web elements. They go beyond simple hover states, creating a language of interaction that improves usability, provides visual feedback, and enhances the overall user experience.'}
              </p>
            </div>
          </div>
          
          <div class="hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" width="250" height="250" class="opacity-80">
              <defs>
                <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#00bcd4;stop-opacity:0.5" />
                  <stop offset="100%" style="stop-color:#aed581;stop-opacity:0.5" />
                </linearGradient>
              </defs>
              <circle cx="125" cy="125" r="110" fill="url(#techGradient)" />
              <path d="M125 15 L125 235 M15 125 L235 125" stroke="#00bcd4" stroke-width="2" stroke-dasharray="10 10"/>
              <circle cx="125" cy="125" r="70" fill="rgba(0,188,212,0.1)" />
              <circle cx="125" cy="125" r="30" fill="#aed581" />
            </svg>
          </div>
        </div>
        
        <div class="mt-4 text-sm opacity-70 flex items-center">
          <i class="ri-verified-badge-fill mr-2 text-accent-primary"></i>
          Last Updated: <span id="last-updated-date">${content.lastUpdated ? new Date(content.lastUpdated).toLocaleDateString() : 'Loading...'}</span>
        </div>
      </div>
    `;
  }

  // Initial loading state
  renderLoadingHero();

  // When content is available, render the dynamic hero
  renderDynamicHero(content);

  // Render Intro
  if (content.intro) {
    introEl.innerHTML = `
      <div class="bg-white shadow rounded p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Intro</h2>
        <div class="text-gray-700">${content.intro}</div>
      </div>
    `;
  }

  // Dynamic rules grid rendering with responsive item count and filtering
  function calculateItemsPerPage() {
    const screenWidth = window.innerWidth;
    const itemHeight = 150; // Approximate height of a grid item
    const headerHeight = 300; // Approximate total height of header and other sections
    const availableHeight = window.innerHeight - headerHeight;
    const columnsCount = screenWidth < 768 ? 2 : 4; // 2 columns on mobile, 4 on desktop
    
    // Ensure at least 4 rows are always shown
    const minRows = 4;
    const minItemsPerPage = minRows * columnsCount;
    
    const dynamicRows = Math.floor(availableHeight / itemHeight);
    const dynamicItemsPerPage = Math.max(minRows, dynamicRows) * columnsCount;
    
    return dynamicItemsPerPage;
  }

  // Collect unique filter options: Main Categories and Subcategories
  const mainCategories = new Set();
  const subCategories = new Set();
  content.rules.forEach(rule => {
    if (rule.mainCategory) {
      mainCategories.add(rule.mainCategory.trim());
    }
     if(rule.subcategory){
      subCategories.add(rule.subcategory.trim());
    }
  });

  // Render category filters 
  categoryFiltersEl.innerHTML = `
    <div>
      <h3 class="font-semibold mb-2">Categories</h3>
      <div class="category-filters flex flex-wrap gap-2">
        ${Array.from(mainCategories).map(category => `
          <button 
            data-category="${category}" 
            class="filter-item category px-3 py-1 border rounded-md hover:bg-blue-100"
          >
            ${category}
          </button>
        `).join('')}
         ${Array.from(subCategories).map(category => `
          <button 
            data-category="${category}" 
            class="filter-item subcategory px-3 py-1 border rounded-md hover:bg-blue-100"
          >
            ${category}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Filter and search state
  let activeCategories = new Set();
  let searchQuery = '';

  function filterRules(currentPage = 1) {
    const itemsPerPage = calculateItemsPerPage();
    
    // Filter rules based on category and search query
    const filteredRules = content.rules.filter(rule => {
      const matchesCategories = activeCategories.size === 0 || 
        (rule.mainCategory && activeCategories.has(rule.mainCategory.trim()))||
        (rule.subcategory && activeCategories.has(rule.subcategory.trim()));
      
      const matchesSearch = !searchQuery || 
        rule.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategories && matchesSearch;
    });

    const totalItems = filteredRules.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredRules.slice(startIndex, endIndex);

    // Modify rule rendering to include data attributes for content
    rulesContainerEl.innerHTML = `
      <div class="bg-white shadow rounded p-4">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Rules</h2>
        <div class="rules-grid">
          ${pageItems.map(item => `
            <div 
              class="border rounded-lg p-4 hover:shadow-lg transition-all rule-card" 
              data-name="${item.name}" 
              data-content="${encodeURIComponent(item.content || '')}"
            >
              <a href="#" 
                 class="text-blue-600 font-semibold hover:text-blue-800 hover:underline rule-link" 
                 data-link="${item.link}">
                ${item.name}
              </a>
              ${item.mainCategory ? `<p class="text-xs text-gray-500 mt-1">${item.mainCategory}</p>` : ''}
               ${item.subcategory ? `<p class="text-xs text-gray-500 mt-1">${item.subcategory}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Render Pagination
    paginationContainerEl.innerHTML = `
      <nav aria-label="Pagination" class="inline-flex rounded-md shadow-sm">
        <button 
          onclick="changePage(${currentPage - 1})" 
          ${currentPage === 1 ? 'disabled' : ''} 
          class="px-4 py-2 border rounded-l-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}">
          Previous
        </button>
        <span class="px-4 py-2 border-t border-b">${currentPage} / ${totalPages}</span>
        <button 
          onclick="changePage(${currentPage + 1})" 
          ${currentPage === totalPages ? 'disabled' : ''} 
          class="px-4 py-2 border rounded-r-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}">
          Next
        </button>
      </nav>
    `;

    return { totalPages };
  }

  // Attach event listeners for category filtering
  document.querySelector('.category-filters').addEventListener('click', (e) => {
    const categoryButton = e.target.closest('.filter-item');
    if (!categoryButton) return;

    const category = categoryButton.dataset.category;
    
    if (activeCategories.has(category)) {
      activeCategories.delete(category);
      categoryButton.classList.remove('active');
    } else {
      activeCategories.add(category);
      categoryButton.classList.add('active');
    }

    window.currentPage = 1;
    filterRules();
  });

  // Attach event listener for search
  searchInputEl.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    window.currentPage = 1;
    filterRules();
  });

  // Add event listener for rule card clicks
  rulesContainerEl.addEventListener('click', async (e) => {
    const ruleCard = e.target.closest('.rule-card');
    if (ruleCard) {
      const link = ruleCard.querySelector('.rule-link').dataset.link;
      const name = ruleCard.dataset.name;
      
      const modalTitle = document.getElementById('ruleModalTitle');
      const modalBody = document.getElementById('ruleModalBody');
      const ruleDetailModal = document.getElementById('ruleDetailModal');
      const loadingIndicator = document.getElementById('ruleLoadingIndicator');
      
      // Show loading state
      modalTitle.textContent = name;
      modalBody.textContent = '';
      loadingIndicator.style.display = 'block';
      ruleDetailModal.style.display = 'flex';
      
      try {
        // Fetch rule content
        const response = await fetch(link);
        const ruleContent = await response.text();
        
        // Update modal content
        loadingIndicator.style.display = 'none';
        modalBody.textContent = ruleContent.trim().length > 0 
          ? ruleContent 
          : 'No detailed content available.';
      } catch (error) {
        loadingIndicator.style.display = 'none';
        modalBody.textContent = 'Error fetching rule content.';
        console.error('Error fetching rule content:', error);
      }
    }
  });

  // Close modal functionality
  document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('ruleDetailModal').style.display = 'none';
  });

  // Copy rule content functionality
  document.getElementById('copyRuleBtn').addEventListener('click', () => {
    const ruleToCopy = document.getElementById('ruleModalBody').textContent;
    navigator.clipboard.writeText(ruleToCopy).then(() => {
      alert('Rule copied to clipboard!');
    });
  });

  // Render Why .cursorrules? 
  if (content.whyCursorrules && content.whyCursorrules.length > 0) {
    whyCursorrulesEl.innerHTML = `
      <div class="bg-white shadow rounded p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Why Cursor Rules?</h2>
        <div class="text-gray-700 space-y-3">
          ${content.whyCursorrules.map(paragraph => `<p>${paragraph}</p>`).join('')}
           <p> By implementing the right cursor rules, designers and developers can transform ordinary websites into extraordinary user experiences. These rules focus on: </p>
          <ul class="list-disc list-inside pl-4">
            <li> <span class="font-semibold">Enhanced User Engagement:</span> Creating more interactive and captivating experiences, driving user engagement and repeat visits. </li>
            <li><span class="font-semibold"> Improved Accessibility:</span> Ensuring that your website is usable by individuals with various needs, making the web more inclusive.</li>
            <li><span class="font-semibold">Intuitive Feedback:</span> Providing clear visual feedback that guides users through your website seamlessly.</li>
            <li> <span class="font-semibold">Modern Design Language:</span> Keeping up with current web design trends and presenting a sophisticated interface.</li>
           </ul>
           <p> This resource is dedicated to help you unlock the power of cursor rules. Let's work together to build interfaces that are not only functional but also memorable. Let's make every click count, and every interaction delightful.</p>
        </div>
      </div>
    `;
  }

  // Initialize pagination state
  window.currentPage = 1;
  window.changePage = (newPage) => {
    const { totalPages } = filterRules();
    const currentPage = Math.max(1, Math.min(newPage, totalPages));
    window.currentPage = currentPage;
    filterRules(currentPage);
  };

  // Initial render and add resize listener for dynamic grid
  filterRules();
  window.addEventListener('resize', () => filterRules(window.currentPage));
}