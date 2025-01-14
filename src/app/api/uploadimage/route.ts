
import { NextResponse } from 'next/server';
import FormData from 'form-data';

export async function POST(req: Request) {
  const formData = new FormData();
  const cloudName = "dyt5nloyw"; 
  const uploadPreset = "unsigned_preset";
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/uploads`;

  const data = await req.formData(); 
  const file = data.get('file') as File;
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const cloudinaryResponse = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData as unknown as BodyInit,
    });

    const result = await cloudinaryResponse.json();

    if (cloudinaryResponse.ok) {
      return NextResponse.json({ url: result.secure_url });
    } else {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}