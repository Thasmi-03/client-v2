// src/components/ImageUploader.tsx
import { useState, ChangeEvent } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface ImageUploaderProps {
  onUploadComplete?: (imageUrl: string) => void;
  onUploadStart?: () => void;
  useCloudinaryDirect?: boolean;
  autoUpload?: boolean;
}

export default function ImageUploader({
  onUploadComplete,
  onUploadStart,
  useCloudinaryDirect = false,
  autoUpload = true
}: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));

    if (autoUpload) {
      handleUpload(f);
    }
  };

  // Upload directly to Cloudinary (client-side)
  const uploadToCloudinary = async (fileToUpload: File) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      console.warn("Cloudinary not configured in frontend, falling back to backend upload.");
      return uploadViaBackend(fileToUpload);
    }

    setUploading(true);
    onUploadStart?.();

    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        onUploadComplete?.(data.secure_url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  // Upload via backend API
  const uploadViaBackend = async (fileToUpload: File) => {
    setUploading(true);
    onUploadStart?.();

    const formData = new FormData();
    formData.append("image", fileToUpload);

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.details || data.error || "Upload failed");
      }

      if (data.success) {
        setImageUrl(data.imageUrl);
        onUploadComplete?.(data.imageUrl);
      } else {
        throw new Error(data.message || data.error || "Upload failed");
      }
    } catch (err: any) {
      console.error("Upload error details:", err);
      alert(`Upload error: ${err.message || "Unknown error"}`);
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = (fileToUpload: File = file!) => {
    if (!fileToUpload) return alert("Choose an image first");

    if (useCloudinaryDirect && CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET) {
      uploadToCloudinary(fileToUpload);
    } else {
      uploadViaBackend(fileToUpload);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="block w-full text-sm text-muted-foreground
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-primary file:text-primary-foreground
          hover:file:bg-primary/90"
      />
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="preview" className="w-[150px] h-auto rounded-md border border-border" />
        </div>
      )}

      {!autoUpload && (
        <button
          onClick={() => handleUpload()}
          disabled={uploading}
          className="mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}

      {uploading && autoUpload && (
        <div className="mt-2 text-sm text-muted-foreground">Uploading...</div>
      )}

      {imageUrl && !autoUpload && (
        <div className="mt-2">
          <p className="text-sm text-muted-foreground mb-1">Uploaded image:</p>
          <img src={imageUrl} alt="uploaded" className="w-[200px] rounded-md border border-border" />
        </div>
      )}
    </div>
  );
}
