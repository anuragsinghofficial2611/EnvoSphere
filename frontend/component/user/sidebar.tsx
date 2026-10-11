"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  LayoutDashboard,
  Calculator,
  GitCompareArrows,
  Settings,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    label: "Dashboard",
    href: "/user/",
    icon: LayoutDashboard,
  },
  {
    label: "Calculator",
    href: "/user/calculator",
    icon: Calculator,
  },
  {
    label: "Calculations",
    href: "/user/calculations",
    icon: GitCompareArrows,
  },
  {
    label: "Comparisons",
    href: "/user/comparisons",
    icon: GitCompareArrows,
  },
];

const accountNavigation = [
  {
    label: "Settings",
    href: "/profile/settings",
    icon: Settings,
  },
  {
    label: "Profile",
    href: "/profile/account",
    icon: UserRound,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/profile") {
      return pathname === "/profile";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderNavigation = (
    items: typeof navigation
  ) =>
    items.map(({ label, href, icon: Icon }) => {
      const active = isActive(href);

      return (
        <Link
          key={href}
          href={href}
          onClick={() => setMobileOpen(false)}
          aria-current={active ? "page" : undefined}
          className={`flex items-center gap-4 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors duration-200 ${
            active
              ? "bg-[#EAF8F2] text-[#16785E]"
              : "text-slate-600 hover:bg-slate-50 hover:text-[#16785E]"
          }`}
        >
          <Icon size={19} strokeWidth={2} />
          <span>{label}</span>
        </Link>
      );
    });

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={mobileOpen}
        className="fixed left-4 top-4 z-50 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-slate-100 bg-white px-5 py-7 transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <Link
          href="/profile"
          className="mb-9 flex items-center gap-3 px-3"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF8F2] text-[#16785E]">
            <Leaf size={22} strokeWidth={2.2} />
          </span>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            EnvoSphere
          </span>
        </Link>

        {/* Main navigation */}
        <nav aria-label="Main navigation" className="flex flex-col gap-1.5">
          {renderNavigation(navigation)}
        </nav>

        {/* Account navigation */}
        <div className="my-6 border-t border-slate-100" />

        <nav
          aria-label="Account navigation"
          className="flex flex-col gap-1.5"
        >
          {renderNavigation(accountNavigation)}
        </nav>

        {/* Bottom tagline */}
        <div className="mt-auto pt-8">
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-[#FAFCFB] p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#16785E]">
              <Leaf size={21} />
            </span>

            <p className="text-xs leading-relaxed text-slate-500">
              Smaller footprint.
              <br />
              Bigger tomorrow.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}