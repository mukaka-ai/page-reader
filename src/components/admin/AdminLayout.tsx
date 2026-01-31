import { ReactNode } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  GraduationCap, 
  MessageSquare,
  LogOut,
  Shield,
  Menu,
  UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Coaches", url: "/admin/coaches", icon: Users },
  { title: "Events", url: "/admin/events", icon: Calendar },
  { title: "Students", url: "/admin/students", icon: GraduationCap },
  { title: "Messages", url: "/admin/messages", icon: MessageSquare },
  { title: "Users", url: "/admin/users", icon: UserCog },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const currentPage = menuItems.find((item) => isActive(item.url))?.title || "Dashboard";

  return (
    <>
      <SEOHead 
        title={`${currentPage} - Admin`} 
        description="Nairobi Taekwondo Association Admin Dashboard"
      />
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-muted/30">
          <Sidebar className="border-r border-border/50 bg-card">
            <div className="p-4 border-b border-border/50">
              <Link to="/admin" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-bold text-foreground">Admin Panel</h1>
                  <p className="text-xs text-muted-foreground">Nairobi TKD</p>
                </div>
              </Link>
            </div>

            <SidebarContent className="p-2">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                  Management
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                              isActive(item.url)
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <div className="mt-auto p-4 border-t border-border/50">
              <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {user?.email?.charAt(0).toUpperCase() || "A"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.user_metadata?.full_name || "Admin"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </Sidebar>

          <main className="flex-1 flex flex-col min-h-screen">
            <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
              <SidebarTrigger className="mr-4">
                <Menu className="w-5 h-5" />
              </SidebarTrigger>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">
                  {currentPage}
                </h2>
              </div>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  View Site →
                </Button>
              </Link>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-6"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
