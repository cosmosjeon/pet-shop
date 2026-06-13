# Todo 8 Branch Naver Map Link Check

Date: 2026-06-13

## Method

- Read current `pet-clone-site/index.html` and `pet-clone-site/content.js` before deciding whether to edit product files.
- Generated raw shell evidence with:
  `rg -n "창원헬스독|부산헬스독|송파헬스독|수원헬스독|평택헬스독|인천헬스독|네이버 플레이스|map.naver.com" pet-clone-site > .omo/evidence/task-8-map-links.txt`
- Extracted the six `.branch-card` anchors from `index.html`, confirmed each href also appears in `content.js`, then ran one time-boxed network check per unique href:
  `curl --head --location --max-time 10 --silent --show-error --output /dev/null --write-out '%{http_code}\t%{url_effective}\t%{content_type}' <href>`
- Attempted direct Naver Place lookup. Naver Maps internal `allSearch` returned an `ncaptcha` response for direct lookup, and general web lookup did not expose stable authoritative `map.naver.com/p/place/<id>` URLs for all six branches. Existing fallback Naver Maps search URLs are retained.
- No fake generated map screenshots were used.
- No local server was started.

## Results

| Branch | Address | Href | Target | Rel | Verification Result | Direct Place Status / Fallback Status |
| --- | --- | --- | --- | --- | --- | --- |
| 창원헬스독 | 경남 창원시 의창구 서상동 676-1 | https://map.naver.com/p/search/%EA%B2%BD%EB%82%A8%20%EC%B0%BD%EC%9B%90%EC%8B%9C%20%EC%9D%98%EC%B0%BD%EA%B5%AC%20%EC%84%9C%EC%83%81%EB%8F%99%20676-1%20%EC%B0%BD%EC%9B%90%ED%97%AC%EC%8A%A4%EB%8F%85 | `_blank` | `noopener` | HEAD returned `200`, `text/html`; effective URL remained `https://map.naver.com/p/search/...`; host `map.naver.com`; path `/p/search/...`; href present in `content.js`. | Direct Place ID ambiguous; fallback Naver Maps search URL retained. |
| 부산헬스독 | 부산 부산진구 부암동 96-8 | https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%20%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EB%B6%80%EC%95%94%EB%8F%99%2096-8%20%EB%B6%80%EC%82%B0%ED%97%AC%EC%8A%A4%EB%8F%85 | `_blank` | `noopener` | HEAD returned `200`, `text/html`; effective URL remained `https://map.naver.com/p/search/...`; host `map.naver.com`; path `/p/search/...`; href present in `content.js`. | Direct Place ID ambiguous; fallback Naver Maps search URL retained. |
| 송파헬스독 | 서울 송파구 잠실동 188-12 | https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EC%86%A1%ED%8C%8C%EA%B5%AC%20%EC%9E%A0%EC%8B%A4%EB%8F%99%20188-12%20%EC%86%A1%ED%8C%8C%ED%97%AC%EC%8A%A4%EB%8F%85 | `_blank` | `noopener` | HEAD returned `200`, `text/html`; effective URL remained `https://map.naver.com/p/search/...`; host `map.naver.com`; path `/p/search/...`; href present in `content.js`. | Direct Place ID ambiguous; fallback Naver Maps search URL retained. |
| 수원헬스독 | 경기도 수원시 이의동 1266-5 | https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%88%98%EC%9B%90%EC%8B%9C%20%EC%9D%B4%EC%9D%98%EB%8F%99%201266-5%20%EC%88%98%EC%9B%90%ED%97%AC%EC%8A%A4%EB%8F%85 | `_blank` | `noopener` | HEAD returned `200`, `text/html`; effective URL remained `https://map.naver.com/p/search/...`; host `map.naver.com`; path `/p/search/...`; href present in `content.js`. | Direct Place ID ambiguous; fallback Naver Maps search URL retained. |
| 평택헬스독 | 경기도 평택시 평택동 164-2 | https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%ED%8F%89%ED%83%9D%EB%8F%99%20164-2%20%ED%8F%89%ED%83%9D%ED%97%AC%EC%8A%A4%EB%8F%85 | `_blank` | `noopener` | HEAD returned `200`, `text/html`; effective URL remained `https://map.naver.com/p/search/...`; host `map.naver.com`; path `/p/search/...`; href present in `content.js`. | Direct Place ID ambiguous; fallback Naver Maps search URL retained. |
| 인천헬스독 | 인천 서구 당하동 1098-5 | https://map.naver.com/p/search/%EC%9D%B8%EC%B2%9C%20%EC%84%9C%EA%B5%AC%20%EB%8B%B9%ED%95%98%EB%8F%99%201098-5%20%EC%9D%B8%EC%B2%9C%ED%97%AC%EC%8A%A4%EB%8F%85 | `_blank` | `noopener` | HEAD returned `200`, `text/html`; effective URL remained `https://map.naver.com/p/search/...`; host `map.naver.com`; path `/p/search/...`; href present in `content.js`. | Direct Place ID ambiguous; fallback Naver Maps search URL retained. |

## Product Edit Decision

Acceptance criteria are already satisfied by the current branch cards and `content.js` data. No product files were edited.
