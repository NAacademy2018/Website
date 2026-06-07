import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone, MessageCircle, Instagram, Menu, X, ArrowRight, CheckCircle2, Users, ClipboardCheck,
  Calendar, UserCheck, Target, GraduationCap, Sparkles, Star, MapPin,
  Mail, ChevronDown, Trophy, TrendingUp, Award, Building2, Quote, Heart, Plus, Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "National Academy Kalyan — JEE, NEET & Foundation Coaching" },
      { name: "description", content: "Beyond coaching. Building future achievers. JEE Main, JEE Advanced, NEET UG and Foundation coaching in Kalyan with small batches, weekly tests and personal mentorship." },
      { property: "og:title", content: "National Academy — Center for Academic Excellence, Kalyan" },
      { property: "og:description", content: "Small batches. Weekly tests. Monthly parent reviews. Entrance-focused JEE & NEET preparation." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "National Academy — Center for Academic Excellence",
        slogan: "Entrance Is The Key To Success",
        address: { "@type": "PostalAddress", addressLocality: "Kalyan East", addressRegion: "MH", addressCountry: "IN" },
      }),
    }],
  }),
  component: Page,
});

const PHONE = "+91 96536 60248";
const WHATSAPP_BASE = "https://wa.me/919653660248";
const WHATSAPP_DEFAULT_MSG = encodeURIComponent(
  "Hello National Academy! 👋\n\nI would like to enquire about admission and courses for 2026.\n\nPlease share details about batches, fees and schedule.\n\nThank you!"
);
const WHATSAPP = `${WHATSAPP_BASE}?text=${WHATSAPP_DEFAULT_MSG}`;

function Page() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />
      <Hero selectedCourse={selectedCourse} />
      <MentorQuote />
      <WhyChoose />
      <Courses onEnroll={(course) => setSelectedCourse(course)} />
      <Results />
      <Process />
      <TestSystem />
      <ParentReview />
      <Testimonials />
      <FinalCTA />
      <FAQ />
      <Contact selectedCourse={selectedCourse} />
      <Footer />
    </div>
  );
}

/* ---------------- Announcement ---------------- */
function AnnouncementBar() {
  return (
    <div className="bg-[var(--navy-deep)]/8 border-b border-[var(--glow)]/20 text-foreground text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-4">
        <div className="hidden md:flex items-center gap-5">
          <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-[var(--glow)]" /> Admissions Open 2026</span>
          <span className="opacity-30">|</span>
          <span className="flex items-center gap-2"><Award className="h-3.5 w-3.5 text-[var(--glow)]" /> Scholarship Test Registrations Open</span>
        </div>
        <div className="flex md:hidden items-center gap-2 text-[var(--glow)]">
          <Sparkles className="h-3.5 w-3.5" /> Admissions Open 2026
        </div>
        <div className="flex items-center gap-4">
          <a href={`tel:${PHONE}`} className="hidden sm:flex items-center gap-1.5 hover:text-[var(--glow)] transition-colors">
            <Phone className="h-3.5 w-3.5" /> {PHONE}
          </a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer"
             className="flex items-center gap-1.5 rounded-full bg-[var(--glow)] text-white border border-[var(--glow)] px-3 py-1 hover:bg-[var(--navy-deep)] hover:border-[var(--navy-deep)] transition-colors">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Navbar ---------------- */
const NAV = [
  ["Home", "#home"], ["About", "#about"], ["Courses", "#courses"], ["Results", "#results"],
  ["Testimonials", "#testimonials"], ["FAQs", "#faqs"], ["Contact", "#contact"],
] as const;


function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-sm" : "bg-background/0"}`}>
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="National Academy Logo" className="h-10 w-10 rounded-full object-cover shadow-elegant" />
          <div className="leading-tight">
            <div className="font-display font-bold text-[15px]">NATIONAL ACADEMY</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Academic Excellence</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="text-foreground/70 hover:text-foreground transition-colors relative group">
              {l}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-glow group-hover:w-full transition-all" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#hero-form" className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[var(--navy-deep)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[var(--navy)] transition-all shadow-elegant">
            Book Counseling <ArrowRight className="h-4 w-4" />
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)}
                 className="py-2.5 text-sm font-medium text-foreground/80 hover:text-glow">{l}</a>
            ))}
            <a href="#hero-form" onClick={() => setOpen(false)}
               className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--navy-deep)] text-white px-5 py-2.5 text-sm font-semibold">
              Book Counseling
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ selectedCourse }: { selectedCourse: string }) {
  return (
    <section id="home" className="relative bg-hero-gradient text-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{
        background: "radial-gradient(800px 400px at 70% 10%, color-mix(in oklab, var(--glow) 10%, transparent), transparent 60%), radial-gradient(600px 300px at 10% 80%, color-mix(in oklab, var(--glow) 8%, transparent), transparent 60%)"
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 lg:py-28 grid lg:grid-cols-12 gap-12">

        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full glass-light px-4 py-1.5 text-xs font-medium text-[var(--glow)]">
            <span className="h-1.5 w-1.5 rounded-full bg-glow animate-pulse" /> ENTRANCE IS THE KEY TO SUCCESS
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground">
            Beyond Coaching.<br />
            <span className="text-glow">Building Future Achievers.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-foreground/70 max-w-xl leading-relaxed italic">
            "Where teachers mentor, students focus, and parents partner — together we shape tomorrow's achievers."
          </p>
          <p className="mt-4 text-sm sm:text-base text-foreground/60 max-w-xl leading-relaxed">
            At National Academy, students receive personal attention, regular progress tracking, expert mentorship and a focused environment designed for competitive exam success.
          </p>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3 max-w-xl">
            {[
              "Maximum 35 Students Per Batch",
              "Weekly Tests & Smart Reports",
              "Monthly Parent Review Meetings",
              "Personalized Mentorship",
              "Entrance Exam Focused Preparation",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <CheckCircle2 className="h-5 w-5 text-glow shrink-0 mt-0.5" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#hero-form" className="inline-flex items-center gap-2 rounded-full bg-glow text-[var(--navy-deep)] px-6 py-3 text-sm font-semibold hover:bg-white transition-colors shadow-glow">
              Book Free Counseling <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#courses"
  className="inline-flex items-center gap-2 rounded-full bg-glow text-[var(--navy-deep)] px-6 py-3 text-sm font-semibold hover:bg-white transition-colors shadow-glow">
  Explore Programs
</a>

          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground/55">
            {[["1000+", "Students Mentored"], ["120+", "Top Ranks"], ["8+", "Years of Excellence"]].map(([n, l]) => (
              <div key={l} className="flex items-baseline gap-2">
                <span className="font-display text-xl font-bold text-[var(--navy-deep)]">{n}</span>
                <span>{l}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Form */}
        <div id="hero-form" className="lg:col-span-5 relative">
          <div className="absolute -top-4 -right-4 hidden lg:flex items-center gap-2 rounded-2xl glass-light px-4 py-3 text-xs animate-float text-foreground">
            <Trophy className="h-4 w-4 text-glow" /> IITian Rahul Das
          </div>
          <div className="absolute -bottom-6 -left-6 hidden lg:flex items-center gap-2 rounded-2xl glass-light px-4 py-3 text-xs animate-float text-foreground" style={{ animationDelay: "1.5s" }}>
            <Award className="h-4 w-4 text-glow" /> Dr. Rajeshwari Tiwari
          </div>
          <div className="rounded-2xl bg-white text-foreground p-7 shadow-elegant ring-1 ring-black/5">
            <div className="text-xs font-semibold uppercase tracking-wider text-glow">Admission Inquiry</div>
            <h3 className="mt-1 font-display text-2xl font-bold">Reserve your seat today</h3>
            <p className="mt-1 text-sm text-muted-foreground">Limited seats. Our counselor will reach out within 24 hours.</p>
            <InquiryForm selectedCourse={selectedCourse} />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- Inquiry Form (Supabase) ---------------- */
function InquiryForm({ selectedCourse }: { selectedCourse?: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [examValue, setExamValue] = useState(selectedCourse || "");

  useEffect(() => {
    if (selectedCourse) setExamValue(selectedCourse);
  }, [selectedCourse]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      student_name: String(fd.get("student_name") || "").trim(),
      parent_name: String(fd.get("parent_name") || "").trim(),
      mobile: String(fd.get("mobile") || "").trim(),
      email: (String(fd.get("email") || "").trim() || null) as string | null,
      student_class: String(fd.get("student_class") || ""),
      target_exam: examValue,
      message: (String(fd.get("message") || "").trim() || null) as string | null,
    };
    if (!/^[+0-9 \-()]{7,20}$/.test(payload.mobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }
    setLoading(true);
    const { error: insertErr } = await supabase.from("inquiries").insert(payload);
    setLoading(false);
    if (insertErr) {
      setError("Could not submit. Please try again or call us directly.");
      return;
    }
    setDone(true);
    form.reset();
    setExamValue("");
  }

  if (done) {
    return (
      <div className="mt-5 rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center">
        <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
        <p className="mt-2 font-semibold text-emerald-900">Inquiry received!</p>
        <p className="mt-1 text-sm text-emerald-800/80">Our counselor will reach out within 24 hours.</p>
        <button onClick={() => setDone(false)} className="mt-3 text-xs font-semibold text-emerald-700 hover:underline">
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
      <input name="student_name" required type="text" placeholder="Student Name" maxLength={120}
        className="h-11 rounded-lg border border-input bg-secondary/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50 focus:bg-white transition" />
      <input name="parent_name" required type="text" placeholder="Parent Name" maxLength={120}
        className="h-11 rounded-lg border border-input bg-secondary/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50 focus:bg-white transition" />
      <input name="mobile" required type="tel" placeholder="Mobile Number" maxLength={20}
        className="h-11 rounded-lg border border-input bg-secondary/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50 focus:bg-white transition" />
      <input name="email" type="email" placeholder="Email (optional)" maxLength={200}
        className="h-11 rounded-lg border border-input bg-secondary/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50 focus:bg-white transition" />
      <div className="grid grid-cols-2 gap-3">
        <select name="student_class" required className="h-11 rounded-lg border border-input bg-secondary/50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50">
          <option value="">Class</option>
          <option>Class 11</option><option>Class 12</option><option>Dropper</option>
        </select>
        <select name="target_exam" required value={examValue} onChange={(e) => setExamValue(e.target.value)} className="h-11 rounded-lg border border-input bg-secondary/50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50">
          <option value="">Target Exam</option>
          <option value="JEE Main">JEE Main</option><option value="JEE Advanced">JEE Advanced</option>
          <option value="NEET UG">NEET UG</option><option value="MHT-CET">MHT-CET</option>
        </select>
      </div>
      <textarea name="message" placeholder="Anything you'd like us to know? (optional)" rows={2} maxLength={2000}
        className="rounded-lg border border-input bg-secondary/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50 focus:bg-white transition resize-none" />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button type="submit" disabled={loading}
        className="mt-1 h-11 rounded-lg bg-[var(--navy-deep)] text-white text-sm font-semibold hover:bg-[var(--navy)] transition-colors disabled:opacity-60">
        {loading ? "Submitting…" : "Submit Inquiry"}
      </button>
      <p className="text-[11px] text-muted-foreground text-center">
        Your details are stored securely. Our counselor will follow up within 24 hours.
      </p>
    </form>
  );
}



/* ---------------- Why Choose ---------------- */
function WhyChoose() {
  const [flipped, setFlipped] = useState<number | null>(null);

  const items = [
    {
      icon: Users,
      title: "Small Batch Size",
      desc: "Individual attention for every learner.",
      details: [
        "Maximum 35 students",
        "Personal mentoring",
        "Daily doubt solving",
        "Individual progress tracking",
      ],
    },
    {
      icon: ClipboardCheck,
      title: "Weekly Testing System",
      desc: "Consistent evaluation builds confidence.",
      details: [
        "Weekly chapter tests",
        "Mock examinations",
        "Performance reports",
        "Rank analysis",
      ],
    },
    {
      icon: Calendar,
      title: "Monthly Parent Meetings",
      desc: "Parents stay connected.",
      details: [
        "Progress discussion",
        "Academic review",
        "Improvement planning",
        "Transparent feedback",
      ],
    },
    {
      icon: UserCheck,
      title: "Personal Mentorship",
      desc: "Every student gets support.",
      details: [
        "One-to-one guidance",
        "Career counseling",
        "Motivation support",
        "Goal planning",
      ],
    },
    {
      icon: Target,
      title: "Entrance Focused Preparation",
      desc: "Structured preparation for success.",
      details: [
        "JEE Main",
        "JEE Advanced",
        "NEET UG",
        "MHT-CET",
      ],
    },
    {
      icon: Building2,
      title: "Premium Study Environment",
      desc: "Focused academic atmosphere.",
      details: [
        "Modern classrooms",
        "Disciplined environment",
        "Focused learning",
        "Competitive culture",
      ],
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-soft-gradient">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          eyebrow="Why National Academy"
          title="Built on discipline. Driven by results."
          sub="A focused academic ecosystem designed to bring out the very best in every student."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, desc, details }, i) => {
            const isFlipped = flipped === i;
            return (
              <div
                key={title}
                onClick={() => setFlipped(isFlipped ? null : i)}
                style={{ height: 280, perspective: "1200px", cursor: "pointer" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.8s ease",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderRadius: 24,
                      padding: 28,
                      background: "var(--card, white)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div className="h-12 w-12 rounded-xl bg-[var(--navy-deep)]/10 border border-[var(--glow)]/20 grid place-items-center mb-5">
                      <Icon className="h-6 w-6 text-glow" />
                    </div>
                    <h3 className="font-display text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  </div>

                  {/* Back */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderRadius: 24,
                      padding: 28,
                      background: "linear-gradient(135deg, var(--navy-deep), var(--navy))",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h3 className="font-display text-lg font-bold mb-4">{title}</h3>
                    <ul className="space-y-2 text-sm">
                      {details.map((item) => (
                        <li key={item}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Courses ---------------- */
function Courses({ onEnroll }: { onEnroll: (course: string) => void }) {
  const courses = [
    { tag: "Engineering", title: "JEE Main", duration: "1–2 Years", desc: "Complete preparation aligned with the latest NTA pattern.", color: "from-blue-500/20" },
    { tag: "Advanced", title: "JEE Advanced", duration: "2 Years", desc: "Intensive problem-solving for IIT aspirants with elite faculty.", color: "from-indigo-500/20" },
    {
  tag: "Medical",
  title: "NEET UG",
  duration: "1–2 Years",
  desc: "Biology-first NCERT mastery focused on NEET success.",
  color: "from-emerald-500/20"
},
    { tag: "State CET", title: "MHT-CET", duration: "1–2 Years", desc: "Targeted preparation for Maharashtra's engineering & pharmacy entrance exam.", color: "from-amber-500/20" },
  ];
  const includes = ["Full syllabus coverage", "Weekly + mock test series", "1-on-1 mentorship", "Revision & doubt sessions"];
  return (
    <section id="courses" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Programs" title="Courses crafted for serious aspirants." sub="Every program blends conceptual depth, regular testing and personal mentorship." />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <div key={c.title} className={`relative overflow-hidden rounded-3xl bg-white border-2 border-[var(--glow)]/15 text-foreground p-8 shadow-elegant hover:border-[var(--glow)]/40 transition-all`}>
              <div className={`absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-radial ${c.color} to-transparent blur-3xl opacity-60`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--glow)] font-bold">{c.tag}</span>
                  <span className="text-xs text-muted-foreground">{c.duration}</span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">{c.desc}</p>
                <ul className="mt-6 grid grid-cols-2 gap-2.5">
                  {includes.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-foreground/70">
                      <CheckCircle2 className="h-4 w-4 text-glow" /> {i}
                    </li>
                  ))}
                </ul>
                <a href="#hero-form" onClick={() => onEnroll(c.title)}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--navy-deep)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[var(--glow)] hover:text-white transition-colors">
                  Enroll Now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Results ---------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

function Results() {
  const stats = [
    { n: 1000, s: "+", l: "Students Mentored" },
    { n: 120, s: "+", l: "Top Ranks Secured" },
    { n: 96, s: "%", l: "Selection Rate" },
    { n: 8, s: "+", l: "Years of Excellence" },
  ];

  const toppers = [
    { name: "Dr. Rajeshwari Tiwari", exam: "NEET UG — Medical Achiever" },
    { name: "Dr. Samishka Mandawdhare", exam: "NEET UG — Medical Achiever" },
    { name: "Dr. Abhishek Benvanshi", exam: "NEET UG — Medical Achiever" },
    { name: "Dr. Roshan Sangade", exam: "NEET UG — Medical Achiever" },
    { name: "IITian Rahul Das", exam: "— IIT Achiever" },
    { name: "Omkar Palve", exam: "JEE Main — Engineering Achiever" },
    { name: "Tejaswini Mandawdhare", exam: "JEE Main — Engineering Achiever" },
  ];
  return (
    <section
  id="results"
  className="py-20 lg:py-28 bg-soft-gradient relative overflow-hidden"
>
      <div className="absolute inset-0 opacity-30" style={{
        background: "radial-gradient(600px 300px at 20% 0%, color-mix(in oklab, var(--glow) 15%, transparent), transparent 60%)"
      }} />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Results & Achievements" title="Numbers that speak for themselves." sub="Year after year, our students consistently achieve top ranks in India's most competitive exams." />
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl bg-white/8 border border-white/15 backdrop-blur-sm p-6 text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-glow">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-2 text-sm text-white/70">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {toppers.map((t, i) => (
            <div key={t.name} className="rounded-2xl relative overflow-hidden p-6 hover:-translate-y-1 transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 24px 2px color-mix(in oklab, var(--glow) 20%, transparent)"
              }}>
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `radial-gradient(ellipse at ${i % 2 === 0 ? "30%" : "70%"} 20%, color-mix(in oklab, var(--glow) 15%, transparent), transparent 70%)`
              }} />
              <div className="relative">
                <div className="h-14 w-14 rounded-full mx-auto mb-4 grid place-items-center font-display font-bold text-xl"
                  style={{
                    background: "linear-gradient(135deg, color-mix(in oklab, var(--glow) 40%, transparent), color-mix(in oklab, var(--glow) 10%, transparent))",
                    border: "1px solid color-mix(in oklab, var(--glow) 50%, transparent)",
                    boxShadow: "0 0 16px color-mix(in oklab, var(--glow) 40%, transparent)",
                    color: "white",
                  }}>
                  {t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </div>
                <div className="text-center font-display text-base font-bold text-[var(--navy-deep)]">{t.name}</div>
                <div className="text-center text-xs text-muted-foreground mt-1">{t.exam}</div>
                <div className="mt-3 h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--glow), transparent)" }} />
                <div className="mt-2 flex justify-center"><Trophy className="h-4 w-4 text-glow" style={{ filter: "drop-shadow(0 0 6px var(--glow))" }} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
function Process() {
  const steps = [
    "Counseling", "Assessment Test", "Batch Allocation", "Weekly Evaluation",
    "Parent Review Meetings", "Performance Tracking", "Competitive Exam Preparation",
  ];
  return (
    <section className="py-20 lg:py-28 bg-soft-gradient">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Academic Process" title="A clear journey from day one to selection." sub="Every student follows a structured, transparent path designed to maximize success." />
        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-7 gap-6">
            {steps.map((s, i) => (
              <li key={s} className="relative text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[var(--glow)] to-[var(--navy)] text-white grid place-items-center shadow-elegant relative z-10">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div className="mt-4 text-sm font-semibold">{s}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Test System ---------------- */
function TestSystem() {
  const items = [
    "Weekly chapter-wise tests",
    "Entrance-pattern mock tests",
    "Detailed performance analysis reports",
    "Accuracy & speed tracking",
    "Personalized improvement suggestions",
    "Comparative percentile insights",
  ];
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-glow">Test & Report System</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
            Not just marks. <br /><span className="text-[var(--navy-deep)]">Complete academic tracking.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Our weekly tests aren't just evaluations — they're a feedback loop that turns weaknesses into strengths.
          </p>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {items.map((i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="h-5 w-5 text-glow shrink-0 mt-0.5" /> {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-3xl bg-white border border-[var(--glow)]/20 text-foreground p-8 shadow-elegant">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Weekly Performance Report</div>
                <div className="font-display text-2xl font-bold mt-1">Crystal-clear insights</div>
              </div>
              <TrendingUp className="h-6 w-6 text-glow" />
            </div>
            <div className="mt-6 space-y-4">
              {[
                ["Accuracy", 88], ["Speed", 76], ["Concept Strength", 92], ["Consistency", 84],
              ].map(([l, v]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground/70">{l}</span><span className="text-[var(--glow)] font-semibold">{v}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--navy-deep)]/10 overflow-hidden">
                    <div className="h-full rounded-full bg-glow" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-center gap-3 text-sm text-foreground/70">
              <Sparkles className="h-4 w-4 text-glow shrink-0" />
              Fully operational dashboard — auto-shared with parents every week.
            </div>
          </div>

          <div className="absolute -bottom-5 -right-5 hidden md:flex items-center gap-2 rounded-2xl bg-white border border-border px-4 py-3 text-xs font-medium shadow-elegant">
            <Sparkles className="h-4 w-4 text-glow" /> Auto-shared with parents
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Parent Review ---------------- */
function ParentReview() {
  const points = [
    "Monthly one-on-one parent meetings",
    "Detailed academic progress discussions",
    "Personalized student improvement plans",
    "Transparent progress reports",
    "Joint growth strategy with mentors",
  ];
  return (
    <section className="py-20 lg:py-28 bg-soft-gradient">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 relative rounded-3xl bg-white border border-[var(--glow)]/20 text-foreground p-8 lg:p-10 shadow-elegant overflow-hidden">
          <div className="absolute inset-0 opacity-40" style={{
            background: "radial-gradient(400px 240px at 80% 10%, color-mix(in oklab, var(--glow) 12%, transparent), transparent 70%)"
          }} />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-glow"><Heart className="h-4 w-4" /> Parent Partnership</div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[["Monthly", "Reviews"], ["1-on-1", "Mentor Meets"], ["100%", "Transparency"], ["Joint", "Growth Plan"]].map(([k, v]) => (
                <div key={v} className="rounded-2xl bg-[var(--navy-deep)]/5 border border-[var(--glow)]/15 p-5">
                  <div className="font-display text-2xl font-bold text-glow">{k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{v}</div>
                </div>
              ))}
            </div>
            <blockquote className="mt-7 text-sm text-foreground/75 leading-relaxed border-l-2 border-[var(--glow)] pl-4">
              "We don't just teach your child — we walk the journey with you, every single month."
            </blockquote>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-glow">Parent Review Meetings</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
            Parents stay connected with every step of progress.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            We believe a child's growth is a partnership. Every month, parents sit down with mentors to review, plan and celebrate progress together.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-glow shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


/* ---------------- Mentor Quote ---------------- */
function MentorQuote() {
  const quotes = [
    "To grow a student, you don't need the best tutor — you need a true mentor who instills discipline and drives growth.",
    "Discipline today. Direction tomorrow. Distinction forever.",
    "We don't just prepare students for exams. We prepare them for life.",
  ];
  return (
    <section className="relative py-16 lg:py-20 bg-[var(--navy-deep)]/8 overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        background: "radial-gradient(700px 350px at 50% 50%, color-mix(in oklab, var(--glow) 12%, transparent), transparent 70%)"
      }} />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex justify-center mb-6"><Quote className="h-10 w-10 text-glow" /></div>
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-[1.25] max-w-4xl mx-auto">
          "{quotes[0]}"
        </p>
        <div className="mt-10 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {quotes.slice(1).map((q) => (
            <div key={q} className="rounded-2xl bg-white border border-[var(--glow)]/20 shadow-elegant p-6 text-center text-foreground/75 text-sm sm:text-base italic">
              "{q}"
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-xs uppercase tracking-[0.25em] text-glow">
          — The National Academy Mentorship Philosophy
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials (Customizable) ---------------- */
type Testimonial = { q: string; n: string; r: string; role: "student" | "parent" };

const SEED_TESTIMONIALS: Testimonial[] = [
  { q: "My son scored only 65 in 10th standard, but after joining National Academy he scored 94 percentile in MHT-CET. The transformation has been incredible.", n: "Mr. Shukla", r: "Parent of MHT-CET 2025 student", role: "parent" },
  { q: "National Academy helped my daughter achieve her dream of becoming a doctor. The mentors genuinely care about every student's goal.", n: "Mrs. Upadhyay", r: "Parent of NEET 2025 student", role: "parent" },
  { q: "As a parent, the monthly review meetings kept me connected with my child's progress at every step. I always felt involved.", n: "Mrs. Kulkarni", r: "Parent of Class 12 student", role: "parent" },
  { q: "The weekly tests and personal guidance helped me improve consistently. I cracked JEE Main on my first attempt thanks to this academy.", n: "Rahul Das", r: "JEE Advanced — IIT Achiever", role: "student" },
  { q: "I came in as a dropper with low confidence. The faculty never gave up on me. I finally got into IIT — something I thought was impossible.", n: "Omkar Palve", r: "JEE Main — Engineering Achiever", role: "student" },
  { q: "The small batch size means every doubt gets solved the same day. I never felt lost, even in the toughest JEE topics.", n: "Tejaswini Mandawdhare", r: "JEE Main — Engineering Achiever", role: "student" },
];

function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(SEED_TESTIMONIALS);
  const [filter, setFilter] = useState<"all" | "student" | "parent">("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Testimonial>({ q: "", n: "", r: "", role: "student" });

  const visible = filter === "all" ? items : items.filter((i) => i.role === filter);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.q || !form.n) return;
    setItems([{ ...form }, ...items]);
    setForm({ q: "", n: "", r: "", role: "student" });
    setShowForm(false);
  };

  const remove = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-soft-gradient">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Testimonials" title="Loved by students. Trusted by parents." sub="Real voices from the families who chose National Academy. Filter by perspective — or add your own story." />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-full border border-border bg-white p-1 text-sm">
            {([["all", "All"], ["student", "Students"], ["parent", "Parents"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setFilter(k)}
                      className={`px-4 py-1.5 rounded-full font-medium transition-colors ${filter === k ? "bg-[var(--navy-deep)] text-white shadow-elegant" : "text-foreground/70 hover:text-foreground hover:bg-[var(--navy-deep)]/5"}`}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={() => setShowForm(!showForm)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--navy-deep)] text-white px-5 py-2 text-sm font-semibold hover:bg-[var(--glow)] transition-colors">
            <Plus className="h-4 w-4" /> Share Your Story
          </button>
        </div>

        {showForm && (
          <form onSubmit={add} className="mt-6 rounded-2xl bg-white border border-border p-6 shadow-elegant grid gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input required value={form.n} onChange={(e) => setForm({ ...form, n: e.target.value })}
                     placeholder="Your name" className="h-11 rounded-lg border border-input bg-secondary/40 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50" />
              <input value={form.r} onChange={(e) => setForm({ ...form, r: e.target.value })}
                     placeholder="Role (e.g. Parent of Class 11 student)" className="h-11 rounded-lg border border-input bg-secondary/40 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50" />
            </div>
            <div className="flex gap-2">
              {(["student", "parent"] as const).map((r) => (
                <button type="button" key={r} onClick={() => setForm({ ...form, role: r })}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${form.role === r ? "bg-[var(--navy-deep)] text-white border-[var(--navy-deep)]" : "border-border text-foreground/70 hover:border-[var(--glow)]/40"}`}>
                  {r === "student" ? "I'm a Student" : "I'm a Parent"}
                </button>
              ))}
            </div>
            <textarea required rows={3} value={form.q} onChange={(e) => setForm({ ...form, q: e.target.value })}
                      placeholder="Share your experience with National Academy..."
                      className="rounded-lg border border-input bg-secondary/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-muted-foreground">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-lg bg-[var(--navy-deep)] text-white text-sm font-semibold hover:bg-[var(--glow)] transition-colors">Add Testimonial</button>
            </div>
          </form>
        )}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((x, idx) => {
            const realIdx = items.indexOf(x);
            return (
              <figure key={`${x.n}-${idx}`} className="group relative rounded-2xl bg-white border border-border p-7 hover:shadow-elegant hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-glow text-glow" />
                    ))}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${x.role === "student" ? "bg-glow/15 text-[var(--navy-deep)]" : "bg-[var(--navy-deep)]/10 text-[var(--navy-deep)]"}`}>
                    {x.role}
                  </span>
                </div>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/85">"{x.q}"</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-[var(--navy-deep)]/10 text-[var(--navy-deep)] border border-[var(--glow)]/20 grid place-items-center font-display font-bold">
                    {x.n[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{x.n}</div>
                    <div className="text-xs text-muted-foreground">{x.r}</div>
                  </div>
                  <button onClick={() => remove(realIdx)} aria-label="Remove"
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ---------------- Final CTA ---------------- */
function FinalCTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--navy-deep)] to-[var(--navy)] text-white p-10 lg:p-16 text-center shadow-elegant">
          <div className="absolute inset-0 opacity-40" style={{
            background: "radial-gradient(500px 300px at 50% 0%, color-mix(in oklab, var(--glow) 40%, white) , transparent 70%)"
          }} />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-[1.1] max-w-3xl mx-auto">
              Your child deserves more than just coaching.
            </h2>
            <p className="mt-5 text-white/70 max-w-xl mx-auto">
              Give them the right mentorship, discipline, and learning environment to succeed at India's toughest exams.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 justify-center">
              <a href="#hero-form" className="inline-flex items-center gap-2 rounded-full bg-glow text-[var(--navy-deep)] px-6 py-3 text-sm font-semibold hover:bg-white transition-colors shadow-glow">
                Apply for Admission <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/30 transition-colors">
                Schedule Counseling
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    ["What is the maximum batch size?", "We strictly cap every batch at 35 students to ensure individual attention and quality interaction with faculty."],
    ["How often are parent meetings held?", "We conduct dedicated parent-mentor meetings every month, plus performance reviews after major tests."],
    ["How frequent are the tests?", "Weekly chapter-wise tests, fortnightly cumulative tests and monthly full-length entrance-pattern mocks."],
    ["Is study material included?", "Yes — comprehensive printed material, DPPs, test booklets and an online doubt portal are all included."],
    ["What is your approach to JEE & NEET?", "Concept-first NCERT mastery followed by advanced problem solving, with weekly tracking and revision cycles."],
    ["Do you conduct scholarship tests?", "Yes. Our annual scholarship test offers up to 100% fee waiver for deserving students. Registrations are currently open."],
    ["What does the admission process look like?", "Counseling → Assessment Test → Batch Allocation. The entire process is transparent and takes under a week."],
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="py-20 lg:py-28 bg-soft-gradient">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHead eyebrow="FAQs" title="Questions, answered." sub="Everything you need to know before joining National Academy." />
        <div className="mt-12 space-y-3">
          {faqs.map(([q, a], i) => (
            <div key={i} className="rounded-2xl bg-white border border-border overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className="font-semibold text-[15px]">{q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-glow transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact({ selectedCourse }: { selectedCourse: string }) {
  const [contactCourse, setContactCourse] = useState(selectedCourse ? `Interested in: ${selectedCourse}` : "");

  useEffect(() => {
    if (selectedCourse) setContactCourse(`Interested in: ${selectedCourse}`);
  }, [selectedCourse]);

  const whatsappMsg = encodeURIComponent(
    `Hello National Academy! 👋\n\nI am interested in admission enquiry${contactCourse ? ` for *${contactCourse.replace("Interested in: ", "")}*` : ""}.\n\nPlease share more details about the course, fees and batch schedule.\n\nThank you!`
  );
  const whatsappLink = `https://wa.me/919653660248?text=${whatsappMsg}`;

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead eyebrow="Contact" title="Visit us. Talk to us. Begin the journey." sub="We're here to answer every question — from courses and fees to mentorship and admissions." />
        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-[var(--navy-deep)] text-white p-8 shadow-elegant">
            <div className="space-y-6">
              <ContactRow icon={MapPin} title="Visit our campus" lines={["2nd Floor, Sahyadri Chambers,", "Near Jan Kalyan Hospital, HM Road,", "Kalyan (East)"]} />
              <ContactRow icon={Phone} title="Call us" lines={[PHONE, "Mon – Sat, 9 AM – 8 PM"]} />
              <ContactRow icon={Mail} title="Email" lines={["nationalacademy1211@gmail.com"]} />
              <div className="flex gap-3 pt-2">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white text-[var(--navy-deep)] px-5 py-2.5 text-sm font-semibold hover:bg-[var(--glow)] hover:text-white transition-colors">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/25 transition-colors">
                  <Phone className="h-4 w-4" /> Call
                </a>
              </div>
            </div>
            <div className="mt-8 rounded-xl overflow-hidden border border-white/10 aspect-video">
              <iframe
                title="National Academy Location"
                src="https://www.google.com/maps?q=Sahyadri+Chambers+HM+Road+Kalyan+East+Maharashtra&output=embed"
                className="h-full w-full" loading="lazy"
              />
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you — we'll be in touch soon."); }}
                className="rounded-2xl bg-card border border-border p-8 shadow-elegant">
            <h3 className="font-display text-2xl font-bold">Send us a quick inquiry</h3>
            <p className="mt-1 text-sm text-muted-foreground">We respond within 24 hours.</p>
            <div className="mt-6 grid gap-3">
              <input required placeholder="Your Name" className="h-11 rounded-lg border border-input bg-secondary/40 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50 focus:bg-white" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="tel" placeholder="Mobile" className="h-11 rounded-lg border border-input bg-secondary/40 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50 focus:bg-white" />
                <input type="email" placeholder="Email" className="h-11 rounded-lg border border-input bg-secondary/40 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50 focus:bg-white" />
              </div>
              <select value={contactCourse} onChange={(e) => setContactCourse(e.target.value)}
                className="h-11 rounded-lg border border-input bg-secondary/40 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50">
                <option value="">Interested in...</option>
                <option value="Interested in: JEE Main">Interested in: JEE Main</option>
                <option value="Interested in: JEE Advanced">Interested in: JEE Advanced</option>
                <option value="Interested in: NEET UG">Interested in: NEET UG</option>
                <option value="Interested in: MHT-CET">Interested in: MHT-CET</option>
              </select>
              <textarea rows={4} placeholder="Your message" className="rounded-lg border border-input bg-secondary/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-glow/50 focus:bg-white" />
              <button className="mt-2 h-11 rounded-lg bg-[var(--navy-deep)] text-white text-sm font-semibold hover:bg-[var(--glow)] transition-colors">
                Send Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, title, lines }: { icon: typeof Phone; title: string; lines: string[] }) {
  return (
    <div className="flex gap-4">
      <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/15 grid place-items-center shrink-0">
        <Icon className="h-5 w-5 text-glow" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/50">{title}</div>
        {lines.map((l) => <div key={l} className="text-sm mt-0.5">{l}</div>)}
      </div>
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-[var(--navy-deep)] text-white/70 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2 max-w-sm">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="National Academy Logo" className="h-10 w-10 rounded-full object-cover" />
            <div className="leading-tight text-white">
              <div className="font-display font-bold text-sm">NATIONAL ACADEMY</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/50">Academic Excellence</div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed">
            Kalyan's trusted center for JEE, NEET and MHT-CET preparation — built on small batches, weekly tracking and genuine mentorship.
          </p>
          <p className="mt-5 text-xs text-glow font-semibold tracking-wider uppercase">Entrance Is The Key To Success</p>
        </div>
        <FooterCol title="Explore" links={[["About", "#about"], ["Courses", "#courses"], ["Results", "#results"], ["Testimonials", "#testimonials"]]} />
        <FooterCol title="Support" links={[["FAQs", "#faqs"], ["Contact", "#contact"], ["Privacy Policy", "#"], ["Terms", "#"]]} />
      </div>
      <div className="mx-auto max-w-7xl px-4 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <div>© {new Date().getFullYear()} National Academy, Kalyan. All rights reserved.</div>
        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com/nationalacademy_"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-glow transition"
          >
            <Instagram className="h-5 w-5" />
            Instagram
          </a>

          <a
            href="https://whatsapp.com/channel/YOUR_CHANNEL_LINK"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-glow transition"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Channel
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-white font-semibold text-sm">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([l, h]) => (
          <li key={l}><a href={h} className="hover:text-glow transition-colors">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Shared ---------------- */
function SectionHead({ eyebrow, title, sub, dark }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div className="max-w-2xl">
      <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-glow" : "text-glow"}`}>{eyebrow}</span>
      <h2 className={`mt-3 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] ${dark ? "text-white" : ""}`}>{title}</h2>
      {sub && <p className={`mt-4 text-base ${dark ? "text-white/70" : "text-muted-foreground"} max-w-xl`}>{sub}</p>}
    </div>
  );
}