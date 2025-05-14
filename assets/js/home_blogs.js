// This script fetches the blogs from the JSON file and injects them into the HTML
// It also handles the hover effect for the blog cards
// This script is executed when the DOM is fully loaded

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("/home.json").then(res => res.json()),
    fetch("/assets/home_meta.json").then(res => res.json())
  ])
  .then(([home, meta]) => {
    const container = document.getElementById("blog-section-container");
    if (!container) return;

    const blogs = home.blogs || []; // select all blogs from home.json


    blogs.forEach(blog => {
      const {
        content_title,
        excerpt,
        thumbnail,
        hover_gif,
        domain,
        subdomain,
        application_area,
        techstack,
        created_date,
        content_page
      } = blog;


      // Process domain list
      const domainList = blog.domain?.join(', ') || "-";

      // Process subdomain list
      let subdomainList = [];
      if (Array.isArray(blog.subdomain)) {
        blog.subdomain.forEach(obj => {
          const domainKey = Object.keys(obj)[0]; // e.g., "domain 1"
          const subs = obj[domainKey]; // e.g., ["subdomain 1", "subdomain 2"]
          if (Array.isArray(subs)) {
            subdomainList.push(...subs);
          }
        });
      }
      const subdomainString = subdomainList.length > 0 ? subdomainList.join(', ') : "-";
      
      const applicationarea = blog.application_area?.join(', ') || "-";

      //  Extract and build techstack icons
      let techIconsHTML = "";
      if (Array.isArray(blog.techstack)) {
        techIconsHTML = blog.techstack.map(tech => {
          const src = `/assets/images/${tech.toLowerCase()}.svg`;
          return `<img src="${src}" alt="${tech}" class="tech-icon" title="${tech}" />`;
        }).join("");
      }
      // change created date format
      function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit"
        });
      }
      const formattedDate = formatDate(blog.created_date);



      // Example usage
      const formatted = formatDate("2025-05-13");
      console.log(formatted); // Output: "13 May 25"


      // 🧩 Build and inject blog card
      const card = document.createElement("div");
      card.className = "blog-card";

      card.innerHTML = `
        <div class="thumbnail-wrapper">
          <img class="blog-thumbnail" src="/${blog.thumbnail}" alt="Thumbnail for ${blog.title}" />
          <img class="blog-hover" src="/${blog.hover_gif}" alt="Hover preview for ${blog.title}" />
        </div>
        <div class="blog-card-header">
          <h2 class="blog-title">${blog.content_title}</h2>
          <p class="blog-excerpt">${blog.excerpt}</p>
          <a class="blog-page-link" href="/${blog.content_page}">Read More →</a>
        </div>
        <div class="blog-card-domain">
          <p><strong>Domain:</strong> ${domainList}</p>
          <p><strong>Subdomain:</strong> ${subdomainString}</p>
          <p><strong></strong> ${applicationarea}</p>  
        </div>
        <div class="blog-card-footer">
          <p><strong></strong> ${formattedDate}</p>
          <div class="blog-techicons">${techIconsHTML}</div>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("❌ Failed to load highlighted blog:", err));
});
