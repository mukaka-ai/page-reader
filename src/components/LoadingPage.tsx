import { Skeleton } from "@/components/ui/skeleton";

interface LoadingPageProps {
  title?: string;
  showCards?: boolean;
  cardCount?: number;
}

export function LoadingPage({ title = "Loading...", showCards = true, cardCount = 3 }: LoadingPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>

        {/* Content skeleton */}
        {showCards && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: cardCount }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-28" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-14 w-14 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-primary border-t-transparent ${sizes[size]}`} />
    </div>
  );
}
