import { PhasePlaceholder } from "@/components/shared/phase-placeholder";

export const metadata = { title: "Kontak" };

export default function ContactPage() {
  return (
    <PhasePlaceholder
      title="Kontak"
      description="Halaman ini akan menampilkan contact form (nama, email, subjek opsional, pesan), email kontak, dan social media links. Pesan akan disimpan ke database sebelum notifikasi email dikirim."
    />
  );
}
