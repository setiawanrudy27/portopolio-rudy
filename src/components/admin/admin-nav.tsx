"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderKanban,
  FolderTree,
  LayoutDashboard,
  Mail,
  Settings,
  Share2,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  enabled: boolean;
};

export const adminNavItems: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    enabled: true,
  },
  { label: "Profil", href: "/admin/profile", icon: UserRound, enabled: false },
  { label: "Skills", href: "/admin/skills", icon: Sparkles, enabled: false },
  { label: "Tools", href: "/admin/tools", icon: Wrench, enabled: false },
  {
    label: "Kategori Proyek",
    href: "/admin/project-categories",
    icon: FolderTree,
    enabled: false,
  },
  {
    label: "Proyek",
    href: "/admin/projects",
    icon: FolderKanban,
    enabled: false,
  },
  {
    label: "Resume / CV",
    href: "/admin/resume",
    icon: FileText,
    enabled: false,
  },
  {
    label: "Pesan Kontak",
    href: "/admin/messages",
    icon: Mail,
    enabled: false,
  },
  {
    label: "Media Sosial",
    href: "/admin/social-links",
    icon: Share2,
    enabled: false,
  },
  {
    label: "Pengaturan & SEO",
    href: "/admin/settings",
    icon: Settings,
    enabled: false,
  },
];

export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {adminNavItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        if (!item.enabled) {
          return (
            <span
              key={item.href}
              title="Tersedia pada Phase 3"
              aria-disabled="true"
              className="flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground/50"
            >
              <Icon className="size-4" />
              <span className="flex-1">{item.label}</span>
              <span className="text-[10px] tracking-wide uppercase">Soon</span>
            </span>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
              isActive && "bg-sidebar-accent text-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
