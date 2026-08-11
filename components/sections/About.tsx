import Reveal from "@/components/ui/Reveal";

const highlights = [
  { label: "Current academic year", value: "Fourth-year" },
  { label: "Degree program", value: "B.E. Computer Science" },
  { label: "Focus areas", value: "AI / ML / Python" },
  { label: "Learning tools", value: "Jupyter / GitHub" },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative py-24 sm:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Photo */}
        <Reveal className="relative">
          <div className="relative aspect-square w-full max-w-md mx-auto">
            {/* Glowing border */}
            <div className="absolute inset-0 rounded-2xl border-glow" />

            {/* Photo container */}
            <div className="absolute inset-2 overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <img
                src="/profile.jpg"
                alt="Padmashree M P"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Small label */}
            <span className="absolute -bottom-3 -right-3 px-3 py-2 text-[10px] uppercase tracking-widest bg-black border border-acid text-acid shadow-glow-acid rounded">
              AI/ML Engineer
            </span>
          </div>
        </Reveal>

        {/* About Content */}
        <Reveal delay={120}>
          <p className="text-xs uppercase tracking-widest text-cyan">
            About
          </p>

          <h2
            id="about-title"
            className="font-display text-4xl sm:text-5xl mt-2"
          >
            About Me
          </h2>

          <p className="mt-6 text-ink/80 leading-relaxed">
            I am Padmashree M P, a Computer Science and Engineering student at
            Maharaja Institute of Technology Mysore. I enjoy learning new
            technologies, developing practical projects, and solving
            real-world problems through software and AI.
          </p>

          <p className="mt-4 text-ink/80 leading-relaxed">
            My goal is to build a career as an AI/ML Engineer by strengthening
            my skills in Python, machine learning, and generative AI, while
            creating useful and intelligent applications.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-4">
            {highlights.map((h) => (
              <li
                key={h.label}
                className="rounded-lg border border-white/10 bg-white/5 p-4 group hover:border-cyan/50 hover:shadow-glow-cyan transition"
              >
                <p className="font-display text-2xl sm:text-3xl text-gradient">
                  {h.value}
                </p>

                <p className="mt-1 text-xs uppercase tracking-widest text-muted">
                  {h.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}