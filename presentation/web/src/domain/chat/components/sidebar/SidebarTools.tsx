
import { AppIcon } from "@/uikit/AppIcon";
import { Tooltip } from "@/uikit/Tooltip";
import { ThemeSwitch } from "../../../../components/ThemeSwitch";

export const SidebarTools = () => (
  <div className="flex justify-between p-4">
    <div>
      <span className="font-bold text-2xl">Chat</span>
    </div>
    <div className="flex gap-2 items-center">
      <ThemeSwitch />
      <Tooltip content="Start a new chat" placement="right">
        <AppIcon icon="notepad-edit" size="2xl" />
      </Tooltip>
    </div>
  </div>
);
