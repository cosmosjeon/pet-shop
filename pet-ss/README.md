# puppybebe.com 프론트엔드 소스 (복구본)

회사 웹사이트 `http://puppybebe.com/` 의 프론트엔드 코드를 라이브 사이트에서 그대로 미러링하여 복구한 저장소입니다.

## 디렉터리 구조

```
site/
├── index.html              메인 페이지
├── company.html            PUPPYBEBE (회사소개)
├── service.html            GUIDE (분양안내)
├── list_10.html            DOG SALE (분양 목록)
├── list_20.html            SPECIAL ORDER
├── delivery.html           HOME DELIVERY
├── chain.html              FRANCHISE (가맹문의)
├── afternote.html          EPILOGUE (분양후기)
├── map.html                LOCATION (오시는길)
├── pop_privacy.html        개인정보취급방침 팝업
├── css/                    스타일시트 (global, layout, common, member, bbs 등 8개)
├── js/                     스크립트 (jquery, slides, magnific-popup, slide_setting 등)
├── images/                 사이트 테마 이미지 (로고/배너/아이콘 등)
├── shop/                   쇼핑 관련 이미지
├── admin/                  관리자 로그인 페이지 템플릿
├── mobile/                 모바일 사이트 (자체 css/js/img 포함)
│   ├── index.html, company.html, service.html, list_10.html ...
├── dd_file/
│   ├── goods_img/          분양견 상품 사진 (업로드 데이터, .gitignore 처리·405M)
│   ├── dd3_file/           게시판/에디터 첨부
│   └── tinymce/            에디터 리소스
└── _dynamic_pages/         쿼리스트링 동적 렌더 결과 보관 (list/view/afternote 페이지네이션)
                            → 실제 소스는 list_10.html / list_20.html / view 템플릿이며,
                              여기 파일들은 파라미터별 렌더 샘플(참고용)입니다.
```

## 비고

- 원 사이트는 PHP 기반 동적 사이트(`view.html?g_key=...`, `list_10.html?area_code=...`)입니다.
  서버사이드 로직(DB·PHP)은 외부에서 받을 수 없어, **브라우저에 전달되는 프론트엔드 산출물**(HTML/CSS/JS/이미지)을 복구했습니다.
- `site/dd_file/goods_img/` (405M, 분양견 사진)는 소스코드가 아닌 업로드 데이터라 git에서 제외했습니다.
  로컬 작업 트리에는 그대로 있으며, 커밋하려면 `.gitignore`에서 해당 줄을 지우세요.
- 미러링 도구: `.crawler.py` (재수집 시 `python3 .crawler.py` 실행, `requests`/`beautifulsoup4` 필요).

## 로컬 미리보기

```bash
cd site
python3 -m http.server 8080
# http://localhost:8080/ 접속
```
