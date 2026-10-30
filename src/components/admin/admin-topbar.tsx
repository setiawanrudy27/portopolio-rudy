"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { logoutAction } from "@/lib/auth-actions";
import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type AdminUser = {
  name?: string | null;
  email?: string | null;
};

export function AdminTopbar({ user }: { user: AdminUser }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Buka menu admin">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar">
              <SheetHeader>
                <SheetTitle>Portfolio CMS</SheetTitle>
              </SheetHeader>
              <div className="px-3">
                <AdminNav onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <span className="text-sm text-muted-foreground">Admin Dashboard</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-muted-foreground sm:block">
          {user.name ?? user.email}
        </span>
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" size="sm">
            Logout
          </Button>
        </form>
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Lihat Website
        </Link>
      </div>
    </header>
  );
}
