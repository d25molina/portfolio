console.log('projects.js is running!');
import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
console.log(projects);
const projectsContainer = document.querySelector('.projects');
console.log(projectsContainer);
renderProjects(projects, projectsContainer, 'h2');
const projectsTitle = document.querySelector('.projects-title');
projectsTitle.textContent = `${projects.length} Projects`;
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
let colors = d3.scaleOrdinal(d3.schemeTableau10);
let query = '';
let searchInput = document.querySelector('.searchBar');
let selectedIndex = -1;

function renderPieChart(projectsGiven) {
  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );
  let newData = newRolledData.map(([year, count]) => {
    return {value: count, label: year};
  });
  let newSliceGenerator = d3.pie().value((d) => d.value);
  let newArcData = newSliceGenerator(newData);
  let newArcs = newArcData.map((d) => arcGenerator(d));

  let newSVG = d3.select('svg');
  newSVG.selectAll('path').remove();
  let newLegend = d3.select('.legend');
  newLegend.selectAll('li').remove();

  newArcs.forEach((arc, i) => {
    newSVG.append('path')
      .attr('d', arc)
      .attr('fill', colors(i))
      .on('click', () => {
        selectedIndex = selectedIndex === i ? -1 : i;
        newSVG
          .selectAll('path')
          .attr('class', (_, idx) => (
            idx === selectedIndex ? 'selected' : ''
          ));
    if (selectedIndex === -1) {
        renderProjects(projectsGiven, projectsContainer, 'h2');
      } else {
        let selectedYear = newData[selectedIndex].label;
        let filteredByYear = projectsGiven.filter((p) => p.year === selectedYear);
        renderProjects(filteredByYear, projectsContainer, 'h2');
      }
        newLegend
        .selectAll('li')
        .attr('class', (_, idx) => (
        idx === selectedIndex ? 'legend-item selected' : 'legend-item'
      ));
      });
  });

  newData.forEach((d, i) => {
    newLegend
      .append('li')
      .attr('class', 'legend-item')
      .attr('style', `--color:${colors(i)}`)
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
    
  });
}

function setQuery(value) {
  query = value;
  return projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });
}

renderPieChart(projects);

searchInput.addEventListener('input', (event) => {
  let filteredProjects = setQuery(event.target.value);
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
});