import BarberSelection from "@/components/BarberSection";
import { getBarbers } from "@/services/api";

export default async function Barbeiros() {
  const barbers = await getBarbers();
  return <BarberSelection barbers={barbers} />;
}
