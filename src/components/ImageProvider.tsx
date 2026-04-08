"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { StoredImage } from "@/lib/store";

interface ImageContextType {
  // Blob에 업로드된 실제 이미지 목록
  images: StoredImage[];
  // 관리자 인증 여부
  isAdmin: boolean;
  // 이미지 업로드 (슬롯 카테고리 지정)
  uploadImage: (file: File, category: string) => Promise<void>;
  // 데이터 새로고침
  refresh: () => Promise<void>;
}

const ImageContext = createContext<ImageContextType>({
  images: [],
  isAdmin: false,
  uploadImage: async () => {},
  refresh: async () => {},
});

export function useImages() {
  return useContext(ImageContext);
}

// 인증 상태 확인 — 쿠키 기반 세션 체크
async function checkAdmin(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth", { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/images");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch {
      // 이미지 로드 실패 시 빈 배열 유지
    }
  }, []);

  useEffect(() => {
    refresh();
    checkAdmin().then(setIsAdmin);
  }, [refresh]);

  const uploadImage = useCallback(
    async (file: File, category: string) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("alt", file.name.replace(/\.[^/.]+$/, ""));

      await fetch("/api/images", { method: "POST", body: formData });
      await refresh();
    },
    [refresh]
  );

  return (
    <ImageContext.Provider value={{ images, isAdmin, uploadImage, refresh }}>
      {children}
    </ImageContext.Provider>
  );
}
