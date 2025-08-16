import { getServerSession } from "next-auth";

import QueueSection from "@/components/QueueSection";
import { authOptions } from "@/settings/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  return <QueueSection user={session.user} />;
}
