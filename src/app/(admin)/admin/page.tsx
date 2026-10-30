import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const overviewModules = [
  "Total proyek published",
  "Total skills",
  "Total tools",
  "Pesan belum dibaca",
  "Status CV aktif",
  "Pesan kontak terbaru",
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Badge variant="outline" className="w-fit">
          Phase 3
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Ringkasan dashboard akan menampilkan statistik aktual dari database
          setelah modul CMS dibuat. Tidak ada angka contoh yang ditampilkan.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overviewModules.map((module) => (
          <Card key={module}>
            <CardHeader>
              <CardDescription>{module}</CardDescription>
              <CardTitle className="text-2xl text-muted-foreground">
                —
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Menunggu implementasi modul.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
