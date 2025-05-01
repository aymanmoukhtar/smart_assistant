import { StateSlice, useAppStore } from "../app.store";

import { chatApi } from "./chat.api";
import { Conversation, Message } from "./chat.types";

export type ChatState = {
  conversations?: Conversation[];
  messages?: Message[];
  selectedConversation?: Conversation;
  chatActions: {
    setSelectedConversation: (conversation: Conversation) => void;
    getConversations: () => Promise<void>;
    getMessages: (conversationId: string) => Promise<void>;
  };
};

export const createChatStore: StateSlice<ChatState> = (set, get) => ({
  conversations: undefined,
  messages: undefined,
  selectedConversation: undefined,
  chatActions: {
    setSelectedConversation: (conversation: Conversation) =>
      set({ selectedConversation: conversation }),
    getConversations: async () => {
      set({ conversations: await chatApi.getConversations() });
    },
    getMessages: async (conversationId: string) => {
      set({ messages: undefined });
      set({ messages: await chatApi.getMessages(conversationId) });
    },
  },
});

export const useChatActions = () => useAppStore((state) => state.chatActions);
