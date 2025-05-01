fetch("../projects/projects.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("projects-list");
    data.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
        <a href="../projects/${project.slug}/content/index.html">
          <img src="../projects/${project.slug}/${project.hover_gif}" alt="${project.title}" />
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <p><strong>Tech:</strong> ${project.techstack.join(", ")}</p>
        </a>
      `;

      container.appendChild(card);
    });
  });
