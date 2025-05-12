document.addEventListener("DOMContentLoaded", () => {
  fetch("blog.json")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("title").textContent = data.title;
      document.getElementById("excerptn").textContent = data.description;

      const liveLink = document.getElementById("live-demo-link");
      if (data.live_demo) {
        liveLink.href = data.live_demo;
      } else {
        liveLink.style.display = "none";
      }

      // Inject related blogs
      const blogContainer = document.getElementById("related-blogs");
      if (data.related_blog_posts && data.related_blog_posts.length > 0) {
        blogContainer.innerHTML = "<h3>Related Blogs</h3>";
        data.related_blog_posts.forEach((title) => {
          const el = document.createElement("a");
          el.href = `../../blogs/${title}/content/index.html`;
          el.textContent = slug.replace(/-/g, " ");
          el.className = "related-item";
          blogContainer.appendChild(el);
        });
      }

      // Inject related projects
      const projContainer = document.getElementById("related-projects");
      if (data.related_projects && data.related_projects.length > 0) {
        projContainer.innerHTML = "<h3>Related Projects</h3>";
        data.related_projects.forEach((slug) => {
          const el = document.createElement("a");
          el.href = `../${slug}/index.html`;
          el.textContent = slug.replace(/-/g, " ");
          el.className = "related-item";
          projContainer.appendChild(el);
        });
      }
    })
    .catch((err) => {
      console.error("Error loading project.json:", err);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("content/index.html")
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const projectBody = doc.querySelector(".project-body") || doc.querySelector("main");
      document.getElementById("project-body").innerHTML = projectBody.innerHTML;
    })
    .catch(error => {
      console.error("Error loading project content:", error);
      document.getElementById("project-body").innerHTML = "<p>⚠️ Could not load content.</p>";
    });
});
