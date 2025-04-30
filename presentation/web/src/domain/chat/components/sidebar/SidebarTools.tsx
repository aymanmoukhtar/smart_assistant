import { Tooltip } from "@heroui/tooltip";
import { SquarePenIcon } from "lucide-react";

import { ThemeSwitch } from "../../../../components/ThemeSwitch";

export const SidebarTools = () => (
  <div className="flex justify-between p-4">
    <div>
      <span className="font-bold text-2xl">Chat</span>
    </div>
    <div className="flex gap-2 items-center">
      <ThemeSwitch />
      <Tooltip content="Start a new chat" placement="right">
        <SquarePenIcon />
      </Tooltip>
    </div>
  </div>
);
