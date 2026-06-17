(function attachHealthDogContent(root) {
  const naverSearch = (query) =>
    `https://map.naver.com/p/search/${encodeURIComponent(query)}`;

  const phone = "1600-4533";
  const phoneHref = `tel:${phone}`;

  const branches = [
    {
      id: "changwon",
      legalName: "창원헬스독",
      name: "헬스독 창원점",
      shortName: "창원",
      address: "경남 창원시 의창구 서상동 676-1",
      area: "창원 · 김해 · 경남권",
      naverMapUrl: naverSearch("경남 창원시 의창구 서상동 676-1 창원헬스독"),
    },
    {
      id: "busan",
      legalName: "부산헬스독",
      name: "헬스독 부산점",
      shortName: "부산",
      address: "부산 부산진구 부암동 96-8",
      area: "부산 · 부산진구 · 경남권",
      naverMapUrl: naverSearch("부산 부산진구 부암동 96-8 부산헬스독"),
    },
    {
      id: "songpa",
      legalName: "송파헬스독",
      name: "헬스독 송파점",
      shortName: "송파",
      address: "서울 송파구 잠실동 188-12",
      area: "서울 · 송파 · 강남권",
      naverMapUrl: naverSearch("서울 송파구 잠실동 188-12 송파헬스독"),
    },
    {
      id: "suwon",
      legalName: "수원헬스독",
      name: "헬스독 수원점",
      shortName: "수원",
      address: "경기도 수원시 이의동 1266-5",
      area: "수원 · 용인 · 화성권",
      naverMapUrl: naverSearch("경기도 수원시 이의동 1266-5 수원헬스독"),
      instagramUrl: "https://www.instagram.com/healthdog_suwon",
      blogUrl: "https://blog.naver.com/dallae0212",
      kakaoUrl: "https://pf.kakao.com/_dZqfn",
    },
    {
      id: "pyeongtaek",
      legalName: "평택헬스독",
      name: "헬스독 평택점",
      shortName: "평택",
      address: "경기도 평택시 평택동 164-2",
      area: "평택 · 천안 · 오산권",
      naverMapUrl: naverSearch("경기도 평택시 평택동 164-2 평택헬스독"),
    },
    {
      id: "incheon",
      legalName: "인천헬스독",
      name: "헬스독 인천점",
      shortName: "인천",
      address: "인천 서구 당하동 1098-5",
      area: "인천 · 서구 · 검단권",
      naverMapUrl: naverSearch("인천 서구 당하동 1098-5 인천헬스독"),
    },
  ].map((branch) => ({
    ...branch,
    phone,
    phoneHref,
  }));

  const petImages = [
    ["pet-01-white-outdoor.webp", "헬스독에서 제공받은 하얀 반려견 사진 자료", "bichon small"],
    ["pet-02-brown-desk.webp", "헬스독에서 제공받은 갈색 반려견 사진 자료", "maltipoo small"],
    ["pet-03-black-white-desk.webp", "헬스독에서 제공받은 흑백 반려견 사진 자료", "pomeranian small"],
    ["pet-04-tan-handheld.webp", "헬스독에서 제공받은 품에 안긴 반려견 사진 자료", "bichon small"],
    ["pet-05-black-tan-outdoor.webp", "헬스독에서 제공받은 야외 반려견 사진 자료", "maltipoo small"],
    ["pet-06-lap-pair.webp", "헬스독에서 제공받은 보호자 품의 반려견 사진 자료", "poodle small"],
    ["pet-07-charcoal-desk.webp", "헬스독에서 제공받은 진회색 반려견 사진 자료", "maltipoo small"],
    ["pet-08-gray-handheld.webp", "헬스독에서 제공받은 회색 반려견 사진 자료", "poodle small"],
    ["pet-09-white-turf.webp", "헬스독에서 제공받은 잔디 위 반려견 사진 자료", "bichon small"],
    ["pet-10-black-white-outdoor.webp", "헬스독에서 제공받은 야외 흑백 반려견 사진 자료", "pomeranian small"],
    ["pet-11-basket-black-white.webp", "헬스독에서 제공받은 바구니 속 반려견 사진 자료", "poodle small"],
    ["pet-12-black-pair.webp", "헬스독에서 제공받은 검은 반려견 사진 자료", "poodle medium"],
    ["pet-13-basket-panda.webp", "헬스독에서 제공받은 바구니 반려견 사진 자료", "maltipoo small"],
    ["pet-14-gray-basket.webp", "헬스독에서 제공받은 회색 바구니 반려견 사진 자료", "bichon small"],
    ["pet-15-black-handheld.webp", "헬스독에서 제공받은 손 위의 반려견 사진 자료", "pomeranian medium"],
    ["pet-16-brown-closeup.webp", "헬스독에서 제공받은 갈색 반려견 클로즈업 사진 자료", "poodle small"],
    ["pet-17-white-lounge.webp", "헬스독에서 제공받은 흰색 반려묘 사진 자료", "small"],
    ["pet-18-tricolor-closeup.webp", "헬스독에서 제공받은 삼색 반려묘 사진 자료", "medium"],
  ].map(([image, alt, category], index) => ({
    id: `photo-${String(index + 1).padStart(2, "0")}`,
    title: `제공 사진 자료 ${String(index + 1).padStart(2, "0")}`,
    image: `assets/healthdog/pets/${image}`,
    alt,
    categories: `all ${category}`,
    details: [
      "견종: 지점 상담 시 확인",
      "성별: 지점 상담 시 확인",
      "성격: 보호자 생활 환경과 함께 상담",
      "건강 체크: 상담 시 안내",
      "상담 가능: 대표번호 1600-4533",
    ],
  }));

  const reviewImages = [
    "review-01-store-proof.webp",
    "review-02-poodle-proof.webp",
    "review-03-portrait-proof.webp",
    "review-04-vertical-sign.webp",
    "review-05-sofa-proof.webp",
    "review-06-family-proof.webp",
    "review-07-lobby-proof.webp",
    "review-08-pair-proof.webp",
    "review-09-pomeranian-proof.webp",
    "review-10-social-card.webp",
    "review-11-text-proof.webp",
    "review-12-text-proof.webp",
  ].map((image, index) => ({
    id: `proof-${String(index + 1).padStart(2, "0")}`,
    image: `assets/healthdog/reviews/${image}`,
    alt: `헬스독에서 제공받은 무료분양인증 후기 자료 ${index + 1}`,
    caption: `제공된 무료분양인증 후기 자료 ${index + 1}`,
  }));

  const healthDogContent = {
    meta: {
      id: "healthdog-static-site-content",
      version: "2026-06-17.approved-plan-safe-content",
      companyName: "헬스독",
      language: "ko",
      sourceOfTruth: "user-approved Health Dog website build plan",
      guardrails: [
        "메인 배너에는 금액, 프로모션, 비용 면제형 분양 문구를 전면 노출하지 않습니다.",
        "아이별 견종, 성별, 월령, 조건은 지점 상담으로 확인합니다.",
        "확인되지 않은 의료·치료 결과 약속이나 완전 책임 표현을 사용하지 않습니다.",
      ],
    },
    brand: {
      name: "헬스독",
      mainPhone: phone,
      phoneHref,
      h1: "건강하게 자란 반려가족을 만나는 곳, 헬스독",
      heroCopy:
        "전국 6개 지점에서 아이의 건강과 성향, 가족의 생활 환경까지 함께 확인하며 책임 있는 상담을 도와드립니다.",
    },
    nav: [
      { label: "분양중 아이들", href: "#puppies" },
      { label: "헬스독 케어", href: "#care" },
      { label: "후기", href: "#reviews" },
      { label: "지점안내", href: "#branches" },
      { label: "상담문의", href: "#contact" },
    ],
    heroSlides: [
      {
        eyebrow: "HEALTH DOG",
        title: "건강하게 자란 반려가족을 만나는 곳, 헬스독",
        body:
          "전국 6개 지점에서 아이의 건강과 성향, 가족의 생활 환경까지 함께 확인하며 책임 있는 상담을 도와드립니다.",
        image: "assets/healthdog/pets/pet-01-white-outdoor.webp",
        alt: "헬스독에서 제공받은 하얀 반려견 사진 자료",
        primaryCta: { label: "전화 상담 1600-4533", href: phoneHref },
        secondaryCta: { label: "가까운 지점 찾기", href: "#branches" },
      },
      {
        eyebrow: "6 BRANCHES",
        title: "전국 6개 지점에서 같은 기준으로 상담합니다",
        body: "창원, 부산, 송파, 수원, 평택, 인천 지점의 위치와 네이버 플레이스 링크를 한 번에 확인하세요.",
        image: "assets/healthdog/generated/promise-banner.svg",
        alt: "헬스독 약속 배너",
        primaryCta: { label: "지점안내 보기", href: "#branches" },
        secondaryCta: { label: "대표번호 1600-4533", href: phoneHref },
      },
      {
        eyebrow: "REAL PHOTOS",
        title: "제공받은 실제 사진 자료를 중심으로 보여드립니다",
        body: "사진은 상담 전 참고 자료이며, 견종과 성별, 건강 체크 내용은 지점 상담에서 정확히 확인합니다.",
        image: "assets/healthdog/pets/pet-06-lap-pair.webp",
        alt: "헬스독에서 제공받은 보호자 품의 반려견 사진 자료",
        primaryCta: { label: "분양중 아이들 보기", href: "#puppies" },
        secondaryCta: { label: "상담문의", href: "#contact" },
      },
    ],
    trustStats: [
      { value: "대표번호 1600-4533", label: "전화 상담" },
      { value: "전국 6개 지점", label: "창원 · 부산 · 송파 · 수원 · 평택 · 인천" },
      { value: "실제 보호자 후기", label: "제공받은 후기 사진 자료" },
      { value: "네이버 플레이스 연결", label: "각 지점 위치 확인" },
    ],
    quickServices: [
      ["Introduce", "매장소개", "넓고 깨끗한 상담 환경과 지점 정보를 안내합니다."],
      ["For Sale", "분양안내", "사진은 참고 자료이며 정확한 아이 정보는 지점 상담으로 확인합니다."],
      ["Partners", "가맹점 모집", "헬스독의 상담 기준과 운영 방향을 함께할 파트너를 기다립니다."],
      ["Location", "매장위치", "가까운 지점을 네이버 플레이스로 바로 확인할 수 있습니다."],
    ],
    branches,
    filters: {
      pet: [
        { label: "전체", value: "all" },
        { label: "말티푸", value: "maltipoo" },
        { label: "포메라니안", value: "pomeranian" },
        { label: "푸들", value: "poodle" },
        { label: "비숑", value: "bichon" },
        { label: "소형견", value: "small" },
        { label: "중대형견", value: "medium" },
      ],
    },
    availablePets: {
      sectionId: "puppies",
      title: "분양중 아이들",
      body:
        "제공받은 실제 아이 사진 자료입니다. 견종, 성별, 월령, 성격, 건강 체크 내용은 지점 상담에서 정확히 확인해주세요.",
      emptyState: "선택한 조건은 지점 상담으로 확인해주세요.",
      items: petImages,
    },
    care: {
      sectionId: "care",
      title: "헬스독 케어",
      body: "분양 전부터 분양 후까지, 보호자와 반려견이 안심할 수 있도록 함께합니다.",
      textEquivalent: [
        "헬스독 평생 케어 약속",
        "분양 전부터 분양 후까지, 보호자와 반려견이 안심할 수 있도록 함께합니다.",
        "건강 체크 안내",
        "초보 보호자 케어",
        "사후 상담",
        "지점 방문 상담",
        "처음부터 건강하게",
        "실제 후기와 투명한 상담",
        "가까운 6개 지점",
      ],
      graphics: [
        {
          image: "assets/healthdog/generated/service-guide-grid.svg",
          alt: "헬스독 소개, 분양 상담, 건강 케어, 지점 위치, 실제 후기, 빠른 상담 안내",
        },
        {
          image: "assets/healthdog/generated/care-promise-poster.svg",
          alt: "헬스독 평생 케어 약속 포스터",
        },
        {
          image: "assets/healthdog/generated/promise-banner.svg",
          alt: "처음부터 건강하게, 실제 후기와 투명한 상담, 가까운 6개 지점 안내 배너",
        },
      ],
    },
    reviews: {
      sectionId: "reviews",
      title: "후기",
      body: "사진보다 중요한 건 실제 보호자의 선택입니다. 제공받은 무료분양인증 후기 사진 자료를 proof 영역에 배치했습니다.",
      items: reviewImages,
    },
    visitFlow: {
      sectionId: "contact",
      title: "상담문의",
      body: "가까운 헬스독 지점을 선택하고 전화 또는 네이버 플레이스로 상담을 시작하세요.",
      steps: ["상담", "아이 확인", "건강/성향 안내", "가족 결정"],
    },
  };

  root.HealthDogContent = healthDogContent;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = healthDogContent;
  }
})(typeof window !== "undefined" ? window : globalThis);
