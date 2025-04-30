import type { TextAreaProps } from "@heroui/react";

import { Button, cn, Textarea } from "@heroui/react";
import { SendIcon } from 'lucide-react';
import React from "react";

// eslint-disable-next-line react/display-name
export const PromptInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ classNames = {}, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        aria-label="Prompt"
        className="min-h-[40px]"
        classNames={{
          ...classNames,
          label: cn("hidden", classNames?.label),
          input: cn("py-0", classNames?.input),
        }}
        minRows={1}
        placeholder="Enter a prompt here"
        radius="lg"
        variant="bordered"
        {...props}
      />
    );
  },
);

export const ChatArea = () => {
  const [prompt, setPrompt] = React.useState<string>("");

  return (
    <main className="flex-1 flex flex-col bg-background rounded-lg shadow">
      {/* Chat top bar */}
      <div className="flex-none px-4 py-3">
        <span className="font-bold text-2xl">Smart Assistant</span>
      </div>
      {/* Messages  */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full flex flex-col">
        <div className="self-end bg-default-200 rounded-lg px-3 py-2 max-w-xs">Hello!</div>
        <div className="self-start rounded-lg px-3 py-2">Hi there! this is me responding to your shitHi there! this is me responding to your shit</div>
      </div>
      {/* Prompt area  */}
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
                  <SendIcon />
                </Button>
              </div>
            }
            value={prompt}
            onValueChange={setPrompt}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                console.log(prompt);
                setPrompt("");
              }
            }}
            radius="lg"
            variant="flat"
          />
        </form>
      </div>
    </main>
  );
};
