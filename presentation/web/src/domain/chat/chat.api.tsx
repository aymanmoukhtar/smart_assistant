import { api } from "../common/axios";

import { Conversation, Message } from "./chat.types";

export const chatApi = {
  getConversations: async (): Promise<Conversation[]> =>
    await api
      .get<{ conversations: Conversation[] }>(`/chat/user-conversations`)
      .then((_) => _.data.conversations),

  getMessages: async (conversationId: string) =>
    await api
      .get<{
        messages: Message[];
      }>(`/chat/conversation/${conversationId}/messages`)
      .then((_) => _.data.messages),
};
