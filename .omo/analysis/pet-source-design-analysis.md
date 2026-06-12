# Pet Source Design Analysis

Date: 2026-06-11
Scope: `/Users/cosmos/Documents/pet` 하위의 `pet-ss`, `pet-ss2` 정적 미러/복구 소스 분석
Goal: 비슷한 디자인, 거의 같은 느낌의 페이지를 만들기 위한 1차 분석

## 1. 결론 요약

이 폴더에는 성격이 다른 두 개의 강아지 분양 사이트 미러가 있다.

- `pet-ss`: `puppybebe.com` 계열. 오래된 한국형 고정폭 웹사이트다. 데스크톱은 1300px 외곽/1100px 콘텐츠, 모바일은 `/mobile` 아래 별도 360px 템플릿이다. 좌측 세로 메뉴, 진녹색 포인트, 라운드된 대형 이미지, 강아지 상품 그리드, 이미지맵 배너가 핵심이다.
- `pet-ss2`: `bbpuppy.co.kr` 계열. Imweb 빌더 산출물이다. 원본 컴포넌트 소스라기보다 거대한 HTML + 런타임 JSON + CDN 자산 미러다. Pretendard, 화이트/베이지/차콜 팔레트, 중앙 로고 헤더, 대형 강아지 이미지, 3열/4열 상품 그리드, 오른쪽 플로팅 CTA가 핵심이다.

새 페이지를 만들 때는 `pet-ss2`를 주 디자인 기준으로 삼는 편이 현대적이고 재현 가치가 높다. `pet-ss`는 레트로한 국내 애견샵 감성, 좌측 메뉴/초록 포인트/360px 모바일 분기 같은 보조 레퍼런스로 보는 게 좋다.

## 2. 저장소 구조와 빌드 성격

### `pet-ss`

- 총 파일: 2,385개, 약 418.7MB
- 주요 확장자: `.jpg` 1,776개, `.html` 398개, `.jpeg` 115개, `.png` 54개, `.css` 15개, `.js` 8개
- 주요 자산: `site/dd_file` 약 409.9MB, 대부분 상품 이미지 업로드 자산
- 주요 페이지: `site/index.html`, `company.html`, `service.html`, `list_10.html`, `list_20.html`, `delivery.html`, `chain.html`, `afternote.html`, `map.html`, `mobile/*.html`, `_dynamic_pages/*`
- 빌드 도구 없음. `package.json`, Next/Vite/Bun 설정 없음. 정적 서버로만 확인 가능.

### `pet-ss2`

- 총 파일: 1,396개, 약 306.7MB
- 주요 확장자: `.html` 452개, `.woff2` 299개, `.jpg` 288개, `.js` 147개, `.css` 43개
- 주요 자산: `site/assets` 약 126.9MB, `site/reviews` 약 103.1MB, `site/babies` 약 19.3MB, `site/shop_view` 약 15.4MB
- 주요 페이지: `home.html`, `about.html`, `babies.html`, `reviews.html`, `contact.html`, `19.html`-`27.html`, `shop_view/__idx_*.html`, `reviews/__q_*.html`
- 빌드 도구 없음. `tools/mirror.ts`는 복구/미러링용 Bun/TS 스크립트지만 프로젝트 앱 빌드 시스템은 아니다.

## 3. `pet-ss` 디자인 DNA

### 레이아웃

- 데스크톱은 고정폭이다. `layout.css`에서 `#header .wrapper`가 1340px, `#container_wrap`이 1300px, 상품 리스트가 1100px로 고정된다.
- 왼쪽 레일에는 메뉴, SNS 아이콘, 고객센터 전화번호가 들어간다. 오른쪽 큰 영역에 메인 비주얼/상품/배너가 들어간다.
- 모바일은 반응형이 아니라 `/mobile/` 별도 페이지다. `index.html`에서 모바일 UA면 `location.href = "/mobile/"`로 보낸다. 모바일 CSS는 360px 기준이다.

### 홈 화면

- 홈 핵심 구조는 왼쪽 550px 이미지 슬라이드 + 오른쪽 500px 타이틀/퀵메뉴이다.
- 메인 이미지 슬라이드는 20px radius, 644px 높이, `mainslide_01.jpg`, `mainslide_02.jpg`를 쓴다.
- 오른쪽 타이틀은 매우 큰 한글 문장이다. `45px/55px` 수준의 가벼운 굵기, 회색 보조문구, 민트색 발바닥 배경 이미지가 인상이다.
- 퀵메뉴는 `mainbanner_quick.gif` 이미지맵이다. 현대 구현에서는 이미지맵 대신 2x2 카드형 링크로 재구현하는 게 맞다.

### 상품 그리드

- `.productListMain`은 1100px 안에 356px 정사각 카드 3열로 배치된다.
- 이미지는 15px radius, hover 시 scale 1.2 + opacity 0.8이다.
- 상품명은 HTML에 직접 텍스트가 아니라 이미지 `alt`에서 JS로 `.caption`을 뒤에 붙인다.
- 대부분 상품 이미지는 `http://puppybebe.com/dd_file/goods_img/...` 절대 URL로 남아 있다. 로컬 자산은 존재하지만 HTML 참조는 완전히 치환되지 않았다.

### 서브/목록 페이지

- 서브 상단 비주얼은 `subtop_01.jpg` 배경, 250px 높이, 25px radius다.
- 카테고리 메뉴는 `#sm` 가로 플로트 구조이며, 활성 항목은 진녹색 배경 이미지 `bg_lnb_on.png`다.
- `service.html`은 STEP01-STEP06 절차형 설명이다. 아이콘 이미지 + 제목 + 설명이 반복된다.
- `list_10.html`은 견종 카테고리와 상품 그리드/페이지네이션으로 구성된다.

### 컬러/타이포

- 핵심 컬러: 진녹색 `#095f4d`, 보조 초록 `#0e715c`, 본문 차콜 `#2d2d2d`, 회색 `#494949`, 연한 배경 `#eff4f7`.
- 폰트는 Noto Sans KR, Nanum Gothic, Nanum Myeongjo, NanumSquareRound, `yg-jalnan`, Roboto를 섞어 쓴다.

### 코드 상태 리스크

- 여러 페이지에서 `#kakaoBtn` 요소가 주석 처리되어 있는데, 스크립트는 `kakaoBtn.addEventListener(...)`를 바로 호출한다. 브라우저에서 null 참조 에러가 날 수 있다.
- `slide_setting.js`는 TweenMax/GSAP에 의존한다. `slide_setting.min.js`에 GSAP 1.15.1 번들이 섞여 있어 동작은 가능해 보이나, 유지보수용 구조는 아니다.
- CSS에 `background:#;`, `width:;`, `margin-top:;` 같은 빈 속성이 많다. 그대로 이식하면 현대 린터/빌드에서 깨질 수 있다.

## 4. `pet-ss2` 디자인 DNA

### 레이아웃

- 전체적으로 Imweb 섹션/위젯 구조다. 핵심 페이지는 `section_wrap`, `inside`, `doz_row`, `data-widget-type` 조합으로 구성된다.
- 데스크톱 헤더는 좌측 메뉴, 중앙 로고, 우측 전화번호 구조다. 상단은 흰 배경, 90px 내외 높이, 중앙 BB PUPPY 로고가 강한 기준점이다.
- 모바일용 섹션과 PC용 섹션을 별도로 갖는다. `pc_section`, `mobile_section`, `mobile_hide`가 반복된다.

### 토큰/스타일

`site/css/custom.cm__1779326473.html`에 전역 스타일 토큰이 선명하게 들어 있다.

- 브랜드/본문 색: `#363636`
- 배지/포인트 색: `#bfb49c`
- 배경 포인트: `#fcf9f5`
- 폰트: Pretendard, 영문 Helvetica
- 최대 폭: 1280px
- 상품 리스트: 3열, item width 403, center align, price hidden, badge shown
- 상품 상세 CTA: `전화문의`, `방문예약`

### 홈 화면

- 첫 화면은 좌측 여백/브랜드 문구 + 우측 큰 강아지 이미지의 split hero 느낌이다.
- 섹션 제목은 `BB PUPPY - PUPPIES`처럼 영문 대문자 + 베이지 강조 단어를 사용한다.
- 상품 쇼케이스/후기/Instagram 섹션이 이어진다.
- 오른쪽 플로팅 CTA가 강하다: 카톡상담, 인스타, 전화예약, 방문예약, 오시는길.

### 상품/카테고리

- `babies.html`은 `BB PUPPY'S BABIES` 제목 아래 3열 카테고리 표를 먼저 보여준다.
- 카테고리: NEW Puppies, 꼬똥드툴레아, 말티즈, 콩시츄, 말티푸, 비숑프리제, 푸들, 포메라니안, 하이브리드견.
- 상품 목록은 데스크톱 3열 또는 홈 쇼케이스에서는 4열로 보인다. 이미지가 거의 정사각형이고, 텍스트는 중앙 정렬이며 가격은 숨긴다.
- 상세 페이지의 목적은 결제가 아니라 상담 전환이다. `전화문의`와 `방문예약`이 실제 CTA다.

### 후기/문의

- `reviews.html`은 `BB PUPPY'S PRECIOUS MOMENTS REVIEW` 제목 + 그리드형 게시판이다.
- `contact.html`은 큰 `CONTACT US` 제목, 주소/운영시간, 지도 버튼 3개, Google Maps iframe, footer로 구성된다.
- footer는 `#fcf9f5` 배경에 베이지 텍스트로 사업자 정보를 길게 노출한다.

### 코드 상태 리스크

- Imweb 런타임 JSON에 Instagram access token처럼 보이는 값이 들어 있다. 값은 보고서에 싣지 않았다. 외부 공개/새 구현에는 절대 그대로 포함하면 안 된다.
- `bbpuppy`, `비비퍼피`, 전화번호, 사업자 정보, 지도 링크, 카카오/인스타/네이버 외부 링크가 HTML 전역에 대량 반복된다. 새 브랜드로 만들 때는 데이터 소스화해야 한다.
- HTML이 매우 크다. `home.html`은 약 644KB, `babies.html`은 약 512KB다. 그대로 복붙하는 방식은 유지보수성이 낮다.
- 정적 서버 렌더링 중 `/ajax/oms/OMS_auth.cm`, `/shop/load_change_password.cm`, `/backpg/add_visit_log.cm` 같은 Imweb 백엔드 endpoint 요청이 실패했다. 화면 캡처는 가능하지만 로그인/방문 로그/OMS류 동적 기능까지 복구된 상태는 아니다.

## 5. 외부 URL/민감 문자열 스캔

### `pet-ss/site`

- HTML 내 절대 `src/href`: 4,531개
- 주요 host: `puppybebe.com` 3,273개, `www.instagram.com` 395개, `open.kakao.com` 395개, `web25.co.kr` 374개
- 브랜드 문자열: `퍼피베베` 1,657회, `puppybebe` 4,177회
- 전화번호 문자열: `010.2987.8300` 832회

### `pet-ss2/site`

- HTML 내 절대 `src/href`: 2,455개
- 주요 host: `map.naver.com` 644개, `www.instagram.com` 455개, `naver.me` 452개, `imweb.me` 451개, `pf.kakao.com` 451개
- 브랜드 문자열: `비비퍼피` 9,126회, `bbpuppy` 25,368회, `imweb` 64,277회
- 전화번호 문자열: `010-7699-0531` 3,106회
- `instagram_access_token` 12회

## 6. 재현 구현 가이드

비슷한 느낌의 새 페이지를 만든다면 다음 컴포넌트 단위로 재구성하는 게 좋다.

1. Header
   - `pet-ss2` 기준: 좌측 메뉴 4개, 중앙 로고, 우측 상담시간/전화번호.
   - 모바일: 좌측 햄버거, 중앙 로고, 우측 전화 아이콘 또는 예약 아이콘.

2. Hero
   - `pet-ss2` 기준: 넓은 화이트/아이보리 배경, 브랜드 로고/문장, 오른쪽 또는 풀폭 강아지 이미지.
   - `pet-ss` 감성을 섞을 경우: 큰 라운드 이미지, 초록 포인트, 2x2 퀵링크.

3. Puppies Section
   - 제목: 영문 대문자 + 베이지 강조 단어.
   - 상품: 정사각 이미지, 3열/4열 그리드, 중앙 정렬 이름, 가격 미노출.
   - 상태/배지: NEW, SOLD OUT 정도만 이미지가 아닌 텍스트/컴포넌트로 구현.

4. Category Nav
   - `pet-ss2`처럼 얇은 테이블형 3열 카테고리 메뉴가 현재 감성에 더 잘 맞는다.
   - `pet-ss`처럼 많은 견종을 촘촘히 넣어야 하면 모바일에서 2열/가로 스크롤을 별도 설계한다.

5. Review Section
   - 사진 중심 그리드, 제목만 짧게.
   - 베이지 hover overlay 또는 아주 옅은 카드 배경 정도만 사용한다.

6. Floating CTA
   - `pet-ss2`의 전환 장치다. 카톡, 인스타, 전화, 방문예약, 지도.
   - 새 구현에서는 fixed right rail + 모바일 bottom bar로 재구성한다.

7. Footer
   - `#fcf9f5` 배경, 베이지 텍스트, 사업자 정보/이용약관/개인정보처리방침.

## 7. 피해야 할 것

- Imweb HTML 구조를 그대로 복사하지 말 것. 위젯 ID와 런타임 JSON이 너무 많고 민감 정보 위험이 있다.
- `pet-ss`의 이미지맵/주석 처리된 JS/null 참조 코드를 그대로 가져오지 말 것.
- 절대 URL을 그대로 두지 말 것. 자산은 로컬/프로젝트 CDN 경로로 정리해야 한다.
- 가격/장바구니/e-commerce UX로 착각하지 말 것. 두 사이트 모두 핵심 전환은 상담/예약/전화다.

## 8. 검증

로컬 정적 서버:

- `pet-ss/site`: `http://127.0.0.1:8781/`
- `pet-ss2/site`: `http://127.0.0.1:8782/`

HTTP 확인:

- `pet-ss/index.html`, `pet-ss/mobile/index.html`, `pet-ss/list_10.html`: 200 OK
- `pet-ss2/home.html`, `babies.html`, `reviews.html`, `contact.html`: 200 OK
- 참고: `pet-ss2`는 정적 서버에서 backend `.cm` endpoint 요청 일부가 404/501을 냈다. 시각 표면 분석에는 충분하지만, 원본 빌더 런타임의 동적 기능은 별도 재구현이 필요하다.

렌더링 스크린샷:

- `/Users/cosmos/Documents/pet/.omo/ulw-loop/evidence/screenshots/pet-ss-home-desktop.png`
- `/Users/cosmos/Documents/pet/.omo/ulw-loop/evidence/screenshots/pet-ss-home-mobile.png`
- `/Users/cosmos/Documents/pet/.omo/ulw-loop/evidence/screenshots/pet-ss2-home-desktop.png`
- `/Users/cosmos/Documents/pet/.omo/ulw-loop/evidence/screenshots/pet-ss2-babies-desktop.png`

## 9. 다음 단계 제안

1. 만들 페이지의 기준을 `pet-ss2`로 확정한다.
2. 자산을 `hero`, `puppies`, `reviews`, `brand`, `footer`로 분류한다.
3. 새 구현에서는 `Header`, `Hero`, `PuppyGrid`, `CategoryTabs`, `ReviewGrid`, `FloatingCTA`, `Footer` 컴포넌트로 나눈다.
4. 디자인 토큰은 최소한 아래로 시작한다.
   - text: `#363636`
   - accent: `#bfb49c`
   - muted-bg: `#fcf9f5`
   - max-width: `1280px`
   - font: `Pretendard`, fallback sans-serif
5. 공개 배포 전 `instagram_access_token`, 전화번호, 지도 링크, 사업자 정보, 브랜드명은 모두 새 데이터로 교체한다.
