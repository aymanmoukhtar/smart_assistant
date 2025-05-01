import type { TextAreaProps } from "@heroui/react";

import { Button, cn, Textarea } from "@heroui/react";
import React from "react";
import Markdown from "react-markdown";

import { AppIcon } from "../../../../uikit/AppIcon";
import { Message, Role } from "../../chat.types";

export type ChatAreaProps = {
  messages: Message[];
  streamingMessage: string;
  sendMessage: (message: string) => void;
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

export const ChatArea = ({
  messages,
  streamingMessage,
  sendMessage,
}: ChatAreaProps) => {
  const [prompt, setPrompt] = React.useState<string>("");
  const isEmpty = messages.length === 0;

  const send = () => {
    sendMessage(prompt);
    setPrompt("");
  };

  return (
    <main className="flex-1 flex flex-col bg-content1 rounded-lg shadow">
      {/* Chat top bar */}
      <div className="flex-none px-4 py-3">
        <span className="font-bold text-2xl">Smart Assistant</span>
      </div>

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 overflow-y-auto w-full p-4",
          isEmpty
            ? "flex flex-col items-center justify-center text-center"
            : "space-y-4 flex flex-col",
        )}
      >
        {isEmpty ? (
          <>
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
          </>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  msg.role === Role.USER
                    ? "self-end bg-default-200"
                    : "self-start",
                  "rounded-lg px-3 py-2",
                )}
              >
                <Markdown>{msg.content}</Markdown>
              </div>
            ))}
            {streamingMessage && (
              <div className={cn("self-start", "rounded-lg px-3 py-2")}>
                <Markdown>{streamingMessage}</Markdown>
              </div>
            )}
          </>
        )}
      </div>

      {!isEmpty && (
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
