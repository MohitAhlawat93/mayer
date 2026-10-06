"use client";

import { FormEvent, useState } from "react";

type IngestResult = {
  ok?: boolean;
  error?: string;
  sourceType?: string;
  chunksStored?: number;
  fileName?: string;
  tenantId?: string;
};

export default function RoseAdminPage() {
  const [secret, setSecret] = useState("");
  const [tenantId, setTenantId] = useState("anora");
  const [displayName, setDisplayName] = useState("Anora");
  const [assistantName, setAssistantName] = useState("Rose");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IngestResult | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setResult(null);

    const body = new FormData();
    body.set("tenantId", tenantId);
    body.set("displayName", displayName);
    body.set("assistantName", assistantName);
    body.set("text", text);
    if (file) body.set("file", file);

    try {
      const response = await fetch("/api/rose/ingest", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret}`,
        },
        body,
      });

      const data = (await response.json()) as IngestResult;
      setResult(data);

      if (response.ok) {
        setText("");
        setFile(null);
      }
    } catch {
      setResult({ error: "Upload failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b080c] px-5 py-10 text-[#f5efeb] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#bda99e]">
          Rose Knowledge Manager
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
          Add conversations to Rose
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
          Upload a WhatsApp text export, Telegram JSON export, CSV, Markdown,
          plain text, or paste approved conversations and notes. Rose will
          turn the content into searchable RAG knowledge for this profile.
        </p>

        <form
          onSubmit={submit}
          className="mt-8 space-y-6 rounded-[1.8rem] border border-white/10 bg-white/[.035] p-5 shadow-2xl sm:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-xs text-white/60">
              <span>Tenant ID</span>
              <input
                value={tenantId}
                onChange={(event) => setTenantId(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b9a8]/35"
              />
            </label>

            <label className="space-y-2 text-xs text-white/60">
              <span>Owner / profile name</span>
              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b9a8]/35"
              />
            </label>

            <label className="space-y-2 text-xs text-white/60">
              <span>Assistant name</span>
              <input
                value={assistantName}
                onChange={(event) => setAssistantName(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b9a8]/35"
              />
            </label>

            <label className="space-y-2 text-xs text-white/60">
              <span>Admin secret</span>
              <input
                type="password"
                value={secret}
                onChange={(event) => setSecret(event.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-[#d6b9a8]/35"
              />
            </label>
          </div>

          <label className="block space-y-2 text-xs text-white/60">
            <span>Upload chat or knowledge file</span>
            <input
              type="file"
              accept=".txt,.json,.csv,.md,text/plain,application/json,text/csv,text/markdown"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="block w-full rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-5 text-xs text-white/55 file:mr-4 file:rounded-full file:border-0 file:bg-[#f1e8e2] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#160d14]"
            />
          </label>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-white/25">
            <span className="h-px flex-1 bg-white/10" />
            or paste text
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <label className="block space-y-2 text-xs text-white/60">
            <span>Conversations, Q&A, policies, or notes</span>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={12}
              placeholder={"Customer: Can I book in the evening?\nOwner: Evening bookings can be discussed in advance.\n\nQ: What are the booking hours?\nA: ..."}
              className="w-full resize-y rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-[#d6b9a8]/35"
            />
          </label>

          <button
            type="submit"
            disabled={loading || !secret || (!file && !text.trim())}
            className="w-full rounded-full bg-[#f2ebe6] px-5 py-3.5 text-sm font-semibold text-[#160d14] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Processing knowledge…" : "Add to Rose knowledge"}
          </button>

          {result?.error ? (
            <p className="rounded-xl border border-red-400/20 bg-red-400/[.06] px-4 py-3 text-xs leading-5 text-red-200">
              {result.error}
            </p>
          ) : null}

          {result?.ok ? (
            <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/[.05] px-4 py-3 text-xs leading-5 text-emerald-100/80">
              Added {result.chunksStored} knowledge chunks from{" "}
              {result.fileName} ({result.sourceType}) for tenant{" "}
              <strong>{result.tenantId}</strong>.
            </div>
          ) : null}
        </form>

        <div className="mt-6 rounded-2xl border border-white/[.07] px-5 py-4 text-xs leading-5 text-white/40">
          Uploaded chat text is processed into knowledge chunks. The current
          prototype does not save the original raw file. Keep the admin secret
          private and do not share this page with visitors.
        </div>
      </div>
    </main>
  );
}
