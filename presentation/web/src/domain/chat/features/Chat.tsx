import { useEffect } from "react";

import { useShallowAppStore } from "../../app.store";
import { useChatActions } from "../chat.store";
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
  const { getConversations, getMessages } = useChatActions();

  useEffect(() => {
    if (conversations) {
      return;
    }

    getConversations();
  }, []);

  useEffect(() => {
    if (!selectedConversation) {
      return;
    }

    getMessages(selectedConversation.id);
  }, [selectedConversation]);

  if (!conversations) {
    return;
  }

  return (
    <div className="h-screen p-2 flex gap-2 bg-default-200">
      <ChatSideBar conversations={conversations} />
      <ChatArea messages={messages || []} />
    </div>
  );
};

export default Chat;
