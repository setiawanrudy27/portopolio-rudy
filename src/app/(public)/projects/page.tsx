import { PhasePlaceholder } from "@/components/shared/phase-placeholder";

export const metadata = { title: "Proyek" };

export default function ProjectsPage() {
  return (
    <PhasePlaceholder
      title="Portfolio Proyek"
      description="Halaman ini akan menampilkan daftar proyek berstatus Published, lengkap dengan thumbnail, kategori, dan filter. Proyek Draft tidak akan pernah tampil di sini."
    />
  );
}
