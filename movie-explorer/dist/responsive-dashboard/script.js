const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
const sections = document.querySelectorAll(".dashboard-section");
const pageTitle = document.getElementById("page-Title");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    navLinks.forEach((item) => item.classList.remove("active"));

    link.classList.add("active");

    sections.forEach((sec) => {
      sec.classList.add("hidden");
      sec.classList.remove("active");
    });

    const targetId = link.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.classList.remove("hidden");
      targetSection.classList.add("active");
    }
    if (pageTitle) {
      pageTitle.textContent = link.textContent.trim();
    }
    const titleElement = document.getElementById("page-title");
    if (titleElement) {
      titleElement.textContent = link.textContent.trim();
    }
  });
});
const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
  });
}
