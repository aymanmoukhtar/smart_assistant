import { Conversation } from "../../chat.types";

import { ConversationsList } from "./ConversationsList";
import { ConversationsListEmptyState } from "./ConversationsListEmptyState";
import { SidebarTools } from "./SidebarTools";

export type ChatSideBarProps = {
  conversations: Conversation[];
  selectedConversation?: Conversation;
  onStartNewChatClick: () => void;
  setSelectedConversation: (conversation?: Conversation) => void;
};

export const ChatSideBar = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
  onStartNewChatClick,
}: ChatSideBarProps) => {
  return (
    <aside className="w-[20rem] flex flex-col bg-background rounded-lg shadow">
      <div className="flex-none px-4">
        <SidebarTools onStartNewChatClick={onStartNewChatClick} />
      </div>
      {conversations.length === 0 && <ConversationsListEmptyState />}
      {conversations.length !== 0 && (
        <ConversationsList
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      )}
    </aside>
  );
};
