import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { User } from "@/types/user";

type State = {
  user: User | null;
  subscription: PushSubscription | null;
};

type Action = {
  setUser: (user: User) => void;
  setSubscription: (subscription: PushSubscription | null) => void;
  setPreferenceBarber: (preferenceBarber: string) => void;
};

export const useUserStore = create<State & Action>()(
  devtools((set) => ({
    subscription: null,
    user: null,
    setUser: (user) => set({ user }, false, "setUser"),
    setPreferenceBarber: (barberId) =>
      set(
        (state) => ({
          user: state.user ? { ...state.user, barberId } : null,
        }),
        false,
        "setPreferenceBarber"
      ),
    setSubscription: (subscription) =>
      set({ subscription }, false, "setSubscription"),
  }))
);
