// ChatBox.tsx

"use client";

import { useEffect, useRef } from "react";
import Message from "./Message";
import { ScrollArea } from "./ui/scroll-area";

// Ekspor tipe ini agar bisa diimpor oleh page.tsx
export type ChatMsg = { sender: "user" | "aska"; text: string };

interface ChatBoxProps {
  messages: ChatMsg[];
  loading: boolean;
}

export default function ChatBox({ messages, loading }: ChatBoxProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // HAPUS SEMUA STATE (useState)
  // HAPUS SEMUA FUNGSI (sendMessage, onKeyDown)

  return (
    // HAPUS SEMUA CLASS LAYOUT (h-calc, border, bg, dll)
    // Komponen ini tidak lagi mengatur layout, hanya menampilkan isi.
    <ScrollArea className="h-full w-full">
      {messages.map((msg, idx) => (
        <Message key={idx} sender={msg.sender} text={msg.text} />
      ))}
      {loading && (
        <div className="text-purple-400 text-sm italic mt-2 ml-2">
          ASKA lagi mikir... 🤔✨
        </div>
      )}
      <div ref={endRef} />

      {/* HAPUS SEMUA BAGIAN INPUT FORM DARI SINI */}
    </ScrollArea>
  );
}