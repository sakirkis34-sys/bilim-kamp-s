import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getApplication } from "@/lib/applications.functions";

export const Route = createFileRoute("/admin/basvurular/$id")({
  head: () => ({ meta: [{ title: "Başvuru Detayı — Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  loader: ({ params }) => getApplication({ data: { id: params.id } }),
  errorComponent: ({ error }) => (
    <div className="p-8 text-sm text-destructive">Hata: {error.message}</div>
  ),
  component: AdminDetail,
});

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3 border-b last:border-0">
      <div className="text-xs uppercase text-muted-foreground">{label}</div>
      <div className="text-sm">{value || <span className="text-muted-foreground">—</span>}</div>
    </div>
  );
}

function AdminDetail() {
  const { application: a } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link to="/admin/basvurular" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Tüm başvurular
          </Link>
          <h1 className="mt-2 font-display text-2xl">{a.ad_soyad}</h1>
          <p className="text-xs text-muted-foreground">
            {new Date(a.created_at).toLocaleString("tr-TR")}
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="rounded-lg border bg-background p-6">
          <Row label="Branş" value={a.brans} />
          <Row label="T.C. Kimlik No" value={a.tc_no} />
          <Row label="Doğum Tarihi" value={a.dogum_tarihi} />
          <Row label="Doğum Yeri" value={a.dogum_yeri} />
          <Row label="Cinsiyet" value={a.cinsiyet} />
          <Row label="Okul / Sınıf" value={a.sinif} />
          <Row label="Okul Giriş Puanı" value={a.okul_giris_puani} />
          <Row label="Not Ortalaması" value={a.not_ortalamasi} />
          <Row label="Telefon" value={<a href={`tel:${a.telefon}`} className="text-primary hover:underline">{a.telefon}</a>} />
          <Row label="E-posta" value={<a href={`mailto:${a.email}`} className="text-primary hover:underline">{a.email}</a>} />
          <Row label="Ev Adresi" value={a.ev_adresi} />
          <Row label="Veli Ad Soyad" value={a.veli_ad_soyad} />
          <Row label="Veli Telefon" value={<a href={`tel:${a.veli_telefon}`} className="text-primary hover:underline">{a.veli_telefon}</a>} />
          <Row label="Açıklama" value={a.not_metni ? <p className="whitespace-pre-wrap">{a.not_metni}</p> : null} />
          <Row label="Durum" value={a.status} />
        </div>
      </main>
    </div>
  );
}
