console.log('projects.js is running!');
import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
console.log(projects);
const projectsContainer = document.querySelector('.projects');
console.log(projectsContainer);
renderProjects(projects, projectsContainer, 'h2');
const projectsTitle = document.querySelector('.projects-title');
projectsTitle.textContent = `${projects.length} Projects`;