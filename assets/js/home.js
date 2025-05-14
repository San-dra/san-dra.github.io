// ===== home.js =====

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
      fetch("home.yaml").then(r => r.text()),
      fetch("private/general.yaml").then(r => r.text())
    ])
    .then(([homeYaml, metaYaml]) => {
      const home = jsyaml.load(homeYaml);
      const meta = jsyaml.load(metaYaml);
  
      renderHero(meta.hero);
      renderProjects(home.projects);
      renderBlogs(home.blogs);
      renderContact(meta.contact);
    })
    .catch(console.error);
  });
  
  function renderHero(hero) {
    const heroSection = document.getElementById("hero");
    heroSection.innerHTML = `
      <h1>${hero.headline}</h1>
      <p>${hero.subtext}</p>
    `;
  }
  
  function renderProjects(projects) {
    const container = document.getElementById("project-cards");
    container.innerHTML = projects.map(p => `
      <a class="card" href="projects/${p.title}/index.html">
        <img src="projects/${p.thumbnail}" alt="${p.title}" onmouseover="this.src='projects/${p.hover_gif}'" onmouseout="this.src='projects/${p.thumbnail}'">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </a>`).join("\n");
  }
  
  function renderBlogs(blogs) {
    const container = document.getElementById("blog-cards");
    container.innerHTML = blogs.map(b => `
      <a class="card" href="blogs/${b.title}/content/index.html">
        <img src="blogs/${b.thumbnail}" alt="${b.title}" onmouseover="this.src='blogs/${b.hover_gif}'" onmouseout="this.src='blogs/${b.thumbnail}'">
        <h3>${b.title}</h3>
        <p>${b.excerpt}</p>
      </a>`).join("\n");
  }
  
  function renderContact(contact) {
    const footer = document.getElementById("footer-contact");
    footer.innerHTML = `
      <p>📧 <a href="mailto:${contact.email}">${contact.email}</a></p>
      <p>🔗 <a href="${contact.linkedin}" target="_blank">LinkedIn</a> | <a href="${contact.github}" target="_blank">GitHub</a></p>
    `;
  }