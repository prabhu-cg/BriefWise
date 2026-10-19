export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-ink-muted">Last updated {lastUpdated}</p>
      <div className="mt-10 [&_a]:font-semibold [&_a]:text-brand-strong [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-strong [&_li]:leading-relaxed [&_p]:text-lg [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:text-lg">
        {children}
      </div>
    </div>
  );
}
