import { MessageSquarePlusIcon } from "lucide-react";

export const ConversationsListEmptyState = () => (
  <div className="flex flex-col gap-2 items-center mt-[120%]">
    <MessageSquarePlusIcon size={36} />
    <div className="font-bold text-xl">No conversations yet</div>
    <span>Start a new chat to begin</span>
  </div>
);
