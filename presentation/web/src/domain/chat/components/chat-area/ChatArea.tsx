import type { TextAreaProps } from "@heroui/react";

import { Button, cn, Textarea } from "@heroui/react";
import React from "react";

import { AppIcon } from "../../../../uikit/AppIcon";
import { Message } from "../../chat.types";

export type ChatAreaProps = {
  messages: Message[];
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

export const ChatArea = ({ messages }: ChatAreaProps) => {
  const [prompt, setPrompt] = React.useState<string>("");

  const isEmpty = messages.length === 0;

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
            <div className="w-full max-w-xl">
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
                    setPrompt("");
                  }
                }}
                onValueChange={setPrompt}
              />
            </div>
          </>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                msg.role === "user"
                  ? "self-end bg-default-200"
                  : "self-start bg-default-100",
                "rounded-lg px-3 py-2 max-w-xs",
              )}
            >
              {msg.content}
            </div>
          ))
        )}
      </div>

      {/* Prompt area (only when messages exist) */}
      {!isEmpty && (
        <div className="flex-none p-4">
          <form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70">
            <PromptInput
              classNames={{
                inputWrapper: "!bg-transparent shadow-none",
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
                  >
                    <AppIcon icon="double-right-arrow" size="2xl" />
                  </Button>
                </div>
              }
              radius="lg"
              value={prompt}
              variant="flat"
              onKeyUp={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  setPrompt("");
                }
              }}
              onValueChange={setPrompt}
            />
          </form>
        </div>
      )}
    </main>
  );
};
