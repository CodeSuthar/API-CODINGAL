let allRecipes = []; // store fetched recipes

document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  const message = document.getElementById('message');
  message.textContent = "Searching...";
  
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';
      
      if (data.meals) {
        allRecipes = data.meals; // save recipes
        message.textContent = `Found ${allRecipes.length} recipes`;
        displayRecipes(allRecipes);
      } else {
        message.textContent = "No recipes found.";
        allRecipes = [];
      }
    });
});

// Function to display recipes
function displayRecipes(recipes) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  recipes.forEach(meal => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-3';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strArea} | ${meal.strCategory}</p>
          <a href="${meal.strSource || '#'}" target="_blank" class="btn btn-sm btn-primary">View Recipe</a>
        </div>
      </div>
    `;
    resultsDiv.appendChild(card);
  });
}

// Category filter logic
document.getElementById('categoryBar').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const category = e.target.getAttribute('data-category');
    if (category === "All") {
      displayRecipes(allRecipes);
    } else {
      const filtered = allRecipes.filter(meal => meal.strCategory === category);
      displayRecipes(filtered);
      document.getElementById('message').textContent = `Showing ${filtered.length} ${category} recipes`;
    }
  }
});
