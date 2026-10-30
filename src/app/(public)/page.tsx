import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const upcomingSections = [
  {
    title: "Profil",
    description:
      "Nama, professional title, foto, dan ringkasan profesional dari CMS.",
  },
  {
    title: "Keahlian & Tools",
    description:
      "Skill per kategori dan tools yang digunakan, dikelola melalui dashboard.",
  },
  {
    title: "Portfolio Proyek",
    description:
      "Daftar proyek published dengan halaman detail berdasarkan slug.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-20 sm:px-6 lg:py-28">
        <Badge variant="outline" className="w-fit">
          Placeholder konten — Phase 1
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Nama Anda
          <span className="block text-muted-foreground">
            Professional Title
          </span>
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Nama, professional title, dan ringkasan profesional akan dimuat dari
          database melalui CMS. Belum ada data yang diisi, sehingga halaman ini
          sengaja menampilkan placeholder.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/projects">
              Lihat Proyek
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Hubungi Saya</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {upcomingSections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
