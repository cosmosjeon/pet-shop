const filterButtons = document.querySelectorAll('[data-filter]');
const puppyCards = document.querySelectorAll("[data-category]");
const emptyState = document.querySelector("#empty-state");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

function setFilter(selectedFilter) {
  let visibleCards = 0;

  for (const button of filterButtons) {
    button.classList.toggle("is-active", button.dataset.filter === selectedFilter);
  }

  for (const card of puppyCards) {
    const category = card.dataset.category || "";
    const shouldShow = selectedFilter === "all" || category.includes(selectedFilter);
    card.classList.toggle("is-hidden", !shouldShow);
    if (shouldShow) {
      visibleCards += 1;
    }
  }

  emptyState.toggleAttribute("hidden", visibleCards > 0);
}

function closeMobileNav() {
  document.body.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  mobileNav.hidden = true;
}

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter || "all";
    setFilter(selectedFilter);
    history.replaceState(null, "", selectedFilter === "all" ? "#puppies" : `#${selectedFilter}`);
  });
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  mobileNav.hidden = isExpanded;
  document.body.classList.toggle("nav-open", !isExpanded);
});

for (const navLink of mobileNav.querySelectorAll("a")) {
  navLink.addEventListener("click", closeMobileNav);
}

const initialFilter = location.hash ? location.hash.slice(1) : "all";
const hasInitialFilter = [...filterButtons].some((button) => button.dataset.filter === initialFilter);
setFilter(hasInitialFilter ? initialFilter : "all");
