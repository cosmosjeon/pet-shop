# Health Dog Image Asset Strategy

## Core Principle

This website should be image-led. The code should serve the assets, not the other way around.

The strongest available proof is already in the supplied files:

- real Health Dog logo
- real puppies
- real customer/review photos
- real branch network information

Generated images should fill designed gaps, not replace real evidence.

## Visual Lessons From References

### Dogmaru

Observed visual pattern:

- large, full-width store/interior image as the trust hook
- heavy promotional headline over image
- persistent bottom CTA buttons
- high-density navigation and service proof

What to borrow:

- big first-screen image presence
- fixed phone/Kakao/visit CTA behavior
- trust-first ordering

What not to borrow:

- overly aggressive discount/price-first message
- cluttered density
- CCTV-like store image as the main hero unless Health Dog specifically wants that tone

### Minipet

Observed visual pattern:

- large campaign banners
- repeated real pet product cards
- side quick menu
- many image-led sections rather than text-heavy pages
- pet cards include breed, name/sex, branch

What to borrow:

- product-card grid using real puppy photos
- strong banner rhythm
- visual quick links for Kakao/Naver/Instagram/contact

What not to borrow:

- too many banner styles competing at once
- generic ecommerce clutter
- placeholder social buttons without confirmed destinations

### Health Dog Own Assets

Observed visual pattern:

- logo: white dog mascot, purple/navy health motif
- pets: mostly square, real puppies, outdoor benches, store desk, playpen, close handling
- reviews: real customers holding `무료분양인증` boards

What this means:

- hero should use real puppy collage, not a generated puppy
- review/proof section should use real review photos
- generated imagery should be background atmosphere, not fake inventory

## Graphic / Infographic Module Plan

The clarified target is not just background images. The site should include image-like graphic sections that explain the service at a glance, similar to:

- icon navigation grids
- poster-style promise/service infographics
- large promise banners with circular photos and strong color overlays

Important implementation rule:

- Korean text can be baked into generated poster/banner images when the section needs to feel like one complete brand graphic.
- Keep a plain-text source copy next to each generated Korean image so wording can be re-generated or edited later.
- HTML text is still useful for responsive modules, but it is not a hard rule.
- Generate either complete graphic images or supporting visuals depending on the slot: icons, illustration spots, decorative frames, background textures, photo masks, and full poster/banners.
- Every generated image with Korean text must be visually checked for typos, awkward spacing, broken glyphs, and mismatched line breaks.

### A. Quick Service Icon Grid

Reference pattern:

- clean 2x2 grid
- small English category label
- bold Korean title
- short Korean description
- simple line icon with teal accent
- very light dividing lines

Recommended Health Dog version:

- `HEALTHDOG GUIDE` / `처음 방문하시는 분께`
- grid items:
  - `Introduce` / `헬스독 소개`
  - `Puppies` / `분양 상담`
  - `Care` / `건강 케어`
  - `Branches` / `지점 위치`
  - optional expanded row: `Reviews` / `실제 후기`, `Contact` / `빠른 상담`

Asset approach:

- can be built as an HTML grid with SVG/icon assets or generated as a complete Korean graphic block
- use custom icons in Health Dog colors: dark navy outline, mint/teal highlight, soft lavender secondary accent
- if generated as one image, create 2-3 variants and choose the one with the cleanest Korean text

Why:

- this creates a polished "site menu as graphic" moment near the top
- it also reduces the need for long explanatory text

### B. Promise Poster / Care Infographic

Reference pattern:

- framed vertical poster
- large central promise headline
- multiple care rows
- left-side illustrations, right-side explanatory copy
- warm beige borders and friendly line drawings

Recommended Health Dog version:

- title: `헬스독 평생 케어 약속`
- subtitle: `분양 전부터 분양 후까지, 보호자와 반려견이 안심할 수 있도록 함께합니다.`
- rows:
  - `건강 체크 안내`: 기본 컨디션 확인, 예방접종/관리 일정 안내
  - `초보 보호자 케어`: 식사, 배변, 환경 적응, 위생 관리 안내
  - `사후 상담`: 입양 후 궁금한 점을 상담할 수 있는 연결감
  - `지점 방문 상담`: 가까운 6개 지점에서 직접 상담

Asset approach:

- can be generated as a full poster image with Korean text, similar to the reference
- keep the exact Korean source copy in the repository so the poster can be regenerated
- create or draw 4 spot illustrations:
  - health checklist and puppy
  - grooming/bath care
  - consultation desk or phone
  - branch/store icon
- if the poster is flattened into a PNG/JPG, also keep a lightweight text/alt version in the page for accessibility

Copy safety:

- avoid unconfirmed claims like guaranteed medical treatment, hospital discount, surgery discount, or 24-hour pickup unless the client confirms them
- use `안내`, `상담`, `케어`, `연결`, `사후관리` language

### C. Large Promise Banner

Reference pattern:

- wide rounded rectangle
- deep green overlay
- three columns
- circular photos
- small yellow English label
- bold Korean promise title
- short supporting copy

Recommended Health Dog version:

- section label: `HEALTH DOG PROMISE`
- three columns:
  - `CARE`: `처음부터 건강하게`
  - `TRUST`: `실제 후기와 투명한 상담`
  - `BRANCH`: `가까운 6개 지점`

Asset approach:

- use real `pets.zip` or `petreviews.zip` photos inside circular masks
- use a generated or CSS-built dark emerald/navy overlay background
- optionally create a subtle puppy-fur or soft studio texture behind the overlay, but keep it abstract
- text can be HTML or baked into the generated banner image
- if text is baked in, verify Korean legibility at desktop and mobile crop sizes

Why:

- this gives the page the same "designed brand banner" weight as the references
- it makes Health Dog feel more established without faking evidence

### D. Service Illustration Set

Create a coherent set of small illustrations rather than random icons.

Recommended style:

- thick dark outline
- mint/teal highlight
- very small lavender accent
- rounded but not childish
- flat 2D vector, minimal shadow

Needed icons:

- storefront
- magnifier / puppy selection
- handshake / consultation
- location pin
- health cross / checklist
- grooming / bath
- review board / certificate
- phone / Kakao consultation

Generation guidance:

- image generation may be used to draft icon concepts
- final implementation should prefer SVG/vector cleanup so the style is consistent
- no readable text inside the icon artwork

## Image Slot Plan

### 1. Header / Logo

Use real extracted logo from AI source.

Needs:

- transparent logo export if possible
- small favicon crop
- header horizontal lockup if current AI only provides stacked logo

Generation:

- no generative logo recreation
- use source logo only

### 2. Hero

Use:

- real logo
- 5-7 real puppy photos from `pets.zip`
- generated or CSS-built soft Health Dog background

Recommended composition:

- left: headline and CTA
- right: collage of real puppy cards
- background: soft off-white, light lavender, health/navy accent curves

Possible generated asset:

- wide abstract background only: clean warm pet-care studio atmosphere, soft sunlight, no text, no logo, no fake dog as primary subject

Avoid:

- generated puppy as the main available pet
- text baked into generated image
- fake storefront with unreadable signage

### 3. Branch Finder

Use:

- real branch data
- map/search link buttons
- optional generated background/map texture

Possible generated asset:

- subtle illustrated Korea branch network background, no map accuracy claims, no readable labels
- or small soft location-card icons if an icon set is insufficient

Avoid:

- fake map pins pretending to be exact locations
- generated screenshots of Naver Map

### 4. Available Pets

Use:

- only real photos from `pets.zip`
- crop/optimize consistently

Needs:

- select 12-18 best photos for first release
- create responsive crops: square card, wide hero crop, mobile card crop
- group by visual variety: white fluffy, brown poodle, black/tan, pair shot, outdoor, indoor

Generation:

- no generated animals for available-pet cards

Reason:

- this section is sales/inventory-like; generated dogs would damage trust.

### 5. Health Dog Care / Process

Use:

- mix of real pet photos and generated supportive imagery

Possible generated assets:

- clean consultation room scene without identifiable people
- gentle vet-style health check table without medical overclaim
- warm adoption counseling desk with pet carrier and documents

Prompt direction:

> Warm Korean pet adoption consultation center, clean white and soft lavender interior, natural daylight, premium but friendly, no readable text, no logo, no brand names, no exaggerated medical equipment.

Avoid:

- hospital-heavy visuals
- fake veterinarian claims
- scary clinical mood

### 6. Review Proof

Use:

- real `petreviews.zip` images

Needs:

- crop respectfully
- avoid using customer faces as huge hero focal points
- present as proof wall / testimonial carousel

Generation:

- no generated people or fake reviews

Reason:

- authenticity is the entire value of this section.

### 7. Blog / Breed Guide

Use:

- real pet thumbnails where available
- generated editorial thumbnails only for purely informational guide cards if a matching real image is not available

Possible generated assets:

- simple breed-guide editorial cards with soft background and no text
- abstract care-guide thumbnails: grooming brush, food bowl, leash, consultation desk

Avoid:

- generated breed portraits that could be mistaken for actual available puppies

### 8. Footer / CTA

Use:

- logo mascot
- branch list
- simple icons

Possible generated asset:

- none needed

## Image Generation Workflow

1. First pass: use real assets wherever they prove reality.
2. Identify gaps after layout wireframe:
   - hero background
   - care/process ambience
   - branch/network visual
   - blog-guide filler thumbnails
3. Generate only those gap assets.
4. Never generate:
   - available pet inventory
   - customer reviews
   - customer faces
   - logo recreation
   - unverified Korean text
5. For every generated image:
   - use exact approved Korean copy when readable text is needed
   - no logo recreation unless derived from the official source logo
   - no fake brand claims
   - same color language: white, soft lavender, navy, warm cream
   - match real photo lighting and density
6. After generation:
   - crop into exact target ratios
   - compare against reference screenshots and real asset boards
   - reject anything that looks stock, luxury-generic, or unrelated to Health Dog
7. For generated Korean text images:
   - make several versions
   - inspect text at actual website size
   - reject versions with typo-like glyphs, odd spacing, or weak hierarchy
   - save the exact prompt and Korean source copy next to the asset

## Tool Plan

Current available path:

- Use built-in image generation for missing atmospheric/support images.
- Use ImageMagick for crop, montage, compression, and responsive derivatives.
- Use real source files for logo, pets, and reviews.

`bananatape`:

- No callable `bananatape` tool was discovered in this Codex session.
- If it becomes available later, use it as a drop-in generator/editor for the same gap slots above.
- Do not make the plan depend on it.

## Initial Generated Asset Candidates

Generate these priority assets first:

1. `hero-soft-care-background`
   - wide background, 16:9
   - warm clean consultation/pet-care space
   - no text, no logo, no fake animal focus

2. `branch-network-background`
   - subtle abstract Korea/location motif
   - soft lavender/navy accents
   - no exact map claim

3. `care-consultation-scene`
   - calm consultation desk, pet carrier, health checklist vibe
   - no readable forms

4. `guide-thumbnail-set`
   - 4 small editorial objects: grooming brush, food bowl, leash, pet carrier
   - consistent lighting and background

5. `healthdog-icon-set`
   - 8 small vector-style icons
   - dark navy outline, mint accent, subtle lavender secondary accent
   - no embedded text

6. `care-promise-illustrations`
   - 4 spot illustrations for the lifetime-care poster
   - health checklist, beginner care, post-adoption consultation, branch visit
   - friendly but not childish

7. `promise-banner-texture`
   - dark emerald/navy wide texture or overlay background
   - should support circular real photos and white/yellow text
   - no objects that imply fake facilities

## Final Design Implication

Leave intentional visual breathing room.

The page should not be packed with loose generated decoration. It should feel like a set of intentionally designed brand graphics:

- real
- warm
- branch-backed
- review-backed
- Health Dog branded

Real photos do the selling. Graphic modules explain the system. Generated assets only make the layout feel complete and premium.
