import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Sun, Moon, FlaskConical, Mountain, BookOpen } from "lucide-react";

export const Route = createFileRoute("/_site/kamp")({
  head: () => ({
    meta: [
      { title: "Kamp Programı — Doğa Okulu" },
      { name: "description", content: "9 günlük yatılı bilim kampı: ileri teori, laboratuvar, arazi çalışması, soru çözümü ve akşam söyleşileri." },
      { property: "og:title", content: "Kamp Programı — Doğa Okulu" },
      { property: "og:description", content: "9 gün · ~80 saat akademik ders · laboratuvar · arazi çalışması · konferanslar." },
    ],
    links: [{ rel: "canonical", href: "/kamp" }],
  }),
  component: KampPage,
});

const day = [
  { t: "08:30 — 09:00", d: "Kahvaltı" },
  { t: "09:00 — 12:30", d: "İleri teori dersleri (branş)" },
  { t: "13:30 — 16:30", d: "Laboratuvar / Arazi çalışması" },
  { t: "17:00 — 19:00", d: "Soru çözümü & konu tekrarı" },
  { t: "20:30 — 22:00", d: "Akademisyen söyleşisi / konferans" },
];

const includes = [
  { i: BookOpen, t: "İleri Teori", d: "Üniversite düzeyinde ders anlatımı; TYT-AYT ve olimpiyat odaklı içerik." },
  { i: FlaskConical, t: "Laboratuvar", d: "Mikroskoplu inceleme laboratuvarı, deneyler ve uygulamalı çalışmalar." },
  { i: Mountain, t: "Arazi Çalışması", d: "Doğa gezisi, fosil müzesi ve bilimsel fotoğraf sergisi." },
  { i: Sun, t: "Konu Tekrarı", d: "Günün sonunda yapılandırılmış tekrar oturumları." },
  { i: Moon, t: "Akşam Programı", d: "Bilim insanlarıyla konferanslar ve söyleşiler." },
  { i: Calendar, t: "Süre", d: "9 gün boyunca toplam ~80 saat aktif eğitim." },
];

function KampPage() {
  return (
    <div className="container-prose py-16 md:py-24">
      <span className="eyebrow">Kamp Programı</span>
      <h1 className="mt-3 font-display text-4xl md:text-5xl max-w-3xl">9 gün boyunca doğanın içinde akademik bir deneyim</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Sabah ileri teori derslerinden akşam akademisyen söyleşilerine kadar yoğun ve dengeli
        bir program. Her gün ortalama 10 saat aktif eğitim.
      </p>

      <div className="mt-14 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl mb-5">Günlük akış</h2>
          <ol className="border-l border-border pl-6 space-y-6">
            {day.map((d, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="text-xs uppercase tracking-widest text-gold font-semibold">{d.t}</div>
                <div className="mt-1 text-base">{d.d}</div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-display text-2xl mb-5">Kapsam</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {includes.map((x) => (
              <div key={x.t} className="rounded-lg border border-border bg-card p-5">
                <x.i className="h-5 w-5 text-primary" />
                <div className="mt-3 font-medium">{x.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-20 rounded-2xl border border-border bg-surface p-8 md:p-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="eyebrow">Ücret</div>
          <div className="mt-2 font-display text-4xl text-primary">34.000 ₺</div>
          <p className="mt-2 text-sm text-muted-foreground">Konaklama, yemek, eğitim ve transfer dahildir.</p>
        </div>
        <div>
          <div className="eyebrow">Lokasyon</div>
          <div className="mt-2 font-display text-2xl">Eliz Hotel</div>
          <p className="mt-2 text-sm text-muted-foreground">5 yıldızlı tesis · Kızılcahamam, Ankara</p>
        </div>
        <div>
          <div className="eyebrow">Hedef Kitle</div>
          <div className="mt-2 font-display text-2xl">7–12. Sınıf</div>
          <p className="mt-2 text-sm text-muted-foreground">Lise öğrencileri ve lise mezunları.</p>
        </div>
      </section>
    </div>
  );
}
