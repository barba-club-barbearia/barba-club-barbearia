import { getServerSession } from "next-auth";

import QueueSection from "@/components/QueueSection";
import { authOptions } from "@/settings/authOptions";

import { FallbackWithoutBarber } from "./FallbackWithoutBarber";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user.barberId) {
    return <FallbackWithoutBarber />;
  }

  return <QueueSection user={session.user} />;
}
