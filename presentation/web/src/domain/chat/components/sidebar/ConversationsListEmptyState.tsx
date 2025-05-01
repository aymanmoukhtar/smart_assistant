import { AppIcon } from "@/uikit/AppIcon";

export const ConversationsListEmptyState = () => (
  <div className="flex flex-col gap-2 items-center mt-[90%]">
    <AppIcon icon="message-add" size="3xl" style="outline" />
    <div className="font-bold text-xl">No conversations yet</div>
    <span>Start a new chat to begin</span>
  </div>
);
