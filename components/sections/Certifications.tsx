"use client";

import Reveal from "@/components/ui/Reveal";

const certifications = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
  },
  {
    title: "IBM React",
    issuer: "IBM",
  },
  {
    title: "Packet Switching Networks and Algorithms",
    issuer: "Certification",
  },
  {
    title: "Cybersecurity Technologies",
    issuer: "Certification",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-12">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Credentials
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Certifications
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Certifications and learning achievements that support my
              technical journey in software development, cloud, and
              cybersecurity.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {certifications.map((certification, index) => (
            <Reveal key={certification.title} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-border/60 bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 text-xl">
                  🏆
                </div>

                <h3 className="text-xl font-semibold">
                  {certification.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {certification.issuer}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}