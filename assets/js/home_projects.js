// This script fetches the projects from the JSON file and injects them into the HTML
// It also handles the hover effect for the project cards
// This script is executed when the DOM is fully loaded

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("/home.json").then(res => res.json()),
    fetch("/assets/home_meta.json").then(res => res.json())
  ])
  .then(([home, meta]) => {
    const container = document.getElementById("project-section-container");
    if (!container) return;

    const projects = home.projects || []; // select all projects from home.json


    projects.forEach(project => {
      const {
        content_title,
        excerpt,
        thumbnail,
        hover_gif,
        domain,
        subdomain,
        application_area,
        techstack,
        content_page
      } = project;


      // Process domain list
      const domainList = project.domain?.join(', ') || "-";

      // Process subdomain list
      let subdomainList = [];
      if (Array.isArray(project.subdomain)) {
        project.subdomain.forEach(obj => {
          const domainKey = Object.keys(obj)[0]; // e.g., "domain 1"
          const subs = obj[domainKey]; // e.g., ["subdomain 1", "subdomain 2"]
          if (Array.isArray(subs)) {
            subdomainList.push(...subs);
          }
        });
      }
      const subdomainString = subdomainList.length > 0 ? subdomainList.join(', ') : "-";
      
      const applicationarea = project.application_area?.join(', ') || "-";

      //  Extract and build techstack icons
      let techIconsHTML = "";
      if (Array.isArray(project.techstack)) {
        techIconsHTML = project.techstack.map(tech => {
          const src = `/assets/images/${tech.toLowerCase()}.svg`;
          return `<img src="${src}" alt="${tech}" class="tech-icon" title="${tech}" />`;
        }).join("");
      }

      // 🧩 Build and inject project card
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
        <div class="thumbnail-wrapper">
          <img class="project-thumbnail" src="/${project.thumbnail}" alt="Thumbnail for ${project.title}" />
          <img class="project-hover" src="/${project.hover_gif}" alt="Hover preview for ${project.title}" />
        </div>
        <h3 class="project-title">${project.content_title || project.title}</h3>
        <h3 class="project-excerpt">${project.excerpt || project.title}</h3>
        <p><strong>Domain:</strong> ${domainList}</p>
        <p><strong>Subdomain:</strong> ${subdomainString}</p>
        <p><strong></strong> ${applicationarea}</p>
        <div class="project-techicons">${techIconsHTML}</div>
        <a class="project-page-link" href="/${project.content_page}">View Project →</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("❌ Failed to load highlighted projects:", err));
});
