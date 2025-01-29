import { getServerSession } from "next-auth";

import { getBarberQueueById } from "@/services/api";

import QueueSection from "@/components/QueueSection";
import { authOptions } from "@/settings/authOptions";
import { FallbackWithoutBarber } from "./FallbackWithoutBarber";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user.barberId) {
    return <FallbackWithoutBarber />;
  }

  const queue = await getBarberQueueById({ barberId: session?.user.barberId });

  return (
    <QueueSection initialQueue={queue} barberId={session?.user.barberId} />
  );
}
