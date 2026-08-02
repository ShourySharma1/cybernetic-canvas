import confStage from "@/assets/conf-stage.jpg";
import ctf from "@/assets/ctf.jpg";
import workshopImg from "@/assets/workshop.jpg";
import keynote from "@/assets/keynote.jpg";
import networking from "@/assets/networking.jpg";
import soc from "@/assets/soc.jpg";
import s1 from "@/assets/speaker-1.jpg";
import s2 from "@/assets/speaker-2.jpg";
import s3 from "@/assets/speaker-3.jpg";
import s4 from "@/assets/speaker-4.jpg";

export const images = { confStage, ctf, workshopImg, keynote, networking, soc };

export const gallery = [
  { src: confStage, title: "Opening Keynote", location: "Grand Hall", year: "2025" },
  { src: ctf, title: "Midnight CTF Finals", location: "Lab 04", year: "2025" },
  { src: workshopImg, title: "Red Team Bootcamp", location: "Studio B", year: "2025" },
  { src: keynote, title: "Zero Trust Deep Dive", location: "Main Stage", year: "2025" },
  { src: networking, title: "Nightfall Networking", location: "Atrium", year: "2025" },
  { src: soc, title: "Live SOC Simulation", location: "Ops Center", year: "2025" },
];

export const stats = [
  { label: "Active Members", value: 2400, suffix: "+" },
  { label: "Years Operating", value: 12, suffix: "" },
  { label: "Events Hosted", value: 186, suffix: "" },
  { label: "Workshops Run", value: 340, suffix: "+" },
  { label: "Awards Won", value: 27, suffix: "" },
];

export const speakers = [
  {
    name: "Dr. Elena Vasquez",
    role: "Principal Threat Researcher",
    org: "Northwind Labs",
    img: s1,
    topic: "Adversarial ML at Scale",
    accent: "primary" as const,
  },
  {
    name: "Marcus Reid",
    role: "Head of Offensive Security",
    org: "Helix Systems",
    img: s2,
    topic: "Breaking Modern Supply Chains",
    accent: "accent" as const,
  },
  {
    name: "Anika Rao",
    role: "Independent Researcher",
    org: "0xNULL Collective",
    img: s3,
    topic: "Firmware Implants in the Wild",
    accent: "violet" as const,
  },
  {
    name: "Daniel Okoye",
    role: "Chief Information Security Officer",
    org: "Meridian Bank",
    img: s4,
    topic: "Defending Critical Infrastructure",
    accent: "primary" as const,
  },
];

export const workshops = [
  {
    title: "Binary Exploitation",
    level: "Advanced",
    duration: "6 hrs",
    desc: "Stack, heap and ROP chains against modern mitigations — hands-on with live targets.",
  },
  {
    title: "Cloud Attack Paths",
    level: "Intermediate",
    duration: "4 hrs",
    desc: "Identity pivoting across AWS, Azure and GCP. From misconfig to full tenant compromise.",
  },
  {
    title: "Reverse Engineering",
    level: "Advanced",
    duration: "8 hrs",
    desc: "Static and dynamic analysis of packed samples, anti-debug bypass and unpacking.",
  },
  {
    title: "Threat Hunting",
    level: "Intermediate",
    duration: "5 hrs",
    desc: "Hypothesis-driven detection engineering with real telemetry from a live SOC.",
  },
  {
    title: "Hardware Hacking",
    level: "Beginner",
    duration: "3 hrs",
    desc: "UART, JTAG and glitching. Extract firmware from consumer devices on the bench.",
  },
  {
    title: "Applied Cryptography",
    level: "Intermediate",
    duration: "4 hrs",
    desc: "Padding oracles, key management failures and post-quantum migration strategy.",
  },
];

export const timeline = [
  { year: "2014", title: "Founded", desc: "Twelve students, one lab, a single soldering iron." },
  { year: "2017", title: "First National CTF Win", desc: "Top of the leaderboard at the national collegiate finals." },
  { year: "2019", title: "Conference Launched", desc: "400 attendees at our inaugural annual summit." },
  { year: "2022", title: "Research Division", desc: "Nine CVEs published across IoT and automotive stacks." },
  { year: "2024", title: "Global Chapters", desc: "Sister chapters opened across three continents." },
  { year: "2026", title: "SENTINEL Summit", desc: "Our largest edition yet — 2,000 seats, 40 speakers." },
];

export const agenda = [
  { time: "09:00", title: "Registration & Secure Check-in", tag: "Atrium" },
  { time: "10:00", title: "Opening Keynote — The Next Decade of Defense", tag: "Main Stage" },
  { time: "12:30", title: "Parallel Workshop Tracks", tag: "Labs 01–06" },
  { time: "15:00", title: "Live Red vs Blue Exercise", tag: "Ops Center" },
  { time: "19:00", title: "Midnight CTF Finals", tag: "Grand Hall" },
];

export const sponsors = [
  "NORTHWIND",
  "HELIX",
  "MERIDIAN",
  "OBSIDIAN",
  "QUANTA",
  "VERTEX",
  "AEGIS",
  "NULLSEC",
  "IRONCLAD",
];

export const testimonials = [
  {
    quote:
      "The most technically honest conference I attend. No vendor theatre — just deep, careful work presented by people who actually ship defenses.",
    name: "Priya Menon",
    role: "Security Architect, Quanta",
  },
  {
    quote:
      "I joined as a first-year with zero experience. Three years later I'm doing incident response full time. The society built that path for me.",
    name: "Tom Bergström",
    role: "IR Analyst, Obsidian",
  },
  {
    quote:
      "Their CTF pipeline produces better operators than most graduate programs. We hire from it every single year without hesitation.",
    name: "Sarah Klein",
    role: "VP Engineering, Vertex",
  },
  {
    quote:
      "Genuinely world-class workshops. The hardware track alone was worth the trip across the country.",
    name: "Andre Costa",
    role: "Firmware Engineer, Ironclad",
  },
];

export const faqs = [
  {
    q: "Who can join the society?",
    a: "Anyone with a serious interest in security — students, professionals and self-taught researchers. There is no entrance exam, only curiosity and a commitment to ethical practice.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. Roughly a third of our members join with no technical background. We run a structured beginner track covering networking, Linux and fundamentals before you touch offensive tooling.",
  },
  {
    q: "What does conference registration include?",
    a: "Full access to all three days, every workshop track subject to capacity, the CTF, meals, and the recorded session archive released two weeks after the event.",
  },
  {
    q: "Are scholarships available?",
    a: "Yes. We reserve 15% of seats for fully funded scholarship places, including travel support. Applications open eight weeks before the conference.",
  },
  {
    q: "Is there a code of conduct?",
    a: "Absolutely. All members and attendees agree to our code of conduct and responsible disclosure policy. Violations are handled swiftly and transparently.",
  },
];
