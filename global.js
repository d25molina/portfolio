console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));}
// const navLinks = $$("nav a");
// let currentLink = navLinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname,
// );
// currentLink?.classList.add('current');
let pages = [
  { url: '/', title: 'Home' },
  { url: 'projects/', title: 'My Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'resume/', title: 'My Resume' },
  { url: 'https://github.com/d25molina', title: 'My GitHub Profile' }
];
let nav = document.createElement('nav');
document.body.prepend(nav);
document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select id="theme-select">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
		</select>
	</label>`,
)
;
const select = document.querySelector("label.color-scheme select")
if (localStorage.colorScheme) {
  document.documentElement.style.colorScheme = localStorage.colorScheme;
  select.value = localStorage.colorScheme;
}
select.addEventListener('input', function (event) {
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  localStorage.colorScheme = event.target.value
});

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  nav.append(a);
const BASE_PATH =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? '/'
    : '/website/';
url = !url.startsWith('http') ? BASE_PATH + url : url;
if (a.host === location.host && a.pathname === location.pathname) {
  a.classList.add('current');
}
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(a => {
  if (a.host && a.host !== location.host) {
    a.target = "_blank";
  }
})};