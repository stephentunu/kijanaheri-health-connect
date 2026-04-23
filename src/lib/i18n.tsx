import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "sw";

type Dict = Record<string, { en: string; sw: string }>;

export const dict: Dict = {
  "nav.home": { en: "Home", sw: "Mwanzo" },
  "nav.services": { en: "Services", sw: "Huduma" },
  "nav.doctors": { en: "Doctors", sw: "Madaktari" },
  "nav.director": { en: "Director", sw: "Mkurugenzi" },
  "nav.about": { en: "About", sw: "Kuhusu" },
  "nav.contact": { en: "Contact", sw: "Wasiliana" },
  "cta.book": { en: "Book Appointment", sw: "Weka Miadi" },
  "cta.bookNow": { en: "Book Now", sw: "Weka Sasa" },
  "cta.learnMore": { en: "Learn more", sw: "Soma zaidi" },
  "cta.call": { en: "Call us", sw: "Tupigie simu" },
  "cta.whatsapp": { en: "Chat on WhatsApp", sw: "Piga WhatsApp" },
  "emergency.label": { en: "24/7 Emergency", sw: "Dharura Saa 24" },
  "emergency.cta": { en: "Call now", sw: "Piga sasa" },

  "hero.eyebrow": { en: "Trusted care in your community", sw: "Huduma ya kuaminika" },
  "hero.title": { en: "Quality healthcare for every Kenyan family", sw: "Afya bora kwa kila familia ya Kenya" },
  "hero.sub": { en: "Outpatient, maternity, laboratory and more — book in under a minute.", sw: "Huduma za nje, uzazi, maabara na zaidi — weka miadi kwa dakika moja." },

  "services.title": { en: "Our services", sw: "Huduma zetu" },
  "services.outpatient": { en: "Outpatient", sw: "Wagonjwa wa Nje" },
  "services.outpatient.desc": { en: "Same-day consultations with experienced clinicians.", sw: "Mashauriano ya siku moja na waganga wenye ujuzi." },
  "services.maternity": { en: "Maternity", sw: "Uzazi" },
  "services.maternity.desc": { en: "Antenatal, delivery and postnatal care for mother and baby.", sw: "Huduma za kabla, wakati na baada ya kujifungua." },
  "services.lab": { en: "Laboratory", sw: "Maabara" },
  "services.lab.desc": { en: "Accurate diagnostics with fast turnaround.", sw: "Vipimo sahihi kwa muda mfupi." },
  "services.pharmacy": { en: "Pharmacy", sw: "Duka la Dawa" },
  "services.pharmacy.desc": { en: "Genuine medication dispensed by licensed pharmacists.", sw: "Dawa halisi kutoka kwa wataalamu." },
  "services.dental": { en: "Dental", sw: "Meno" },
  "services.dental.desc": { en: "Cleaning, fillings, extractions and more.", sw: "Usafi, kujaza, kung'oa na zaidi." },
  "services.pediatrics": { en: "Pediatrics", sw: "Watoto" },
  "services.pediatrics.desc": { en: "Compassionate care for infants and children.", sw: "Huduma ya upendo kwa watoto." },

  "doctors.title": { en: "Meet our doctors", sw: "Kutana na madaktari" },
  "doctors.sub": { en: "Board-certified specialists committed to your wellbeing.", sw: "Wataalamu walioidhinishwa kwa afya yako." },

  "book.title": { en: "Book an appointment", sw: "Weka miadi" },
  "book.step1": { en: "Service", sw: "Huduma" },
  "book.step2": { en: "Doctor", sw: "Daktari" },
  "book.step3": { en: "Date & time", sw: "Tarehe na wakati" },
  "book.step4": { en: "Your details", sw: "Maelezo yako" },
  "book.step5": { en: "Payment", sw: "Malipo" },
  "book.step6": { en: "Confirm", sw: "Thibitisha" },
  "book.next": { en: "Continue", sw: "Endelea" },
  "book.back": { en: "Back", sw: "Rudi" },
  "book.confirm": { en: "Confirm booking", sw: "Thibitisha miadi" },
  "book.success": { en: "Appointment requested", sw: "Miadi imewekwa" },
  "book.successDesc": { en: "We'll send a confirmation shortly.", sw: "Utapata uthibitisho hivi karibuni." },

  "footer.rights": { en: "All rights reserved.", sw: "Haki zote zimehifadhiwa." },
  "footer.quick": { en: "Quick links", sw: "Viungo" },
  "footer.contact": { en: "Contact", sw: "Mawasiliano" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof dict | string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (stored === "en" || stored === "sw") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: string) => {
    const entry = dict[k as keyof typeof dict];
    if (!entry) return k;
    return entry[lang];
  };

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
