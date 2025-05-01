import { ConversationsList } from "./ConversationsList";
import { SidebarTools } from "./SidebarTools";

export const ChatSideBar = () => {
  return (
    <aside className="w-[20rem] flex flex-col bg-background rounded-lg shadow">
      <div className="flex-none px-4">
        <SidebarTools />
      </div>
      <ConversationsList />
    </aside>
  );
};
