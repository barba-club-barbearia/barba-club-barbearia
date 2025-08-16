import { getServerSession } from "next-auth";
import { authOptions } from "@/settings/authOptions";
import SettingsPage from "@/components/SettingPage";
import { getBarberById } from "@/services/api";

export default async function Settings() {
  const session = await getServerSession(authOptions);

  let barberData = null;

  if (session?.user?.barberId) {
    barberData = await getBarberById(session.user.barberId);
  }

  return <SettingsPage session={session} barberData={barberData} />;
}
