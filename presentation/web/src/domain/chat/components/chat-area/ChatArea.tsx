import type { TextAreaProps } from "@heroui/react";

import { Button, cn, Textarea } from "@heroui/react";
import React from "react";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { AppIcon } from "../../../../uikit/AppIcon";
import { Conversation, Message, Role } from "../../chat.types";

export type ChatAreaProps = {
  messages: Message[];
  streamingMessage: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  sendMessage: (message: string) => void;
  selectedConversation?: Conversation;
};

// eslint-disable-next-line react/display-name
export const PromptInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ classNames = {}, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        aria-label="Prompt"
        className="min-h-[40px]"
        classNames={{
          ...classNames,
          label: cn("hidden", classNames?.label),
          input: cn("py-0", classNames?.input),
        }}
        minRows={1}
        placeholder="Ask anything"
        radius="lg"
        variant="bordered"
        {...props}
      />
    );
  },
);

const markdownComponents: Components = {
  p: ({ className, ...props }) => (
    <p className={cn("text-pretty", className)} {...props} />
  ),
  code({ className, children, ...props }) {
    return (
      <code
        className={cn("overflow-auto p-2 rounded text-pretty", className)}
        {...props}
      >
        {children}
      </code>
    );
  },
};

export const ChatArea = ({
  messages,
  streamingMessage,
  messagesEndRef,
  sendMessage,
  selectedConversation,
}: ChatAreaProps) => {
  const [prompt, setPrompt] = React.useState<string>("");
  const isEmpty = messages.length === 0;

  const send = () => {
    sendMessage(prompt);
    setPrompt("");
  };

  return (
    <main className="flex-1 flex flex-col bg-content2 rounded-lg shadow">
      {/* Chat top bar */}
      <div className="flex-none px-4 py-3">
        <span className="font-bold text-2xl">Smart Assistant</span>
      </div>

      {isEmpty && !selectedConversation && (
        <div
          className={
            "flex flex-col items-center justify-center text-center mt-[20%]"
          }
        >
          <h2 className="text-2xl font-semibold mb-4">
            Ask anything to get started
          </h2>
          <div className="w-[60%]">
            <Textarea
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              fullWidth
              aria-label="Prompt"
              classNames={{
                innerWrapper: "relative",
                input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
              }}
              endContent={
                <div className="flex items-end gap-2 self-center">
                  <Button
                    isIconOnly
                    color={!prompt ? "default" : "primary"}
                    isDisabled={!prompt}
                    size="sm"
                    variant="solid"
                    onPress={() => send()}
                  >
                    <AppIcon icon="double-right-arrow" size="2xl" />
                  </Button>
                </div>
              }
              minRows={1}
              placeholder="Ask anything"
              radius="lg"
              value={prompt}
              variant="bordered"
              onKeyUp={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              onValueChange={setPrompt}
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex-1 overflow-y-auto w-full p-4",
          isEmpty
            ? "flex flex-col items-center justify-center text-center"
            : "space-y-4 flex flex-col",
        )}
      >
        <div className="w-[70%] self-center flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                msg.role === Role.USER ? "self-end bg-content4" : "self-start",
                "rounded-lg px-3 py-2 leading-relaxed text-pretty",
              )}
            >
              <Markdown
                components={markdownComponents}
                remarkPlugins={[remarkGfm]}
              >
                {msg.content}
              </Markdown>
            </div>
          ))}
          {streamingMessage && (
            <div
              className={cn(
                "self-start",
                "rounded-lg px-3 py-2 leading-relaxed text-pretty",
              )}
            >
              <Markdown
                components={markdownComponents}
                remarkPlugins={[remarkGfm]}
              >
                {streamingMessage}
              </Markdown>
            </div>
          )}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {(!isEmpty || !!selectedConversation) && (
        <div className="flex-none p-4">
          <Textarea
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            fullWidth
            aria-label="Prompt"
            classNames={{
              innerWrapper: "relative",
              input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
            }}
            endContent={
              <div className="flex items-end gap-2">
                <Button
                  isIconOnly
                  color={!prompt ? "default" : "primary"}
                  isDisabled={!prompt}
                  size="sm"
                  variant="solid"
                  onPress={() => send()}
                >
                  <AppIcon icon="double-right-arrow" size="2xl" />
                </Button>
              </div>
            }
            minRows={1}
            placeholder="Ask anything"
            radius="lg"
            value={prompt}
            variant="bordered"
            onKeyUp={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            onValueChange={setPrompt}
          />
        </div>
      )}
    </main>
  );
};
