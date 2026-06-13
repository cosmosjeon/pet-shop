const filterButtons = document.querySelectorAll('[data-filter]');
const puppyCards = document.querySelectorAll("[data-category]");
const emptyState = document.querySelector("#empty-state");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const allFilters = new Set(["all", "전체"]);

function isAllFilter(filter) {
  return allFilters.has(filter);
}

function getInitialFilter() {
  if (!location.hash) {
    return "all";
  }

  try {
    return decodeURIComponent(location.hash.slice(1));
  } catch {
    return location.hash.slice(1);
  }
}

function setFilter(selectedFilter) {
  let visibleCards = 0;

  for (const button of filterButtons) {
    const buttonFilter = button.dataset.filter || "all";
    const isActive =
      buttonFilter === selectedFilter || (isAllFilter(buttonFilter) && isAllFilter(selectedFilter));
    button.classList.toggle("is-active", isActive);
  }

  for (const card of puppyCards) {
    const categories = (card.dataset.category || "").split(/\s+/).filter(Boolean);
    const shouldShow = isAllFilter(selectedFilter) || categories.includes(selectedFilter);
    card.classList.toggle("is-hidden", !shouldShow);
    if (shouldShow) {
      visibleCards += 1;
    }
  }

  if (emptyState) {
    emptyState.toggleAttribute("hidden", visibleCards > 0);
  }
}

function closeMobileNav() {
  document.body.classList.remove("nav-open");
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }
  if (mobileNav) {
    mobileNav.hidden = true;
  }
}

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter || "all";
    setFilter(selectedFilter);
    history.replaceState(null, "", isAllFilter(selectedFilter) ? "#puppies" : `#${selectedFilter}`);
  });
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    if (mobileNav) {
      mobileNav.hidden = !willOpen;
    }
    document.body.classList.toggle("nav-open", willOpen);
  });
}

for (const navLink of mobileNav ? mobileNav.querySelectorAll("a") : []) {
  navLink.addEventListener("click", closeMobileNav);
}

const initialFilter = getInitialFilter();
const hasInitialFilter = [...filterButtons].some((button) => button.dataset.filter === initialFilter);
setFilter(hasInitialFilter ? initialFilter : "all");
