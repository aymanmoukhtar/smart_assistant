import { StateSlice, useAppStore } from "../app.store";

import { chatApi } from "./chat.api";
import {
  Conversation,
  Message,
  MessageEvent,
  SendMessageRequest,
} from "./chat.types";

export type ChatState = {
  conversations?: Conversation[];
  messages?: Message[];
  selectedConversation?: Conversation;
  chatActions: {
    setSelectedConversation: (conversation?: Conversation) => void;
    getConversations: () => Promise<void>;
    setConversations: (conversations: Conversation[]) => void;
    getMessages: (conversationId: string) => Promise<void>;
    setMessages: (
      setter: (current?: Message[]) => Message[] | undefined,
    ) => void;
    sendMessage: (
      message: SendMessageRequest,
      onEvent: (event: MessageEvent) => void,
    ) => Promise<void>;
  };
};

export const createChatStore: StateSlice<ChatState> = (set, get) => ({
  conversations: undefined,
  messages: undefined,
  selectedConversation: undefined,
  chatActions: {
    setSelectedConversation: (conversation?: Conversation) =>
      set({ selectedConversation: conversation }),
    setConversations: (conversations: Conversation[]) => set({ conversations }),
    getConversations: async () => {
      set({ conversations: await chatApi.getConversations() });
    },
    getMessages: async (conversationId: string) => {
      set({ messages: undefined });
      set({ messages: await chatApi.getMessages(conversationId) });
    },
    setMessages: (setter: (current?: Message[]) => Message[] | undefined) => {
      set((state) => ({ messages: setter(state.messages) }));
    },
    sendMessage: async (
      message: SendMessageRequest,
      onEvent: (event: MessageEvent) => void,
    ) => {
      await chatApi.sendMessage(message, onEvent);
    },
  },
});

export const useChatActions = () => useAppStore((state) => state.chatActions);
