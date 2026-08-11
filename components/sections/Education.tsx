import Reveal from "@/components/ui/Reveal";

type Entry = {
  degree: string;
  institution: string;
  start: string;
  end: string;
  achievements: string[];
};

const items: Entry[] = [
  {
    degree: "Bachelor of Engineering (B.E.) — Computer Science and Engineering",
    institution: "Maharaja Institute of Technology Mysore (MIT Mysore)",
    start: "2023",
    end: "2027",
    achievements: [
      "Fourth-year CSE student focused on AI, ML, and software development",
      "Coursework in algorithms, databases, systems, and machine learning",
      "Hands-on projects using Python, SQL, and modern web technologies",
    ],
  },
];

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-cyan">Education</p>
          <h2 id="education-title" className="font-display font-display text-4xl sm:text-5xl mt-2">
            <span className="text-gradient">Academic background.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((e, i) => (
            <Reveal key={e.degree} delay={i * 100}>
              <article className="relative h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md overflow-hidden hover:shadow-glow-cyan hover:border-cyan/50 transition">
                <span
                  aria-hidden
                  className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-magenta/40 to-cyan/0 blur-2xl"
                />
                <p className="text-xs uppercase tracking-widest text-acid">
                  {e.start} — {e.end}
                </p>
                <h3 className="mt-1 font-display text-2xl text-gradient">{e.degree}</h3>
                <p className="text-sm text-ink/80">{e.institution}</p>
                <ul className="mt-4 space-y-2 text-sm text-ink/80">
                  {e.achievements.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-cyan">▍</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
