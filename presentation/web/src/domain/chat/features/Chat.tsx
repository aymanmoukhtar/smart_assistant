

import { ChatArea } from "../components/chat-area/ChatArea";
import { ChatSideBar } from "../components/sidebar/ChatSidebar";

const Chat = () => {
  return (
    <div className="h-screen p-2 flex gap-2 bg-default-200">
      <ChatSideBar />
      <ChatArea />
    </div>
  );
};

export default Chat;
