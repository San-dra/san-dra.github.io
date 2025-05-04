// ===== blogs.js =====

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("blogs-list");
    if (!container) {
      console.error("❌ Missing #blogs-list container in HTML.");
      return;
    }
  
    fetch("../blogs/blogs.json")
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch blogs.json");
        return response.json();
      })
      .then(data => {
        data.forEach(blog => {
          const card = document.createElement("div");
          card.className = "blog-card";
  
          const thumbnail = `../blogs/${blog.thumbnail}`;
          const hoverGif = `../blogs/${blog.hover_gif}`;
          const tags = (blog.tags || []).map(tag => `<span class='tag'>${tag}</span>`).join(" ");
  
          card.innerHTML = `
            <a href="../blogs/${blog.title}/content/index.html">
              <img src="${thumbnail}" alt="${blog.title}" class="blog-banner" onmouseover="this.src='${hoverGif}'" onmouseout="this.src='${thumbnail}'" />
              <h2>${blog.title}</h2>
              <p class="excerpt">${blog.excerpt}</p>
              <div class="tags">${tags}</div>
            </a>
          `;
  
          container.appendChild(card);
              });
        });
      });