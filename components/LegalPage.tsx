/** Shared template for About, Privacy and Terms (mirrors ReqStudio): heading block, then a single card on the desk ground. */
export function LegalPage({
  title,
  description,
  badge,
  lastUpdated,
  children,
}: {
  title: string;
  description?: string;
  badge?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface">
      <div className="site-container py-16 sm:py-20">
        <div className="mx-auto max-w-[40.5rem]">
          {badge && (
            <span className="mb-3 inline-block rounded-full bg-brand-tint px-2.5 py-0.5 text-xs font-semibold text-brand-strong">
              {badge}
            </span>
          )}
          <h1 className="text-balance text-4xl leading-none sm:text-5xl">{title}</h1>
          {description && <p className="mt-3 text-ink-muted">{description}</p>}
          {lastUpdated && <p className="mt-3 text-ink-muted">Last updated {lastUpdated}</p>}

          <article className="plain-headings mt-10 rounded-[20px] border border-line bg-paper p-6 sm:p-8 [&_a]:text-brand-strong [&_a]:underline [&_a]:underline-offset-2 [&_dd]:text-sm [&_dd]:leading-[1.625] [&_dd]:text-ink-strong [&_dl]:mt-3 [&_dl+p]:mt-5 [&_dl]:grid [&_dl]:gap-x-6 [&_dl]:gap-y-4 sm:[&_dl]:grid-cols-2 [&_dt]:text-xs [&_dt]:font-semibold [&_dt]:uppercase [&_dt]:tracking-[0.3px] [&_dt]:text-ink-muted [&_h2]:mt-8 [&_h2]:text-base [&_h2]:leading-6 [&_h2:first-child]:mt-0 [&_h2+*]:mt-3 [&_li]:leading-[1.625] [&_p+p]:mt-3 [&_p]:text-sm [&_p]:leading-[1.625] [&_p]:text-ink-muted [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:text-sm [&_ul]:text-ink-muted [&_ul]:marker:text-ink-muted [&_h2:first-child+p]:text-ink-strong">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}
