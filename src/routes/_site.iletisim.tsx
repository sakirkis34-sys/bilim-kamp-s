import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, MessageCircle, User } from "lucide-react";

export const Route = createFileRoute("/_site/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim — Doğa Okulu" },
      { name: "description", content: "Doğa Okulu iletişim bilgileri. Prof. Dr. Yusuf Durmuş — 0532 511 25 02." },
      { property: "og:title", content: "İletişim — Doğa Okulu" },
      { property: "og:description", content: "Bize ulaşın: 0532 511 25 02 · Eliz Hotel, Kızılcahamam, Ankara." },
    ],
    links: [{ rel: "canonical", href: "/iletisim" }],
  }),
  component: IletisimPage,
});

function IletisimPage() {
  return (
    <div className="container-prose py-16 md:py-24">
      <span className="eyebrow">İletişim</span>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Bize ulaşın</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Kamp hakkında her türlü soru, danışma ve başvuru için doğrudan yürütücümüze ulaşabilirsiniz.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-5">
        <Card icon={User} title="Yürütücü" content="Öğr. Gör. Yusuf Durmuş" />
        <Card icon={Phone} title="Telefon" content="0532 511 25 02" href="tel:+905325112502" />
        <Card icon={MessageCircle} title="WhatsApp" content="Mesaj gönder" href="https://wa.me/905325112502" />
        <Card icon={MapPin} title="Kamp Lokasyonu" content="Eliz Hotel, Kızılcahamam / Ankara" />
      </div>

      <div className="mt-12 rounded-xl overflow-hidden border border-border">
        <iframe
          title="Eliz Hotel Kızılcahamam harita"
          src="https://www.google.com/maps?q=Eliz+Hotel+Kizilcahamam&output=embed"
          width="100%"
          height="380"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full"
        />
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, content, href }: { icon: React.ComponentType<{ className?: string }>; title: string; content: string; href?: string }) {
  const inner = (
    <>
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <div className="mt-1 font-display text-xl">{content}</div>
    </>
  );
  const cls = "block rounded-xl border border-border bg-card p-7 hover:border-primary/40 transition";
  return href ? <a href={href} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>;
}
