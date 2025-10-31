console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));}

const BASE_PATH =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? '/'
    : '/portfolio/';

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'My Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'resume/', title: 'My Resume' },
  { url: 'https://github.com/d25molina', title: 'My GitHub Profile' }
];

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
		</select>
	</label>`,
);

const select = document.querySelector("label.color-scheme select");
if (localStorage.colorScheme) {
  document.documentElement.style.colorScheme = localStorage.colorScheme;
  select.value = localStorage.colorScheme;
}
select.addEventListener('input', function (event) {
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  localStorage.colorScheme = event.target.value;
});

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  url = !url.startsWith('http') ? BASE_PATH + url : url;
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  nav.append(a);
  if (a.host === location.host && a.pathname === location.pathname) {
  a.classList.add('current');}
  if (a.host !== location.host) {a.target = "_blank"}
}

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  // write javascript that will allow dynamic heading levels based on previous function
  containerElement.innerHTML = '';
   projects.forEach(project => {
    const article = document.createElement('article');
    article.innerHTML = `
      <${headingLevel}>${project.title}</${headingLevel}>
      <img src="${project.image}" alt="${project.title}">
      <p>${project.description}</p>
      <p class="project-year">${project.year}</p>`;
    containerElement.appendChild(article);
  });
}
export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}