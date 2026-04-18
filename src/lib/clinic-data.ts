import { Stethoscope, Baby, FlaskConical, Pill, Smile, HeartPulse, type LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  priceKES: number;
}

export const services: Service[] = [
  { id: "outpatient", icon: Stethoscope, titleKey: "services.outpatient", descKey: "services.outpatient.desc", priceKES: 1500 },
  { id: "maternity", icon: Baby, titleKey: "services.maternity", descKey: "services.maternity.desc", priceKES: 2500 },
  { id: "lab", icon: FlaskConical, titleKey: "services.lab", descKey: "services.lab.desc", priceKES: 1000 },
  { id: "pharmacy", icon: Pill, titleKey: "services.pharmacy", descKey: "services.pharmacy.desc", priceKES: 500 },
  { id: "dental", icon: Smile, titleKey: "services.dental", descKey: "services.dental.desc", priceKES: 2000 },
  { id: "pediatrics", icon: HeartPulse, titleKey: "services.pediatrics", descKey: "services.pediatrics.desc", priceKES: 1800 },
];

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  serviceIds: string[];
  initials: string;
  bio: string;
}

export const doctors: Doctor[] = [
  { id: "njeri", name: "Dr. Mary Njeri", title: "MBChB, MMed (Obs/Gyn)", specialty: "Maternity & Women's Health", serviceIds: ["maternity", "outpatient"], initials: "MN", bio: "12+ years caring for mothers and newborns across Nairobi County." },
  { id: "otieno", name: "Dr. Brian Otieno", title: "MBChB", specialty: "General Practice", serviceIds: ["outpatient", "pediatrics"], initials: "BO", bio: "Family physician focused on preventive care and chronic disease management." },
  { id: "wanjiku", name: "Dr. Faith Wanjiku", title: "BDS", specialty: "Dental Surgery", serviceIds: ["dental"], initials: "FW", bio: "Restorative and cosmetic dentistry with a gentle approach." },
  { id: "kamau", name: "Dr. Samuel Kamau", title: "MBChB, MMed (Paeds)", specialty: "Pediatrics", serviceIds: ["pediatrics", "outpatient"], initials: "SK", bio: "Caring for children from newborn to adolescence." },
];

export const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00",
];

export const CLINIC = {
  name: "Kijanaheri Medical Centre",
  phone: "+254 700 000 000",
  whatsapp: "254700000000",
  emergency: "+254 711 111 111",
  email: "care@kijanaheri.co.ke",
  address: "Kenyatta Avenue, Nairobi, Kenya",
};
