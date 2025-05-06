import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useShallowAppStore } from "../../app.store";
import { useChatActions } from "../chat.store";
import {
  ChunkMessage,
  EndMessage,
  EventType,
  InitMessage,
  Message,
  MessageEvent,
  Role,
  SendMessageRequest,
} from "../chat.types";
import { ChatArea } from "../components/chat-area/ChatArea";
import { ChatSideBar } from "../components/sidebar/ChatSidebar";

const Chat = () => {
  const [conversations, messages, selectedConversation] = useShallowAppStore(
    (state) => [
      state.conversations,
      state.messages,
      state.selectedConversation,
    ],
  );
  const {
    getConversations,
    setConversations,
    setSelectedConversation,
    sendMessage,
    getMessages,
    setMessages,
  } = useChatActions();

  const [streamingMessage, setStreamingMessage] = useState("");

  const messagesEndRef = useRef<any>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll when messages change (conversation loaded) or when streaming
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  useEffect(() => {
    if (conversations) {
      return;
    }

    getConversations();
  }, []);

  const onEvent = useCallback(
    (event: MessageEvent) => {
      if (event.event === EventType.INIT) {
        const initEvent = event as InitMessage;

        if (selectedConversation) {
          return;
        }

        const newConversation = {
          id: initEvent.conversation_id,
          title: initEvent.title,
          created_at: new Date().toISOString(),
        };

        setConversations([newConversation, ...(conversations || [])]);
        setSelectedConversation(newConversation);

        return;
      }

      if (event.event === EventType.CHUNK) {
        const chunkEvent = event as ChunkMessage;

        setStreamingMessage((_) => _ + chunkEvent.chunk);

        return;
      }

      if (event.event === EventType.END) {
        const endEvent = event as EndMessage;

        setMessages((_) => [
          ...(_ || []),
          {
            id: endEvent.message_id,
            content: endEvent.full_message,
            role: Role.ASSISTANT,
            created_at: "",
          },
        ]);
        setStreamingMessage("");

        return;
      }
    },
    [conversations, selectedConversation],
  );

  const send = (message: string) => {
    const chatMessage: Message = {
      id: uuidv4(),
      content: message,
      role: Role.USER,
      created_at: new Date().toISOString(),
    };

    const payload: SendMessageRequest = {
      id: chatMessage.id,
      content: chatMessage.content,
      conversation_id: selectedConversation?.id || "",
    };

    setMessages((_) => [...(_ || []), chatMessage]);
    setTimeout(() => sendMessage(payload, onEvent));
  };

  if (!conversations) {
    return;
  }

  return (
    <div className="h-screen p-2 flex gap-2 bg-default-200">
      <ChatSideBar
        conversations={conversations}
        selectedConversation={selectedConversation}
        setSelectedConversation={(conversation) => {
          setSelectedConversation(conversation);
          if (conversation) {
            getMessages(conversation.id);
          }
        }}
        onStartNewChatClick={() => {
          setSelectedConversation(undefined);
          setMessages((_) => undefined);
        }}
      />
      <ChatArea
        messages={messages || []}
        messagesEndRef={messagesEndRef}
        selectedConversation={selectedConversation}
        sendMessage={send}
        streamingMessage={streamingMessage}
      />
    </div>
  );
};

export default Chat;
