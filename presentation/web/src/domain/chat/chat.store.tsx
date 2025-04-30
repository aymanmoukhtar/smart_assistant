import { StateSlice, useAppStore } from '../app.store';
import { Conversation, Message } from './chat.types';

export type ChatState = {
  conversations: Conversation[];
  messages: Message[];
  selectedConversation?: Conversation;
};

export const createChatStore: StateSlice<ChatState> = (set, get) => ({
  conversations: [],
  messages: [],
  selectedConversation: undefined,
});

export const useConversationActions = () => useAppStore(() => ({}));