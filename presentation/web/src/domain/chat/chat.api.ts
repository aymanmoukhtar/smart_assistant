import { useAppStore } from "../app.store";
import { api } from "../common/axios";

import {
  Conversation,
  Message,
  MessageEvent,
  SendMessageRequest,
} from "./chat.types";

export const chatApi = {
  getConversations: async (): Promise<Conversation[]> =>
    await api
      .get<{ conversations: Conversation[] }>(`/chat/user-conversations`)
      .then((_) => _.data.conversations),

  getMessages: async (conversationId: string) =>
    await api
      .get<{
        messages: Message[];
      }>(`/chat/conversations/${conversationId}/messages`)
      .then((_) => _.data.messages),
  sendMessage: async (
    message: SendMessageRequest,
    onEvent: (event: MessageEvent) => void,
  ) => {
    const controller = new AbortController();
    const { accessToken } = useAppStore.getState();

    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/chat/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(message),
      signal: controller.signal,
    }).then(async (response) => {
      const reader = response.body?.getReader();

      if (!reader) {
        return;
      }

      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();

        done = streamDone;

        if (value) {
          const jsons = decoder
            .decode(value)
            .split("|||END|||")
            .filter((_) => !!_);

          jsons.forEach((json) => onEvent(JSON.parse(json)));
        }
      }
    });
  },
};
