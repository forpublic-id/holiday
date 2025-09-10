import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import {
  CalendarSkeleton,
  HolidayListSkeleton,
} from '@/components/ui/loading-skeleton';

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

          {/* Today Info Skeleton */}
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div>
                <div>
                  <div className="h-5 w-24 bg-muted animate-pulse rounded mb-1"></div>
                  <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
              <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
            </div>
          </div>

          {/* Calendar Skeleton */}
          <CalendarSkeleton />

          {/* Holiday List Skeleton */}
          <HolidayListSkeleton />
        </div>
      </main>

      <Footer locale="id" />
    </div>
  );
}
