import { SidebarDemo } from "@/components/dashboard/SidebarDemo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <SidebarDemo>{children}</SidebarDemo>
    </div>
  );
}
