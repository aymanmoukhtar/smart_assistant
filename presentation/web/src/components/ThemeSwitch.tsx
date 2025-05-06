import { Tooltip } from "@heroui/tooltip";
import { useEffect, useState } from "react";

import { Button } from "../uikit/Button";

import { useAppStore } from "@/domain/app.store";
import { AppIcon } from "@/uikit/AppIcon";

export const ThemeSwitch = () => {
  const [isMounted, setIsMounted] = useState(false);

  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.userActions.setTheme);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const onChange = () => setTheme(theme === "light" ? "dark" : "light");

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <>
      {theme === "light" ? (
        <Button isIconOnly variant="light" onPress={onChange}>
          <Tooltip content="Switch to dark mode" placement="left">
            <AppIcon icon="moon" size="2xl" />
          </Tooltip>
        </Button>
      ) : (
        <Button isIconOnly variant="light" onPress={onChange}>
          <Tooltip content="Switch to light mode" placement="left">
            <AppIcon icon="sun" size="2xl" />
          </Tooltip>
        </Button>
      )}
    </>
  );
};
