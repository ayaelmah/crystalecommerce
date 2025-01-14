"use server"
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  const cloudName = "dyt5nloyw"; 
  const uploadPreset = "unsigned_preset";
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/uploads`;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: data,
    });

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json({ url: result.secure_url });
    } else {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}