import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Timer,
  LayoutGrid,
  Sparkles,
  Calendar,
  Brain,
  FileText,
  Award,
  BarChart3,
  Bell,
  Building2,
  User,
  Users,
  LogOut,
  Menu,
  Target,
  CalendarClock,
  Zap,
} from "lucide-react";
import InFineaLogo from "@/components/InFineaLogo";
import { API, authFetch, useAuth } from "@/App";

// ─── Lightweight poll for unread notification count ───
function useUnreadCount(intervalMs = 60000) {
  const [count, setCount] = useState(0);
  const location = useLocation();

  const fetch_ = useCallback(async () => {
    try {
      const res = await authFetch(`${API}/notifications/unread-count`);
      if (res.ok) {
        const data = await res.json();
        setCount(data.unread_count || 0);
      }
    } catch { /* silent */ }
  }, []);

  // Poll every intervalMs
  useEffect(() => {
    fetch_();
    const id = setInterval(fetch_, intervalMs);
    return () => clearInterval(id);
  }, [fetch_, intervalMs]);

  // Reset when user visits /notifications
  useEffect(() => {
    if (location.pathname === "/notifications") {
      // Small delay to let the page mark-read call go through
      const t = setTimeout(() => fetch_(), 2000);
      return () => clearTimeout(t);
    }
  }, [location.pathname, fetch_]);

  return count;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/my-day", label: "Ma Journée", icon: Zap },
  { to: "/micro-instants", label: "Micro-Instants", icon: Timer },
  { to: "/objectives", label: "Mes Objectifs", icon: Target },
  { to: "/routines", label: "Mes Habitudes", icon: CalendarClock },
  { to: "/actions", label: "Bibliothèque", icon: Sparkles },
  { to: "/integrations", label: "Intégrations", icon: Calendar },
  { to: "/journal", label: "Journal", icon: Brain },
  { to: "/notes", label: "Mes Notes", icon: FileText },
  { to: "/groups", label: "Groupes", icon: Users },
  { to: "/badges", label: "Badges", icon: Award },
  { to: "/progress", label: "Progression", icon: BarChart3 },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/b2b", label: "Entreprise", icon: Building2 },
  { to: "/profile", label: "Profil", icon: User },
];

function NavLinks({ mobile = false, onNavigate, unreadCount = 0 }) {
  const location = useLocation();

  return (
    <>
      {navItems.map(({ to, label, icon: Icon }, index) => {
        const isActive = location.pathname === to ||
          (to === "/dashboard" && location.pathname === "/");
        const isNotif = to === "/notifications";

        return (
          <Link
            key={to}
            to={to}
            className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl opacity-0 animate-fade-in transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#459492] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none ${
              isActive
                ? "active border-l-2 border-l-[#459492] bg-[#F0F7F7] text-[#275255] font-medium"
                : "text-[#667085] hover:text-[#275255] hover:bg-[#F0F7F7]"
            }`}
            style={{ animationDelay: `${index * 30}ms`, animationFillMode: "forwards" }}
            onClick={() => mobile && onNavigate?.()}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {isNotif && unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[#E48C75] text-white text-[9px] font-bold leading-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
            <span>{label}</span>
          </Link>
        );
      })}
    </>
  );
}

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const unreadCount = useUnreadCount();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col p-6 bg-white border-r border-[#E2E6EA] shadow-sm">
        <div className="mb-8">
          <InFineaLogo size={36} withText />
          <div className="h-px bg-gradient-to-r from-transparent via-[#459492]/20 to-transparent mb-4 mt-4" />
        </div>

        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
          <NavLinks unreadCount={unreadCount} />
        </nav>

        <div className="pt-4 border-t border-[#E2E6EA]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#667085] hover:text-[#275255] hover:bg-[#F0F7F7] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#459492] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none active:scale-[0.97]"
            data-testid="logout-btn"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E2E6EA] shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <InFineaLogo size={28} withText />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="mobile-menu-btn" className="relative text-[#667085] hover:text-[#275255] hover:bg-[#F0F7F7]">
                <Menu className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#E48C75] ring-2 ring-white" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white border-l border-[#E2E6EA] shadow-xl p-6">
              <nav className="flex flex-col gap-1 mt-8">
                <NavLinks mobile onNavigate={() => setMobileMenuOpen(false)} unreadCount={unreadCount} />
              </nav>
              <div className="mt-auto pt-4 border-t border-[#E2E6EA] absolute bottom-6 left-6 right-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#667085] hover:text-[#275255] hover:bg-[#F0F7F7] transition-all duration-200 active:scale-[0.97]"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
