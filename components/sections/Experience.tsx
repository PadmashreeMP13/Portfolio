import Reveal from "@/components/ui/Reveal";

type Entry = {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
  tech: string[];
};

const experience: Entry[] = [
  {
    company: "Learning & Project Experience",
    role: "AI/ML Projects",
    start: "Ongoing",
    end: "Present",
    description:
      "Building AI and machine learning projects using Python, FastAPI, React, and SQL while exploring practical applications of intelligent systems.",
    tech: ["Python", "AI", "Machine Learning", "SQL"],
  },
  {
    company: "Learning & Project Experience",
    role: "Web Application Development",
    start: "Ongoing",
    end: "Present",
    description:
      "Developing web applications and interfaces with a focus on clean code, responsive layouts, and user-centered design.",
    tech: ["HTML", "CSS", "React basics", "JavaScript basics"],
  },
  {
    company: "Learning & Project Experience",
    role: "AgriSense AI",
    start: "Ongoing",
    end: "Present",
    description:
      "Developing an AI-powered agriculture platform with crop recommendation, disease detection, irrigation guidance, and farmer dashboard features.",
    tech: ["Python", "FastAPI", "React", "SQL"],
  },
  {
    company: "Learning & Project Experience",
    role: "Hackathons & Technical Projects",
    start: "Ongoing",
    end: "Present",
    description:
      "Participating in hackathons and technical projects to apply new skills, improve problem-solving, and learn practical software development workflows.",
    tech: ["Git", "Jupyter Notebook", "Google Colab", "GitHub"],
  },
];

function formatRange(start: string, end: string) {
  return `${start} — ${end}`;
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-cyan">Experience</p>
          <h2 id="experience-title" className="font-display font-display text-4xl sm:text-5xl mt-2">
            <span className="text-gradient">Learning & Project Experience.</span>
          </h2>
        </Reveal>

        <ol className="mt-14 relative">
          <span
            aria-hidden
            className="absolute left-3 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-magenta via-uv to-cyan"
          />
          {experience.map((e, i) => (
            <Reveal key={`${e.company}-${e.role}`} delay={i * 80}>
              <li
                className={`relative pl-10 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10 items-start mb-12 ${
                  i % 2 === 1 ? "sm:[&>:first-child]:col-start-2" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="absolute left-1 sm:left-1/2 sm:-translate-x-1/2 top-2 h-4 w-4 rounded-full border border-magenta bg-black shadow-glow"
                />
                <article
                  className={`sm:row-start-1 ${i % 2 === 0 ? "sm:text-right sm:pr-10" : "sm:pl-10"}`}
                >
                  <p className="text-xs uppercase tracking-widest text-acid">{formatRange(e.start, e.end)}</p>
                  <h3 className="mt-1 font-display text-2xl text-gradient">{e.role}</h3>
                  <p className="text-sm text-ink/80">{e.company}</p>
                </article>
                <article
                  className={`sm:row-start-1 ${i % 2 === 0 ? "sm:col-start-2 sm:pl-10" : "sm:pr-10 sm:text-right"}`}
                >
                  <p className="text-ink/80 leading-relaxed">{e.description}</p>
                  <ul
                    className={`mt-3 flex flex-wrap gap-2 ${i % 2 === 0 ? "" : "sm:justify-end"}`}
                  >
                    {e.tech.map((t) => (
                      <li
                        key={t}
                        className="text-[11px] uppercase tracking-widest px-2 py-1 rounded border border-white/10 bg-black/40 hover:border-cyan/50 hover:text-cyan transition"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
