import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { format, isBefore, startOfDay } from "date-fns";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { services, doctors, TIME_SLOTS, type Doctor, type Service } from "@/lib/clinic-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Check, ChevronLeft, ChevronRight, CalendarDays, Clock, User, Smartphone, Sparkles, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  service: z.string().optional(),
  doctor: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Book an appointment | Kijanaheri Medical Centre" },
      { name: "description", content: "Book your medical appointment online in under a minute. Choose service, doctor, date and time." },
      { property: "og:title", content: "Book an appointment — Kijanaheri Medical Centre" },
      { property: "og:description", content: "Quick, easy online booking with confirmation in minutes." },
    ],
  }),
  component: BookPage,
});

type Step = 0 | 1 | 2 | 3 | 4 | 5;

interface BookingState {
  serviceId: string | null;
  doctorId: string | null;
  date: Date | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
  notes: string;
  payment: "mpesa" | "cash" | "insurance" | null;
}

const phoneRegex = /^(?:\+?254|0)?[17]\d{8}$/;

function BookPage() {
  const { t } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [state, setState] = useState<BookingState>({
    serviceId: search.service ?? null,
    doctorId: search.doctor ?? null,
    date: null,
    time: null,
    name: "",
    phone: "",
    email: "",
    notes: "",
    payment: null,
  });

  // If a doctor is preselected, pick a sensible service for them
  useEffect(() => {
    if (state.doctorId && !state.serviceId) {
      const d = doctors.find((x) => x.id === state.doctorId);
      if (d) setState((s) => ({ ...s, serviceId: d.serviceIds[0] ?? null }));
    }
  }, [state.doctorId, state.serviceId]);

  const selectedService = services.find((s) => s.id === state.serviceId) ?? null;
  const selectedDoctor = doctors.find((d) => d.id === state.doctorId) ?? null;

  const eligibleDoctors = useMemo(
    () => (state.serviceId ? doctors.filter((d) => d.serviceIds.includes(state.serviceId!)) : doctors),
    [state.serviceId],
  );

  const stepLabels = [
    t("book.step1"), t("book.step2"), t("book.step3"),
    t("book.step4"), t("book.step5"), t("book.step6"),
  ];

  const canContinue = (): boolean => {
    switch (step) {
      case 0: return !!state.serviceId;
      case 1: return !!state.doctorId;
      case 2: return !!state.date && !!state.time;
      case 3: return state.name.trim().length >= 2 && phoneRegex.test(state.phone.trim()) && (state.email === "" || z.string().email().safeParse(state.email).success);
      case 4: return !!state.payment;
      default: return true;
    }
  };

  const next = () => {
    if (!canContinue()) {
      if (step === 3) toast.error("Please enter a valid name and Kenyan phone number");
      return;
    }
    setStep((s) => Math.min(5, (s + 1)) as Step);
  };
  const back = () => setStep((s) => Math.max(0, (s - 1)) as Step);

  const submit = () => {
    toast.success(t("book.success"), { description: t("book.successDesc") });
    setStep(5);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("book.title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Takes less than a minute.</p>
      </header>

      <Stepper labels={stepLabels} current={step} />

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-7">
        {step === 0 && <StepService state={state} setState={setState} />}
        {step === 1 && <StepDoctor state={state} setState={setState} doctors={eligibleDoctors} />}
        {step === 2 && <StepDateTime state={state} setState={setState} />}
        {step === 3 && <StepDetails state={state} setState={setState} />}
        {step === 4 && <StepPayment state={state} setState={setState} service={selectedService} />}
        {step === 5 && <StepConfirm state={state} service={selectedService} doctor={selectedDoctor} onHome={() => navigate({ to: "/" })} />}

        {step < 5 && (
          <div className="mt-7 flex items-center justify-between gap-3 border-t border-border pt-5">
            <Button
              variant="ghost"
              onClick={back}
              disabled={step === 0}
              className="text-muted-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> {t("book.back")}
            </Button>
            {step === 4 ? (
              <Button onClick={submit} disabled={!canContinue()} className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
                {t("book.confirm")} <Check className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={next} disabled={!canContinue()} className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
                {t("book.next")} <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Stepper({ labels, current }: { labels: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-1 overflow-x-auto pb-1">
      {labels.map((l, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={l} className="flex items-center gap-1">
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition",
                done && "bg-primary text-primary-foreground",
                active && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                !done && !active && "bg-muted text-muted-foreground",
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={cn("hidden whitespace-nowrap text-xs font-medium sm:inline", active ? "text-foreground" : "text-muted-foreground")}>
              {l}
            </span>
            {i < labels.length - 1 && <span className="mx-1 h-px w-4 bg-border sm:w-8" />}
          </li>
        );
      })}
    </ol>
  );
}

function StepService({ state, setState }: { state: BookingState; setState: React.Dispatch<React.SetStateAction<BookingState>> }) {
  const { t } = useI18n();
  return (
    <div>
      <h2 className="text-lg font-semibold">Choose a service</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {services.map((s) => {
          const Icon = s.icon;
          const active = state.serviceId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setState((p) => ({ ...p, serviceId: s.id, doctorId: null }))}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4 text-left transition",
                active ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/30",
              )}
            >
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary")}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{t(s.titleKey)}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{t(s.descKey)}</div>
                <div className="mt-1 text-xs font-medium text-primary">From KES {s.priceKES.toLocaleString()}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDoctor({ state, setState, doctors: list }: { state: BookingState; setState: React.Dispatch<React.SetStateAction<BookingState>>; doctors: Doctor[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Choose a doctor</h2>
      <p className="text-xs text-muted-foreground">Available for the selected service.</p>
      {list.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No doctors match — pick another service.</p>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {list.map((d) => {
            const active = state.doctorId === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setState((p) => ({ ...p, doctorId: d.id }))}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 text-left transition",
                  active ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/30",
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] font-display text-base font-bold text-white">
                  {d.initials}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.title}</div>
                  <div className="mt-1 text-xs font-medium text-primary">{d.specialty}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StepDateTime({ state, setState }: { state: BookingState; setState: React.Dispatch<React.SetStateAction<BookingState>> }) {
  const today = startOfDay(new Date());
  return (
    <div>
      <h2 className="text-lg font-semibold">Pick a date and time</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-[auto,1fr]">
        <div className="rounded-xl border border-border bg-background p-2">
          <Calendar
            mode="single"
            selected={state.date ?? undefined}
            onSelect={(d) => setState((p) => ({ ...p, date: d ?? null, time: null }))}
            disabled={(d) => isBefore(d, today) || d.getDay() === 0}
            initialFocus
            className={cn("p-2 pointer-events-auto")}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4 text-primary" />
            {state.date ? format(state.date, "EEEE, MMM d") : "Select a date first"}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {TIME_SLOTS.map((slot) => {
              const active = state.time === slot;
              const disabled = !state.date;
              return (
                <button
                  key={slot}
                  disabled={disabled}
                  onClick={() => setState((p) => ({ ...p, time: slot }))}
                  className={cn(
                    "rounded-lg border px-2 py-2 text-sm font-semibold transition",
                    disabled && "cursor-not-allowed opacity-40",
                    !disabled && active && "border-primary bg-primary text-primary-foreground",
                    !disabled && !active && "border-border hover:border-primary/40 hover:bg-primary/5",
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Sundays are reserved for emergencies. Past dates are disabled.</p>
        </div>
      </div>
    </div>
  );
}

function StepDetails({ state, setState }: { state: BookingState; setState: React.Dispatch<React.SetStateAction<BookingState>> }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Your details</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" value={state.name} onChange={(e) => setState((p) => ({ ...p, name: e.target.value }))} placeholder="Jane Wanjiku" maxLength={80} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="phone">Phone (M-Pesa) *</Label>
          <Input id="phone" inputMode="tel" value={state.phone} onChange={(e) => setState((p) => ({ ...p, phone: e.target.value }))} placeholder="07XX XXX XXX" maxLength={15} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" type="email" value={state.email} onChange={(e) => setState((p) => ({ ...p, email: e.target.value }))} placeholder="you@example.com" maxLength={120} className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Reason for visit (optional)</Label>
          <Textarea id="notes" value={state.notes} onChange={(e) => setState((p) => ({ ...p, notes: e.target.value }))} placeholder="Briefly describe symptoms or reason..." maxLength={500} className="mt-1.5 resize-none" rows={3} />
        </div>
      </div>
    </div>
  );
}

function StepPayment({ state, setState, service }: { state: BookingState; setState: React.Dispatch<React.SetStateAction<BookingState>>; service: Service | null }) {
  const options = [
    { id: "mpesa" as const, icon: Smartphone, title: "M-Pesa", desc: "Pay via STK push (coming soon — placeholder)" },
    { id: "cash" as const, icon: Banknote, title: "Pay at clinic", desc: "Cash or card on arrival" },
    { id: "insurance" as const, icon: Sparkles, title: "Insurance / NHIF", desc: "Bring your card to reception" },
  ];
  return (
    <div>
      <h2 className="text-lg font-semibold">Payment method</h2>
      {service && (
        <div className="mt-3 rounded-lg bg-primary/5 px-4 py-3 text-sm">
          Estimated consultation fee: <span className="font-semibold text-primary">KES {service.priceKES.toLocaleString()}</span>
        </div>
      )}
      <div className="mt-4 space-y-3">
        {options.map((o) => {
          const active = state.payment === o.id;
          const Icon = o.icon;
          return (
            <button
              key={o.id}
              onClick={() => setState((p) => ({ ...p, payment: o.id }))}
              className={cn(
                "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition",
                active ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/30",
              )}
            >
              <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg", active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary")}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{o.title}</div>
                <div className="text-xs text-muted-foreground">{o.desc}</div>
              </div>
              <div className={cn("h-5 w-5 rounded-full border-2", active ? "border-primary bg-primary" : "border-border")}>
                {active && <Check className="h-full w-full text-primary-foreground" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        M-Pesa STK push integration is a placeholder. No real payment will be processed in this preview.
      </p>
    </div>
  );
}

function StepConfirm({ state, service, doctor, onHome }: { state: BookingState; service: Service | null; doctor: Doctor | null; onHome: () => void }) {
  const { t } = useI18n();
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
        <Check className="h-8 w-8" strokeWidth={3} />
      </div>
      <h2 className="mt-4 text-2xl font-bold">{t("book.success")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("book.successDesc")}</p>

      <div className="mx-auto mt-6 max-w-md rounded-xl border border-border bg-background p-5 text-left">
        <SummaryRow icon={Sparkles} label="Service" value={service ? t(service.titleKey) : "—"} />
        <SummaryRow icon={User} label="Doctor" value={doctor?.name ?? "—"} />
        <SummaryRow icon={CalendarDays} label="Date" value={state.date ? format(state.date, "EEEE, MMM d, yyyy") : "—"} />
        <SummaryRow icon={Clock} label="Time" value={state.time ?? "—"} />
        <SummaryRow icon={User} label="Patient" value={state.name} />
        <SummaryRow icon={Smartphone} label="Phone" value={state.phone} last />
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <Button onClick={onHome} variant="outline">Back to home</Button>
      </div>
    </div>
  );
}

function SummaryRow({ icon: Icon, label, value, last }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; last?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 py-2.5", !last && "border-b border-border/60")}>
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
