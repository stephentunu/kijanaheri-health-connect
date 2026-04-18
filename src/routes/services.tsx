import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { services } from "@/lib/clinic-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Kijanaheri Medical Centre" },
      { name: "description", content: "Outpatient, maternity, laboratory, dental, pediatrics and pharmacy services on Malindi-Lamu Road." },
      { property: "og:title", content: "Our Services — Kijanaheri Medical Centre" },
      { property: "og:description", content: "Comprehensive outpatient and specialist care under one roof." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("services.title")}</span>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Care designed around you</h1>
        <p className="mt-3 text-muted-foreground">
          From routine checkups to specialist consultations, our team delivers safe, evidence-based care.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.id}
              to="/book"
              search={{ service: s.id }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{t(s.titleKey)}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{t(s.descKey)}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">From KES {s.priceKES.toLocaleString()}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  Book <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
