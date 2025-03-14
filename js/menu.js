document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".mobile-menu-toggle")) return;

  const menuToggle = document.createElement("div");
  menuToggle.className = "mobile-menu-toggle";
  menuToggle.innerHTML = `<i class="fas fa-bars"></i>`;

  document.body.appendChild(menuToggle);

  const container = document.querySelector(".container");
  const main = document.querySelector("main");

  if (!container || !main) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = container.classList.toggle("menu-open");
    menuToggle.innerHTML = isOpen
      ? `<i class="fas fa-times"></i>`
      : `<i class="fas fa-bars"></i>`;
  });

  main.addEventListener("click", () => {
    if (container.classList.contains("menu-open")) {
      container.classList.remove("menu-open");
      menuToggle.innerHTML = `<i class="fas fa-bars"></i>`;
    }
  });
});
