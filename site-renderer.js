export function renderSite(content) {

  const navEl = document.getElementById('site-nav');
  const introEl = document.getElementById('intro');
  const howToEl = document.getElementById('how-to');
  const whyCursorrulesEl = document.getElementById('why-cursorrules');
  const rulesContainerEl = document.getElementById('rules-container');
  const paginationContainerEl = document.getElementById('pagination-container');
  const categoryFiltersEl = document.getElementById('category-filters');
  const searchInputEl = document.getElementById('search-input');
  const lastUpdatedDateEl = document.getElementById('last-updated-date');

  

  // Initial loading state
  // renderLoadingHero();

  // When content is available, render the dynamic hero
  // renderDynamicHero(content);

  // Render Intro
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