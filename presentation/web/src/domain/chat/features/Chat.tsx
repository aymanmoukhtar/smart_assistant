import { ChatSideBar } from "../components/sidebar/ChatSidebar";

const ChatLayout = () => {
  return (
    <div className="flex h-dvh">
      <ChatSideBar />
      <div className="flex-1 bg-black overflow-y-auto">Chat Area</div>
    </div>
  );
};

export default ChatLayout;
