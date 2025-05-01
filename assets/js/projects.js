// ===== projects.js =====

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projects-list");
  if (!container) {
    console.error("❌ Missing #projects-list container in HTML.");
    return;
  }

  fetch("../projects/projects.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch projects.json");
      return response.json();
    })
    .then(data => {
      data.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        const hoverGif = `../projects/${project.hover_gif}`;
        const thumbnail = `../projects/${project.thumbnail}`;

        const iconList = (project.techicons || []).map(icon => {
          const iconPath1 = `../assets/images/${icon}`;
          const iconPath2 = `../assets/icons/${icon}`;

          return `
            <div class="techicon">
              <img src="${iconPath1}" alt="${icon}" onerror="this.onerror=null;this.src='${iconPath2}';" onload="this.dataset.loaded = true" />
            </div>
          `;
        }).join(" ");

        const techstackText = (project.techstack || []).join(", ");

        card.innerHTML = `
          <a href="../projects/${project.title}/content/index.html">
            <img src="${thumbnail}" alt="${project.title}" onmouseover="this.src='${hoverGif}'" onmouseout="this.src='${thumbnail}'" />
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p class="tags"><strong>Stack:</strong> ${techstackText}</p>
            <div class="icons">${iconList}</div>
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("❌ Error loading projects.json:", error);
    });
});