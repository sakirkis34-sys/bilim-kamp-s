import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">Yusuf Durmuş Akademi & Bilim Kampları</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Öğretim Görevlisi Yusuf Durmuş yürütücülüğünde lise öğrencilerine yönelik
            akademik bilim kampları.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-3">İletişim</div>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" /><a href="tel:+905325112502" className="hover:text-primary">0532 511 25 02</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" />Prof. Dr. Yusuf Durmuş</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" />Eliz Hotel, Kızılcahamam / Ankara</li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">Bağlantılar</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/kamp" className="hover:text-primary">Kamp Programı</Link></li>
            <li><Link to="/egitmenler" className="hover:text-primary">Eğitim Kadrosu</Link></li>
            <li><Link to="/basvuru" className="hover:text-primary">Başvuru</Link></li>
            <li><Link to="/iletisim" className="hover:text-primary">İletişim</Link></li>
          </ul>
        </div>
      </div>
      <div className="hairline">
        <div className="container-prose py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Yusuf Durmuş Akademi & Bilim Kampları. Tüm hakları saklıdır.</span>
          <span>Akademik bilim kampları · Kızılcahamam, Ankara</span>
        </div>
      </div>
    </footer>
  );
}
