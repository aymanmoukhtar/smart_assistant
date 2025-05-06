import { ThemeSwitch } from "../../../../components/ThemeSwitch";
import { Button } from "../../../../uikit/Button";

import { AppIcon } from "@/uikit/AppIcon";
import { Tooltip } from "@/uikit/Tooltip";

export type SidebarToolsProps = {
  onStartNewChatClick: () => void;
};

export const SidebarTools = ({ onStartNewChatClick }: SidebarToolsProps) => (
  <div className="flex justify-between p-4">
    <div>
      <span className="font-bold text-2xl">Chat</span>
    </div>
    <div>
      <ThemeSwitch />
      <Button isIconOnly variant="light" onPress={onStartNewChatClick}>
        <Tooltip content="Start a new chat" placement="right">
          <AppIcon icon="notepad-edit" size="2xl" />
        </Tooltip>
      </Button>
    </div>
  </div>
);
