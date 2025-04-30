import { ChatArea } from "../components/chat-area/ChatArea";
import { ChatSideBar } from "../components/sidebar/ChatSidebar";

const ChatLayout = () => {
  return (
    <div className="flex h-dvh">
      <ChatSideBar />
      <div className="flex-1 overflow-y-auto">
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatLayout;
