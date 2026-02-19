import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getImages, uploadImage, deleteImage, updateImage } from "@/lib/store";
import type { Category } from "@/data/portfolio";

// GET all images
export async function GET() {
  const images = await getImages();
  return NextResponse.json(images);
}

// POST upload image
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const category = formData.get("category") as Category;
  const alt = formData.get("alt") as string;
  const photographer = formData.get("photographer") as string;
  const brand = formData.get("brand") as string;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const image = await uploadImage(file, { category, alt, photographer, brand });
  return NextResponse.json(image);
}

// DELETE image
export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  await deleteImage(id);
  return NextResponse.json({ success: true });
}

// PATCH update image
export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, ...data } = await request.json();
  await updateImage(id, data);
  return NextResponse.json({ success: true });
}
