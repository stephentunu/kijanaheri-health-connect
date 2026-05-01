import { Stethoscope, Baby, FlaskConical, Pill, Smile, HeartPulse, type LucideIcon } from "lucide-react";
import drBrian from "@/assets/team/dr-brian.jpg";
import esther from "@/assets/team/esther-nyongesa.jpg";
import zoril from "@/assets/team/zoril-herman.jpg";
import james from "@/assets/team/james-orthopedic.jpg";
import natasha from "@/assets/team/natasha-physio.jpg";
import imgOutpatient from "@/assets/doctor-room.jpg";
import imgMaternity from "@/assets/maternity-wing.jpg";
import imgLab from "@/assets/lab-tech.jpg";
import imgPharmacy from "@/assets/pharmacy.jpg";
import imgWard from "@/assets/ward.jpg";
import imgReception from "@/assets/reception.jpg";

export interface Service {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  priceKES: number;
  photo: string;
}

export const services: Service[] = [
  { id: "outpatient", icon: Stethoscope, titleKey: "services.outpatient", descKey: "services.outpatient.desc", priceKES: 1500, photo: imgOutpatient },
  { id: "maternity", icon: Baby, titleKey: "services.maternity", descKey: "services.maternity.desc", priceKES: 2500, photo: imgMaternity },
  { id: "lab", icon: FlaskConical, titleKey: "services.lab", descKey: "services.lab.desc", priceKES: 1000, photo: imgLab },
  { id: "pharmacy", icon: Pill, titleKey: "services.pharmacy", descKey: "services.pharmacy.desc", priceKES: 500, photo: imgPharmacy },
  { id: "dental", icon: Smile, titleKey: "services.dental", descKey: "services.dental.desc", priceKES: 2000, photo: imgReception },
  { id: "pediatrics", icon: HeartPulse, titleKey: "services.pediatrics", descKey: "services.pediatrics.desc", priceKES: 1800, photo: imgWard },
];

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  serviceIds: string[];
  initials: string;
  bio: string;
  photo: string;
}

export const doctors: Doctor[] = [
  { id: "brian", name: "Dr. Brian", title: "Medical Officer", specialty: "General Medicine & Outpatient Care", serviceIds: ["outpatient", "pediatrics"], initials: "DB", bio: "Medical officer leading day-to-day clinical care, diagnosis and treatment for patients of all ages.", photo: drBrian },
  { id: "esther", name: "Esther Nyongesa", title: "Clinical Officer", specialty: "Outpatient & Primary Care", serviceIds: ["outpatient", "maternity"], initials: "EN", bio: "Clinical officer dedicated to compassionate primary care and patient-centred consultations.", photo: esther },
  { id: "zoril", name: "Zoril Herman", title: "Clinical Officer", specialty: "Outpatient & Emergency", serviceIds: ["outpatient", "pediatrics"], initials: "ZH", bio: "Clinical officer with broad experience in outpatient consultations and emergency triage.", photo: zoril },
  { id: "james", name: "James", title: "Orthopaedic Specialist", specialty: "Orthopaedics & Trauma", serviceIds: ["outpatient"], initials: "JM", bio: "Orthopaedic specialist managing fractures, joint care, sports injuries and musculoskeletal conditions.", photo: james },
  { id: "natasha", name: "Natasha Tunje", title: "Physiotherapist", specialty: "Physiotherapy & Rehabilitation", serviceIds: ["outpatient"], initials: "NT", bio: "Physiotherapist helping patients restore movement, manage pain and recover after injury or surgery.", photo: natasha },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Amina H.", role: "Maternity patient", quote: "Dr. Njeri and the maternity team made my delivery calm and safe. The care was outstanding from day one.", rating: 5 },
  { id: "t2", name: "James M.", role: "NHIF patient", quote: "Booked online in under a minute and was seen the same day. Friendly staff, clean facilities, fair pricing.", rating: 5 },
  { id: "t3", name: "Grace W.", role: "Parent", quote: "Dr. Kamau is wonderful with my kids. We finally have a clinic we trust on the Malindi-Lamu road.", rating: 5 },
];

export const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00",
];

export const CLINIC = {
  name: "Kijanaheri Medical Centre",
  phone: "0721230505",
  whatsapp: "254721230505",
  emergency: "0721230505",
  email: "care@kijanaheri.co.ke",
  address: "Malindi-Lamu Road, Kenya",
  director: {
    name: "Dr. David Shungu Mathole",
    title: "Facility Director",
    phone: "0721230505",
  },
};
