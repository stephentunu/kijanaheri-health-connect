import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-doctor.jpg";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { services, doctors } from "@/lib/clinic-data";
import { ArrowRight, ShieldCheck, Clock, Award, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kijanaheri Medical Centre | Quality healthcare in Kenya" },
      { name: "description", content: "Outpatient, maternity, laboratory and more. Book online in under a minute with trusted clinicians." },
      { property: "og:title", content: "Kijanaheri Medical Centre" },
      { property: "og:description", content: "Quality healthcare for every Kenyan family." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-soft)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:py-20 lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              {t("hero.sub")}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
                <Link to="/book">
                  {t("cta.bookNow")} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border">
                <Link to="/services">{t("cta.learnMore")}</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                { v: "25+", l: "Years of care" },
                { v: "50k+", l: "Patients served" },
                { v: "24/7", l: "Emergency" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-primary sm:text-3xl">{s.v}</div>
                  <div className="text-xs text-muted-foreground sm:text-sm">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[image:var(--gradient-brand)] opacity-10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-elev)] ring-1 ring-primary/10">
              <img
                src={heroImg}
                alt="Doctor consulting a patient at Kijanaheri Medical Centre"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-background p-4 shadow-[var(--shadow-card)] ring-1 ring-border sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Accredited care</div>
                  <div className="text-xs text-muted-foreground">KMPDC certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Clock, t: "Same-day appointments", d: "Walk in or book online" },
            { icon: ShieldCheck, t: "NHIF & insurance", d: "We accept major covers" },
            { icon: Award, t: "Experienced clinicians", d: "Board-certified specialists" },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{f.t}</div>
                <div className="text-sm text-muted-foreground">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("services.title")}</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Comprehensive outpatient and specialist care under one roof.
            </p>
          </div>
          <Link to="/services" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Doctors preview */}
      <section className="bg-[var(--primary-soft)]/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("doctors.title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("doctors.sub")}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d) => (
              <div
                key={d.id}
                className="rounded-2xl bg-background p-5 shadow-[var(--shadow-soft)] ring-1 ring-border transition hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] font-display text-lg font-bold text-white">
                  {d.initials}
                </div>
                <div className="mt-4 text-base font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.title}</div>
                <div className="mt-2 text-sm font-medium text-primary">{d.specialty}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-brand)] p-8 text-primary-foreground shadow-[var(--shadow-elev)] sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">Ready to see a doctor?</h3>
              <p className="mt-2 max-w-md text-primary-foreground/80">
                Book your appointment online — confirmation in minutes.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:opacity-90">
                <Link to="/book">{t("cta.bookNow")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <a href="tel:+254700000000"><Phone className="mr-1 h-4 w-4" />{t("cta.call")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ service }: { service: typeof services[number] }) {
  const { t } = useI18n();
  const Icon = service.icon;
  return (
    <Link
      to="/book"
      search={{ service: service.id }}
      className="group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-card)]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{t(service.titleKey)}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t(service.descKey)}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-medium text-primary">From KES {service.priceKES.toLocaleString()}</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </Link>
  );
}
