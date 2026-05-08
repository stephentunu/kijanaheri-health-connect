import { createFileRoute } from "@tanstack/react-router";
import { CLINIC } from "@/lib/clinic-data";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import clinicFront from "@/assets/clinic-front.jpg";

import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildSeo({
    title: "Contact Us | Kijanaheri Medical Centre",
    description: "Visit, call or WhatsApp Kijanaheri Medical Centre on Malindi-Lamu Road. Open 24/7 for emergencies.",
    path: "/contact",
    image: clinicFront,
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">We're here to help</h1>
          <p className="mt-3 text-muted-foreground">
            Reach out for appointments, follow-ups, or anything else. Our front desk responds within minutes.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-border">
          <img
            src={clinicFront}
            alt="Kijanaheri Medical Centre — look for our signage on Malindi-Lamu Road"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <ContactCard icon={Phone} label="Call us" value={CLINIC.phone} href={`tel:${CLINIC.phone.replace(/\s/g, "")}`} />
        <ContactCard icon={MessageCircle} label="WhatsApp" value={`+${CLINIC.whatsapp}`} href={`https://wa.me/${CLINIC.whatsapp}`} accent />
        <ContactCard icon={Mail} label="Email" value={CLINIC.email} href={`mailto:${CLINIC.email}`} />
        <ContactCard icon={MapPin} label="Visit us" value={CLINIC.address} />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">Opening hours</div>
            <div className="text-sm text-muted-foreground">Mon–Sat: 7:00 AM – 9:00 PM • Sun: 8:00 AM – 6:00 PM</div>
            <div className="mt-1 text-sm font-medium text-[var(--emergency)]">Emergency: 24 hours / 7 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  icon: Icon, label, value, href, accent,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; accent?: boolean }) {
  const inner = (
    <div className={`group flex items-start gap-4 rounded-2xl border p-5 transition ${accent ? "border-[#25D366]/20 bg-[#25D366]/5 hover:border-[#25D366]/40" : "border-border bg-card hover:border-primary/30"}`}>
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent ? "bg-[#25D366] text-white" : "bg-primary/10 text-primary"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="mt-0.5 font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{inner}</a> : inner;
}
