import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/egitmenler")({
  head: () => ({
    meta: [
      { title: "Eğitim Kadrosu — Doğa Okulu" },
      { name: "description", content: "28 kişilik akademik kadro: 7 Prof. Dr., 4 Doç. Dr., 2 Dr. Öğr. Üyesi, olimpiyat eğitmenleri ve araştırmacılar." },
      { property: "og:title", content: "Eğitim Kadrosu — Doğa Okulu" },
      { property: "og:description", content: "Üniversite kürsüsünden lise sıralarına: alanında uzman 28 kişilik akademik kadro." },
    ],
    links: [{ rel: "canonical", href: "/egitmenler" }],
  }),
  component: EgitmenlerPage,
});

const roster = [
  { count: 7, title: "Prof. Dr." },
  { count: 4, title: "Doç. Dr." },
  { count: 2, title: "Dr. Öğr. Üyesi" },
  { count: 2, title: "Dr." },
  { count: 2, title: "Öğretim Görevlisi" },
  { count: 3, title: "Arş. Gör. Dr." },
  { count: 8, title: "Olimpiyat eğitmeni öğretmen" },
];

function EgitmenlerPage() {
  return (
    <div className="container-prose py-16 md:py-24">
      <span className="eyebrow">Eğitim Kadrosu</span>
      <h1 className="mt-3 font-display text-4xl md:text-5xl max-w-3xl">28 kişilik akademik ekip</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Kampımız; üniversitelerin farklı bölümlerinden öğretim üyeleri, araştırmacılar ve
        TÜBİTAK Bilim Olimpiyatları'nda deneyimli öğretmenlerden oluşan güçlü bir kadroyla yürütülür.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {roster.map((r) => (
          <div key={r.title} className="rounded-xl border border-border bg-card p-7 flex items-baseline gap-5 hover:border-primary/40 transition">
            <div className="font-display text-5xl text-primary leading-none">{r.count}</div>
            <div className="text-sm text-muted-foreground leading-tight">{r.title}</div>
          </div>
        ))}
      </div>

      <section className="mt-20 rounded-2xl bg-primary text-primary-foreground p-8 md:p-12">
        <div className="eyebrow text-gold">Yürütücü</div>
        <h2 className="mt-3 font-display text-3xl">Öğr. Gör. Yusuf Durmuş</h2>
        <p className="mt-4 max-w-2xl text-primary-foreground/85">
          Doğa Okulu, akademik birikim ve saha tecrübesini bir araya getirerek lise
          öğrencilerine üniversite düzeyinde bilim eğitimi sunma vizyonuyla kurulmuştur.
          Tüm süreç, yürütücümüz tarafından bizzat koordine edilir.
        </p>
        <a href="tel:+905325112502" className="mt-7 inline-flex h-11 items-center rounded-md bg-background text-foreground px-6 text-sm font-medium hover:bg-background/90">
          0532 511 25 02
        </a>
      </section>
    </div>
  );
}
