# Health Dog Updated Build Plan

## Source Of Truth

- Company name: 헬스독
- Main phone: 1600-4533
- Branches:
  - 창원헬스독: 경남 창원시 의창구 서상동 676-1
  - 부산헬스독: 부산 부산진구 부암동 96-8
  - 송파헬스독: 서울 송파구 잠실동 188-12
  - 수원헬스독: 경기도 수원시 이의동 1266-5
  - 평택헬스독: 경기도 평택동 164-2
  - 인천헬스독: 인천 서구 당하동 1098-5

## Asset Inventory

- Logo source: `헬스독최종원본.ai`
  - PDF-compatible 1-page Illustrator file.
  - Preview extracted as `logo/healthdog-logo-preview.png`.
  - Brand colors: purple, navy, white, black line art.
- Pet photos: `pets.zip`
  - 71 high-resolution square JPG images.
  - Strong for hero collage, available-pets grid, breed feature cards.
- Review photos: `petreviews.zip`
  - 14 images.
  - Strong for trust/review section because many show `무료분양인증` boards and real customers.

## Revised Positioning

Previous direction was too close to a single-branch puppy shop. The correct direction is:

> 헬스독은 전국 6개 지점을 가진 안심 반려가족 분양 브랜드.

The website should feel warm and cute, but the primary trust should come from:

- real branch network
- real customer review photos
- clear representative phone number
- direct Naver Place navigation
- real pet photos
- official logo and consistent Health Dog brand colors

## Recommended First View

Hero message:

> 건강하게 자란 반려가족을 만나는 곳, 헬스독

Supporting copy:

> 전국 6개 지점에서 아이의 건강과 성향, 가족의 생활 환경까지 함께 확인하며 책임 있는 상담을 도와드립니다.

Hero composition:

- left: logo, headline, phone CTA, branch CTA
- right: asymmetric collage of 5-7 real puppy photos
- bottom trust strip: `대표번호 1600-4533`, `6개 지점`, `실제 분양 후기`, `네이버 플레이스 연결`

## Page Structure

1. Header
   - logo
   - nav: 분양중 아이들, 헬스독 케어, 후기, 지점안내, 상담문의
   - phone CTA: 1600-4533

2. Hero
   - brand-first headline
   - real pet photo collage
   - primary CTA: 전화 상담
   - secondary CTA: 가까운 지점 찾기

3. Branch Finder
   - 6 branch cards
   - each card has region, branch name, address, Naver Place button
   - desktop: 3x2 grid
   - mobile: horizontal cards or stacked cards

4. Available Pets
   - real photos from `pets.zip`
   - filter chips: 전체, 말티푸, 포메라니안, 푸들, 비숑, 소형견, 중대형견
   - card text should be honest and simple: 견종, 성별, 성격, 건강 체크, 상담 가능

5. Health Dog Care
   - 4 promises:
     - 건강 상태 우선 확인
     - 성향과 생활 환경 매칭
     - 방문 상담 중심
     - 입양 이후 케어 안내

6. Review Proof
   - use `petreviews.zip`
   - visual emphasis on real customer photos and `무료분양인증`
   - short copy: "사진보다 중요한 건 실제 보호자의 선택입니다."

7. Branch Detail / Visit Guide
   - branch map buttons
   - phone CTA
   - expected visit flow: 상담 -> 아이 확인 -> 건강/성향 안내 -> 가족 결정

8. Footer
   - company name
   - representative phone
   - branch list
   - social links if confirmed

9. Sticky CTA
   - mobile bottom: 전화상담 / 지점찾기
   - desktop side rail: 전화상담 / 후기보기 / 지점안내

## Naver Place Link Strategy

Implementation priority:

1. Verify direct Naver Place IDs for each branch.
2. If a direct Place ID is unavailable or ambiguous, use Naver Map search URL with branch name plus address.
3. Before handoff, click every branch card and confirm it opens Naver Map/Place.

Current safe fallback search URLs:

- 창원헬스독: https://map.naver.com/p/search/%EA%B2%BD%EB%82%A8%20%EC%B0%BD%EC%9B%90%EC%8B%9C%20%EC%9D%98%EC%B0%BD%EA%B5%AC%20%EC%84%9C%EC%83%81%EB%8F%99%20676-1%20%EC%B0%BD%EC%9B%90%ED%97%AC%EC%8A%A4%EB%8F%85
- 부산헬스독: https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%20%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EB%B6%80%EC%95%94%EB%8F%99%2096-8%20%EB%B6%80%EC%82%B0%ED%97%AC%EC%8A%A4%EB%8F%85
- 송파헬스독: https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EC%86%A1%ED%8C%8C%EA%B5%AC%20%EC%9E%A0%EC%8B%A4%EB%8F%99%20188-12%20%EC%86%A1%ED%8C%8C%ED%97%AC%EC%8A%A4%EB%8F%85
- 수원헬스독: https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%88%98%EC%9B%90%EC%8B%9C%20%EC%9D%B4%EC%9D%98%EB%8F%99%201266-5%20%EC%88%98%EC%9B%90%ED%97%AC%EC%8A%A4%EB%8F%85
- 평택헬스독: https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%ED%8F%89%ED%83%9D%EB%8F%99%20164-2%20%ED%8F%89%ED%83%9D%ED%97%AC%EC%8A%A4%EB%8F%85
- 인천헬스독: https://map.naver.com/p/search/%EC%9D%B8%EC%B2%9C%20%EC%84%9C%EA%B5%AC%20%EB%8B%B9%ED%95%98%EB%8F%99%201098-5%20%EC%9D%B8%EC%B2%9C%ED%97%AC%EC%8A%A4%EB%8F%85

## Copy Tone

Use:

- 건강하게 자란 반려가족
- 안심 상담
- 전국 6개 지점
- 실제 보호자 후기
- 가까운 지점에서 직접 만나보세요
- 아이의 성향과 가족의 생활을 함께 봅니다

Avoid:

- luxury-heavy copy
- generic premium wording without proof
- overpromising medical claims
- hidden/unclear pricing claims unless confirmed

## Build Order

1. Normalize and optimize selected assets.
2. Replace BB PUPPY identity with Health Dog identity.
3. Rebuild hero around logo, real pet photos, and 6-branch trust message.
4. Add branch finder with Naver links.
5. Add review proof section from `petreviews.zip`.
6. Add pet grid from `pets.zip`.
7. Add sticky phone and branch CTAs.
8. QA desktop/mobile and branch link clicks.

## Confirmation Needed

- 평택 address should likely be `경기도 평택시 평택동 164-2`; user provided `경기도 평택동 164-2`, so confirm or normalize during implementation.
- Confirm whether "무료분양인증" should be used prominently or softly. It is visually strong, but it may shift the brand toward price-first rather than health-first.
