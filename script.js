let currentPage = 1;

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

async function getRepositories(page) {
  showLoader();

  // Replace 'YOUR_GITHUB_USERNAME' with the actual GitHub username
  const username = 'YOUR_GITHUB_USERNAME';
  const perPage = 10;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    const repositories = await response.json();

    hideLoader();
    displayRepositories(repositories);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    hideLoader();
  }
}

function displayRepositories(repositories) {
  const repositoriesList = document.getElementById("repositories");
  repositoriesList.innerHTML = "";

  repositories.forEach(repo => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${repo.name}</strong> - ${repo.description ? repo.description : 'No description available'} - Language: ${repo.language ? repo.language : 'Not specified'}
    `;
    repositoriesList.appendChild(listItem);
  });
}

function filterRepositories() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const repositoryItems = document.querySelectorAll("#repositories li");

  repositoryItems.forEach(item => {
    const repositoryText = item.textContent.toLowerCase();
    const display = repositoryText.includes(searchInput) ? 'block' : 'none';
    item.style.display = display;
  });
}

// Initial call to get repositories
getRepositories(currentPage);
