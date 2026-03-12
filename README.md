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

## Setup Guide (for non-developers)

Follow these steps to deploy and manage the site yourself.
Everything is **free**.

### Step 1: Sign Up (2 services)

| Service | URL | Purpose |
|---------|-----|---------|
| **GitHub** | https://github.com | Code repository |
| **Vercel** | https://vercel.com | Website hosting + image storage |

> Sign up for Vercel using your **GitHub account** — they will be linked automatically.
> Choose the **Hobby (free)** plan.

### Step 2: Connect Code + Deploy

1. Accept the collaborator invitation on this GitHub repository (or Fork it to your own account).
2. Go to Vercel Dashboard → **"Add New Project"** → Select this GitHub repo.
3. Click **"Deploy"** → It will automatically build & deploy.
4. Once deployed, you'll get a URL like `https://your-project.vercel.app`.

### Step 3: Set Environment Variables

Vercel Dashboard → Select your project → **Settings** → **Environment Variables**

| Variable | Value | Description |
|----------|-------|-------------|
| `ADMIN_PASSWORD` | Choose a password | For admin login (letters + numbers recommended, avoid special characters) |

> After setting, go to **Deployments** tab → Click **"..."** on the latest deployment → **"Redeploy"**

### Step 4: Connect Image Storage

1. Vercel Dashboard → **Storage** tab
2. Click **"Create"** → Select **"Blob"** → Enter a name and create
3. Click **"Connect to Project"** → Select this project
4. `BLOB_READ_WRITE_TOKEN` will be automatically added to your environment variables.
5. **Redeploy** again.

### Step 5: Upload Photos

1. Go to `https://your-site.vercel.app/admin/login`
2. Log in with the password you set in Step 3
3. On the left panel: select a category → upload photos
4. On the right panel: see a live preview of your site

### Vercel Free Plan Limits

| Resource | Limit | Enough for portfolio? |
|----------|-------|-----------------------|
| Bandwidth | 100GB/month | More than enough |
| Blob Storage | 500MB | ~100 high-quality photos |
| Build Minutes | 6,000 min/month | More than enough |
| Serverless Functions | 100GB-Hours/month | More than enough |

### (Optional) Custom Domain

Vercel Dashboard → **Settings** → **Domains** → Add your domain.
The free `.vercel.app` URL will always remain available.

---

## Guide de configuration (pour non-développeurs)

Suivez ces étapes pour déployer et gérer le site vous-même.
Tout est **gratuit**.

### Étape 1 : Inscription (2 services)

| Service | URL | Usage |
|---------|-----|-------|
| **GitHub** | https://github.com | Stockage du code |
| **Vercel** | https://vercel.com | Hébergement du site + stockage d'images |

> Inscrivez-vous sur Vercel avec votre **compte GitHub** — ils seront liés automatiquement.
> Choisissez le plan **Hobby (gratuit)**.

### Étape 2 : Connecter le code + Déployer

1. Acceptez l'invitation de collaborateur sur ce dépôt GitHub (ou faites un Fork sur votre compte).
2. Tableau de bord Vercel → **"Add New Project"** → Sélectionnez ce dépôt GitHub.
3. Cliquez sur **"Deploy"** → Le site se construit et se déploie automatiquement.
4. Une fois déployé, vous recevrez une URL comme `https://votre-projet.vercel.app`.

### Étape 3 : Configurer les variables d'environnement

Tableau de bord Vercel → Sélectionnez le projet → **Settings** → **Environment Variables**

| Variable | Valeur | Description |
|----------|--------|-------------|
| `ADMIN_PASSWORD` | Choisissez un mot de passe | Pour la connexion admin (lettres + chiffres recommandés, évitez les caractères spéciaux) |

> Après configuration, allez dans l'onglet **Deployments** → Cliquez sur **"..."** du dernier déploiement → **"Redeploy"**

### Étape 4 : Connecter le stockage d'images

1. Tableau de bord Vercel → Onglet **Storage**
2. Cliquez sur **"Create"** → Sélectionnez **"Blob"** → Entrez un nom et créez
3. Cliquez sur **"Connect to Project"** → Sélectionnez ce projet
4. `BLOB_READ_WRITE_TOKEN` sera automatiquement ajouté aux variables d'environnement.
5. Faites un **Redeploy** à nouveau.

### Étape 5 : Télécharger des photos

1. Allez sur `https://votre-site.vercel.app/admin/login`
2. Connectez-vous avec le mot de passe défini à l'étape 3
3. Panneau gauche : sélectionnez une catégorie → téléchargez des photos
4. Panneau droit : aperçu en direct de votre site

### Limites du plan gratuit Vercel

| Ressource | Limite | Suffisant pour un portfolio ? |
|-----------|--------|-------------------------------|
| Bande passante | 100 Go/mois | Largement suffisant |
| Stockage Blob | 500 Mo | ~100 photos haute qualité |
| Minutes de build | 6 000 min/mois | Largement suffisant |
| Fonctions serverless | 100 Go-Heures/mois | Largement suffisant |

### (Optionnel) Domaine personnalisé

Tableau de bord Vercel → **Settings** → **Domains** → Ajoutez votre domaine.
L'URL gratuite `.vercel.app` restera toujours disponible.

---

## Getting Started (developers)

```bash
npm install
npm run dev     # development server
npm run build   # production build
npm start       # production server
```

### Environment Variables

```env
ADMIN_PASSWORD=your_admin_password
BLOB_READ_WRITE_TOKEN=vercel_blob_token
```

### Deploy

```bash
npx vercel --prod
```

## TODO

- [ ] Replace placeholder images with real model photos
- [ ] Connect Vercel Blob Storage (`BLOB_READ_WRITE_TOKEN`)
- [ ] Update email address (currently: contact@portfolio.com)
- [ ] Add Comp Card PDF at `/public/compcard.pdf`
- [ ] Connect custom domain
