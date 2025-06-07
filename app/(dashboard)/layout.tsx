import { DashboardNavbar } from "@/components/dashboard/layout/DashboardNavbar";
import { Sidebar } from "@/components/dashboard/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar di atas */}
      <DashboardNavbar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar di kiri */}
        <Sidebar />

        {/* Konten utama di kanan */}
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}