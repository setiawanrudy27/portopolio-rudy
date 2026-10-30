import Link from "next/link";
import { LogOut } from "lucide-react";

import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar md:flex md:flex-col">
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <Link href="/admin" className="text-sm font-semibold tracking-wide">
          Portfolio CMS
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <AdminNav />
      </div>
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
          disabled
        >
          <LogOut className="size-4" />
          Logout (Phase 2)
        </Button>
      </div>
    </aside>
  );
}
