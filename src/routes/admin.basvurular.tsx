import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { LogOut, Eye } from "lucide-react";
import { listApplications, adminLock } from "@/lib/applications.functions";

export const Route = createFileRoute("/admin/basvurular")({
  head: () => ({ meta: [{ title: "Başvurular — Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  loader: () => listApplications(),
  errorComponent: ({ error }) => (
    <div className="p-8 text-sm text-destructive">Hata: {error.message}</div>
  ),
  component: AdminList,
});

const statusLabel: Record<string, string> = {
  yeni: "Yeni",
  onayli: "Onaylı",
  reddedildi: "Reddedildi",
};

function AdminList() {
  const { applications } = Route.useLoaderData();
  const router = useRouter();
  const lock = useServerFn(adminLock);

  async function handleLogout() {
    await lock();
    await router.navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl">Başvurular</h1>
            <p className="text-xs text-muted-foreground">Toplam {applications.length}</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 h-9 rounded-md border bg-background px-3 text-sm hover:bg-muted/50"
          >
            <LogOut className="h-4 w-4" /> Çıkış
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {applications.length === 0 ? (
          <div className="rounded-lg border bg-background p-12 text-center text-muted-foreground">
            Henüz başvuru yok.
          </div>
        ) : (
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Tarih</th>
                  <th className="px-4 py-3 font-medium">Ad Soyad</th>
                  <th className="px-4 py-3 font-medium">Branş</th>
                  <th className="px-4 py-3 font-medium">Telefon</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium text-right">Detay</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {applications.map((a: typeof applications[number]) => (
                  <tr key={a.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {new Date(a.created_at).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 font-medium">{a.ad_soyad}</td>
                    <td className="px-4 py-3">{a.brans}</td>
                    <td className="px-4 py-3">{a.telefon}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs">
                        {statusLabel[a.status] ?? a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to="/admin/basvurular/$id"
                        params={{ id: a.id }}
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <Eye className="h-4 w-4" /> Aç
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
