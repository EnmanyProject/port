import { put, del, list } from "@vercel/blob";
import type { Category } from "@/data/portfolio";

export interface StoredImage {
  id: string;
  url: string;
  filename: string;
  category: Category;
  alt: string;
  featured: boolean;
  order: number;
  width: number;
  height: number;
  metadata?: {
    photographer?: string;
    brand?: string;
    date?: string;
  };
  uploadedAt: string;
}

const META_KEY = "portfolio-meta.json";

// Get all images metadata from blob
export async function getImages(): Promise<StoredImage[]> {
  try {
    const { blobs } = await list({ prefix: META_KEY });
    if (blobs.length === 0) return [];

    const res = await fetch(blobs[0].url);
    return await res.json();
  } catch {
    return [];
  }
}

// Save images metadata to blob
async function saveImages(images: StoredImage[]): Promise<void> {
  await put(META_KEY, JSON.stringify(images), {
    access: "public",
    addRandomSuffix: false,
  });
}

// Upload image
export async function uploadImage(
  file: File,
  data: {
    category: Category;
    alt: string;
    photographer?: string;
    brand?: string;
  }
): Promise<StoredImage> {
  const blob = await put(`portfolio/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  const images = await getImages();
  const newImage: StoredImage = {
    id: crypto.randomUUID(),
    url: blob.url,
    filename: file.name,
    category: data.category,
    alt: data.alt || file.name,
    featured: false,
    order: images.length,
    width: 1200,
    height: 1600,
    metadata: {
      photographer: data.photographer,
      brand: data.brand,
    },
    uploadedAt: new Date().toISOString(),
  };

  images.push(newImage);
  await saveImages(images);
  return newImage;
}

// Delete image
export async function deleteImage(id: string): Promise<void> {
  const images = await getImages();
  const target = images.find((img) => img.id === id);
  if (target) {
    await del(target.url);
  }
  const updated = images.filter((img) => img.id !== id);
  await saveImages(updated);
}

// Update image metadata
export async function updateImage(
  id: string,
  data: Partial<Pick<StoredImage, "category" | "alt" | "featured" | "order" | "metadata">>
): Promise<void> {
  const images = await getImages();
  const index = images.findIndex((img) => img.id === id);
  if (index === -1) return;

  images[index] = { ...images[index], ...data };
  await saveImages(images);
}

// Reorder images
export async function reorderImages(ids: string[]): Promise<void> {
  const images = await getImages();
  const reordered = ids
    .map((id, index) => {
      const img = images.find((i) => i.id === id);
      if (img) return { ...img, order: index };
      return null;
    })
    .filter(Boolean) as StoredImage[];

  await saveImages(reordered);
}
