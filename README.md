# OTHMAN - Model Portfolio

EL AKTAA Othman의 프로페셔널 모델 포트폴리오 웹사이트.

## Tech Stack

| 항목 | 기술 |
|------|------|
| Framework | Next.js 16.1 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Storage | Vercel Blob (이미지) |
| Deployment | Vercel (Production) |
| Font | Playfair Display, Cormorant Garamond, Pretendard |

## Project Structure

```
src/
├── app/
│   ├── globals.css            # CSS 변수, 테마 정의
│   ├── layout.tsx             # 루트 레이아웃 (폰트 설정)
│   ├── page.tsx               # 메인 페이지 (섹션 조합)
│   ├── api/
│   │   ├── auth/route.ts      # 관리자 인증 API
│   │   └── images/route.ts    # 이미지 업로드/관리 API
│   └── admin/
│       ├── layout.tsx         # 관리자 레이아웃
│       ├── login/page.tsx     # 관리자 로그인
│       └── manage/page.tsx    # 사진 관리 대시보드
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # 고정 헤더 (스크롤 반응)
│   │   └── Footer.tsx         # 푸터
│   ├── sections/
│   │   ├── Hero.tsx           # 히어로 (패럴랙스 배경)
│   │   ├── Highlights.tsx     # 비대칭 매거진 그리드
│   │   ├── Collections.tsx    # 카테고리별 가로 스크롤 갤러리
│   │   ├── About.tsx          # 프로필 (폴라로이드 + 신체정보)
│   │   └── Contact.tsx        # 연락처 + 문의 폼
│   └── gallery/
│       ├── Gallery.tsx        # 갤러리 컴포넌트
│       ├── Lightbox.tsx       # 라이트박스
│       └── SwipeCards.tsx     # 스와이프 카드
├── data/
│   └── portfolio.ts           # 프로필 데이터 + 이미지 목록
├── lib/
│   ├── auth.ts                # 쿠키 기반 세션 관리
│   └── store.ts               # 상태 관리
├── middleware.ts               # /admin 라우트 보호
└── fonts/
    └── PretendardVariable.woff2
```

## Page Sections

| 순서 | 섹션 | 설명 |
|------|------|------|
| 1 | Header | 고정 네비게이션 (스크롤 시 배경 변경, 모바일 햄버거) |
| 2 | Hero | 풀스크린 패럴랙스 배경 + 모델명 + CTA |
| 3 | Highlights | 8장 비대칭 매거진 그리드 (hover 오버레이) |
| 4 | Collections | 카테고리 탭 + 가로 스냅 스크롤 갤러리 |
| 5 | About | 폴라로이드 사진 + 신체 측정치 + 프로필 상세 |
| 6 | Contact | 연락처 정보 + 문의 폼 + Comp Card 다운로드 |
| 7 | Footer | 모델명 + 저작권 |

## Model Profile

- **이름**: EL AKTAA Othman (오트만)
- **국적**: French
- **생년월일**: 1999.12.20 (26세)
- **언어**: French, Korean, English
- **신장**: 183cm / 66kg
- **측정치**: Chest 97cm, Waist 80.5cm, Hips 91cm, Legs 107cm, Shoe 275mm
- **Instagram**: @eyce____
- **특기**: Dance

## Categories

- Editorial
- Commercial
- Runway
- Beauty
- Casual
- Profile

## Design System

### Colors
| 변수 | 값 | 용도 |
|------|-----|------|
| `--accent` | `#C9A96E` | 골드 포인트 |
| `--accent-light` | `#E8D5A3` | 밝은 골드 |
| `--bg-dark` | `#0A0A0A` | 어두운 배경 |
| `--bg-primary` | `#FFFFFF` | 밝은 배경 |
| `--bg-secondary` | `#F8F7F4` | 보조 배경 |
| `--text-primary` | `#1A1A1A` | 본문 텍스트 |
| `--text-secondary` | `#666666` | 보조 텍스트 |

### Typography
| 변수 | 폰트 | 용도 |
|------|------|------|
| `--font-display` | Playfair Display | 제목 |
| `--font-accent` | Cormorant Garamond | 장식 텍스트 |
| `--font-body` | Pretendard | 본문 |

## Admin System

관리자 페이지에서 포트폴리오 이미지를 업로드/관리할 수 있습니다.

- **URL**: `/admin/login`
- **비밀번호**: Vercel 환경변수 `ADMIN_PASSWORD`
- **세션**: 쿠키 기반 (24시간 유효)
- **이미지 저장**: Vercel Blob Storage (`portfolio/` 경로)
- **메타데이터**: `portfolio-meta.json` (Blob에 JSON 저장)

### 이분할 관리 화면

| 왼쪽 패널 | 오른쪽 패널 |
|-----------|-----------|
| 사진 업로드 폼 | 사이트 실시간 미리보기 (iframe) |
| 등록된 사진 목록 | 섹션별 네비게이션 탭 |
| 편집/삭제/Featured 토글 | 업로드 시 자동 새로고침 |

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

### Environment Variables

```env
ADMIN_PASSWORD=your_admin_password
BLOB_READ_WRITE_TOKEN=vercel_blob_token
```

## Deployment

Vercel CLI로 직접 배포합니다.

```bash
# 프로덕션 배포
npx vercel --prod
```

## Technical Notes

### 모바일 스크롤 주의사항

- `overflow-x: hidden`을 html/body에 절대 사용하지 마세요. 내부 `overflow-x: auto` 터치 스크롤이 죽습니다.
- Hero 섹션의 `scale` 트랜스폼은 `style={{ overflow: "clip" }}`으로 처리합니다. (`overflow: clip`은 새 스크롤 컨텍스트를 만들지 않음)
- Collections 가로 스크롤 카드는 컨테이너보다 넓어야 합니다 (80vw 모바일 / 50vw 데스크탑).
- `snap-x snap-mandatory` + `snap-center`로 카드 스냅 스크롤 구현.

### 이미지 교체

현재 플레이스홀더(그라데이션 배경)를 사용 중입니다. 실제 사진으로 교체하려면:

1. `/admin`에서 이미지 업로드
2. 또는 `src/data/portfolio.ts`의 `images` 배열에서 `src` 값을 실제 이미지 URL로 변경

## TODO

- [ ] 플레이스홀더 이미지를 실제 모델 사진으로 교체
- [ ] Vercel Blob Storage 연결 (`BLOB_READ_WRITE_TOKEN` 설정)
- [ ] 이메일 주소 업데이트 (현재: contact@portfolio.com)
- [ ] `/public/compcard.pdf` Comp Card PDF 파일 추가
- [ ] 원격 Git 저장소 연결
- [ ] 커스텀 도메인 연결
