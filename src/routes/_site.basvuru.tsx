import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Phone } from "lucide-react";

export const Route = createFileRoute("/_site/basvuru")({
  head: () => ({
    meta: [
      { title: "Başvuru — Yusuf Durmuş Akademi & Bilim Kampları" },
      { name: "description", content: "Yusuf Durmuş Akademi & Bilim Kampları bilim kampına çevrimiçi başvuru formu. Kontenjan sınırlıdır." },
      { property: "og:title", content: "Başvuru — Yusuf Durmuş Akademi & Bilim Kampları" },
      { property: "og:description", content: "Bilim kampına başvurmak için formu doldurun, ekibimiz sizinle iletişime geçsin." },
    ],
    links: [{ rel: "canonical", href: "/basvuru" }],
  }),
  component: BasvuruPage,
});

const schema = z.object({
  adSoyad: z.string().trim().min(3, "Ad soyad en az 3 karakter").max(100),
  tcNo: z.string().trim().length(11, "T.C. Kimlik No 11 haneli olmalıdır"),
  dogumTarihi: z.string().trim().min(1, "Doğum tarihi gerekli"),
  dogumYeri: z.string().trim().min(2, "Doğum yeri gerekli").max(60),
  cinsiyet: z.enum(["Kız", "Erkek"], { message: "Cinsiyet seçiniz" }),
  veliAdSoyad: z.string().trim().min(3, "Veli ad soyad gerekli").max(100),
  veliTelefon: z.string().trim().min(10, "Geçerli telefon giriniz").max(20),
  telefon: z.string().trim().min(10, "Geçerli telefon giriniz").max(20),
  email: z.string().trim().email("Geçerli e-posta giriniz").max(120),
  sehir: z.string().trim().min(2).max(60),
  sinif: z.string().min(1, "Sınıf seçiniz"),
  brans: z.enum(["Biyoloji", "Fizik", "Kimya", "Matematik", "EKOLOJİ TEMELLİ DOĞA EĞİTİMİ"], { message: "Branş seçiniz" }),
  not: z.string().max(600).optional(),
  kvkk: z.literal(true, { message: "Onay vermelisiniz" }),
  kurallar: z.literal(true, { message: "Onay vermelisiniz" }),
});

type FormState = Partial<Record<keyof z.infer<typeof schema>, string>>;

function BasvuruPage() {
  const [errors, setErrors] = useState<FormState>({});
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      adSoyad: fd.get("adSoyad"),
      tcNo: fd.get("tcNo"),
      dogumTarihi: fd.get("dogumTarihi"),
      dogumYeri: fd.get("dogumYeri"),
      cinsiyet: fd.get("cinsiyet"),
      veliAdSoyad: fd.get("veliAdSoyad"),
      veliTelefon: fd.get("veliTelefon"),
      telefon: fd.get("telefon"),
      email: fd.get("email"),
      sehir: fd.get("sehir"),
      sinif: fd.get("sinif"),
      brans: fd.get("brans"),
      not: fd.get("not") || undefined,
      kvkk: fd.get("kvkk") === "on" ? true : false,
      kurallar: fd.get("kurallar") === "on" ? true : false,
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: FormState = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path[0] as keyof FormState] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    // Forward via WhatsApp to the program coordinator
    const d = parsed.data;
    const msg = encodeURIComponent(
      `Yusuf Durmuş Akademi & Bilim Kampları Başvurusu\n\nÖğrenci: ${d.adSoyad}\nT.C. No: ${d.tcNo}\nDoğum Tarihi: ${d.dogumTarihi}\nDoğum Yeri: ${d.dogumYeri}\nCinsiyet: ${d.cinsiyet}\nSınıf: ${d.sinif}\nBranş: ${d.brans}\nŞehir: ${d.sehir}\nVeli: ${d.veliAdSoyad}\nVeli Telefon: ${d.veliTelefon}\nTelefon: ${d.telefon}\nE-posta: ${d.email}${d.not ? `\nNot: ${d.not}` : ""}`,
    );
    window.open(`https://wa.me/905325112502?text=${msg}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="container-prose py-24 max-w-xl text-center">
        <CheckCircle2 className="h-14 w-14 text-primary mx-auto" />
        <h1 className="mt-5 font-display text-3xl">Başvurunuz iletildi</h1>
        <p className="mt-3 text-muted-foreground">
          Başvurunuz WhatsApp üzerinden program koordinatörümüze yönlendirildi.
          Kısa süre içinde sizinle iletişime geçilecektir.
        </p>
        <a href="tel:+905325112502" className="mt-8 inline-flex items-center gap-2 h-11 rounded-md bg-primary text-primary-foreground px-6 text-sm font-medium hover:bg-primary/90">
          <Phone className="h-4 w-4" /> 0532 511 25 02
        </a>
      </div>
    );
  }

  return (
    <div className="container-prose py-16 md:py-24 max-w-3xl">
      <span className="eyebrow">Başvuru</span>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Bilim kampına başvur</h1>
      <p className="mt-4 text-muted-foreground">
        Aşağıdaki formu eksiksiz doldurun. Başvurunuz onaylandığında ödeme ve katılım
        detayları paylaşılacaktır.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-10 grid sm:grid-cols-2 gap-5">
        <Field label="Öğrenci Adı Soyadı" name="adSoyad" error={errors.adSoyad} />
        <Field label="T.C. Kimlik No" name="tcNo" type="text" maxLength={11} placeholder="XXXXXXXXXXX" error={errors.tcNo} />
        <Field label="Doğum Tarihi" name="dogumTarihi" type="date" error={errors.dogumTarihi} />
        <Field label="Doğum Yeri" name="dogumYeri" error={errors.dogumYeri} />
        <Select label="Cinsiyeti" name="cinsiyet" error={errors.cinsiyet} options={["Kız", "Erkek"]} />
        <Field label="Veli Adı Soyadı" name="veliAdSoyad" error={errors.veliAdSoyad} />
        <Field label="Veli Cep Telefonu" name="veliTelefon" type="tel" placeholder="05XX XXX XX XX" error={errors.veliTelefon} />
        <Field label="Telefon" name="telefon" type="tel" placeholder="05XX XXX XX XX" error={errors.telefon} />
        <Field label="E-posta" name="email" type="email" error={errors.email} />
        <Field label="Şehir" name="sehir" error={errors.sehir} />
        <Select label="Sınıf" name="sinif" error={errors.sinif} options={["7", "8", "9", "10", "11", "12", "Mezun"]} />
        <Select label="Kampa katılmak istediğiniz alanı işaretleyiniz" name="brans" error={errors.brans} options={["Biyoloji", "Fizik", "Kimya", "Matematik", "EKOLOJİ TEMELLİ DOĞA EĞİTİMİ"]} full />
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Yapılacak bu eğitime neden katılmak istediğinizi belirtiniz <span className="text-muted-foreground font-normal">(opsiyonel)</span></label>
          <textarea name="not" rows={4} maxLength={600} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="sm:col-span-2 flex items-start gap-3">
          <input type="checkbox" id="kvkk" name="kvkk" className="mt-1 h-4 w-4 accent-[var(--color-primary)]" />
          <label htmlFor="kvkk" className="text-sm text-muted-foreground">
            Kişisel verilerimin başvuru sürecinde kullanılmasını kabul ediyorum.
          </label>
        </div>
        {errors.kvkk && <p className="sm:col-span-2 text-sm text-destructive -mt-3">{errors.kvkk}</p>}
        <div className="sm:col-span-2 flex items-start gap-3">
          <input type="checkbox" id="kurallar" name="kurallar" className="mt-1 h-4 w-4 accent-[var(--color-primary)]" />
          <label htmlFor="kurallar" className="text-sm text-muted-foreground">
            Bilim kampının kurallarına uymayı kabul ediyorum.
          </label>
        </div>
        {errors.kurallar && <p className="sm:col-span-2 text-sm text-destructive -mt-3">{errors.kurallar}</p>}
        <div className="sm:col-span-2 flex justify-end">
          <button type="submit" className="inline-flex h-11 items-center rounded-md bg-primary text-primary-foreground px-7 text-sm font-medium hover:bg-primary/90 transition">
            Başvuruyu Gönder
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, maxLength, error }: { label: string; name: string; type?: string; placeholder?: string; maxLength?: number; error?: string }) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} maxLength={maxLength} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Select({ label, name, options, error, full }: { label: string; name: string; options: string[]; error?: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-sm font-medium" htmlFor={name}>{label}</label>
      <select id={name} name={name} defaultValue="" className="mt-1.5 w-full rounded-md border border-input bg-background px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
        <option value="" disabled>Seçiniz</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
