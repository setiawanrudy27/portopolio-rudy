import { PhasePlaceholder } from "@/components/shared/phase-placeholder";

export const metadata = { title: "Resume / CV" };

export default function ResumePage() {
  return (
    <PhasePlaceholder
      title="Resume / CV"
      description="Halaman ini akan menampilkan CV aktif dalam format PDF yang dapat diunduh. Jika belum ada CV yang diunggah, akan ditampilkan empty state yang informatif."
    />
  );
}
