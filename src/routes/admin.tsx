import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Lock } from "lucide-react";
import { adminUnlock, adminCheck } from "@/lib/applications.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Yusuf Durmuş Akademi" }, { name: "robots", content: "noindex,nofollow" }] }),
  loader: async () => {
    const { unlocked } = await adminCheck();
    return { unlocked };
  },
  component: AdminUnlock,
});

function AdminUnlock() {
  const { unlocked } = Route.useLoaderData();
  const router = useRouter();
  const unlock = useServerFn(adminUnlock);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const password = new FormData(e.currentTarget).get("password") as string;
    const { ok } = await unlock({ data: { password } });
    setLoading(false);
    if (ok) {
      await router.navigate({ to: "/admin/basvurular" });
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/20">
      <div className="w-full max-w-sm rounded-xl border bg-background p-8 shadow-sm">
        <div className="flex items-center gap-2 text-primary"><Lock className="h-5 w-5" /><span className="text-sm font-medium">Yönetici Paneli</span></div>
        <h1 className="mt-3 font-display text-2xl">Giriş</h1>
        <p className="mt-1 text-sm text-muted-foreground">Devam etmek için yönetici şifresini girin.</p>
        {unlocked && (
          <div className="mt-4 rounded-md border bg-muted/30 p-3 text-sm">
            Zaten girişlisiniz. <Link to="/admin/basvurular" className="text-primary underline">Başvurulara git</Link>
          </div>
        )}
        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Şifre"
            required
            className="w-full rounded-md border border-input bg-background px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {error && <p className="text-sm text-destructive">Şifre hatalı.</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary text-primary-foreground px-4 text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Kontrol ediliyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
