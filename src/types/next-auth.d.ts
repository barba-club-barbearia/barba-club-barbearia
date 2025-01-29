import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      barberId: string;
    } & DefaultSession["user"];
  }
}
