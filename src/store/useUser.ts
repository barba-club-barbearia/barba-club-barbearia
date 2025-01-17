import { create } from "zustand";

import { User } from "@/types/user";

type State = {
  user: User | null;
  subscription: PushSubscription | null;
};

type Action = {
  setUser: (user: User) => void;
  setSubscription: (subscription: PushSubscription) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  subscription: null,
  user: null,
  setUser: (user) => set({ user }),
  setSubscription: (subscription) => set({ subscription }),
}));
