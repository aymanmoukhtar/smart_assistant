import clsx from "clsx";

import { Conversation } from "../../chat.types";

export type ConversationsListProps = {
  conversations: Conversation[];
};

export const ConversationsList = ({
  conversations,
}: ConversationsListProps) => (
  <div className="flex-1 overflow-y-auto p-4 space-y-2">
    {conversations.map((conversation) => (
      <div
        key={conversation.id}
        className={clsx(
          "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
          {
            "bg-primary-50 !border-primary": false,
          },
        )}
      >
        <div className="flex justify-between">
          <div className="flex flex-col w-full">
            <span className={clsx("text-2sm w-full truncate")}>
              {conversation.title}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);
