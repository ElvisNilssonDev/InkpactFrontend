interface PlaceholderProps {
  name: string;
}

/**
 * Stub page used during the Day 1 router skeleton phase.
 * Each real page replaces this with its actual content as we build it.
 */
export function Placeholder({ name }: PlaceholderProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="rounded-lg border border-border bg-card px-10 py-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Placeholder
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">{name}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Coming soon — real content wired during this feature's day.
        </p>
      </div>
    </div>
  );
}