import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, HeartHandshake, Sparkles, Target, Eye, Lightbulb, Award, ScrollText, Users, Ambulance, Stethoscope, ClipboardList } from "lucide-react";
import clinicFront from "@/assets/clinic-front.jpg";
import entranceImg from "@/assets/clinic-entrance.jpg";
import receptionImg from "@/assets/reception.jpg";
import wardImg from "@/assets/ward.jpg";
import corridorImg from "@/assets/corridor.jpg";
import nursesImg from "@/assets/team/nurses.jpg";
import adminStaffImg from "@/assets/team/admin-staff.jpg";
import supportStaffImg from "@/assets/team/support-staff.jpg";
import medicalTeamImg from "@/assets/team/medical-team.jpg";
import fullStaffImg from "@/assets/team/full-staff.jpg";
import communityHealthImg from "@/assets/team/community-health.jpg";
import ambulanceImg from "@/assets/team/ambulance.jpg";
import ambulanceDriverImg from "@/assets/team/ambulance-driver.jpg";

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

      {/* Mission & Vision */}
      <section className="mt-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <ScrollText className="h-3.5 w-3.5" /> What drives us
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Mission &amp; Vision</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            The promises that shape every interaction, every diagnosis, and every patient journey at Kijanaheri.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Mission card */}
          <article className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-elev)] sm:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-md">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Our Mission</h3>
              </div>
              <p className="mt-6 text-lg font-bold uppercase leading-relaxed tracking-wide sm:text-xl">
                TO BUILD LONG-TERM RELATIONSHIPS WITH OUR CUSTOMERS AND PROVIDE EXCEPTIONAL SERVICES THROUGH
                <span className="text-primary"> INNOVATION</span> AND
                <span className="text-primary"> ADVANCED TECHNOLOGY</span>.
              </p>
            </div>
          </article>

          {/* Vision card */}
          <article className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-elev)] sm:p-10">
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-md">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Our Vision</h3>
              </div>
              <p className="mt-6 text-lg font-bold uppercase leading-relaxed tracking-wide sm:text-xl">
                TO BE AN <span className="text-primary">ULTRA-MODERN HEALTH FACILITY</span> THAT PROVIDES ENHANCED SERVICES BY OFFERING
                <span className="text-primary"> QUALITY, TIMELY AND AFFORDABLE</span> CARE THAT BUILDS CUSTOMER RELATIONSHIPS AND SUSTAINS PROFITABILITY.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Core Values */}
      <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary-soft)] via-card to-[var(--primary-soft)]/40 p-8 ring-1 ring-border sm:p-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur">
            <Award className="h-3.5 w-3.5" /> Core values
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">The principles we live by</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            More than words on a wall — these values guide every decision our team makes.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Lightbulb, t: "Creativity", d: "We approach every patient need with fresh thinking and care designed around them." },
            { icon: Sparkles, t: "Invention & Innovation", d: "Embracing modern tools and methods to deliver smarter, faster, better outcomes." },
            { icon: ShieldCheck, t: "Honesty", d: "Transparent diagnoses, fair pricing, and clear communication — always." },
            { icon: HeartHandshake, t: "Integrity", d: "Doing what's right for our patients, even when no one is watching." },
          ].map((v, i) => (
            <div
              key={v.t}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-[var(--shadow-elev)]"
            >
              <div className="absolute right-3 top-3 text-5xl font-black text-primary/5 transition group-hover:text-primary/10">
                0{i + 1}
              </div>
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="mt-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Users className="h-3.5 w-3.5" /> Our team
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">The people behind your care</h2>
          <p className="mt-3 text-muted-foreground">
            Doctors, clinical officers, nurses, administrators and support staff — every member of the
            Kijanaheri family is committed to the same promise: safe, dignified, world-class care.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-6 sm:grid-rows-2 lg:gap-5">
          <TeamCard className="sm:col-span-4 sm:row-span-2" src={medicalTeamImg} icon={Stethoscope} eyebrow="Clinical team" title="Doctors & clinical officers" body="A multidisciplinary team led by experienced clinicians delivering outpatient, maternity, dental, paediatric and specialist care." />
          <TeamCard className="sm:col-span-2" src={nursesImg} icon={HeartHandshake} eyebrow="Nursing" title="Our nurses" body="Round-the-clock nursing care, triage and patient education." />
          <TeamCard className="sm:col-span-2" src={adminStaffImg} icon={ClipboardList} eyebrow="Administration" title="Administrative staff" body="Reception, billing and patient coordination — keeping everything running smoothly." />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:gap-5">
          <TeamCard src={supportStaffImg} icon={ShieldCheck} eyebrow="Support" title="Support staff" body="Cleaning, security and logistics teams who keep the facility safe and spotless." />
          <TeamCard src={communityHealthImg} icon={Users} eyebrow="Community health" title="Community outreach" body="Community health workers extending care beyond our walls — under the Neli Juu programme." />
          <TeamCard src={fullStaffImg} icon={Award} eyebrow="One family" title="Kijanaheri family" body="Together — clinical, administrative and support staff — we are one team for our community." />
        </div>

        {/* Ambulance highlight */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted md:aspect-auto">
              <img src={ambulanceImg} alt="Kijanaheri Medical Centre ambulance" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-destructive">
                <Ambulance className="h-3.5 w-3.5" /> 24/7 Ambulance service
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Emergency response, on call</h3>
              <p className="mt-3 text-muted-foreground">
                Our fully-equipped ambulance and trained crew are ready around the clock to bring patients to
                Kijanaheri quickly and safely from anywhere along the Malindi-Lamu corridor.
              </p>
              <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-border">
                <img src={ambulanceDriverImg} alt="Ambulance driver and crew at Kijanaheri Medical Centre" className="h-40 w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamCard({
  src, icon: Icon, eyebrow, title, body, className = "",
}: {
  src: string;
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  
  body: string;
  className?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-border ${className}`}>
      <div className="aspect-[4/3] h-full w-full overflow-hidden bg-muted">
        <img src={src} alt={title} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-90">
          <Icon className="h-3.5 w-3.5" /> {eyebrow}
        </div>
        <div className="mt-1 font-display text-lg font-bold leading-tight sm:text-xl">{title}</div>
        <p className="mt-1 hidden text-sm text-white/85 sm:block">{body}</p>
      </figcaption>
    </figure>
  );
}
