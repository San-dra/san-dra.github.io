// Loads resume.json to populate the home page with the professional summary

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("/resume/resume.json").then(res => res.json()),
    fetch("/assets/home_meta.json").then(res => res.json())
  ])
  .then(([resume, home]) => {
    const container = document.getElementById("resume-section-container");
    if (!container) return;

    // === BRANDING (Update display name) ===
    const welcome_message = resume.welcome_message || "Welcome to my professional summary!"; 
    
    const professional_summary = resume.professional_summary || "This is a brief overview of my professional background and skills.";

    // === SOCIAL MEDIA (Fix mapping from array of objects) ===
    const contact_text = "Contact Me";
    const contact_link =  "/contact/index.html";
    const section_nav_text = "View Full Resume";
    const section_nav_link = resume.section_nav_link || "/resume/index.html";


    // === Inject into HTML ===
    container.innerHTML = `
      <div class="resume-summary">
        <h1 class="welcome_message">${welcome_message}</h1>
        <p class="professional_summary">${professional_summary}</p>
        <div class="contact-page">
            <a href="${contact_link}" class="contact-link">${contact_text}</a>
         </div>
        <div class="section-nav">
            <a href="${section_nav_link}" class="section-nav-link">${section_nav_text}</a>
            </div>
      </div>
    `;
  })
  .catch(err => {
    console.error("❌ Failed to load top container data:", err);
  });
});