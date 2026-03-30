"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Scale, FileText, PlusCircle, LogOut, LayoutDashboard } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Pregled", icon: LayoutDashboard },
  { href: "/dashboard/blog", label: "Blog postovi", icon: FileText },
  { href: "/dashboard/blog/new", label: "Novi post", icon: PlusCircle },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("dashboard_auth");
    router.push("/dashboard/login");
  }

  return (
    <aside className="w-64 bg-primary-light border-r border-border min-h-screen p-4 flex flex-col">
      <Link href="/dashboard" className="flex items-center gap-3 mb-8 px-2">
        <Scale className="w-6 h-6 text-accent" />
        <div>
          <div className="text-sm font-semibold text-text-primary">Marić</div>
          <div className="text-[10px] text-text-dim uppercase tracking-wider">
            Dashboard
          </div>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm transition-colors ${
              pathname === href
                ? "bg-accent/10 text-accent"
                : "text-text-muted hover:text-text-primary hover:bg-surface"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border pt-4 mt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm text-text-muted hover:text-text-primary hover:bg-surface transition-colors mb-1"
        >
          Pogledaj sajt &rarr;
        </Link>
        <button
          onClick={handleLogout}
          className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Odjavi se
        </button>
      </div>
    </aside>
  );
}
