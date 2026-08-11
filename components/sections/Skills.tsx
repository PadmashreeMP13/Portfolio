import Reveal from "@/components/ui/Reveal";

type Skill = {
  name: string;
  description: string;
};

type Group = {
  title: string;
  accent: "magenta" | "cyan" | "acid" | "uv";
  skills: Skill[];
};

const groups: Group[] = [
  {
    title: "Programming & Development",
    accent: "magenta",
    skills: [
      {
        name: "Python",
        description: "Building programming foundations and solving problems.",
      },
      {
        name: "Basic Java",
        description: "Strengthening OOP concepts and programming logic.",
      },
      {
        name: "HTML, CSS & JavaScript",
        description: "Building the structure, style and behavior of web pages.",
      },
    ],
  },
  {
    title: "AI & Machine Learning",
    accent: "cyan",
    skills: [
      {
        name: "AI & Machine Learning",
        description: "Exploring algorithms and intelligent solutions.",
      },
      {
        name: "Generative AI",
        description: "Exploring LLMs and AI-powered applications.",
      },
      {
        name: "Data Structures & Algorithms",
        description: "Improving problem-solving and logical thinking.",
      },
    ],
  },
  {
    title: "Web & Backend",
    accent: "acid",
    skills: [
      {
        name: "React.js",
        description: "Building interactive and dynamic web applications.",
      },
      {
        name: "FastAPI",
        description: "Building APIs and backend applications with Python.",
      },
      {
        name: "SQL & MySQL",
        description: "Writing queries and working with relational databases.",
      },
    ],
  },
  {
    title: "Cloud & Tools",
    accent: "uv",
    skills: [
      {
        name: "AWS & Cloud Fundamentals",
        description: "Learning cloud concepts and AWS core services.",
      },
      {
        name: "Git & GitHub",
        description: "Managing source code and project repositories.",
      },
      {
        name: "Jupyter Notebook",
        description: "Working with Python, experiments and data analysis.",
      },
      {
        name: "Google Colab",
        description: "Experimenting with Python and AI/ML projects.",
      },
    ],
  },
];

const barColor: Record<Group["accent"], string> = {
  magenta: "from-magenta to-uv",
  cyan: "from-cyan to-magenta",
  acid: "from-acid to-cyan",
  uv: "from-uv to-acid",
};

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-cyan">
            Skills
          </p>

          <h2
            id="skills-title"
            className="font-display text-4xl sm:text-5xl mt-2"
          >
            <span className="text-gradient">
              Skills I'm building.
            </span>
          </h2>

          <p className="mt-4 text-muted max-w-2xl">
            I am continuously learning and strengthening my technical skills
            through coursework, practice, and hands-on projects.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <article className="relative rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-white/20 transition">
                <header className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl">
                    {g.title}
                  </h3>

                  <span
                    className="text-[10px] uppercase tracking-widest px-2 py-1 rounded border"
                    style={{
                      borderColor:
                        g.accent === "magenta"
                          ? "#ff00e5"
                          : g.accent === "cyan"
                          ? "#00fff2"
                          : g.accent === "acid"
                          ? "#c6ff00"
                          : "#8b00ff",
                    }}
                  >
                    Learning
                  </span>
                </header>

                <ul className="mt-6 space-y-5">
                  {g.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-ink font-medium">
                          {skill.name}
                        </span>

                        <span className="text-xs text-muted">
                          Developing
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-muted">
                        {skill.description}
                      </p>

                      <div className="mt-3 h-1.5 bg-white/5 rounded overflow-hidden">
                        <div
                          className={`h-full w-2/3 bg-gradient-to-r ${barColor[g.accent]} animate-gradient-shift`}
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-xl border border-white/10 bg-gradient-to-r from-magenta/10 via-uv/10 to-cyan/10 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-muted">
                Currently exploring:
              </span>

              {[
                "Artificial Intelligence",
                "Machine Learning",
                "Generative AI",
                "Python",
                "AWS",
                "React.js",
              ].map((technology) => (
                <span
                  key={technology}
                  className="px-3 py-1 text-xs rounded-full border border-white/10 bg-black/40 hover:border-cyan/50 hover:text-cyan transition"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}