
// Load blog.json and populate the header with the title, subtitle, author, and last update timestamp
document.addEventListener("DOMContentLoaded", () => {
  fetch("blog.json")
    .then((res) => res.json())
    .then((data) => {
      // 🖋️ Title, subtitle, and metadata
      document.getElementById("blog-title").textContent = data.title;
      document.getElementById("blog-excerpt").textContent = data.excerpt || "";
      document.getElementById("blog-author").textContent = data.author || "Unknown";  
      // 🕓 Last update timestamp
      document.getElementById("blog-last-updated").textContent = data.last_update_timestamp || "-";
    })
    .catch((err) => console.error("❌ Failed to load blog.json:", err));
});

  
// Pull rendered blog content from Quarto output
document.addEventListener("DOMContentLoaded", () => {
  fetch("content/index.html")
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // ✅ Inject Quarto styles
      const headContent = doc.head.querySelectorAll("link[rel='stylesheet'], style");
      headContent.forEach((el) => {
        if (el.tagName === "LINK" && el.href && !document.head.querySelector(`[href="${el.href}"]`)) {
          document.head.appendChild(el.cloneNode(true));
        } else if (el.tagName === "STYLE") {
          document.head.appendChild(el.cloneNode(true));
        }
      });

      // ✅ Find and clone blog body
      const blogContent = doc.querySelector(".blog-body") || doc.querySelector("main");

      // ✅ Adjust all internal image paths to use `quarto/` prefix
      const images = blogContent.querySelectorAll("img");
      images.forEach((img) => {
        if (img.getAttribute("src")?.startsWith("images/")) {
          img.setAttribute("src", `quarto/${img.getAttribute("src")}`);
        }
      });

      // ✅ Replace container with final HTML
      document.getElementById("blog-body").innerHTML = blogContent.innerHTML;
    })
    .catch((err) => {
      console.error("❌ Failed to load Quarto content:", err);
      document.getElementById("blog-body").innerHTML = "<p>⚠️ Could not load content.</p>";
    });
  });

//
document.addEventListener("DOMContentLoaded", () => {
  fetch("blog.json")
  .then((res) => res.json())
  .then((data) => {
    // === Domain and Application Area Info ===
    document.getElementById("blog-domain").textContent = (data.domain || []).join(", ");
    document.getElementById("blog-subdomain").textContent = formatNestedSubdomain(data.subdomain || {});
    document.getElementById("blog-application_area").textContent = (data.application_area || []).join(", ");

    // === Tech Stack Icons ===
    const techIconDiv = document.getElementById("blog-techstack-icons");
    techIconDiv.innerHTML = "";
    (data.techstack || []).forEach((tech) => {
      const icon = document.createElement("img");
      icon.src = `/assets/images/${tech.toLowerCase().replace(/\s+/g, "")}.svg`; // e.g., powerbi → powerbi.svg
      icon.alt = tech;
      icon.classList.add("tech-icon");
      techIconDiv.appendChild(icon);
    });

    // === Related Content (Blog, Project, Resource) ===
    const content = data.related_content?.content || [];
    content.forEach((item) => {
      const containerId = {
        blog: "related-blogs",
        project: "related-projects",
        resource: "related-resources"
      }[item.type];

      const container = document.getElementById(containerId);
      if (!container) return;

      const blogFolder = extractFolderName(item.link);
      const imgSrc = `/${item.link.split("/")[0]}/${blogFolder}/images/thumbnail.png`; // e.g., blogs/Blog 2/images/thumbnail.png

      const entry = document.createElement("div");
      entry.className = "related-entry";
      entry.innerHTML = `
        <img src="${imgSrc}" alt="thumbnail" class="related-thumb" />
        <div>
          <a href="/${item.link}" class="related-title">${item.title}</a>
          <p class="related-meta">Sandra • May 2025</p> <!-- Replace with real date if available -->
        </div>
      `;
      container.appendChild(entry);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to load blog.json:", err);
  });
});

// 🔁 Helper function to format nested subdomains
function formatNestedSubdomain(obj) {
return Object.entries(obj)
  .map(([key, vals]) => `${key}: ${vals.join(", ")}`)
  .join(" | ");
}

// 🔁 Extract folder name from path
function extractFolderName(link) {
const parts = link.split("/");
return parts.length >= 2 ? parts[1] : "";
}

  