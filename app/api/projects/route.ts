import { NextResponse } from "next/server";
import { fallbackProjects, type Project } from "@/lib/projects-data";
import { prisma, isDbConfigured } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ source: "fallback", items: fallbackProjects });
  }
  try {
    const rows = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    const items: Project[] = rows.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      techStack: r.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      imageUrl: r.imageUrl ?? undefined,
      liveUrl: r.liveUrl ?? undefined,
      repoUrl: r.repoUrl ?? undefined,
      featured: r.featured,
    }));
    return NextResponse.json({ source: "db", items });
  } catch (err) {
    console.error("[projects] DB fetch failed:", err);
    return NextResponse.json({ source: "fallback", items: fallbackProjects });
  }
}
