# bbpuppy.co.kr — 프론트엔드 소스 복구본

회사 웹사이트 `https://bbpuppy.co.kr/` (비비퍼피 강아지분양전문) 의 배포된 프론트엔드를
통째로 미러링하여 복구한 소스입니다. 원본은 imweb 빌더 기반으로 운영됩니다.

## 구조

```
site/                  # 복구된 정적 사이트 (오프라인 동작)
  index.html           # 홈
  home.html about.html babies.html reviews.html contact.html
  19.html ~ 27.html    # 추가 페이지
  policy.html privacy.html
  babies/  reviews/  shop_view/   # 상세/목록 페이지 (쿼리스트링별 파일)
  css/                 # 사이트 커스텀 CSS
  assets/              # 다운로드한 모든 정적 자산 (호스트별 디렉터리)
    bbpuppy.co.kr/
    cdn.imweb.me/ cdn-optimized.imweb.me/ vendor-cdn.imweb.me/
    static.imweb.me/ ...
    fonts.googleapis.com/ fonts.gstatic.com/   # 폰트
    cdn.jsdelivr.net/ ...                      # 서드파티 라이브러리
tools/
  mirror.ts            # 사이트를 다시 긁어올 때 쓰는 미러링 크롤러 (Bun)
```

## 로컬에서 보기

```bash
# 정적 서버로 서빙
cd site && python3 -m http.server 8080
# http://localhost:8080 접속
```
또는 `site/index.html` 파일을 브라우저로 직접 열어도 됩니다.

## 다시 미러링하기

원본 사이트가 갱신되어 다시 받아야 하면:

```bash
bun run tools/mirror.ts
```

## 비고

- HTML 내 `src`/`href`/`srcset`/`url()` 등 정적 자산 참조는 모두 `assets/` 하위 로컬
  경로로 재작성되어 인터넷 없이도 렌더링됩니다.
- 인라인 `<script>` 안의 imweb 런타임 설정값과 API 엔드포인트(이미지 리사이즈,
  게시판/장바구니 등 동적 기능)는 원본 절대 URL을 그대로 유지합니다. 정적 자산이
  아니라 런타임 서비스이기 때문입니다.
- 일부 자산(`glyphicons-halflings-regular.*`, `owl.video.play.png` 등)은 원본
  imweb 서버 자체가 404를 반환해 받을 수 없었습니다. 실제 사이트에서도 미사용입니다.
