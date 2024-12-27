// Fetch data from the JSON file
async function fetchTravelData() {
    try {
      const response = await fetch('travel_recommendation_api.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching travel data:', error);
    }
  }
  
  // Perform search
  async function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results
  
    if (!query) {
      alert('Please enter a keyword to search.');
      return;
    }
  
    const data = await fetchTravelData();
    const results = [];
  
    // Search through countries, cities, temples, and beaches
    data.countries.forEach(country => {
      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
          results.push(city);
        }
      });
    });
  
    // Display results
    if (results.length > 0) {
      results.forEach(item => {
        const resultCard = `
          <div class="result-card">
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        `;
        resultsContainer.innerHTML += resultCard;
      });
    } else {
      resultsContainer.innerHTML = '<p>No results found.</p>';
    }
  }
  
  // Reset search
  function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results-container').innerHTML = '';
  }
  
  // Event listeners
  document.getElementById('searchBtn').addEventListener('click', performSearch);
  document.getElementById('resetBtn').addEventListener('click', resetSearch);
  