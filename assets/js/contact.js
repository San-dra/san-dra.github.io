  const chatToggle = document.getElementById("chat-toggle");
  const contactPanel = document.getElementById("contact-panel");
  const closeContact = document.getElementById("close-contact");

  chatToggle.addEventListener("click", () => {
    contactPanel.classList.toggle("show");
  });

  closeContact.addEventListener("click", () => {
    contactPanel.classList.remove("show");
  });
