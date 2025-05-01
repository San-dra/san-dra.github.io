// ===== projects.js =====

document.addEventListener("DOMContentLoaded", () => {
  fetch("../projects/projects.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("projects-list");

      data.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        // Image paths are already full paths relative to /projects/
        const hoverGif = `../projects/${project.hover_gif}`;
        const thumbnail = `../projects/${project.thumbnail}`;

        card.innerHTML = `
          <a href="../projects/${project.title}/content/index.html">
            <img src="${thumbnail}" alt="${project.title}" onmouseover="this.src='${hoverGif}'" onmouseout="this.src='${thumbnail}'" />
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p class="tags"><strong>Stack:</strong> ${project.techstack.join(", ")}</p>
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Failed to load projects.json:", error);
    });
});