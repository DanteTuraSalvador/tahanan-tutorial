// Centralized site configuration — update phone, address, fees, etc. here.
export const SITE = {
  name: "Tahanan Tutorial Center",
  shortName: "Tahanan",
  tagline: "Where every child finds their pace",
  teacherName: "Teacher Ana",
  teacherCredential: "BS Psychology",

  // Contact
  phoneDisplay: "+63 917 123 4567",
  phoneDigits: "639171234567", // E.164 without + for wa.me links
  phoneTel: "+639171234567",
  email: "hello@tahanantutorial.ph",
  facebookUrl: "https://facebook.com/TahananTutorialCenter",
  facebookHandle: "fb.com/TahananTutorialCenter",

  // Address (San Pedro, Laguna)
  address: {
    line1: "123 Sampaguita St., Brgy. Nueva",
    line2: "San Pedro, Laguna 4023",
    mapsQuery: "San Pedro, Laguna, Philippines"
  },

  // Hours
  hours: [
    "Mon–Fri · 1:00–7:00 PM",
    "Saturday · 8:00 AM–12:00 NN"
  ],

  // Fees
  fees: [
    { label: "Placement test", price: "Free", highlight: true },
    { label: "Registration (one-time)", price: "₱500" },
    { label: "1 subject / month", price: "₱1,800" },
    { label: "2 subjects / month", price: "₱3,200" },
    { label: "Materials & worksheets", price: "Included" }
  ],

  feesFootnote:
    "Fees include all daily homework materials and 2 sessions per week per subject. Siblings get 10% off. Makeup classes available with 24-hour notice."
};

// Helper to build a pre-filled WhatsApp/Viber message URL
export function buildWhatsAppUrl(message) {
  return `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(message)}`;
}

// Helper to build a Google Maps embed URL (no API key required)
export function buildMapEmbedUrl(query = SITE.address.mapsQuery) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
}
