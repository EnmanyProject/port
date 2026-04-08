"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { StoredImage } from "@/lib/store";
import type { Category } from "@/data/portfolio";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "editorial", label: "Editorial" },
  { value: "commercial", label: "Commercial" },
  { value: "runway", label: "Runway" },
  { value: "beauty", label: "Beauty" },
  { value: "casual", label: "Casual" },
  { value: "profile", label: "Profile" },
];

export default function AdminManage() {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<StoredImage | null>(null);
  const [shareToast, setShareToast] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fetchImages = useCallback(async () => {
    const res = await fetch("/api/images");
    const data = await res.json();
    setImages(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // 사진 선택 즉시 업로드 — 카테고리는 기본값(casual), 나중에 수정 가능
  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadProgress(0);

    const total = files.length;
    let done = 0;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "casual");
      formData.append("alt", file.name.replace(/\.[^/.]+$/, ""));

      await fetch("/api/images", { method: "POST", body: formData });
      done++;
      setUploadProgress(Math.round((done / total) * 100));
    }

    if (fileRef.current) fileRef.current.value = "";
    await fetchImages();
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 사진을 삭제할까요?")) return;
    await fetch("/api/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSelectedImage(null);
    await fetchImages();
  };

  const handleUpdate = async (id: string, data: Record<string, unknown>) => {
    await fetch("/api/images", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    setSelectedImage(null);
    await fetchImages();
  };

  // Web Share API 또는 클립보드 복사
  const handleShare = async () => {
    const url = window.location.origin;
    const shareData = {
      title: "OTHMAN — Portfolio",
      text: "Check out my portfolio",
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA]">
      {/* 상단 바 — 심플하게 */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <h1 className="text-base font-semibold tracking-tight">내 포트폴리오</h1>
          <div className="flex items-center gap-2">
            {/* 공유 버튼 */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 py-1.5 text-xs font-medium text-white transition-opacity active:opacity-70"
            >
              <ShareIcon />
              공유
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-red-500"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 공유 완료 토스트 */}
      {shareToast && (
        <div className="fixed top-16 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-xs text-white shadow-lg">
          링크가 복사되었습니다 ✓
        </div>
      )}

      <main className="mx-auto max-w-lg px-4 pb-24 pt-4">
        {/* 업로드 진행 바 */}
        {uploading && (
          <div className="mb-4 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-[var(--accent)] transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
            <p className="py-1.5 text-center text-xs text-gray-500">
              업로드 중... {uploadProgress}%
            </p>
          </div>
        )}

        {/* 사진 그리드 */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[var(--accent)]" />
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <CameraIcon />
            </div>
            <p className="text-sm font-medium text-gray-800">사진을 올려보세요</p>
            <p className="mt-1 text-xs text-gray-400">
              아래 + 버튼을 눌러 사진을 추가하세요
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {images
              .sort((a, b) => a.order - b.order)
              .map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-200 group-active:scale-95"
                  />
                  {img.featured && (
                    <span className="absolute top-1 left-1 rounded bg-[var(--accent)] px-1 py-0.5 text-[8px] font-bold text-white">
                      ★
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-1.5 pb-1 pt-4">
                    <span className="text-[9px] uppercase tracking-wider text-white/80">
                      {img.category}
                    </span>
                  </div>
                </button>
              ))}
          </div>
        )}

        <p className="mt-3 text-center text-xs text-gray-400">
          {images.length}장 · 사진을 탭하면 편집할 수 있어요
        </p>
      </main>

      {/* 플로팅 업로드 버튼 */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleUpload(e.target.files)}
        className="hidden"
      />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="fixed right-5 bottom-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/30 transition-all active:scale-90 disabled:opacity-40"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* 사진 상세 / 편집 바텀시트 */}
      {selectedImage && (
        <BottomSheet
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

// 사진 편집 바텀시트
function BottomSheet({
  image,
  onClose,
  onDelete,
  onUpdate,
}: {
  image: StoredImage;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
}) {
  const [category, setCategory] = useState(image.category);
  const [alt, setAlt] = useState(image.alt);
  const [featured, setFeatured] = useState(image.featured);

  const hasChanges =
    category !== image.category || alt !== image.alt || featured !== image.featured;

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* 바텀시트 */}
      <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white pb-8 shadow-2xl animate-in slide-in-from-bottom">
        {/* 드래그 핸들 */}
        <div className="flex justify-center py-3">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* 사진 미리보기 */}
        <div className="flex gap-4 px-5">
          <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-3">
            {/* 카테고리 선택 */}
            <div>
              <label className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                카테고리
              </label>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className={`rounded-full px-2.5 py-1 text-[11px] transition-colors ${
                      category === c.value
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 설명 */}
            <div>
              <label className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                설명
              </label>
              <input
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="사진 설명 (선택)"
                className="mt-1 w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>
        </div>

        {/* Featured 토글 */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 px-5 pt-4">
          <div>
            <p className="text-sm font-medium">대표 사진</p>
            <p className="text-xs text-gray-400">메인 화면 상단에 표시됩니다</p>
          </div>
          <button
            onClick={() => setFeatured(!featured)}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              featured ? "bg-[var(--accent)]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                featured ? "translate-x-5.5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* 액션 버튼들 */}
        <div className="mt-5 flex gap-2 px-5">
          {hasChanges && (
            <button
              onClick={() =>
                onUpdate(image.id, { category, alt, featured })
              }
              className="flex-1 rounded-xl bg-black py-3 text-sm font-medium text-white transition-opacity active:opacity-70"
            >
              저장
            </button>
          )}
          <button
            onClick={() => onDelete(image.id)}
            className="rounded-xl bg-red-50 px-5 py-3 text-sm font-medium text-red-500 transition-opacity active:opacity-70"
          >
            삭제
          </button>
          {!hasChanges && (
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-600 transition-opacity active:opacity-70"
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// 공유 아이콘
function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

// 카메라 아이콘 (빈 상태용)
function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
