import { Tooltip } from "@heroui/tooltip";
import { PanelLeftCloseIcon, SquarePenIcon } from "lucide-react";

import { ThemeSwitch } from "../../../../components/ThemeSwitch";


export const SidebarTools = () => (
  <div className="flex justify-between">
    <div>
      <Tooltip content="Close sidebar" placement="right">
        <PanelLeftCloseIcon />
      </Tooltip>
    </div>
    <div className="flex gap-2 items-center">
      <ThemeSwitch />
      <Tooltip content="Start a new chat" placement="right">
        <SquarePenIcon />
      </Tooltip>
    </div>
  </div>
);
