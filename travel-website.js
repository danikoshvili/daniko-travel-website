// Fetch the data from the JSON file
async function fetchTravelData() {
    try {
      const response = await fetch('travel_recommendation_api.json');
      if (!response.ok) throw new Error('Failed to fetch travel data.');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Perform search based on the keyword
  async function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('results-container');
    const resultsSection = document.getElementById('results-section');
    const resultsHeading = document.querySelector('#results-section h2');
    resultsContainer.innerHTML = ''; // Clear previous results
  
    if (!query) {
      alert('Please enter a keyword to search.');
      return;
    }
  
    const data = await fetchTravelData();
    const results = [];
  
    // Match the keyword to categories or specific cities
    if (query === 'beach') {
      results.push(...data.beaches);
    } else if (query === 'temple') {
      results.push(...data.temples);
    } else {
      // Search through countries and their cities
      data.countries.forEach(country => {
        if (country.name.toLowerCase().includes(query)) {
          results.push(...country.cities); // Add all cities from this country
        } else {
          country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
              results.push(city); // Add specific matching cities
            }
          });
        }
      });
    }
  
    // Display results
    if (results.length > 0) {
      results.slice(0, 2).forEach(item => {
        const resultCard = `
          <div class="result-card">
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        `;
        resultsContainer.innerHTML += resultCard;
      });
      resultsSection.style.display = 'block'; // Show the results section
      resultsHeading.classList.add('highlight'); // Highlight the "Search Results" text
    } else {
      resultsContainer.innerHTML = '<p>No results found for this keyword.</p>';
      resultsSection.style.display = 'block'; // Show the results section even if no results are found
      resultsHeading.classList.add('highlight'); // Highlight the "Search Results" text
    }
  
    // Scroll to the results section
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Reset search and results
  function resetSearch() {
    document.getElementById('searchInput').value = ''; // Clear the search input
    document.getElementById('results-container').innerHTML = ''; // Clear the results container
    document.getElementById('results-section').style.display = 'none'; // Hide the results section
  
    // Remove highlight from "Search Results" text
    const resultsHeading = document.querySelector('#results-section h2');
    resultsHeading.classList.remove('highlight');
  }
  
  // Event listeners
  document.getElementById('searchBtn').addEventListener('click', performSearch);
  document.getElementById('resetBtn').addEventListener('click', resetSearch);
  