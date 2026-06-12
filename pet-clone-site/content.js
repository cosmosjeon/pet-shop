(function attachHealthDogContent(root) {
  const healthDogContent = {
    meta: {
      id: "healthdog-site-content",
      version: "2026-06-12.wave1.todo2",
      companyName: "헬스독",
      language: "ko",
      sourceOfTruth: "client-research/healthdog-new-input/updated-build-plan.md",
      guardrails: [
        "가격 정보는 확인 전까지 노출하지 않습니다.",
        "가짜 후기, 가짜 보호자, 가짜 분양 가능 개체를 만들지 않습니다.",
        "확인되지 않은 의료 보장, 치료 보장, 수술 할인 문구를 사용하지 않습니다.",
      ],
    },

    brand: {
      name: "헬스독",
      fullName: "헬스독",
      mainPhone: "1600-4533",
      phoneHref: "tel:1600-4533",
      headline: "건강하게 자란 반려가족을 만나는 곳, 헬스독",
      shortDescription:
        "전국 6개 지점에서 아이의 건강과 성향, 가족의 생활 환경까지 함께 확인하며 책임 있는 상담을 도와드립니다.",
    },

    nav: [
      { label: "분양중 아이들", href: "#puppies" },
      { label: "헬스독 케어", href: "#care" },
      { label: "후기", href: "#reviews" },
      { label: "지점안내", href: "#branches" },
      { label: "상담문의", href: "#contact" },
    ],

    ctas: {
      primary: {
        label: "전화 상담 1600-4533",
        href: "tel:1600-4533",
        ariaLabel: "헬스독 전화 상담 1600-4533",
      },
      secondary: {
        label: "가까운 지점 찾기",
        href: "#branches",
      },
      reviews: {
        label: "실제 후기 보기",
        href: "#reviews",
      },
      branchMap: {
        label: "네이버 플레이스 보기",
        external: true,
      },
    },

    hero: {
      eyebrow: "HEALTH DOG",
      headline: "건강하게 자란 반려가족을 만나는 곳, 헬스독",
      body:
        "전국 6개 지점에서 아이의 건강과 성향, 가족의 생활 환경까지 함께 확인하며 책임 있는 상담을 도와드립니다.",
      trustStrip: [
        "대표번호 1600-4533",
        "전국 6개 지점",
        "실제 보호자 후기",
        "네이버 플레이스 연결",
      ],
    },

    serviceGrid: {
      title: "처음부터 건강하게, 가족에게 맞게",
      items: [
        {
          title: "헬스독 소개",
          body: "전국 지점에서 반려가족 상담을 돕는 헬스독 브랜드 안내",
        },
        {
          title: "분양 상담",
          body: "아이의 성향과 가족의 생활을 함께 보는 방문 중심 상담",
        },
        {
          title: "건강 케어",
          body: "분양 전 건강 상태 확인과 초보 보호자 케어 안내",
        },
        {
          title: "지점 위치",
          body: "창원, 부산, 송파, 수원, 평택, 인천 지점 네이버 지도 연결",
        },
        {
          title: "실제 후기",
          body: "실제 보호자 후기와 무료분양인증 사진 중심의 신뢰 자료",
        },
        {
          title: "빠른 상담",
          body: "대표번호 1600-4533으로 가까운 지점 상담 연결",
        },
      ],
    },

    branches: [
      {
        id: "changwon",
        region: "경남",
        name: "창원헬스독",
        displayAddress: "경남 창원시 의창구 서상동 676-1",
        naverMapUrl:
          "https://map.naver.com/p/search/%EA%B2%BD%EB%82%A8%20%EC%B0%BD%EC%9B%90%EC%8B%9C%20%EC%9D%98%EC%B0%BD%EA%B5%AC%20%EC%84%9C%EC%83%81%EB%8F%99%20676-1%20%EC%B0%BD%EC%9B%90%ED%97%AC%EC%8A%A4%EB%8F%85",
      },
      {
        id: "busan",
        region: "부산",
        name: "부산헬스독",
        displayAddress: "부산 부산진구 부암동 96-8",
        naverMapUrl:
          "https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%20%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EB%B6%80%EC%95%94%EB%8F%99%2096-8%20%EB%B6%80%EC%82%B0%ED%97%AC%EC%8A%A4%EB%8F%85",
      },
      {
        id: "songpa",
        region: "서울",
        name: "송파헬스독",
        displayAddress: "서울 송파구 잠실동 188-12",
        naverMapUrl:
          "https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EC%86%A1%ED%8C%8C%EA%B5%AC%20%EC%9E%A0%EC%8B%A4%EB%8F%99%20188-12%20%EC%86%A1%ED%8C%8C%ED%97%AC%EC%8A%A4%EB%8F%85",
      },
      {
        id: "suwon",
        region: "경기",
        name: "수원헬스독",
        displayAddress: "경기도 수원시 이의동 1266-5",
        naverMapUrl:
          "https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%88%98%EC%9B%90%EC%8B%9C%20%EC%9D%B4%EC%9D%98%EB%8F%99%201266-5%20%EC%88%98%EC%9B%90%ED%97%AC%EC%8A%A4%EB%8F%85",
      },
      {
        id: "pyeongtaek",
        region: "경기",
        name: "평택헬스독",
        displayAddress: "경기도 평택시 평택동 164-2",
        sourceAddressNote: "사용자 원문은 경기도 평택동 164-2였으며, UI 표기는 평택시를 포함해 정규화합니다.",
        naverMapUrl:
          "https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%ED%8F%89%ED%83%9D%EB%8F%99%20164-2%20%ED%8F%89%ED%83%9D%ED%97%AC%EC%8A%A4%EB%8F%85",
      },
      {
        id: "incheon",
        region: "인천",
        name: "인천헬스독",
        displayAddress: "인천 서구 당하동 1098-5",
        naverMapUrl:
          "https://map.naver.com/p/search/%EC%9D%B8%EC%B2%9C%20%EC%84%9C%EA%B5%AC%20%EB%8B%B9%ED%95%98%EB%8F%99%201098-5%20%EC%9D%B8%EC%B2%9C%ED%97%AC%EC%8A%A4%EB%8F%85",
      },
    ],

    filters: {
      pet: [
        { label: "전체", value: "all" },
        { label: "말티푸", value: "maltipoo" },
        { label: "포메라니안", value: "pomeranian" },
        { label: "푸들", value: "poodle" },
        { label: "비숑", value: "bichon" },
        { label: "소형견", value: "small" },
        { label: "중대형견", value: "medium-large" },
      ],
    },

    availablePets: {
      sectionId: "puppies",
      title: "분양중 아이들",
      body: "사진과 기본 정보는 실제 확인된 자료만 연결합니다.",
      emptyState: "확인된 아이 사진과 상담 정보가 준비되는 대로 보여드립니다.",
      cardMetadataFields: [
        "photoSrc",
        "photoAlt",
        "breed",
        "sex",
        "personality",
        "healthCheckSummary",
        "availableBranchId",
      ],
    },

    care: {
      sectionId: "care",
      title: "헬스독 평생 케어 약속",
      body:
        "분양 전부터 분양 후까지, 보호자와 반려견이 안심할 수 있도록 함께합니다.",
      promises: [
        "건강 체크 안내",
        "초보 보호자 케어",
        "사후 상담",
        "지점 방문 상담",
      ],
      safeCopy: [
        "처음부터 건강하게",
        "실제 후기와 투명한 상담",
        "가까운 6개 지점",
      ],
    },

    reviews: {
      sectionId: "reviews",
      title: "실제 보호자 후기",
      body: "사진보다 중요한 건 실제 보호자의 선택입니다.",
      proofLabel: "무료분양인증",
      imageMetadataFields: [
        "photoSrc",
        "photoAlt",
        "reviewType",
        "sourceFolder",
        "visibleText",
      ],
      placeholderPolicy:
        "후기 이미지는 제공된 실제 review/proof 사진만 사용하고 임의 후기는 작성하지 않습니다.",
    },

    visitFlow: {
      sectionId: "contact",
      title: "가까운 지점에서 직접 만나보세요",
      steps: ["상담", "아이 확인", "건강/성향 안내", "가족 결정"],
      contactLine: "대표번호 1600-4533",
    },

    stickyCta: {
      desktop: [
        { label: "전화상담", href: "tel:1600-4533" },
        { label: "후기보기", href: "#reviews" },
        { label: "지점안내", href: "#branches" },
      ],
      mobile: [
        { label: "전화상담", href: "tel:1600-4533" },
        { label: "지점찾기", href: "#branches" },
      ],
    },

    footer: {
      companyName: "헬스독",
      representativePhone: "1600-4533",
      branchListLabel: "전국 6개 지점",
      socialLinksPolicy: "확인된 공식 소셜 링크가 생기기 전까지 노출하지 않습니다.",
    },
  };

  root.HealthDogContent = healthDogContent;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = healthDogContent;
  }
})(typeof window !== "undefined" ? window : globalThis);
