import React from "react";

import QueueSection from "@/components/QueueSection";
import { getQueue } from "@/services/api";

export default async function BarbershopQueue() {
  const queue = await getQueue();
  console.log("@@@@ QUEUE", queue);
  return (
    <div>
      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <QueueSection initialQueue={queue} />
      </div>
    </div>
  );
}
