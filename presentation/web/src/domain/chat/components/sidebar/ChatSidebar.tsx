import { Conversation } from "../../chat.types";

import { ConversationsList } from "./ConversationsList";
import { ConversationsListEmptyState } from "./ConversationsListEmptyState";
import { SidebarTools } from "./SidebarTools";

export type ChatSideBarProps = {
  conversations: Conversation[];
};

export const ChatSideBar = ({ conversations }: ChatSideBarProps) => {
  return (
    <aside className="w-[20rem] flex flex-col bg-background rounded-lg shadow">
      <div className="flex-none px-4">
        <SidebarTools />
      </div>
      {conversations.length === 0 && <ConversationsListEmptyState />}
      {conversations.length !== 0 && (
        <ConversationsList conversations={conversations} />
      )}
    </aside>
  );
};
