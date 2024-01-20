const repositoryContainer = document.getElementById('repository-container');

// Replace 'username' with the GitHub username you want to fetch repositories for
const username = 'username';
const apiUrl = `https://api.github.com/users/${username}/repos`;

fetch(apiUrl)
	.then(response => response.json())
	.then(data => {
		data.forEach(repo => {
			const repository = document.createElement('div');
			repository.className = 'repository';
			repository.innerHTML = `
				<h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
				<p>Description: ${repo.description || '(No description provided)'}</p>
				<p>Stars: ${repo.stargazers_count}</p>
				<p>Forks: ${repo.forks_count}</p>
			`;
			repositoryContainer.appendChild(repository);
		});
	});