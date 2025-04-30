import type { TextAreaProps } from "@heroui/react";

import { Button, cn, Textarea, Tooltip } from "@heroui/react";
import React from "react";

// eslint-disable-next-line react/display-name
const PromptInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
    <div className="flex-1 flex flex-col h-dvh overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Render messages here */}
        <div className="space-y-4">
          <div className="bg-default-100 p-3 rounded">Message 1</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
          <div className="bg-default-100 p-3 rounded">Message 2</div>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col gap-4 ">
          <form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70">
            <PromptInput
              classNames={{
                inputWrapper: "!bg-transparent shadow-none",
                innerWrapper: "relative",
                input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
              }}
              endContent={
                <div className="flex items-end gap-2">
                  <Tooltip showArrow content="Send message">
                    <Button
                      isIconOnly
                      color={!prompt ? "default" : "primary"}
                      isDisabled={!prompt}
                      radius="lg"
                      size="sm"
                      variant="solid"
                    >
                      ICON HERE
                    </Button>
                  </Tooltip>
                </div>
              }
              minRows={3}
              radius="lg"
              value={prompt}
              variant="flat"
              onValueChange={setPrompt}
            />
            <div className="flex w-full items-center justify-between  gap-2 overflow-auto px-4 pb-4">
              <div className="flex w-full gap-1 md:gap-3">
                <Button size="sm" startContent={<div>ICON</div>} variant="flat">
                  Attach
                </Button>
                <Button size="sm" startContent={<div>ICON</div>} variant="flat">
                  Voice Commands
                </Button>
                <Button size="sm" startContent={<div>ICON</div>} variant="flat">
                  Templates
                </Button>
              </div>
              <p className="py-1 text-tiny text-default-400">
                {prompt.length}/2000
              </p>
            </div>
          </form>
        </div>
        <p className="px-2 text-tiny text-default-400">
          Acme AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};
