import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";

const applicationSchema = z.object({
  adSoyad: z.string().trim().min(3).max(100),
  tcNo: z.string().trim().length(11),
  dogumTarihi: z.string().trim().min(1),
  dogumYeri: z.string().trim().min(2).max(60),
  cinsiyet: z.enum(["Kız", "Erkek"]),
  telefon: z.string().trim().min(10).max(20),
  veliAdSoyad: z.string().trim().min(3).max(100),
  veliTelefon: z.string().trim().min(10).max(20),
  email: z.string().trim().email().max(120),
  evAdresi: z.string().trim().min(5).max(200),
  sinif: z.string().trim().min(1).max(120),
  okulGirisPuani: z.string().trim().min(1).max(40),
  notOrtalamasi: z.string().trim().min(1).max(40),
  brans: z.enum(["Biyoloji", "Fizik", "Kimya", "Matematik", "EKOLOJİ TEMELLİ DOĞA EĞİTİMİ"]),
  not: z.string().max(600).optional(),
});

type GateSession = { unlocked?: boolean };

function getSessionConfig() {
  return {
    password: process.env.SESSION_SECRET!,
    name: "admin-gate",
    maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function passwordMatches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function requireAdmin() {
  const session = await useSession<GateSession>(getSessionConfig());
  if (!session.data.unlocked) throw redirect({ to: "/admin" });
  return session;
}

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("applications").insert({
      ad_soyad: data.adSoyad,
      tc_no: data.tcNo,
      dogum_tarihi: data.dogumTarihi,
      dogum_yeri: data.dogumYeri,
      cinsiyet: data.cinsiyet,
      telefon: data.telefon,
      veli_ad_soyad: data.veliAdSoyad,
      veli_telefon: data.veliTelefon,
      email: data.email,
      ev_adresi: data.evAdresi,
      sinif: data.sinif,
      okul_giris_puani: data.okulGirisPuani,
      not_ortalamasi: data.notOrtalamasi,
      brans: data.brans,
      not_metni: data.not ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const adminUnlock = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ password: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) throw new Error("ADMIN_PASSWORD ayarlanmamış");
    if (!passwordMatches(data.password, expected)) return { ok: false as const };
    const session = await useSession<GateSession>(getSessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLock = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(getSessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const adminCheck = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<GateSession>(getSessionConfig());
  return { unlocked: !!session.data.unlocked };
});

export const listApplications = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("applications")
    .select("id, created_at, ad_soyad, brans, telefon, email, status")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { applications: data ?? [] };
});

export const getApplication = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("applications")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Başvuru bulunamadı");
    return { application: row };
  });
