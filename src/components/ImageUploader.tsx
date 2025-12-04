// src/components/ImageUploader.tsx
import { useState, ChangeEvent } from "react";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return alert("Choose an image first");
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.imageUrl);
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

  return (
    <div>
      <input type="file" accept="image/*" onChange={onFileChange} />
      {preview && (
        <div>
          <img src={preview} alt="preview" style={{ width: 150, height: "auto" }} />
        </div>
      )}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <div>
          <p>Uploaded image:</p>
          <img src={imageUrl} alt="uploaded" style={{ width: 200 }} />
        </div>
      )}
    </div>
  );
}
