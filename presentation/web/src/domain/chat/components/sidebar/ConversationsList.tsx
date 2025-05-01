import clsx from "clsx";

import { Conversation } from "../../chat.types";

export type ConversationsListProps = {
  conversations: Conversation[];
  selectedConversation?: Conversation;
  setSelectedConversation: (conversation?: Conversation) => void;
};

export const ConversationsList = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
}: ConversationsListProps) => (
  <div className="flex-1 overflow-y-auto p-4 space-y-2">
    {conversations.map((conversation) => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
      <div
        key={conversation.id}
        className={clsx(
          "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
          {
            "bg-primary-50 !border-primary":
              conversation.id === selectedConversation?.id,
          },
        )}
        role="button"
        onClick={() => setSelectedConversation(conversation)}
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
