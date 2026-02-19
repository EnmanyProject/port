"use client";

import { useState, useEffect, useRef } from "react";
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewSection, setPreviewSection] = useState("#highlights");
  const fileRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  // Upload form state
  const [uploadCategory, setUploadCategory] = useState<Category>("editorial");
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadPhotographer, setUploadPhotographer] = useState("");
  const [uploadBrand, setUploadBrand] = useState("");

  const fetchImages = async () => {
    const res = await fetch("/api/images");
    const data = await res.json();
    setImages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = `/${previewSection}`;
    }
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", uploadCategory);
      formData.append("alt", uploadAlt || file.name);
      formData.append("photographer", uploadPhotographer);
      formData.append("brand", uploadBrand);

      await fetch("/api/images", { method: "POST", body: formData });
    }

    setUploadAlt("");
    setUploadPhotographer("");
    setUploadBrand("");
    if (fileRef.current) fileRef.current.value = "";
    await fetchImages();
    setUploading(false);
    refreshPreview();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 사진을 삭제하시겠습니까?")) return;
    await fetch("/api/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchImages();
    refreshPreview();
  };

  const handleUpdate = async (id: string, data: Record<string, unknown>) => {
    await fetch("/api/images", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    setEditingId(null);
    await fetchImages();
    refreshPreview();
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await handleUpdate(id, { featured: !current });
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[#f5f5f5]">
      {/* Header */}
      <header className="shrink-0 border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Portfolio Admin</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshPreview}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200"
            >
              미리보기 새로고침
            </button>
            <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Split layout */}
      <div className="flex min-h-0 flex-1">
        {/* Left: Admin panel */}
        <div className="w-1/2 overflow-y-auto border-r border-gray-200 p-4">
          {/* Upload section */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h2 className="text-base font-semibold">사진 업로드</h2>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500">카테고리</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as Category)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500">설명</label>
                <input
                  value={uploadAlt}
                  onChange={(e) => setUploadAlt(e.target.value)}
                  placeholder="사진 설명"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">포토그래퍼</label>
                <input
                  value={uploadPhotographer}
                  onChange={(e) => setUploadPhotographer(e.target.value)}
                  placeholder="촬영자"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">브랜드</label>
                <input
                  value={uploadBrand}
                  onChange={(e) => setUploadBrand(e.target.value)}
                  placeholder="브랜드명"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3">
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
                className="rounded-lg bg-black px-4 py-2 text-sm text-white transition-opacity hover:opacity-80 disabled:opacity-40"
              >
                {uploading ? "업로드 중..." : "사진 선택 & 업로드"}
              </button>
              <p className="text-xs text-gray-400">여러 장 동시 선택 가능</p>
            </div>
          </div>

          {/* Images list */}
          <div className="mt-4">
            <h2 className="text-base font-semibold">
              등록된 사진 ({images.length})
            </h2>

            {loading ? (
              <p className="mt-3 text-sm text-gray-400">불러오는 중...</p>
            ) : images.length === 0 ? (
              <p className="mt-3 text-sm text-gray-400">아직 등록된 사진이 없습니다.</p>
            ) : (
              <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
                {images
                  .sort((a, b) => a.order - b.order)
                  .map((img) => (
                    <div
                      key={img.id}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                    >
                      <div className="relative aspect-[4/3] bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="h-full w-full object-cover"
                        />
                        {img.featured && (
                          <span className="absolute top-2 left-2 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-bold">
                            FEATURED
                          </span>
                        )}
                      </div>

                      <div className="p-3">
                        {editingId === img.id ? (
                          <EditForm
                            image={img}
                            onSave={(data) => handleUpdate(img.id, data)}
                            onCancel={() => setEditingId(null)}
                          />
                        ) : (
                          <>
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-[10px] uppercase text-gray-600">
                                  {img.category}
                                </span>
                                <p className="mt-1 text-sm text-gray-800">{img.alt}</p>
                                {img.metadata?.brand && (
                                  <p className="text-xs text-gray-400">{img.metadata.brand}</p>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={() => handleToggleFeatured(img.id, img.featured)}
                                className={`rounded px-2 py-1 text-xs ${
                                  img.featured
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {img.featured ? "Featured 해제" : "Featured"}
                              </button>
                              <button
                                onClick={() => setEditingId(img.id)}
                                className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500"
                              >
                                편집
                              </button>
                              <button
                                onClick={() => handleDelete(img.id)}
                                className="rounded bg-red-50 px-2 py-1 text-xs text-red-500"
                              >
                                삭제
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Live preview */}
        <div className="flex w-1/2 flex-col bg-gray-900">
          {/* Preview nav */}
          <div className="flex shrink-0 items-center gap-1 border-b border-gray-700 px-3 py-2">
            {[
              { label: "Hero", hash: "#" },
              { label: "Highlights", hash: "#highlights" },
              { label: "Collections", hash: "#collections" },
              { label: "About", hash: "#about" },
              { label: "Contact", hash: "#contact" },
            ].map((sec) => (
              <button
                key={sec.hash}
                onClick={() => {
                  setPreviewSection(sec.hash);
                  if (iframeRef.current) {
                    iframeRef.current.src = `/${sec.hash}`;
                  }
                }}
                className={`rounded px-2.5 py-1 text-xs transition-colors ${
                  previewSection === sec.hash
                    ? "bg-white/15 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* iframe */}
          <iframe
            ref={iframeRef}
            src={`/${previewSection}`}
            className="flex-1 bg-white"
            title="Site Preview"
          />
        </div>
      </div>
    </div>
  );
}

function EditForm({
  image,
  onSave,
  onCancel,
}: {
  image: StoredImage;
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [category, setCategory] = useState(image.category);
  const [alt, setAlt] = useState(image.alt);
  const [photographer, setPhotographer] = useState(image.metadata?.photographer || "");
  const [brand, setBrand] = useState(image.metadata?.brand || "");

  return (
    <div className="space-y-2">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm"
      >
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
      <input
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        placeholder="설명"
        className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm"
      />
      <input
        value={photographer}
        onChange={(e) => setPhotographer(e.target.value)}
        placeholder="포토그래퍼"
        className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm"
      />
      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="브랜드"
        className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm"
      />
      <div className="flex gap-2">
        <button
          onClick={() =>
            onSave({ category, alt, metadata: { photographer, brand } })
          }
          className="rounded bg-black px-3 py-1.5 text-xs text-white"
        >
          저장
        </button>
        <button onClick={onCancel} className="rounded bg-gray-100 px-3 py-1.5 text-xs">
          취소
        </button>
      </div>
    </div>
  );
}
