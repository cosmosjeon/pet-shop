const filterButtons = document.querySelectorAll(".filter-button[data-filter]");
const branchFilterLinks = document.querySelectorAll("[data-branch-filter]");
const petCards = document.querySelectorAll("[data-category]");
const emptyState = document.querySelector("#empty-state");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const branchSelect = document.querySelector("#branch-select");
const branchContactName = document.querySelector("[data-branch-contact-name]");
const branchContactAddress = document.querySelector("[data-branch-contact-address]");
const branchContactPhone = document.querySelector("[data-branch-contact-phone]");
const branchContactActions = document.querySelectorAll("[data-branch-action]");
const heroSlides = document.querySelectorAll("[data-hero-slide]");
const heroDots = document.querySelectorAll("[data-hero-dot]");
const allFilters = new Set(["all", "전체"]);
const content = window.HealthDogContent || {};

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

  for (const card of petCards) {
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

function setHeroSlide(index) {
  for (const [slideIndex, slide] of [...heroSlides].entries()) {
    const isActive = slideIndex === index;
    slide.classList.toggle("is-active", isActive);
    slide.toggleAttribute("hidden", !isActive);
  }

  for (const [dotIndex, dot] of [...heroDots].entries()) {
    const isActive = dotIndex === index;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  }
}

function getBranch(branchId) {
  return (content.branches || []).find((branch) => branch.id === branchId);
}

function setBranchContact(branchId) {
  const branch = getBranch(branchId) || getBranch("suwon") || (content.branches || [])[0];
  if (!branch) {
    return;
  }

  if (branchContactName) {
    branchContactName.textContent = branch.name;
  }
  if (branchContactAddress) {
    branchContactAddress.textContent = branch.address;
  }
  if (branchContactPhone) {
    branchContactPhone.textContent = branch.phone;
    branchContactPhone.href = `tel:${branch.phone}`;
  }

  for (const action of branchContactActions) {
    const actionName = action.dataset.branchAction;
    const url = {
      call: `tel:${branch.phone}`,
      place: branch.naverMapUrl,
      instagram: branch.instagramUrl,
      blog: branch.blogUrl,
      kakao: branch.kakaoUrl,
    }[actionName];

    if (url) {
      action.hidden = false;
      action.href = url;
    } else {
      action.hidden = true;
      action.removeAttribute("href");
    }
  }
}

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter || "all";
    setFilter(selectedFilter);
    history.replaceState(null, "", isAllFilter(selectedFilter) ? "#puppies" : `#${selectedFilter}`);
  });
}

for (const link of branchFilterLinks) {
  link.addEventListener("click", () => {
    const selectedFilter = link.dataset.branchFilter || "all";
    setFilter(selectedFilter);
    history.replaceState(null, "", `#${selectedFilter}`);
  });
}

for (const dot of heroDots) {
  dot.addEventListener("click", () => {
    setHeroSlide(Number(dot.dataset.heroDot || 0));
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

if (branchSelect) {
  branchSelect.addEventListener("change", () => {
    setBranchContact(branchSelect.value);
  });
}

const initialFilter = getInitialFilter();
const hasInitialFilter = [...filterButtons].some((button) => button.dataset.filter === initialFilter);
setFilter(hasInitialFilter ? initialFilter : "all");
setHeroSlide(0);
setBranchContact(branchSelect ? branchSelect.value : "suwon");
