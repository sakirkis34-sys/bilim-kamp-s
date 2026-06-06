import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/gallery/kamp-4.jpeg.asset.json";
import labImg from "@/assets/gallery/kamp-2.jpeg.asset.json";
import hotelImg from "@/assets/hotel.jpg";
import galleryA from "@/assets/gallery/kamp-3.jpeg.asset.json";
import galleryB from "@/assets/gallery/kamp-6.jpeg.asset.json";
import galleryC from "@/assets/gallery/kamp-7.jpeg.asset.json";
import galleryD from "@/assets/gallery/kamp-1.jpeg.asset.json";
import { Microscope, Atom, FlaskConical, Sigma, GraduationCap, MapPin, Clock, Users, Award, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Doğa Okulu — Lise Öğrencileri için Bilim Kampları" },
      { name: "description", content: "Öğretim Görevlisi Yusuf Durmuş yürütücülüğünde 9 günlük akademik bilim kampı. Biyoloji, Fizik, Kimya, Matematik. Kızılcahamam, Ankara." },
      { property: "og:title", content: "Doğa Okulu — Bilim Kampları" },
      { property: "og:description", content: "TYT-AYT ve TÜBİTAK Bilim Olimpiyatları hazırlığı için 9 günlük yatılı akademik kamp." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const branches = [
  { icon: Microscope, name: "Biyoloji", quota: 30, color: "from-emerald-700/10 to-emerald-700/5" },
  { icon: Atom, name: "Fizik", quota: 15, color: "from-sky-700/10 to-sky-700/5" },
  { icon: FlaskConical, name: "Kimya", quota: 15, color: "from-amber-700/10 to-amber-700/5" },
  { icon: Sigma, name: "Matematik", quota: 30, color: "from-violet-700/10 to-violet-700/5" },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg.url} alt="Kızılcahamam çam ormanı" width={1920} height={1280} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="container-prose pt-24 pb-28 md:pt-36 md:pb-40">
          <span className="eyebrow">Akademik Bilim Kampı · 9 Gün</span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-4xl">
            Bilimle, doğada, akademisyenlerle <span className="text-primary">geleceğine hazırlan.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground">
            Doğa Okulu, Öğretim Görevlisi Yusuf Durmuş yürütücülüğünde 7–12. sınıf öğrencilerine
            yönelik Biyoloji, Fizik, Kimya ve Matematik alanlarında yatılı bilim kampları düzenler.
            TYT-AYT ve TÜBİTAK Bilim Olimpiyatları için ileri düzey hazırlık.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/basvuru" className="inline-flex items-center gap-2 h-11 rounded-md bg-primary text-primary-foreground px-6 text-sm font-medium hover:bg-primary/90 transition">
              Başvuru Formunu Doldur <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/kamp" className="inline-flex items-center gap-2 h-11 rounded-md border border-border bg-background/70 px-6 text-sm font-medium hover:bg-accent transition">
              Kamp Programını İncele
            </Link>
          </div>

          <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {[
              { k: "9 Gün", v: "~80 saat eğitim" },
              { k: "28", v: "Akademisyen & eğitmen" },
              { k: "90", v: "Toplam kontenjan" },
              { k: "34.000 ₺", v: "Her şey dahil" },
            ].map((s) => (
              <div key={s.k} className="bg-background p-5">
                <dt className="font-display text-2xl text-primary">{s.k}</dt>
                <dd className="text-xs text-muted-foreground mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Branches */}
      <section className="py-20 md:py-28">
        <div className="container-prose">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="eyebrow">Bilim Dalları</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Dört temel alanda derinlemesine eğitim</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Her branş için ayrı sınıf, ayrı laboratuvar ve alanında uzman akademik kadro.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {branches.map((b) => (
              <div key={b.name} className={`rounded-xl border border-border bg-gradient-to-br ${b.color} p-6 transition hover:border-primary/40`}>
                <b.icon className="h-7 w-7 text-primary" />
                <div className="mt-5 font-display text-xl">{b.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">Kontenjan: {b.quota} kişi</div>
                <div className="mt-6 hairline pt-3 text-xs text-muted-foreground">İleri teori · Laboratuvar · Soru çözümü</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-prose grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={labImg.url} alt="Öğrenciler laboratuvarda mikroskopla çalışıyor" width={1280} height={960} loading="lazy" className="rounded-xl border border-border w-full h-auto" />
            <div className="absolute -bottom-6 -right-4 hidden md:block bg-background border border-border rounded-lg px-5 py-4 shadow-sm">
              <div className="font-display text-2xl text-primary">7 Prof. Dr.</div>
              <div className="text-xs text-muted-foreground">akademik kadromuzdan</div>
            </div>
          </div>
          <div>
            <span className="eyebrow">Neden Doğa Okulu</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Üniversite kürsüsünden lise sıralarına</h2>
            <p className="mt-5 text-muted-foreground">
              Akademik düzeyde verilen dersler, gerçek laboratuvar deneyimleri ve doğada
              uygulamalı çalışmalarla öğrenciler hem sınavlara hem de bilim olimpiyatlarına
              güçlü bir altyapıyla hazırlanır.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                { i: GraduationCap, t: "Akademik kadro", d: "7 Prof. Dr., 4 Doç. Dr., olimpiyat eğitmenleri ve araştırmacılar." },
                { i: Microscope, t: "Laboratuvar & arazi", d: "Mikroskoplu inceleme, doğa gezisi, fosil müzesi ve bilim sergisi." },
                { i: Award, t: "Olimpiyat odaklı", d: "TÜBİTAK Bilim Olimpiyatları hazırlığı, akşam söyleşileri ve konferanslar." },
              ].map((x) => (
                <li key={x.t} className="flex gap-4">
                  <span className="grid place-items-center h-10 w-10 rounded-md bg-primary/10 text-primary shrink-0"><x.i className="h-5 w-5" /></span>
                  <div>
                    <div className="font-medium">{x.t}</div>
                    <p className="text-sm text-muted-foreground mt-0.5">{x.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-20 md:py-28">
        <div className="container-prose grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="eyebrow">Konaklama</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">5 yıldızlı Eliz Hotel, Kızılcahamam</h2>
            <p className="mt-5 text-muted-foreground">
              Ankara'nın çam ormanlarıyla çevrili Kızılcahamam ilçesinde, 9 gün boyunca konfor
              ve güvenlikten ödün vermeden yatılı eğitim. Eğitim, konaklama, yemek ve transfer
              dahil tek paket.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
              {[
                { i: Clock, t: "9 gün · 80 saat ders" },
                { i: MapPin, t: "Eliz Hotel, Ankara" },
                { i: Users, t: "Toplam 90 kontenjan" },
                { i: Award, t: "Her şey dahil 34.000 ₺" },
              ].map((x) => (
                <div key={x.t} className="flex items-center gap-2 border border-border rounded-md px-3 py-2.5 bg-card">
                  <x.i className="h-4 w-4 text-primary" /> {x.t}
                </div>
              ))}
            </div>
          </div>
          <img src={hotelImg} alt="Eliz Hotel Kızılcahamam" width={1280} height={960} loading="lazy" className="order-1 md:order-2 rounded-xl border border-border w-full h-auto" />
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-prose">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="eyebrow">Galeri</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Kamptan kareler</h2>
            </div>
            <Link to="/galeri" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Tüm galeriye git <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: galleryA.url, alt: "Mikroskop başında iki öğrenci" },
              { src: galleryB.url, alt: "Laboratuvarda örnek inceleme" },
              { src: galleryC.url, alt: "Numune kavanozları" },
              { src: galleryD.url, alt: "Sertifika töreni" },
            ].map((g) => (
              <Link key={g.src} to="/galeri" className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted">
                <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="container-prose pb-4">
        <div className="rounded-2xl bg-primary text-primary-foreground p-10 md:p-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h3 className="font-display text-2xl md:text-3xl">Kontenjan sınırlı. Yerinizi bugün ayırtın.</h3>
            <p className="mt-2 text-primary-foreground/80 text-sm md:text-base max-w-xl">
              Başvurunuzu çevrimiçi forma iletin; ekibimiz en kısa sürede sizinle iletişime geçsin.
            </p>
          </div>
          <Link to="/basvuru" className="inline-flex items-center gap-2 h-11 rounded-md bg-background text-foreground px-6 text-sm font-medium hover:bg-background/90 transition justify-self-start md:justify-self-end">
            Başvuru Yap <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
