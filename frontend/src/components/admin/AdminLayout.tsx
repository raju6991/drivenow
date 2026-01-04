import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  LogOut,
} from "lucide-react";
import { Link, useLocation, Outlet } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,

} from "@/components/ui/sidebar";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Cars", href: "/admin/cars", icon: Car },
  { name: "Rentals", href: "/admin/rentals", icon: Calendar },
  { name: "Reports", href: "/admin/reports", icon: Users },
];

function AdminSidebarContent() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Logo */}
      <SidebarHeader className="bg-slate-800 border-b border-slate-700">
        <div className="flex items-center p-4">
          <div className="bg-amber-500 p-2 rounded-lg shrink-0">
            <Car className="h-5 w-5 text-slate-900" />
          </div>
          <span className="ml-3 text-lg font-bold text-white sidebar-text transition-opacity duration-200">
            DriveNow
          </span>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="bg-slate-900 flex-1">
        <SidebarMenu className="px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.name}
                  className={`
                    w-full transition-all duration-200
                    ${
                      isActive
                        ? "bg-amber-500 text-slate-900 shadow-sm hover:bg-amber-600"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <Link to={item.href}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="sidebar-text transition-opacity duration-200">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* User info and logout */}
      <SidebarFooter className="border-t border-slate-700 bg-slate-900">
        <div className="p-4">
          <div className="mb-3 px-1 sidebar-text transition-opacity duration-200">
            <p className="text-sm font-medium text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
          <SidebarMenuButton
            onClick={handleLogout}
            className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
            tooltip="Logout"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="sidebar-text transition-opacity duration-200">Logout</span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </>
  );
}

export default function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
        <Sidebar 
          collapsible="icon" 
          className="border-r border-slate-200 bg-slate-900 text-white sidebar-custom"
          variant="sidebar"
        >
          <AdminSidebarContent />
        </Sidebar>
        <SidebarInset className="flex-1 bg-slate-50">
          {/* Top bar */}
          <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center shrink-0">
            <SidebarTrigger className="ml-4 text-slate-600 hover:bg-slate-100" />
            
            <div className="flex-1 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-full">
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">
                    {navigation.find((item) => location.pathname === item.href)
                      ?.name || "Admin Dashboard"}
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-600">{user?.name}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page content - Full width */}
          <main className="flex-1 overflow-auto bg-slate-50 admin-full-width">
            <div className="admin-full-width min-h-full p-6">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
