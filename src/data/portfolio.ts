export interface ModelProfile {
  name: string;
  nameEn: string;
  title: string;
  bio: string;
  stats: {
    height: string;
    weight: string;
    bust: string;
    waist: string;
    hip: string;
    shoe: string;
  };
  sns: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  email: string;
}

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
  width: number;
  height: number;
  featured: boolean;
  order: number;
  metadata?: {
    photographer?: string;
    brand?: string;
    date?: string;
  };
}

export type Category = "editorial" | "commercial" | "runway" | "beauty" | "casual" | "profile";

export const CATEGORY_LABELS: Record<Category, string> = {
  editorial: "Editorial",
  commercial: "Commercial",
  runway: "Runway",
  beauty: "Beauty",
  casual: "Casual",
  profile: "Profile",
};

// Placeholder profile - replace with real data
export const profile: ModelProfile = {
  name: "오트만",
  nameEn: "OTHMAN",
  title: "Fashion Model",
  bio: "서울을 기반으로 활동하는 패션 모델. 에디토리얼, 커머셜, 런웨이 등 다양한 분야에서 활동하고 있습니다. 자연스러운 표현력과 독보적인 분위기로 각 브랜드의 이야기를 전달합니다.",
  stats: {
    height: "172cm",
    weight: "50kg",
    bust: "82cm",
    waist: "60cm",
    hip: "88cm",
    shoe: "245mm",
  },
  sns: {
    instagram: "https://instagram.com/",
  },
  email: "contact@portfolio.com",
};

// Placeholder images using gradient backgrounds
// Replace src with actual Cloudinary/image URLs
export const images: PortfolioImage[] = [
  {
    id: "1",
    src: "/images/placeholder-hero.jpg",
    alt: "Editorial photo 1",
    category: "editorial",
    width: 1200,
    height: 1600,
    featured: true,
    order: 1,
    metadata: { photographer: "Studio A", brand: "Brand X" },
  },
  {
    id: "2",
    src: "/images/placeholder-2.jpg",
    alt: "Commercial photo 1",
    category: "commercial",
    width: 1200,
    height: 1500,
    featured: false,
    order: 2,
    metadata: { photographer: "Studio B", brand: "Brand Y" },
  },
  {
    id: "3",
    src: "/images/placeholder-3.jpg",
    alt: "Beauty photo 1",
    category: "beauty",
    width: 1200,
    height: 1400,
    featured: false,
    order: 3,
  },
  {
    id: "4",
    src: "/images/placeholder-4.jpg",
    alt: "Runway photo 1",
    category: "runway",
    width: 1200,
    height: 1800,
    featured: false,
    order: 4,
    metadata: { brand: "Fashion Week" },
  },
  {
    id: "5",
    src: "/images/placeholder-5.jpg",
    alt: "Casual photo 1",
    category: "casual",
    width: 1200,
    height: 1200,
    featured: false,
    order: 5,
  },
  {
    id: "6",
    src: "/images/placeholder-6.jpg",
    alt: "Profile photo 1",
    category: "profile",
    width: 1200,
    height: 1500,
    featured: false,
    order: 6,
  },
  {
    id: "7",
    src: "/images/placeholder-7.jpg",
    alt: "Editorial photo 2",
    category: "editorial",
    width: 1200,
    height: 1600,
    featured: false,
    order: 7,
  },
  {
    id: "8",
    src: "/images/placeholder-8.jpg",
    alt: "Commercial photo 2",
    category: "commercial",
    width: 1200,
    height: 1400,
    featured: false,
    order: 8,
  },
];
