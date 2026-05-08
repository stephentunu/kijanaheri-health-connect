import { Outlet, Link, createRootRoute, useLocation } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { CLINIC } from "@/lib/clinic-data";
import { Phone, Menu, MessageCircle, Stethoscope, Languages, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { name: "robots", content: "index,follow" },
      { name: "author", content: "Kijanaheri Medical Centre" },
      { name: "geo.region", content: "KE" },
      { name: "geo.placename", content: "Malindi, Kenya" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@kijanaheri" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <EmergencyBar />
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <WhatsAppFab />
        <Toaster richColors position="top-center" />
      </div>
    </I18nProvider>
  );
}

function EmergencyBar() {
  const { t } = useI18n();
  return (
    <div className="sticky top-0 z-50 w-full bg-[var(--emergency)] text-[var(--emergency-foreground)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-1.5 text-xs sm:text-sm">
        <span className="flex items-center gap-2 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          {t("emergency.label")}
        </span>
        <a
          href={`tel:${CLINIC.emergency.replace(/\s/g, "")}`}
          className="flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 font-semibold transition hover:bg-white/25"
        >
          <Phone className="h-3.5 w-3.5" />
          <span className="hidden xs:inline">{CLINIC.emergency}</span>
          <span className="xs:hidden">{t("emergency.cta")}</span>
        </a>
      </div>
    </div>
  );
}

const navLinks = [
  { to: "/" as const, key: "nav.home" },
  { to: "/services" as const, key: "nav.services" },
  { to: "/doctors" as const, key: "nav.doctors" },
  { to: "/director" as const, key: "nav.director" },
  { to: "/about" as const, key: "nav.about" },
  { to: "/contact" as const, key: "nav.contact" },
];

function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-7 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md sm:top-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-card)]">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">Kijanaheri</div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Medical Centre</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "sw" : "en")}
            className="hidden items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-semibold uppercase text-muted-foreground transition hover:border-primary hover:text-primary sm:flex"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "en" ? "SW" : "EN"}
          </button>

          <Button asChild size="sm" className="hidden bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] sm:inline-flex">
            <Link to="/book">{t("cta.book")}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium hover:bg-accent/30"
                  >
                    {t(l.key)}
                  </Link>
                ))}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setLang(lang === "en" ? "sw" : "en")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2.5 text-sm font-semibold uppercase"
                  >
                    <Languages className="h-4 w-4" />
                    {lang === "en" ? "Swahili" : "English"}
                  </button>
                </div>
                <Button asChild className="mt-3 w-full bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
                  <Link to="/book" onClick={() => setOpen(false)}>{t("cta.book")}</Link>
                </Button>
                <a
                  href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}
                  className="mt-2 flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm font-medium"
                >
                  <Phone className="h-4 w-4" />
                  {CLINIC.phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-[var(--primary-soft)]/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] text-white">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div className="font-display text-base font-bold">{CLINIC.name}</div>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Quality, compassionate healthcare for every Kenyan family.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t("footer.quick")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-primary">{t(l.key)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t("footer.contact")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>{CLINIC.address}</li>
            <li><a href={`tel:${CLINIC.phone}`} className="hover:text-primary">{CLINIC.phone}</a></li>
            <li><a href={`mailto:${CLINIC.email}`} className="hover:text-primary">{CLINIC.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} {CLINIC.name}. {t("footer.rights")}
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  const { t } = useI18n();
  const [hide, setHide] = useState(false);
  if (hide) return null;
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      <a
        href={`https://wa.me/${CLINIC.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-elev)] transition hover:scale-105"
        aria-label={t("cta.whatsapp")}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">{t("cta.whatsapp")}</span>
      </a>
      <button
        onClick={() => setHide(true)}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/70 text-background shadow"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
