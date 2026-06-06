import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import img1 from "@/assets/gallery/kamp-1.jpeg.asset.json";
import img2 from "@/assets/gallery/kamp-2.jpeg.asset.json";
import img3 from "@/assets/gallery/kamp-3.jpeg.asset.json";
import img4 from "@/assets/gallery/kamp-4.jpeg.asset.json";
import img5 from "@/assets/gallery/kamp-5.jpeg.asset.json";
import img6 from "@/assets/gallery/kamp-6.jpeg.asset.json";
import img7 from "@/assets/gallery/kamp-7.jpeg.asset.json";

export const Route = createFileRoute("/_site/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri — Doğa Okulu Bilim Kampları" },
      { name: "description", content: "Doğa Okulu bilim kamplarından kareler: laboratuvar çalışmaları, arazi gezileri, sertifika töreni." },
    ],
  }),
  component: GalleryPage,
});

type Item = { src: string; alt: string; span?: string };

const items: Item[] = [
  { src: img4.url, alt: "Çam ormanında arazi çalışması ve doğa gezisi", span: "md:col-span-2 md:row-span-2" },
  { src: img1.url, alt: "Sertifika töreni" },
  { src: img2.url, alt: "Leica mikroskopla inceleme laboratuvarı" },
  { src: img3.url, alt: "Mikroskop başında iki öğrenci" },
  { src: img6.url, alt: "Laboratuvarda örnek inceleme", span: "md:col-span-2" },
  { src: img5.url, alt: "Doğa yürüyüşünde bilim insanı eşliğinde gözlem" },
  { src: img7.url, alt: "Numune kavanozları ve örnek hazırlama" },
];

function GalleryPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-prose py-16 md:py-24">
          <span className="eyebrow">Galeri</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            Kamptan kareler
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Laboratuvar çalışmaları, arazi gezileri, akademisyenlerle birebir gözlem
            saatleri ve sertifika töreninden seçilmiş anlar.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-prose">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] gap-3 md:gap-4">
            {items.map((it) => (
              <button
                key={it.src}
                onClick={() => setActive(it.src)}
                className={`group relative overflow-hidden rounded-lg border border-border bg-muted ${it.span ?? ""}`}
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-background/90 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Kapat"
            className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full border border-border bg-background/80 hover:bg-background"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={active}
            alt=""
            className="max-h-[88vh] max-w-[92vw] rounded-lg border border-border object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
