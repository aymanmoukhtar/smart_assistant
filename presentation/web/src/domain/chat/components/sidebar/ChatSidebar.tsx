import { ConversationsList } from "./ConversationsList";
import { SidebarTools } from "./SidebarTools";

export const ChatSideBar = () => {
  return (
    <div className="bg-default-100">
      <SidebarTools />
      <ConversationsList />
    </div>
  );
};
