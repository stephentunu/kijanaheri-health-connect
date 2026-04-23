import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import clinicFront from "@/assets/clinic-front.jpg";
import entranceImg from "@/assets/clinic-entrance.jpg";
import receptionImg from "@/assets/reception.jpg";
import wardImg from "@/assets/ward.jpg";
import corridorImg from "@/assets/corridor.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Kijanaheri Medical Centre" },
      { name: "description", content: "Our mission, values, and commitment to quality healthcare in Kenya." },
      { property: "og:title", content: "About Kijanaheri Medical Centre" },
      { property: "og:description", content: "Our mission, values, and commitment to quality healthcare in Kenya." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">About us</span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">A clinic built around our community</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            For over 25 years, Kijanaheri Medical Centre has provided dignified, affordable healthcare to families along the Malindi-Lamu Road and beyond.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-elev)] ring-1 ring-border">
          <img
            src={clinicFront}
            alt="Kijanaheri Medical Centre — main building and signage"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </header>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, t: "Safety first", d: "Every protocol guided by international standards." },
          { icon: HeartHandshake, t: "Compassion", d: "We treat patients the way we'd treat our own family." },
          { icon: Sparkles, t: "Excellence", d: "Continuous training and modern equipment." },
        ].map((v) => (
          <div key={v.t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <v.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{v.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Inside the clinic</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Built for safe, dignified care</h2>
          <p className="mt-3 text-muted-foreground">
            Wheelchair-accessible entrances, a welcoming reception, modern wards and bright corridors — every detail designed with patients in mind.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: entranceImg, alt: "Wheelchair-accessible covered entrance", label: "Accessible entrance" },
            { src: receptionImg, alt: "Reception and triage desk", label: "Reception & triage" },
            { src: wardImg, alt: "Clean inpatient ward with monitored beds", label: "Inpatient ward" },
            { src: corridorImg, alt: "Bright tiled patient corridor", label: "Patient corridor" },
          ].map((p) => (
            <figure
              key={p.label}
              className="group overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-border"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <figcaption className="bg-card px-4 py-3 text-sm font-semibold">{p.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-[var(--primary-soft)]/50 p-8 sm:p-10">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our mission</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          To deliver accessible, evidence-based healthcare with warmth and respect — empowering every patient to live a healthier life.
        </p>
      </section>
    </div>
  );
}
