import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";

import { ConversationsList } from "./ConversationsList";
import { SidebarTools } from "./SidebarTools";

export const ChatSideBar = () => {
  return (
    <Drawer
      disableAnimation
      hideCloseButton
      backdrop="transparent"
      className="rounded-none "
      isOpen={true}
      placement="left"
      size="xs"
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              <SidebarTools />
            </DrawerHeader>
            <DrawerBody>
              <ConversationsList />
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
