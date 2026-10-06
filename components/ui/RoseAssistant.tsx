"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { roseKnowledge } from "@/content/rose-knowledge";
import { trackGrowthEvent } from "@/lib/growth/track";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

function RoseMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-4 w-4" fill="none">
      <path d="M16 27.5c.7-4.2.15-8.2-1.55-11.25" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M15.2 21.4c-2.85.15-5.05-1-6.5-3.2 2.8-.55 5.05.3 6.75 2.25" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 14.7c-2.55.05-5.8-1.65-6.15-4.55-.3-2.45 1.55-4.6 4.2-4.85.7-2.25 2.75-3.7 5.1-3.25 2.3.45 3.7 2.45 3.35 4.7 2.3.85 3.55 3.25 2.65 5.5-.95 2.35-3.6 3.35-6.05 2.45-.85 1.2-1.8 1.8-3.1 1.8s-2.3-.6-3.1-1.8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.2 7.9c1.35-1.25 3.7-1.35 5.2-.15 1.7 1.35 1.75 3.85.1 5.25-1.45 1.25-3.75 1.15-5.1-.2-1.3-1.3-1.4-3.65-.2-4.9Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
    </svg>
  );
}

export function RoseAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(1);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (isMobile) document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
      if (isMobile) document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  const addMessage = (role: ChatMessage["role"], content: string) => {
    const id = nextIdRef.current++;
    setMessages((current) => [...current, { id, role, content }]);
  };

  const showQuickReply = (label: string, answer: string) => {
    trackGrowthEvent("concierge_message_sent", { mode: "quick_reply" });
    addMessage("user", label);
    addMessage("assistant", answer);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = message.trim();
    if (!question || loading) return;

    trackGrowthEvent("concierge_message_sent", { mode: "typed" });
    addMessage("user", question);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/rose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: messages.slice(-8).map((item) => ({
            role: item.role,
            content: item.content,
          })),
        }),
      });

      const data = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok) {
        addMessage("assistant", data.error ?? "I couldn’t answer that just now. Please try again.");
        return;
      }

      addMessage("assistant", data.answer ?? roseKnowledge.boundaries.unknownAnswer);
    } catch {
      addMessage("assistant", "I couldn’t reach my knowledge service just now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAssistant = () => {
    if (!open) trackGrowthEvent("concierge_open", { placement: "floating" });
    setOpen((value) => !value);
  };

  return (
    <div className="fixed inset-x-3 bottom-[4.35rem] z-[70] flex justify-end sm:inset-x-auto sm:bottom-5 sm:left-auto sm:right-5">
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close Rose assistant"
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 bg-[#24302c]/18 backdrop-blur-[2px] sm:hidden"
          />
          <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="rose-title"
          className="fixed inset-x-2 bottom-2 flex h-[min(34rem,82svh)] flex-col overflow-hidden rounded-[1.5rem] border border-[#24302c]/10 bg-[#fff9f2]/98 text-[#24302c] shadow-[0_24px_70px_rgba(55,45,35,.18)] backdrop-blur-2xl sm:static sm:mb-3 sm:h-[min(31rem,72svh)] sm:w-[22rem]"
        >
          <div className="flex items-center justify-between border-b border-[#24302c]/10 bg-[#f5ede2] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7a5a55] text-white">
                <RoseMark />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 id="rose-title" className="font-display text-xl font-medium text-[#28342f]">
                    {roseKnowledge.assistant.name}
                  </h2>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3d8b6d]" />
                </div>
                <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[.19em] text-[#788079]">
                  {roseKnowledge.assistant.ownerName}’s personal assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={"Close " + roseKnowledge.assistant.name + " assistant"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#24302c]/10 bg-white/50 text-lg text-[#68716b] transition hover:bg-white"
            >
              ×
            </button>
          </div>

          <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto px-4 py-4">
            <div className="max-w-[91%] rounded-[1.1rem] rounded-tl-md bg-[#f1e9de] px-3.5 py-3">
              <p className="font-display text-base text-[#35423d]">{roseKnowledge.assistant.greeting}</p>
              <p className="mt-1 text-[11px] leading-5 text-[#69716c]">{roseKnowledge.assistant.intro}</p>
            </div>

            {messages.map((item) =>
              item.role === "user" ? (
                <div key={item.id} className="ml-auto mt-2.5 max-w-[86%] rounded-[1.05rem] rounded-tr-md bg-[#2b3833] px-3.5 py-2.5 text-white">
                  <p className="text-[11px] leading-5">{item.content}</p>
                </div>
              ) : (
                <div key={item.id} className="mt-2.5 max-w-[91%] rounded-[1.05rem] rounded-tl-md bg-[#f1e9de] px-3.5 py-2.5">
                  <p className="text-[11px] leading-5 text-[#59625d]">{item.content}</p>
                </div>
              ),
            )}

            {loading ? (
              <div className="mt-2.5 w-fit rounded-full bg-[#f1e9de] px-4 py-2">
                <p className="text-[10px] tracking-[.18em] text-[#7a827c]">•••</p>
              </div>
            ) : null}

            {messages.length === 0 ? (
              <>
                <p className="mb-2 mt-4 text-[7px] font-bold uppercase tracking-[.19em] text-[#858b86]">
                  Quick questions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {roseKnowledge.quickQuestions.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => showQuickReply(item.label, item.answer)}
                      className="rounded-full border border-[#24302c]/10 bg-[#fffdf9] px-3 py-1.5 text-[9px] font-medium text-[#65706a] transition hover:border-[#b69263]/45 hover:text-[#2b3833]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#24302c]/10 bg-[#fbf6ef] p-3">
            <div className="flex items-center gap-2 rounded-full border border-[#24302c]/10 bg-white px-3 py-1.5">
              <input
                ref={inputRef}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={roseKnowledge.assistant.inputPlaceholder}
                aria-label={"Ask " + roseKnowledge.assistant.name}
                className="min-w-0 flex-1 bg-transparent py-1.5 text-[11px] text-[#24302c] outline-none placeholder:text-[#969b96]"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={loading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7a5a55] text-white transition hover:bg-[#684b47] disabled:opacity-50"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                  <path d="m5 10 9-5-3 10-1.8-3.2L5 10Z" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
          </section>
        </>
      ) : null}

      <button
        type="button"
        onClick={toggleAssistant}
        aria-expanded={open}
        aria-controls="rose-title"
        className={(open ? "hidden sm:inline-flex " : "inline-flex ") + "h-11 items-center gap-2 rounded-full border border-white/45 bg-[#fff9f2]/92 px-3.5 text-[#5c4542] shadow-[0_10px_30px_rgba(55,45,35,.13)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#fffdf9]"}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7a5a55] text-white">
          <RoseMark />
        </span>
        <span className="font-display text-[15px] leading-none">Ask {roseKnowledge.assistant.name}</span>
      </button>
    </div>
  );
}
