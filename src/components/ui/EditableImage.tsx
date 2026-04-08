"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { useImages } from "@/components/ImageProvider";
import type { Category } from "@/data/portfolio";

interface EditableImageProps {
  // Blob에서 가져온 실제 이미지 URL (있으면 표시)
  imageUrl?: string;
  // 이미지 없을 때 보여줄 플레이스홀더 (기존 그라디언트 등)
  placeholder: ReactNode;
  // 업로드 시 적용할 카테고리
  category: Category;
  // 스타일 클래스
  className?: string;
  // 자식 요소 (오버레이 등)
  children?: ReactNode;
}

export default function EditableImage({
  imageUrl,
  placeholder,
  category,
  className = "",
  children,
}: EditableImageProps) {
  const { isAdmin, uploadImage } = useImages();
  const [showOverlay, setShowOverlay] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // 롱프레스 시작 (3초)
  const startPress = useCallback(() => {
    if (!isAdmin) return;
    longPressTimer.current = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);
  }, [isAdmin]);

  // 롱프레스 취소
  const cancelPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  // 파일 업로드 처리
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setProgress(0);

    const total = files.length;
    let done = 0;

    for (const file of Array.from(files)) {
      await uploadImage(file, category);
      done++;
      setProgress(Math.round((done / total) * 100));
    }

    setUploading(false);
    setShowOverlay(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div
      className={`relative ${className}`}
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      onTouchCancel={cancelPress}
      onMouseDown={startPress}
      onMouseUp={cancelPress}
      onMouseLeave={cancelPress}
      onContextMenu={(e) => {
        // 롱프레스 중 컨텍스트 메뉴 방지
        if (isAdmin) e.preventDefault();
      }}
    >
      {/* 실제 이미지 또는 플레이스홀더 */}
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        placeholder
      )}

      {/* 자식 요소 (호버 오버레이 등) */}
      {children}

      {/* 어드민 힌트 — 이미지 없는 슬롯에만 표시 */}
      {isAdmin && !imageUrl && !showOverlay && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
            <p className="text-[10px] text-white/60">꾹 눌러서 사진 추가</p>
          </div>
        </div>
      )}

      {/* 업로드 오버레이 */}
      {showOverlay && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => !uploading && setShowOverlay(false)}
          />
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div
              className="mx-4 w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-center text-sm font-semibold">사진 업로드</h3>
              <p className="mt-1 text-center text-xs text-gray-400">
                이 영역에 표시될 사진을 선택하세요
              </p>

              {uploading ? (
                <div className="mt-5">
                  <div className="overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-[var(--accent)] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-xs text-gray-500">
                    업로드 중... {progress}%
                  </p>
                </div>
              ) : (
                <>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-medium text-white transition-opacity active:opacity-70"
                  >
                    사진 선택
                  </button>
                  <button
                    onClick={() => setShowOverlay(false)}
                    className="mt-2 w-full rounded-xl bg-gray-100 py-3 text-sm text-gray-500 transition-opacity active:opacity-70"
                  >
                    취소
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* 숨겨진 파일 인풋 */}
    </div>
  );
}
