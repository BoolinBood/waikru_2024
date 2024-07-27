import StatusInfo from "@/components/trays/StatusInfo";
import TrayForm from "@/components/trays/tray.form";
import TrayList from "@/components/trays/TrayList";

export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-200 space-y-2 p-6">
      <StatusInfo />
      <TrayForm />
      <TrayList />
    </div>
  );
}
