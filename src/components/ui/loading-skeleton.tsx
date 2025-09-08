'use client';

import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };

export function CalendarSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-20" />
          </div>
          <Skeleton className="h-10 w-10" />
        </div>

        {/* Legend skeleton */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Calendar grid skeleton */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array(7).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-8" />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array(42).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-12 sm:h-16" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HolidayListSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-16 ml-auto" />
      </div>
      
      <div className="space-y-4">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-md border border-border bg-secondary/30">
            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-64 mb-2" />
              <Skeleton className="h-4 w-32 mb-2" />
              <div className="flex gap-2 mb-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="text-right">
              <Skeleton className="h-8 w-8 mb-1" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}