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

---

# How to set up your website (English)

Your portfolio website is ready! You just need to put it online.
Everything below is **100% free**. No credit card needed. Takes about **10 minutes**.

## What you need before starting

You should already have:
- A **GitHub** account (https://github.com)
- A **Vercel** account (https://vercel.com) — sign in with your GitHub account

## Step 1: Accept the invitation

I sent you an invitation to access the code. Check your email from GitHub and click **"View invitation"** then **"Accept"**.

After accepting, you can see the code at: `https://github.com/EnmanyProject/port`

## Step 2: Put your website online

1. Open https://vercel.com and log in
2. Click the **"Add New..."** button (top right) then **"Project"**
3. You will see a list of your GitHub projects. Find **"port"** and click **"Import"**
4. Don't change anything. Just click the **"Deploy"** button
5. Wait about 1 minute. When you see confetti, your site is live!
6. You will get a link like `https://port-xxxxx.vercel.app` — **save this link**, this is your website

## Step 3: Set your admin password

You need a password to upload photos to your site.

1. On Vercel, click your project name (port)
2. Click **"Settings"** (top menu)
3. Click **"Environment Variables"** (left menu)
4. Fill in the form:
   - **Key**: type `ADMIN_PASSWORD`
   - **Value**: type a password you will remember (example: `myportfolio2024`)
   - Click **"Save"**
5. Now go back: click **"Deployments"** (top menu)
6. On the top deployment, click the **"..."** button (three dots on the right)
7. Click **"Redeploy"** then **"Redeploy"** again to confirm
8. Wait about 1 minute for it to finish

## Step 4: Set up photo storage

This is where your photos will be saved.

1. On Vercel, click **"Storage"** (top menu)
2. Click **"Create"** button
3. Choose **"Blob"** and click **"Continue"**
4. Type any name (example: `portfolio-photos`) and click **"Create"**
5. Click **"Connect to Project"** and select your project (port)
6. Click **"Connect"**
7. Go to **"Deployments"** again, click **"..."** on the top one, click **"Redeploy"**
8. Wait about 1 minute

## Step 5: Upload your photos!

1. Open your website link and add `/admin/login` at the end
   - Example: `https://port-xxxxx.vercel.app/admin/login`
2. Type the password you chose in Step 3
3. You're in! Now you can:
   - **Left side**: Choose a category (Editorial, Commercial, etc.) and upload photos
   - **Right side**: See how your website looks in real time

## You're done!

Share your website link with anyone. They will see your portfolio.

**Good to know:**
- Free plan gives you space for about **100 high-quality photos**
- Your site can handle **100GB of traffic per month** (that's a lot!)
- You can upload and manage photos anytime from the admin page
- If you want a custom domain (like `othman.com`), go to **Settings** then **Domains**

---

# Comment configurer votre site web (Francais)

Votre site portfolio est pret ! Il suffit de le mettre en ligne.
Tout est **100% gratuit**. Pas besoin de carte bancaire. Ca prend environ **10 minutes**.

## Ce dont vous avez besoin avant de commencer

Vous devez deja avoir :
- Un compte **GitHub** (https://github.com)
- Un compte **Vercel** (https://vercel.com) — connectez-vous avec votre compte GitHub

## Etape 1 : Accepter l'invitation

Je vous ai envoye une invitation pour acceder au code. Verifiez vos emails de GitHub et cliquez sur **"View invitation"** puis **"Accept"**.

Apres avoir accepte, vous pouvez voir le code sur : `https://github.com/EnmanyProject/port`

## Etape 2 : Mettre votre site en ligne

1. Ouvrez https://vercel.com et connectez-vous
2. Cliquez sur le bouton **"Add New..."** (en haut a droite) puis **"Project"**
3. Vous verrez la liste de vos projets GitHub. Trouvez **"port"** et cliquez sur **"Import"**
4. Ne changez rien. Cliquez simplement sur le bouton **"Deploy"**
5. Attendez environ 1 minute. Quand vous voyez des confettis, votre site est en ligne !
6. Vous recevrez un lien comme `https://port-xxxxx.vercel.app` — **gardez ce lien**, c'est votre site web

## Etape 3 : Choisir votre mot de passe admin

Vous avez besoin d'un mot de passe pour ajouter des photos sur votre site.

1. Sur Vercel, cliquez sur le nom de votre projet (port)
2. Cliquez sur **"Settings"** (menu du haut)
3. Cliquez sur **"Environment Variables"** (menu de gauche)
4. Remplissez le formulaire :
   - **Key** : tapez `ADMIN_PASSWORD`
   - **Value** : tapez un mot de passe dont vous vous souviendrez (exemple : `monportfolio2024`)
   - Cliquez sur **"Save"**
5. Maintenant revenez en arriere : cliquez sur **"Deployments"** (menu du haut)
6. Sur le deploiement du haut, cliquez sur le bouton **"..."** (trois points a droite)
7. Cliquez sur **"Redeploy"** puis **"Redeploy"** encore pour confirmer
8. Attendez environ 1 minute

## Etape 4 : Configurer le stockage des photos

C'est la que vos photos seront sauvegardees.

1. Sur Vercel, cliquez sur **"Storage"** (menu du haut)
2. Cliquez sur le bouton **"Create"**
3. Choisissez **"Blob"** et cliquez sur **"Continue"**
4. Tapez un nom (exemple : `portfolio-photos`) et cliquez sur **"Create"**
5. Cliquez sur **"Connect to Project"** et selectionnez votre projet (port)
6. Cliquez sur **"Connect"**
7. Allez dans **"Deployments"** encore, cliquez sur **"..."** sur le premier, puis **"Redeploy"**
8. Attendez environ 1 minute

## Etape 5 : Ajouter vos photos !

1. Ouvrez le lien de votre site et ajoutez `/admin/login` a la fin
   - Exemple : `https://port-xxxxx.vercel.app/admin/login`
2. Tapez le mot de passe que vous avez choisi a l'etape 3
3. Vous y etes ! Maintenant vous pouvez :
   - **Cote gauche** : Choisir une categorie (Editorial, Commercial, etc.) et ajouter des photos
   - **Cote droit** : Voir a quoi ressemble votre site en temps reel

## C'est termine !

Partagez le lien de votre site avec qui vous voulez. Ils verront votre portfolio.

**Bon a savoir :**
- Le plan gratuit vous donne de la place pour environ **100 photos haute qualite**
- Votre site peut supporter **100 Go de trafic par mois** (c'est beaucoup !)
- Vous pouvez ajouter et gerer vos photos a tout moment depuis la page admin
- Si vous voulez un domaine personnalise (comme `othman.com`), allez dans **Settings** puis **Domains**

---

## For developers

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
