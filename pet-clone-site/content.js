(function attachHealthDogContent(root) {
  const naverSearch = (query) =>
    `https://map.naver.com/p/search/${encodeURIComponent(query)}`;

  const healthDogContent = {
    meta: {
      id: "healthdog-planning-doc-site-content",
      version: "2026-06-16.planning-doc",
      companyName: "헬스독",
      language: "ko",
      sourceOfTruth: "/Users/cosmos/Downloads/healthdog_homepage_planning (2).md",
      guardrails: [
        "메인 배너에는 가격, 할인, 무료분양 문구를 전면 노출하지 않습니다.",
        "아이별 조건은 지점 상담으로 안내합니다.",
        "확인되지 않은 의료 보장, 치료 보장, 완전 보장 문구를 사용하지 않습니다.",
      ],
    },

    brand: {
      name: "헬스독",
      fullName: "헬스독 안심분양 브랜드",
      mainPhone: "1600-4533",
      phoneHref: "tel:1600-4533",
      headline: "건강한 만남을 준비하는 안심분양 브랜드, 헬스독",
      shortDescription:
        "6개 지점에서 아이의 컨디션과 보호자의 생활 환경을 함께 살피며 신중한 상담을 돕습니다.",
    },

    nav: [
      { label: "헬스독 소개", href: "#about" },
      { label: "지점 안내", href: "#branches" },
      { label: "아이들 보기", href: "#puppies" },
      { label: "입양 후기", href: "#reviews" },
      { label: "상담 하기", href: "#contact" },
    ],

    heroSlides: [
      {
        eyebrow: "BRAND TRUST",
        title: "건강한 만남을 준비하는 안심분양 브랜드, 헬스독",
        body: "아이의 컨디션과 보호자의 생활 환경을 함께 고려해 더 신중한 입양 상담을 도와드립니다.",
        image: "assets/healthdog/pets/pet-01-white-outdoor.webp",
        alt: "헬스독에서 상담 가능한 하얀 반려견",
        primaryCta: { label: "헬스독 소개 보기", href: "#about" },
        secondaryCta: { label: "상담 문의하기", href: "#contact" },
      },
      {
        eyebrow: "6 BRANCHES",
        title: "6개의 지점, 하나의 안심 기준",
        body: "창원, 수원, 부산, 평택, 인천, 송파에서 가까운 헬스독 지점을 만나보세요.",
        image: "assets/story/promise.jpg",
        alt: "헬스독 6개 지점 안내 이미지",
        primaryCta: { label: "가까운 지점 찾기", href: "#branches" },
        secondaryCta: { label: "대표번호 1600-4533", href: "tel:1600-4533" },
      },
      {
        eyebrow: "MATCHING CARE",
        title: "우리 가족에게 맞는 아이를 함께 찾아드립니다",
        body: "지점별 아이들의 사진과 정보를 확인하고, 가까운 매장에서 편하게 상담받아보세요.",
        image: "assets/healthdog/pets/pet-06-lap-pair.webp",
        alt: "상담 전 확인할 수 있는 헬스독 반려견 사진",
        primaryCta: { label: "아이들 보러가기", href: "#puppies" },
        secondaryCta: { label: "상담하기", href: "#contact" },
      },
    ],

    trustStats: [
      { value: "6", label: "운영 지점" },
      { value: "1:1", label: "맞춤 상담" },
      { value: "1600-4533", label: "대표 상담번호" },
      { value: "원문 링크", label: "후기·채널 연결" },
    ],

    introCards: [
      {
        title: "건강 상태 확인",
        body: "아이들의 기본 컨디션과 건강 관련 정보를 확인하고 안내합니다.",
      },
      {
        title: "1:1 맞춤 상담",
        body: "처음 키우는 분들도 아이의 성향과 생활 환경을 함께 상담받을 수 있습니다.",
      },
      {
        title: "가까운 지점 연결",
        body: "창원, 수원, 부산, 평택, 인천, 송파 지점에서 방문 안내를 받을 수 있습니다.",
      },
    ],

    branches: [
      {
        id: "changwon",
        name: "헬스독 창원점",
        shortName: "창원",
        region: "창원 · 김해 · 대구 · 부산",
        address: "경남 창원시 의창구 서상동 676-1",
        phone: "1600-4533",
        instagramUrl: "https://www.instagram.com/healthdog.cw/",
        naverMapUrl: naverSearch("경남 창원시 의창구 서상동 676-1 창원헬스독"),
        blogUrl: "",
        kakaoUrl: "",
        description: "365일 상담과 이동 안내를 중심으로 운영되는 창원권 안심분양 지점입니다.",
      },
      {
        id: "suwon",
        name: "헬스독 수원점",
        shortName: "수원",
        region: "수원 · 용인 · 안산 · 화성 · 동탄",
        address: "경기도 수원시 이의동 1266-5",
        phone: "1600-4533",
        instagramUrl: "https://www.instagram.com/healthdog_suwon",
        naverMapUrl: naverSearch("경기도 수원시 이의동 1266-5 수원헬스독"),
        blogUrl: "https://blog.naver.com/dallae0212",
        kakaoUrl: "https://pf.kakao.com/_dZqfn",
        description: "프리미엄 케어와 처음 보호자를 위한 상담 콘텐츠가 강한 수원점입니다.",
      },
      {
        id: "busan",
        name: "헬스독 부산점",
        shortName: "부산",
        region: "부산 · 부산진구 · 경남권",
        address: "부산 부산진구 부암동 96-8",
        phone: "1600-4533",
        instagramUrl: "https://www.instagram.com/healthdog_official/",
        naverMapUrl: naverSearch("부산 부산진구 부암동 96-8 부산헬스독"),
        blogUrl: "",
        kakaoUrl: "",
        description: "실사 중심 아이 소개와 지점 방문 상담을 안내하는 부산권 지점입니다.",
      },
      {
        id: "pyeongtaek",
        name: "헬스독 평택점",
        shortName: "평택",
        region: "평택 · 천안 · 오산 · 충청권",
        address: "경기도 평택시 평택동 164-2",
        phone: "1600-4533",
        instagramUrl: "https://www.instagram.com/healthdog.official/",
        naverMapUrl: naverSearch("경기도 평택시 평택동 164-2 평택헬스독"),
        blogUrl: "",
        kakaoUrl: "",
        description: "강아지와 고양이 상담을 함께 안내하는 평택권 안심센터입니다.",
      },
      {
        id: "incheon",
        name: "헬스독 인천점",
        shortName: "인천",
        region: "인천 · 서구 · 검단권",
        address: "인천 서구 당하동 1098-5",
        phone: "1600-4533",
        instagramUrl: "https://www.instagram.com/helseudoginceon/",
        naverMapUrl: naverSearch("인천 서구 당하동 1098-5 인천헬스독"),
        blogUrl: "",
        kakaoUrl: "https://pf.kakao.com/_xjXWLn",
        description: "건강검진 안내와 전국 이동 상담 메시지가 강한 인천점입니다.",
      },
      {
        id: "songpa",
        name: "헬스독 송파점",
        shortName: "송파",
        region: "서울 · 송파 · 강남권",
        address: "서울 송파구 잠실동 188-12",
        phone: "1600-4533",
        instagramUrl: "https://www.instagram.com/healthdog.1/",
        naverMapUrl: naverSearch("서울 송파구 잠실동 188-12 송파헬스독"),
        blogUrl: "https://blog.naver.com/young417602",
        kakaoUrl: "",
        description: "1:1 반려견 매칭 상담과 분양 후 안내를 강조하는 서울권 지점입니다.",
      },
    ],

    filters: {
      pet: [
        { label: "전체", value: "all" },
        { label: "강아지", value: "dog" },
        { label: "고양이", value: "cat" },
        { label: "창원", value: "changwon" },
        { label: "수원", value: "suwon" },
        { label: "부산", value: "busan" },
        { label: "평택", value: "pyeongtaek" },
        { label: "인천", value: "incheon" },
        { label: "송파", value: "songpa" },
        { label: "무료분양", value: "free" },
        { label: "책임분양", value: "responsibility" },
        { label: "일반분양", value: "general" },
        { label: "가족 만남 완료", value: "completed" },
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
      title: "헬스독에서 기다리는 아이들",
      body: "지점별로 상담 전 확인할 수 있는 아이 사진과 기본 정보를 모았습니다.",
      emptyState: "선택한 조건에 맞는 아이는 지점 상담을 통해 확인해주세요.",
      items: [
        ["두부", "비숑", "남아", "2개월", "창원", "changwon", "dog bichon small free", "pet-01-white-outdoor.webp"],
        ["모카", "말티푸", "여아", "3개월", "창원", "changwon", "dog maltipoo small responsibility", "pet-02-brown-desk.webp"],
        ["퐁실", "포메라니안", "남아", "2개월", "창원", "changwon", "dog pomeranian small general", "pet-03-black-white-desk.webp"],
        ["설이", "미니비숑", "여아", "2개월", "수원", "suwon", "dog bichon small responsibility", "pet-04-tan-handheld.webp"],
        ["맹이", "크림파티 말티푸", "남아", "3개월", "수원", "suwon", "dog maltipoo small free", "pet-05-black-tan-outdoor.webp"],
        ["토리", "말티츄", "여아", "2개월", "부산", "busan", "dog small general", "pet-06-lap-pair.webp"],
        ["라떼", "크림 말티푸", "남아", "3개월", "부산", "busan", "dog maltipoo small responsibility", "pet-07-charcoal-desk.webp"],
        ["모찌", "말티푸", "여아", "2개월", "평택", "pyeongtaek", "dog maltipoo small free", "pet-08-gray-handheld.webp"],
        ["하루", "비숑프리제", "남아", "3개월", "평택", "pyeongtaek", "dog bichon small general", "pet-09-white-turf.webp"],
        ["구름", "포메라니안", "여아", "2개월", "인천", "incheon", "dog pomeranian small responsibility", "pet-10-black-white-outdoor.webp"],
        ["밤비", "푸들", "남아", "4개월", "인천", "incheon", "dog poodle small completed", "pet-11-basket-black-white.webp"],
        ["로이", "푸들", "남아", "3개월", "송파", "songpa", "dog poodle medium general", "pet-12-black-pair.webp"],
        ["초코", "말티푸", "여아", "2개월", "송파", "songpa", "dog maltipoo small responsibility", "pet-13-basket-panda.webp"],
        ["나나", "비숑", "여아", "3개월", "수원", "suwon", "dog bichon small free", "pet-14-gray-basket.webp"],
        ["루이", "포메라니안", "남아", "2개월", "부산", "busan", "dog pomeranian medium general", "pet-15-black-handheld.webp"],
        ["쿠키", "토이푸들", "여아", "4개월", "창원", "changwon", "dog poodle small completed", "pet-16-brown-closeup.webp"],
        ["별이", "상담 대기묘", "여아", "3개월", "평택", "pyeongtaek", "cat responsibility", "pet-17-white-lounge.webp"],
        ["단추", "상담 대기묘", "남아", "2개월", "인천", "incheon", "cat free", "pet-18-tricolor-closeup.webp"],
      ].map(([name, breed, sex, age, branchLabel, branchId, categories, image]) => ({
        name,
        breed,
        sex,
        age,
        branchLabel,
        branchId,
        categories: `all ${categories} ${branchId}`,
        image: `assets/healthdog/pets/${image}`,
        status: categories.includes("completed") ? "가족을 만났어요" : "상담 전 확인",
        health: "기본 컨디션과 건강 관련 안내를 지점에서 확인합니다.",
        sourceUrl: "#contact",
      })),
    },

    reviews: {
      sectionId: "reviews",
      title: "헬스독을 통해 가족이 된 이야기",
      body: "실제 보호자님들이 남겨주신 후기와 지점별 리뷰를 출처 링크 중심으로 모았습니다.",
      proofImagePolicy:
        "후기 이미지는 제공된 실제 review/proof 사진만 사용하고 임의 원문 후기를 작성하지 않습니다.",
      items: [
        ["수원점", "네이버 리뷰", "처음 상담부터 아이 성향을 자세히 안내받았다는 보호자 후기", "review-01-store-proof.webp"],
        ["창원점", "인스타 후기", "가족을 만난 아이의 인증 사진과 상담 기록", "review-02-poodle-proof.webp"],
        ["부산점", "네이버 리뷰", "실제 방문 후 아이 컨디션을 확인했다는 후기", "review-03-portrait-proof.webp"],
        ["평택점", "분양후기", "지점 상담 후 가족을 만난 사례", "review-04-vertical-sign.webp"],
        ["인천점", "인스타 후기", "입양 후 적응 과정을 공유한 보호자 후기", "review-05-sofa-proof.webp"],
        ["송파점", "블로그 후기", "1:1 상담과 사후 안내를 확인한 후기", "review-06-family-proof.webp"],
        ["수원점", "블로그 후기", "처음 키우는 보호자를 위한 준비 안내 사례", "review-07-lobby-proof.webp"],
        ["부산점", "네이버 리뷰", "사진과 방문 상담을 함께 확인한 후기", "review-08-pair-proof.webp"],
        ["송파점", "인스타 후기", "가족이 된 순간을 남긴 보호자 인증", "review-09-pomeranian-proof.webp"],
      ].map(([branch, source, summary, image]) => ({
        branch,
        source,
        summary,
        image: `assets/healthdog/reviews/${image}`,
        url: "#branches",
      })),
    },

    trustCards: [
      ["아이별 건강 체크", "아이들의 기본 컨디션과 건강 관련 정보를 확인하고 안내합니다."],
      ["3대 질병 키트 검사 안내", "주요 질병 키트 검사 여부를 지점 상담에서 확인할 수 있도록 안내합니다."],
      ["원구충 및 위생 관리", "원구충, 위생 관리, 소독 등 아이들이 지내는 환경을 꾸준히 관리합니다."],
      ["1:1 맞춤 상담", "보호자의 생활 패턴과 경험에 맞춰 아이의 성향과 준비를 함께 상담합니다."],
      ["지점별 직접 상담", "6개 지점에서 전화, 카카오, 네이버 플레이스, 인스타그램으로 문의할 수 있습니다."],
      ["분양 후 안내", "처음 키우는 분들도 입양 후 적응 과정과 케어 방법을 안내받을 수 있습니다."],
    ],

    contentHub: {
      title: "헬스독의 더 많은 이야기를 확인해보세요",
      items: [
        ["인스타그램", "창원점 아이들", "창원·김해·대구권 아이 사진과 상담 안내", "https://www.instagram.com/healthdog.cw/"],
        ["인스타그램", "수원점 아이들", "수원·용인·화성권 프리미엄 케어 소식", "https://www.instagram.com/healthdog_suwon"],
        ["블로그", "수원 블로그", "강아지정보, 강아지분양, 후기, 고양이정보", "https://blog.naver.com/dallae0212"],
        ["인스타그램", "송파점 아이들", "서울·송파·강남권 1:1 매칭 상담 소식", "https://www.instagram.com/healthdog.1/"],
        ["블로그", "송파 블로그", "지점 안내와 입양 전 준비 콘텐츠", "https://blog.naver.com/young417602"],
        ["인스타그램", "평택점 아이들", "강아지와 고양이 상담 가능한 평택권 소식", "https://www.instagram.com/healthdog.official/"],
      ].map(([type, title, body, url]) => ({ type, title, body, url })),
    },

    visitFlow: {
      sectionId: "contact",
      title: "어떤 아이가 우리 가족에게 맞을지 고민된다면",
      body: "가까운 헬스독 지점에서 아이의 성향과 건강 상태를 확인하고 편하게 상담받아보세요.",
      steps: ["지점 선택", "관심 아이 확인", "상담 채널 연결", "방문 일정 안내"],
      contactLine: "대표번호 1600-4533",
    },
  };

  root.HealthDogContent = healthDogContent;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = healthDogContent;
  }
})(typeof window !== "undefined" ? window : globalThis);
