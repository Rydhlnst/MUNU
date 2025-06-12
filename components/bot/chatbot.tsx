"use client";

import { useEffect, useRef, useState } from "react";
import { Mountain, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TypingIndicator } from "./typingeffect";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  from: "user" | "bot";
  text: string;
};

const quickSnippets = [
  { short: "What is MUNU?", full: "What is MUNU and how does it work?" },
  { short: "Personal Finance", full: "What features does MUNU offer for personal finance management?" },
  { short: "Business Tools", full: "How can MUNU help small businesses manage their finances efficiently?" },
  { short: "Investments", full: "Does MUNU support investment tracking and financial simulation tools?" },
  { short: "Customization", full: "Can I customize MUNU features based on my user role?" },
  { short: "AI Assistant", full: "Is there an AI assistant in MUNU for smart financial guidance?" },
];

const chatVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAsk = async (question: string) => {
    if (!question || isLoading) return;

    setMessages((prev) => [...prev, { from: "user", text: question }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/bot", {
        method: "POST",
        body: JSON.stringify({
          question,
          language: "en",
        }),
      });

      const data = await res.json();
      const botResponse = data.result || "Sorry, I couldn't find an answer.";

      setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
    } catch {
      setMessages((prev) => [...prev, { from: "bot", text: "Oops! Assistant is currently unavailable." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(input);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-[999] w-[calc(100vw-48px)] max-w-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={chatVariants}
          >
            <div className="bg-card border rounded-2xl shadow-2xl flex flex-col h-[75vh] max-h-[650px] overflow-hidden">
              {/* Header */}
              <header className="p-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="flex items-center justify-center">
                    <Mountain className="text-primary" width={28} height={28} />
                  </Avatar>
                  <h3 className="font-semibold text-base">MUNU Assistant</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="w-5 h-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </header>

              {/* Chat Area */}
              <ScrollArea className="flex-1 px-4 py-3 overflow-y-auto">
                <div className="space-y-6">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 ${
                        msg.from === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.from === "bot" && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`text-sm px-4 py-2.5 rounded-xl max-w-[80%] whitespace-pre-wrap ${
                          msg.from === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                      {msg.from === "user" && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 items-center">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <TypingIndicator />
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              {/* Quick Snippets */}
              <div className="p-3 border-t overflow-x-auto">
                <div className="flex flex-wrap gap-2">
                  {quickSnippets.map((item, i) => (
                    <Button
                      key={i}
                      onClick={() => handleAsk(item.full)}
                      className="rounded-xl border border-primary text-primary text-sm font-medium px-4 py-2 bg-background hover:bg-muted transition"
                    >
                      {item.short}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <footer className="p-3 border-t">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    className="w-full pr-12 pl-4 py-2.5 border rounded-full bg-background focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    disabled={isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        aria-label="Toggle Assistant"
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full shadow-xl bg-primary text-white flex items-center justify-center"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {open ? <X className="w-6 h-6" /> : <Mountain className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
