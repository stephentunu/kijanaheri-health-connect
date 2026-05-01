import { createFileRoute, Link } from "@tanstack/react-router";
import { CLINIC } from "@/lib/clinic-data";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, Award, Stethoscope, Quote, GraduationCap, Sparkles } from "lucide-react";
import directorPhoto from "@/assets/team/director-mathole.jpg";

export const Route = createFileRoute("/director")({
  head: () => ({
    meta: [
      { title: "Facility Director — Dr. David Shungu Mathole | Kijanaheri Medical Centre" },
      { name: "description", content: "Meet Dr. David Shungu Mathole, Facility Director of Kijanaheri Medical Centre, leading our mission of innovative, compassionate healthcare." },
      { property: "og:title", content: "Dr. David Shungu Mathole — Facility Director" },
      { property: "og:description", content: "Leading Kijanaheri Medical Centre with a vision for ultra-modern, patient-centered care along the Malindi-Lamu corridor." },
    ],
  }),
  component: DirectorPage,
});

function DirectorPage() {
  const phoneTel = CLINIC.director.phone.replace(/\s/g, "");
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[var(--primary-soft)]/40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--primary-soft),_transparent_60%)]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-[1.05fr_1fr] md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Leadership
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {CLINIC.director.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-primary">
              {CLINIC.director.title} · {CLINIC.name}
            </p>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Dr. Mathole leads Kijanaheri Medical Centre with a steady hand and a forward-looking
              vision — championing innovation, advanced technology and lasting relationships with
              every patient we serve.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
                <a href={`tel:${phoneTel}`}>
                  <Phone className="mr-2 h-4 w-4" /> Call the Director
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#25D366]/30 bg-[#25D366]/5 text-foreground hover:bg-[#25D366]/10">
                <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4 text-[#25D366]" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[image:var(--gradient-brand)] opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-1 shadow-[var(--shadow-elev)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.4rem] bg-muted">
                <img
                  src={directorPhoto}
                  alt={`Portrait of ${CLINIC.director.name}, ${CLINIC.director.title} at ${CLINIC.name}`}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-90">
                    Facility Director
                  </div>
                  <div className="mt-1 font-display text-xl font-bold leading-tight">
                    {CLINIC.director.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="relative rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] sm:p-12">
          <Quote className="absolute -top-5 left-8 h-10 w-10 rounded-xl bg-primary p-2 text-primary-foreground shadow-[var(--shadow-card)]" />
          <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            &ldquo;Healthcare is built on trust. Our promise is to walk with every patient — with
            honesty, integrity and the very best technology — for the long journey of wellness.&rdquo;
          </p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            — {CLINIC.director.name}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-border bg-[var(--primary-soft)]/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">At a glance</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Leadership rooted in service
            </h2>
            <p className="mt-3 text-muted-foreground">
              A snapshot of Dr. Mathole's role at Kijanaheri Medical Centre. A fuller biography will
              be added soon.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Highlight
              icon={Award}
              title="Facility Director"
              body="Provides executive leadership, clinical governance and strategic direction for the centre."
            />
            <Highlight
              icon={Stethoscope}
              title="Patient-first care"
              body="Champions a culture where every patient is met with dignity, listened to, and treated holistically."
            />
            <Highlight
              icon={GraduationCap}
              title="Continuous innovation"
              body="Drives adoption of advanced technology and ongoing training so our team stays at the frontier."
            />
          </div>
        </div>
      </section>

      {/* Contact card */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <div className="grid gap-0 md:grid-cols-[1fr_1.2fr]">
            <div className="bg-[image:var(--gradient-brand)] p-8 text-white sm:p-10">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] opacity-90">Direct line</div>
              <div className="mt-3 font-display text-3xl font-bold leading-tight">
                Speak with the Director
              </div>
              <p className="mt-3 text-sm text-white/85">
                Available for patient concerns, partnerships and media enquiries.
              </p>
            </div>
            <div className="p-8 sm:p-10">
              <ContactRow icon={Phone} label="Phone" value={CLINIC.director.phone} href={`tel:${phoneTel}`} />
              <ContactRow icon={MessageCircle} label="WhatsApp" value={`+${CLINIC.whatsapp}`} href={`https://wa.me/${CLINIC.whatsapp}`} accent />
              <ContactRow icon={Mail} label="Email" value={CLINIC.email} href={`mailto:${CLINIC.email}`} />
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
                  <Link to="/book">Book an appointment</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/about">About the centre</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Highlight({
  icon: Icon, title, body,
}: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function ContactRow({
  icon: Icon, label, value, href, accent,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href: string; accent?: boolean }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-4 border-b border-border/60 py-4 last:border-b-0 hover:text-primary"
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent ? "bg-[#25D366]/10 text-[#25D366]" : "bg-primary/10 text-primary"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 font-medium">{value}</div>
      </div>
    </a>
  );
}
