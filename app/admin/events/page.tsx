"use client";

import { useState, useEffect, useRef } from "react";
import type { Event } from "@/lib/kv";

const emptyForm = (): Omit<Event, "id"> => ({
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  isPast: false,
  registrationOpen: true,
  spotsLeft: undefined,
  images: [],
  tikkieUrl: "",
});

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Event | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((data) => { setEvents(data); setLoading(false); });
  }, []);

  function startNew() {
    setEditing(null);
    setForm(emptyForm());
    setFormOpen(true);
  }

  function startEdit(event: Event) {
    setEditing(event);
    setForm({ ...event });
    setFormOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const url = editing ? `/api/admin/events/${editing.id}` : "/api/admin/events";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const saved = await res.json();
    if (editing) {
      setEvents((prev) => prev.map((e) => (e.id === saved.id ? saved : e)));
    } else {
      setEvents((prev) => [saved, ...prev]);
    }
    setEditing(null);
    setForm(emptyForm());
    setFormOpen(false);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  async function handleToggle(event: Event, field: "isPast" | "registrationOpen") {
    const updated = { ...event, [field]: !event[field] };
    await fetch(`/api/admin/events/${event.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)));
  }

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Upload failed (${res.status})`);
      }
      const { url } = await res.json();
      setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function removeImage(url: string) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((u) => u !== url) }));
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Events</h1>
        <button
          onClick={startNew}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + New event
        </button>
      </div>

      {/* Form */}
      {formOpen && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-700">{editing ? "Edit event" : "New event"}</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Title *</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Punchcard Party"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Date *</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="1st February"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="2pm - 5pm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Central Library, Rotterdam"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Spots left</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={form.spotsLeft ?? ""}
                onChange={(e) => setForm({ ...form, spotsLeft: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Leave empty for unlimited"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Tikkie link <span className="font-normal text-gray-400">(optional — for contributions)</span></label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={form.tikkieUrl ?? ""}
                onChange={(e) => setForm({ ...form, tikkieUrl: e.target.value })}
                placeholder="https://tikkie.me/pay/..."
              />
            </div>
            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPast}
                  onChange={(e) => setForm({ ...form, isPast: e.target.checked })}
                  className="w-4 h-4 accent-amber-500"
                />
                <span className="text-sm text-gray-700">Past event</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.registrationOpen}
                  onChange={(e) => setForm({ ...form, registrationOpen: e.target.checked })}
                  className="w-4 h-4 accent-amber-500"
                />
                <span className="text-sm text-gray-700">Registration open</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="A short description of the event..."
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Photos</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.images.map((url) => (
                <div key={url} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                  <button
                    onClick={() => removeImage(url)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs hidden group-hover:flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <label className="cursor-pointer inline-flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500 hover:border-amber-400 hover:text-amber-600 transition">
              {uploading ? "Uploading..." : "+ Add photo"}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadImage}
                disabled={uploading}
              />
            </label>
            {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.title || !form.date}
              className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save event"}
            </button>
            <button
              onClick={() => { setEditing(null); setForm(emptyForm()); setFormOpen(false); }}
              className="text-gray-500 hover:text-gray-700 px-4 py-2 text-sm transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events list */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading events...</p>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-400">No events yet. Add your first one above!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => startEdit(event)}
              className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4 cursor-pointer hover:border-amber-300 hover:shadow-sm transition"
            >
              {event.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.images[0]} alt="" className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-800">{event.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${event.isPast ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-700"}`}>
                    {event.isPast ? "Past" : "Upcoming"}
                  </span>
                  {!event.isPast && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${event.registrationOpen ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-600"}`}>
                      {event.registrationOpen ? "Registration open" : "Full"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{event.date}{event.time ? ` · ${event.time}` : ""}{event.location ? ` · ${event.location}` : ""}</p>
                {event.tikkieUrl && <span className="text-xs text-[#009FE3] mt-0.5 inline-block">💙 Tikkie set</span>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleToggle(event, "isPast")}
                  className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 transition"
                  title={event.isPast ? "Mark as upcoming" : "Mark as past"}
                >
                  {event.isPast ? "↑ Upcoming" : "↓ Past"}
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-xs text-red-400 hover:text-red-600 border border-gray-200 rounded-lg px-3 py-1.5 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
