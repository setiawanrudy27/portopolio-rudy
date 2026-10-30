import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

type PhasePlaceholderProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

/**
 * Temporary scaffold for pages that are implemented in later phases.
 * It intentionally shows no invented content.
 */
export function PhasePlaceholder({
  title,
  description,
  children,
}: PhasePlaceholderProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-20 sm:px-6 lg:py-28">
      <Badge variant="outline" className="w-fit">
        Placeholder
      </Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="max-w-2xl text-muted-foreground">{description}</p>
      <p className="text-sm text-muted-foreground">
        Konten halaman ini akan dimuat dari database melalui CMS pada Phase 4.
      </p>
      {children}
    </section>
  );
}
