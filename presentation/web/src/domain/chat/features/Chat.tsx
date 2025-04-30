import { ChatArea } from "../components/chat-area/ChatArea";
import { ChatSideBar } from "../components/sidebar/ChatSidebar";

const ChatLayout = () => {
  return (
    <div className="flex h-dvh overflow-hidden">
      <div className="w-64 min-w-[20rem] h-dvh">
        <ChatSideBar />
      </div>
      <div className="w-full">
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatLayout;
