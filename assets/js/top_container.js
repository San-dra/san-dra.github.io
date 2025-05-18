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
    const longName = general.longform_name || "";

    // === SOCIAL MEDIA (Fix mapping from array of objects) ===
    const socialLinksArray = general.social_media || [];
    const iconLinksArray = general.social_media_images_local || [];

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
    <div class="top-container-wrapper">
      <div class="branding">
        <h1>${longName}</h1>
      </div>
      <div class="nav-menu">
        <!-- Menu-closed -->
        <i class="fa fa-bars fa-xl" aria-hidden="true"></i> 
        <!-- Menu-open -->
        <i class="fa fa-times fa-2xl" aria-hidden="true"></i>
      </div>

      <div class="nav-wrapper">
        <div class="main-nav">${navLinks}</div>
        <div class="socials">${socialHTML}</div>
      </div>
    </div>
    `;
    // === Add event listeners for menu toggle ===
    // === Toggle Mobile Menu ===
      const menuOpenIcon = container.querySelector(".fa-bars");
      const menuCloseIcon = container.querySelector(".fa-times");
      const navWrapper = container.querySelector(".nav-wrapper");

      menuCloseIcon.style.display = "none"; // start hidden

      menuOpenIcon.addEventListener("click", () => {
        navWrapper.classList.add("open");
        menuOpenIcon.style.display = "none";
        menuCloseIcon.style.display = "flex";
      });

      menuCloseIcon.addEventListener("click", () => {
        navWrapper.classList.remove("open");
        menuOpenIcon.style.display = "flex";
        menuCloseIcon.style.display = "none";
      });

      // === active link === //
      const currentPath = window.location.pathname.replace(/\/$/, '');

      document.querySelectorAll(".main-nav a").forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '');
      
        console.log("🔍 Comparing:");
        console.log("  Current page path: ", currentPath);
        console.log("  Link href path:    ", linkPath);

        if (currentPath === linkPath) {
          link.classList.add("active");
        }
      });             

  })
  .catch(err => {
    console.error("❌ Failed to load top container data:", err);
  });
});





