// This script fetches data from the content.json in the root folder
// and general.json from private folder JSON file



document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("/private/general.json").then(res => res.json()),
    fetch("/assets/home_meta.json").then(res => res.json())
  ])
  .then(([general, home]) => {
    const container = document.getElementById("top-container");
    if (!container) return;

    // === BRANDING (Update display name) ===
    const longName = general.longform_name || general.shortform_name || "My Name";

    // === SOCIAL MEDIA (Fix mapping from array of objects) ===
    const socialLinksArray = general.social_media || [];
    const iconLinksArray = general.social_media_images || [];

    const socialLinks = Object.assign({}, ...socialLinksArray);
    const iconLinks = Object.assign({}, ...iconLinksArray);

    const socialHTML = Object.entries(socialLinks).map(([platform, url]) => {
      const icon = iconLinks[platform] || "";
      return `
        <a href="${url}" target="_blank" class="social-icon" aria-label="${platform}">
          <img src="/${icon}" alt="${platform} icon" />
        </a>
      `;
    }).join("");

    // === NAVIGATION LINKS from home_meta.json ===
    const navLinks = (home.main_navigation || []).map(link => 
      `<a href="/${link.href}">${link.text}</a>`
    ).join("");

    // === Inject into HTML ===
    container.innerHTML = `
      <div class="top-bar">
        <div class="branding">
          <h1>${longName}</h1>
        </div>
        <nav class="main-nav">${navLinks}</nav>
        <div class="socials">${socialHTML}</div>
      </div>
    `;
  })
  .catch(err => {
    console.error("❌ Failed to load top container data:", err);
  });
});
