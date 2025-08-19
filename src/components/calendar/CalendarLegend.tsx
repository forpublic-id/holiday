'use client'

import { Badge } from '@/components/ui/badge'

interface CalendarLegendProps {
  locale?: string
}

export function CalendarLegend({ locale = 'id' }: CalendarLegendProps) {
  const legendItems = [
    {
      type: 'national',
      color: 'bg-red-500',
      badge: 'destructive',
      label: locale === 'id' ? 'Libur Nasional' : 'National Holiday'
    },
    {
      type: 'religious',
      color: 'bg-purple-500',
      badge: 'secondary',
      label: locale === 'id' ? 'Libur Keagamaan' : 'Religious Holiday'
    },
    {
      type: 'regional',
      color: 'bg-blue-500',
      badge: 'default',
      label: locale === 'id' ? 'Libur Daerah' : 'Regional Holiday'
    },
    {
      type: 'joint_leave',
      color: 'bg-orange-500',
      badge: 'outline',
      label: locale === 'id' ? 'Cuti Bersama' : 'Joint Leave'
    }
  ] as const

  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
      {legendItems.map((item) => (
        <div key={item.type} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${item.color}`} />
          <span className="text-sm text-muted-foreground">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}