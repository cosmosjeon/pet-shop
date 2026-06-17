const content = window.HealthDogContent || null;
const hasContent = Boolean(content);
const allFilters = new Set(["all", "전체"]);

function isAllFilter(filter) {
  return allFilters.has(filter);
}

function createElement(tagName, options = {}, children = []) {
  const element = document.createElement(tagName);
  if (options.className) {
    element.className = options.className;
  }
  if (options.text) {
    element.textContent = options.text;
  }
  for (const [name, value] of Object.entries(options.attrs || {})) {
    if (value !== undefined && value !== null) {
      element.setAttribute(name, String(value));
    }
  }
  for (const [name, value] of Object.entries(options.dataset || {})) {
    element.dataset[name] = String(value);
  }
  for (const child of children) {
    element.append(child);
  }
  return element;
}

function link(label, href, className = "") {
  const anchor = createElement("a", { className, text: label, attrs: { href } });
  if (href.startsWith("https://")) {
    anchor.target = "_blank";
    anchor.rel = "noopener";
  }
  return anchor;
}

function replaceChildren(selector, children) {
  const target = document.querySelector(selector);
  if (target) {
    target.replaceChildren(...children);
  }
}

function renderNavigation() {
  const navLinks = (content.nav || []).map((item) => link(item.label, item.href));
  const mobileLinks = (content.nav || []).map((item) => link(item.label, item.href));
  replaceChildren("[data-render-nav]", navLinks);
  replaceChildren("[data-render-mobile-nav]", mobileLinks);
}

function renderHero() {
  const slides = (content.heroSlides || []).map((slide, index) => {
    const heading = createElement(index === 0 ? "h1" : "h2", { text: slide.title });
    const article = createElement(
      "article",
      {
        className: `hero-slide${index === 0 ? " is-active" : ""}`,
        attrs: index === 0 ? {} : { hidden: "" },
        dataset: { heroSlide: "" },
      },
      [
        createElement("div", { className: "hero-copy" }, [
          createElement("p", { className: "eyebrow", text: slide.eyebrow }),
          heading,
          createElement("p", { text: slide.body }),
          createElement("div", { className: "hero-actions" }, [
            link(slide.primaryCta.label, slide.primaryCta.href, "button button-dark"),
            link(slide.secondaryCta.label, slide.secondaryCta.href, "button button-light"),
          ]),
        ]),
        createElement("figure", { className: "hero-image" }, [
          createElement("img", { attrs: { src: slide.image, alt: slide.alt } }),
        ]),
      ],
    );
    return article;
  });
  const dots = (content.heroSlides || []).map((slide, index) =>
    createElement("button", {
      className: index === 0 ? "is-active" : "",
      text: slide.eyebrow,
      attrs: { type: "button", "aria-pressed": index === 0 ? "true" : "false" },
      dataset: { heroDot: index },
    }),
  );

  replaceChildren("[data-render-hero]", [
    createElement("div", { className: "hero-shell" }, [
      ...slides,
      createElement("div", { className: "hero-dots", attrs: { "aria-label": "메인 배너 선택" } }, dots),
    ]),
  ]);
}

function renderTrustStrip() {
  replaceChildren(
    "[data-render-trust-strip]",
    (content.trustStats || []).map((item) =>
      createElement("div", {}, [
        createElement("strong", { text: item.value }),
        createElement("span", { text: item.label }),
      ]),
    ),
  );
}

function renderServices() {
  replaceChildren(
    "[data-render-services]",
    (content.quickServices || []).map(([eyebrow, title, body]) =>
      createElement("article", { className: "service-card" }, [
        createElement("span", { text: eyebrow }),
        createElement("h3", { text: title }),
        createElement("p", { text: body }),
      ]),
    ),
  );
}

function renderBranches() {
  replaceChildren(
    "[data-render-branches]",
    (content.branches || []).map((branch) => {
      const actions = [
        link("네이버 플레이스", branch.naverMapUrl),
        link("전화하기", branch.phoneHref),
      ];
      if (branch.id === "suwon") {
        actions.push(link("인스타그램", branch.instagramUrl));
        actions.push(link("블로그", branch.blogUrl));
        actions.push(link("카카오", branch.kakaoUrl));
      }

      return createElement("article", { className: "branch-card" }, [
        createElement("p", { className: "branch-region", text: branch.area }),
        createElement("h3", { text: branch.name }),
        createElement("p", { className: "branch-legal-name", text: branch.legalName }),
        createElement("p", { text: "방문 전 대표번호로 상담 가능 여부와 아이 정보를 확인해주세요." }),
        createElement("dl", {}, [
          createElement("div", {}, [
            createElement("dt", { text: "주소" }),
            createElement("dd", { text: branch.address }),
          ]),
          createElement("div", {}, [
            createElement("dt", { text: "전화" }),
            createElement("dd", {}, [link(branch.phone, branch.phoneHref)]),
          ]),
        ]),
        createElement("div", { className: "channel-actions" }, actions),
      ]);
    }),
  );
}

function renderFiltersAndPets() {
  replaceChildren(
    "[data-render-filters]",
    (content.filters?.pet || []).map((filter, index) =>
      createElement("button", {
        className: `filter-button${index === 0 ? " is-active" : ""}`,
        text: filter.label,
        attrs: { type: "button" },
        dataset: { filter: filter.value },
      }),
    ),
  );

  replaceChildren(
    "[data-render-pets]",
    (content.availablePets?.items || []).map((item) =>
      createElement("article", { className: "puppy-card", dataset: { category: item.categories } }, [
        createElement("img", { attrs: { src: item.image, alt: item.alt } }),
        createElement("div", { className: "puppy-info" }, [
          createElement("span", { text: item.id.replace("photo-", "사진 자료 ") }),
          createElement("h3", { text: item.title }),
          createElement("ul", {}, item.details.map((detail) => createElement("li", { text: detail }))),
          link("상담문의", "#contact"),
        ]),
      ]),
    ),
  );
}

function renderCare() {
  replaceChildren(
    "[data-render-care-graphics]",
    (content.care?.graphics || []).map((graphic) =>
      createElement("img", { attrs: { src: graphic.image, alt: graphic.alt } }),
    ),
  );
  replaceChildren(
    "[data-render-care-text]",
    [
      createElement("h3", { text: "포스터 텍스트 안내" }),
      createElement(
        "ul",
        {},
        (content.care?.textEquivalent || []).map((line) => createElement("li", { text: line })),
      ),
    ],
  );
}

function renderReviews() {
  replaceChildren(
    "[data-render-reviews]",
    (content.reviews?.items || []).map((item) =>
      createElement("article", { className: "review-card proof-card" }, [
        createElement("img", { attrs: { src: item.image, alt: item.alt } }),
        createElement("div", {}, [
          createElement("span", { text: "제공 후기 자료" }),
          createElement("h3", { text: item.caption }),
          link("상담 연결", "#contact"),
        ]),
      ]),
    ),
  );
}

function renderContact() {
  replaceChildren(
    "[data-render-visit-flow]",
    (content.visitFlow?.steps || []).map((step) => createElement("li", { text: step })),
  );
  replaceChildren(
    "[data-render-branch-select]",
    (content.branches || []).map((branch) =>
      createElement("option", { text: branch.name, attrs: { value: branch.id } }),
    ),
  );
}

function setHeroSlide(index) {
  document.querySelectorAll("[data-hero-slide]").forEach((slide, slideIndex) => {
    const isActive = slideIndex === index;
    slide.classList.toggle("is-active", isActive);
    slide.toggleAttribute("hidden", !isActive);
  });

  document.querySelectorAll("[data-hero-dot]").forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

function setFilter(selectedFilter) {
  let visibleCards = 0;

  document.querySelectorAll(".filter-button[data-filter]").forEach((button) => {
    const buttonFilter = button.dataset.filter || "all";
    const isActive =
      buttonFilter === selectedFilter || (isAllFilter(buttonFilter) && isAllFilter(selectedFilter));
    button.classList.toggle("is-active", isActive);
  });

  document.querySelectorAll("[data-category]").forEach((card) => {
    const categories = (card.dataset.category || "").split(/\s+/).filter(Boolean);
    const shouldShow = isAllFilter(selectedFilter) || categories.includes(selectedFilter);
    card.classList.toggle("is-hidden", !shouldShow);
    if (shouldShow) {
      visibleCards += 1;
    }
  });

  document.querySelector("#empty-state")?.toggleAttribute("hidden", visibleCards > 0);
}

function getBranch(branchId) {
  return (content?.branches || []).find((branch) => branch.id === branchId);
}

function setBranchContact(branchId) {
  const branch = getBranch(branchId) || getBranch("suwon") || (content?.branches || [])[0];
  if (!branch) {
    return;
  }

  const branchSelect = document.querySelector("#branch-select");
  const name = document.querySelector("[data-branch-contact-name]");
  const address = document.querySelector("[data-branch-contact-address]");
  const phone = document.querySelector("[data-branch-contact-phone]");
  if (branchSelect && branchSelect.value !== branch.id) {
    branchSelect.value = branch.id;
  }
  if (name) name.textContent = branch.name;
  if (address) address.textContent = branch.address;
  if (phone) {
    phone.textContent = branch.phone;
    phone.href = branch.phoneHref;
  }

  document.querySelectorAll("[data-branch-action]").forEach((action) => {
    const url = {
      call: branch.phoneHref,
      place: branch.naverMapUrl,
      instagram: branch.id === "suwon" ? branch.instagramUrl : "",
      blog: branch.id === "suwon" ? branch.blogUrl : "",
      kakao: branch.id === "suwon" ? branch.kakaoUrl : "",
    }[action.dataset.branchAction];
    action.toggleAttribute("hidden", !url);
    if (url) {
      action.href = url;
    } else {
      action.removeAttribute("href");
    }
  });
}

function bindInteractions() {
  document.querySelectorAll(".filter-button[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter || "all";
      setFilter(selectedFilter);
      history.replaceState(null, "", isAllFilter(selectedFilter) ? "#puppies" : `#${selectedFilter}`);
    });
  });

  document.querySelectorAll("[data-hero-dot]").forEach((dot) => {
    dot.addEventListener("click", () => {
      setHeroSlide(Number(dot.dataset.heroDot || 0));
    });
  });

  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  menuToggle?.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    if (mobileNav) {
      mobileNav.hidden = !willOpen;
    }
    document.body.classList.toggle("nav-open", willOpen);
  });

  mobileNav?.querySelectorAll("a").forEach((navLink) => {
    navLink.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      if (mobileNav) {
        mobileNav.hidden = true;
      }
    });
  });

  const branchSelect = document.querySelector("#branch-select");
  branchSelect?.addEventListener("change", () => {
    setBranchContact(branchSelect.value);
  });
}

if (hasContent) {
  renderNavigation();
  renderHero();
  renderTrustStrip();
  renderServices();
  renderBranches();
  renderFiltersAndPets();
  renderCare();
  renderReviews();
  renderContact();
}
bindInteractions();
setFilter("all");
setHeroSlide(0);
setBranchContact("suwon");
