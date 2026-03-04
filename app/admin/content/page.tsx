"use client";

import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  {
    key: "home:hero:title",
    label: "Home — Hero title",
    description: "The big ransom-note title on the homepage",
    multiline: false,
  },
  {
    key: "home:hero:subtitle",
    label: "Home — Hero subtitle",
    description: "The tagline below the hero title",
    multiline: false,
  },
  {
    key: "home:about:text",
    label: "Home — 'What is Scrap Society?' text",
    description: "The paragraph in the about section on the homepage",
    multiline: true,
  },
  {
    key: "about:story:p1",
    label: "About — Story paragraph 1",
    description: "First paragraph in the 'How it all started' section",
    multiline: true,
  },
  {
    key: "about:story:p2",
    label: "About — Story paragraph 2",
    description: "Second paragraph in the story section",
    multiline: true,
  },
  {
    key: "about:story:p3",
    label: "About — Story paragraph 3",
    description: "Third paragraph in the story section",
    multiline: true,
  },
  {
    key: "contact:email",
    label: "Contact — Email address",
    description: "The email shown on the contact page",
    multiline: false,
  },
  {
    key: "contact:instagram",
    label: "Contact — Instagram handle",
    description: "e.g. @scrapsociety.nl",
    multiline: false,
  },
  {
    key: "contact:location",
    label: "Contact — Location",
    description: "Address shown on contact and about pages",
    multiline: false,
  },
];

export default function AdminContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError] = useState("");
  const logoFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => { setContent(data); setLoading(false); });
  }, []);

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    setLogoError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      const { url } = await res.json();
      await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "site:logo", value: url }),
      });
      setContent((prev) => ({ ...prev, "site:logo": url }));
    } catch (err) {
      setLogoError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLogoUploading(false);
      if (logoFileRef.current) logoFileRef.current.value = "";
    }
  }

  async function handleRemoveLogo() {
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "site:logo", value: "" }),
    });
    setContent((prev) => ({ ...prev, "site:logo": "" }));
  }

  async function handleSave(key: string) {
    setSaving(key);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: content[key] ?? "" }),
    });
    setSaving(null);
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  }

  if (loading) {
    return <p className="text-gray-400 text-sm">Loading content...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Content</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edit text sections across the site. Changes take effect on the next page load.
        </p>
      </div>

      {/* Logo upload */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <label className="block font-medium text-gray-700 text-sm mb-0.5">Site Logo</label>
        <p className="text-xs text-gray-400 mb-4">Shown in the top-left corner of every page. Leave empty to use the default text badge.</p>
        <div className="flex items-center gap-4">
          {content["site:logo"] ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={content["site:logo"]} alt="Logo" className="w-14 h-14 rounded-full object-cover border-2 border-gray-200" />
              <div className="flex gap-2">
                <label className="cursor-pointer inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition">
                  {logoUploading ? "Uploading..." : "Replace"}
                  <input ref={logoFileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={logoUploading} />
                </label>
                <button onClick={handleRemoveLogo} className="text-sm text-red-400 hover:text-red-600 border border-gray-200 rounded-lg px-3 py-1.5 transition">
                  Remove
                </button>
              </div>
            </>
          ) : (
            <label className="cursor-pointer inline-flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500 hover:border-amber-400 hover:text-amber-600 transition">
              {logoUploading ? "Uploading..." : "+ Upload logo"}
              <input ref={logoFileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={logoUploading} />
            </label>
          )}
        </div>
        {logoError && <p className="text-red-500 text-xs mt-2">{logoError}</p>}
      </div>

      <div className="space-y-4">
        {SECTIONS.map((section) => (
          <div key={section.key} className="bg-white rounded-2xl border border-gray-200 p-5">
            <label className="block font-medium text-gray-700 text-sm mb-0.5">{section.label}</label>
            <p className="text-xs text-gray-400 mb-3">{section.description}</p>

            {section.multiline ? (
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                rows={4}
                value={content[section.key] ?? ""}
                onChange={(e) => setContent({ ...content, [section.key]: e.target.value })}
                placeholder="Leave empty to use the default text from the code"
              />
            ) : (
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={content[section.key] ?? ""}
                onChange={(e) => setContent({ ...content, [section.key]: e.target.value })}
                placeholder="Leave empty to use the default text from the code"
              />
            )}

            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => handleSave(section.key)}
                disabled={saving === section.key}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {saving === section.key ? "Saving..." : "Save"}
              </button>
              {saved === section.key && (
                <span className="text-sm text-green-600">Saved!</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
