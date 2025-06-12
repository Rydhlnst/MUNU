import { create } from "zustand";

export type Message = {
  from: "user" | "bot";
  text: string;
};

type ChatStore = {
  messages: Message[];
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  addMessage: (msg: Message) => void;
  resetMessages: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  setIsLoading: (val) => set({ isLoading: val }),
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  resetMessages: () => set({ messages: [] }),
}));
