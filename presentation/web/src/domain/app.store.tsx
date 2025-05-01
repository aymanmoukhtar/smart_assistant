import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import { ChatState, createChatStore } from "./chat/chat.store";
import { createUserStore, UserState } from "./users/user.store";

type PersistMiddleware<T> = ["zustand/persist", Partial<T>];

export type AppState = UserState & ChatState;

export type StateSlice<T> = StateCreator<
  AppState,
  [],
  [PersistMiddleware<T>],
  T
>;

export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createUserStore(...args),
      ...createChatStore(...args),
    }),
    {
      name: "smart-assistant-state",
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        isUserLoggedIn: state.isUserLoggedIn,
        accessToken: state.accessToken,
      }),
    },
  ),
);

export const useShallowAppStore = <U,>(selector: (state: AppState) => U) =>
  useAppStore(useShallow(selector));
