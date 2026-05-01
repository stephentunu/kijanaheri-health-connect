import { createFileRoute, Link } from "@tanstack/react-router";
import { doctors, services } from "@/lib/clinic-data";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Our Doctors | Kijanaheri Medical Centre" },
      { name: "description", content: "Meet our board-certified doctors specializing in maternity, pediatrics, dental and general practice." },
      { property: "og:title", content: "Meet our doctors — Kijanaheri Medical Centre" },
      { property: "og:description", content: "Board-certified specialists committed to your wellbeing." },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("doctors.title")}</span>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Doctors who care, deeply</h1>
        <p className="mt-3 text-muted-foreground">{t("doctors.sub")}</p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((d) => (
          <article key={d.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]">
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={d.photo}
                alt={`Portrait of ${d.name}, ${d.specialty}`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold">{d.name}</h2>
              <div className="text-xs text-muted-foreground">{d.title}</div>
              <div className="mt-1 text-sm font-medium text-primary">{d.specialty}</div>
              <p className="mt-3 text-sm text-muted-foreground">{d.bio}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {d.serviceIds.map((sid) => {
                  const s = services.find((x) => x.id === sid);
                  if (!s) return null;
                  return (
                    <span key={sid} className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary">
                      {t(s.titleKey)}
                    </span>
                  );
                })}
              </div>
              <Button asChild className="mt-5 w-full bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
                <Link to="/book" search={{ doctor: d.id }}>{t("cta.book")}</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
