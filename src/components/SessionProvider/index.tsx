"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const SessionProviderComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
