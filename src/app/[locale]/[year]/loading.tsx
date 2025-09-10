import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { HolidayListSkeleton } from '@/components/ui/loading-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Header locale="id" />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="text-center">
            <div className="mb-4 h-10 bg-muted animate-pulse rounded mx-auto max-w-md"></div>
            <div className="h-6 bg-muted animate-pulse rounded mx-auto max-w-lg"></div>
          </header>

          {/* Filter Controls Skeleton */}
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="h-10 w-40 bg-muted animate-pulse rounded"></div>
            <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
          </div>

          {/* Holiday List Skeleton */}
          <HolidayListSkeleton />
        </div>
      </main>

      <Footer locale="id" />
    </div>
  );
}
