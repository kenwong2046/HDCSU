const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id], header[id]")];

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "開啟導覽選單");
  navigation?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "開啟導覽選單" : "關閉導覽選單");
  navigation?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) closeMenu();
});

if ("IntersectionObserver" in window) {
  const linkMap = new Map(
    navLinks.map((link) => [link.getAttribute("href")?.replace("#", ""), link]),
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => link.classList.remove("active"));
      linkMap.get(visible.target.id)?.classList.add("active");
    },
    { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
}

const yearNode = document.querySelector("#current-year");
if (yearNode) yearNode.textContent = String(new Date().getFullYear());
