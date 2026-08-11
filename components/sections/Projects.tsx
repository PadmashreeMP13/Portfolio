import Reveal from "@/components/ui/Reveal";
import { fallbackProjects } from "@/lib/projects-data";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-cyan">Projects</p>
          <h2 id="projects-title" className="font-display font-display text-4xl sm:text-5xl mt-2">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl">
            Practical projects built with AI, machine learning, Python, and thoughtful web interfaces.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {fallbackProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <article className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-cyan/40 transition">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-gradient">{project.title}</h3>
                  {project.featured && (
                    <span className="rounded-full border border-cyan/30 px-3 py-1 text-xs uppercase tracking-widest text-cyan">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-4 text-ink/80 leading-relaxed">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 bg-black/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.repoUrl || project.liveUrl) && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-magenta/10 px-5 py-2 text-sm uppercase tracking-widest text-magenta hover:bg-magenta/20 transition"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-cyan/10 px-5 py-2 text-sm uppercase tracking-widest text-cyan hover:bg-cyan/20 transition"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
