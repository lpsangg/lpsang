import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { projects } from "@/components/portfolio/ProjectShowcase";
import { EASE, MaskReveal, ScrollProgress } from "@/components/portfolio/motion-primitives";
import { Nav } from "@/components/portfolio/Nav";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — Le Phuoc Sang` : "Case study";
    const desc = p?.description ?? "Case study";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/work/${params.slug}` },
        ...(p?.image ? [{ property: "og:image", content: p.image }] : []),
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen grid place-items-center bg-background text-foreground px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">404</p>
        <h1 className="font-serif text-5xl tracking-tight mb-6">Case study not found.</h1>
        <Link to="/" className="text-sm border-b border-foreground/40 hover:border-foreground">
          Back to portfolio
        </Link>
      </div>
    </main>
  ),
  errorComponent: ({ reset }) => (
    <main className="min-h-screen grid place-items-center bg-background text-foreground">
      <button onClick={reset} className="text-sm border-b border-foreground/40">Try again</button>
    </main>
  ),
  component: WorkDetail,
});

function WorkDetail() {
  const { project } = Route.useLoaderData();
  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIdx + 1) % projects.length];

  return (
    <main className="bg-background text-foreground min-h-screen">
      <ScrollProgress />
      <Nav />

      <article className="pt-32 md:pt-40 pb-32">
        <header className="mx-auto max-w-7xl px-6 md:px-10">
          <Link
            to="/"
            data-cursor-text="BACK"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground inline-flex items-center gap-2 mb-10 hover:text-foreground transition-colors"
          >
            <span aria-hidden>←</span> Back to work
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Case study · {project.index} / {project.year}
          </p>
          <MaskReveal
            text={project.title}
            className="font-serif text-5xl md:text-8xl tracking-tight leading-[0.95] block max-w-5xl"
          />
          <p className="mt-10 text-lg md:text-2xl font-serif italic text-foreground/80 leading-snug max-w-3xl">
            {project.description}
          </p>
        </header>

        <motion.div
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="mx-auto max-w-7xl px-6 md:px-10 mt-20"
        >
          <div className="aspect-video bg-muted rounded-md overflow-hidden border border-border">
            <img src={project.image} alt={project.title} className="size-full object-contain" />
          </div>
        </motion.div>

        <section className="mx-auto max-w-7xl px-6 md:px-10 mt-24 grid md:grid-cols-12 gap-12">
          <dl className="md:col-span-4 md:sticky md:top-32 self-start space-y-6 text-sm">
            {[
              ["Role", project.role],
              ["Year", project.year],
              ["Stack", project.stack],
              ...(project.highlight ? [["Outcome", project.highlight]] : []),
            ].map(([k, v]) => (
              <div key={k as string} className="border-t border-border pt-4">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1">
                  {k}
                </dt>
                <dd className="leading-relaxed">{v}</dd>
              </div>
            ))}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor-text="DEMO"
                className="group inline-flex items-center gap-3 bg-foreground text-background rounded-full pl-5 pr-2 py-2 text-sm hover:bg-foreground/85 transition-colors mt-4 w-fit"
              >
                Open live demo
                <span className="size-7 rounded-full bg-background/15 grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                  ↗
                </span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor-text="CODE"
                className="group inline-flex items-center gap-3 border border-border bg-card/20 text-foreground rounded-full pl-5 pr-2 py-2 text-sm hover:bg-foreground hover:text-background transition-all duration-300 mt-2.5 w-fit"
              >
                View GitHub
                <span className="size-7 rounded-full bg-foreground/10 group-hover:bg-background/15 grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                  ↗
                </span>
              </a>
            )}
          </dl>

          <div className="md:col-span-8 space-y-12 text-foreground/85 leading-relaxed text-base md:text-lg">
            <Section title="Context">
              <p>
                {project.context || (
                  <>
                    {project.title} sits at the intersection of {project.role.toLowerCase()} and
                    product engineering. The brief: take a research-grade approach and ship it as
                    something a real person could rely on day to day — predictable, fast, and quiet
                    under failure.
                  </>
                )}
              </p>
            </Section>
            <Section title="Approach">
              <p>
                {project.approach || (
                  <>
                    The work began with a tight loop: define the smallest useful slice, ship the
                    evaluation harness first, and only then start optimizing. Stack choices — {" "}
                    <em className="font-serif">{project.stack}</em> — were made to keep the system
                    debuggable end-to-end rather than chasing benchmarks.
                    <span className="block mt-4">
                      Latency, calibration, and error modes were treated as product surface, not
                      postscript. Every change passed through automated checks before reaching the
                      interface.
                    </span>
                  </>
                )}
              </p>
            </Section>
            {project.highlight && (
              <Section title="Outcome">
                <p className="font-serif text-2xl md:text-3xl tracking-tight leading-tight text-foreground">
                  {project.highlight}.
                </p>
              </Section>
            )}
            <Section title="Reflection">
              <p>
                {project.reflection || (
                  <>
                    Building this taught me that the gap between a working model and a trustworthy
                    product is mostly about restraint — the discipline to evaluate, the patience to
                    wait for signal, and the taste to remove what isn't earning its place.
                  </>
                )}
              </p>
            </Section>
          </div>
        </section>
      </article>

      <nav className="border-t border-border">
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          data-cursor-text="NEXT"
          className="block mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24 group"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Next case study · {next.index}
          </p>
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-7xl tracking-tight leading-none">
              {next.title}
            </h2>
            <span className="text-3xl md:text-5xl transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </div>
        </Link>
      </nav>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-8">
      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}