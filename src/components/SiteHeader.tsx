import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/kamp", label: "Kamp" },
  { to: "/egitmenler", label: "Eğitim Kadrosu" },
  { to: "/basvuru", label: "Başvuru" },
  { to: "/iletisim", label: "İletişim" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-border">
      <div className="container-prose flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid place-items-center h-8 w-8 rounded-md bg-primary text-primary-foreground font-display text-base">D</span>
          <span className="font-display text-lg leading-none">
            Doğa Okulu
            <span className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">Bilim Kampları</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-foreground/75 hover:text-primary transition-colors"
              activeProps={{ className: "text-sm text-primary font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/basvuru"
          className="hidden md:inline-flex h-9 items-center rounded-md bg-primary text-primary-foreground px-4 text-sm font-medium hover:bg-primary/90 transition"
        >
          Başvuru Yap
        </Link>
        <button
          aria-label="Menü"
          className="md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-prose py-3 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-foreground/80"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
