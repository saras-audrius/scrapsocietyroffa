"use client";

import { useState, useEffect, useRef } from "react";

interface BlobItem {
  url: string;
  pathname: string;
  uploadedAt: string;
  size: number;
}

export default function AdminPhotosPage() {
  const [images, setImages] = useState<BlobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/images")
      .then((r) => r.json())
      .then((data) => { setImages(data); setLoading(false); });
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);

    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const { url } = await res.json();
      setImages((prev) => [{ url, pathname: file.name, uploadedAt: new Date().toISOString(), size: file.size }, ...prev]);
    }

    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDelete(url: string) {
    if (!confirm("Delete this photo?")) return;
    await fetch("/api/admin/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    setImages((prev) => prev.filter((img) => img.url !== url));
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Photos</h1>
        <label className={`cursor-pointer bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? "Uploading..." : "+ Upload photos"}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      <p className="text-sm text-gray-500">
        Upload photos here and copy the URL to use them anywhere on the site (events, about page, etc.)
      </p>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading photos...</p>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-400">No photos uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.url} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.pathname} className="w-full aspect-square object-cover" />
              <div className="p-2 space-y-1.5">
                <p className="text-xs text-gray-500 truncate">{img.pathname}</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => copyUrl(img.url)}
                    className="flex-1 text-xs bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-700 rounded-lg py-1.5 transition"
                  >
                    {copied === img.url ? "Copied!" : "Copy URL"}
                  </button>
                  <button
                    onClick={() => handleDelete(img.url)}
                    className="text-xs bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded-lg px-2 py-1.5 transition"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
