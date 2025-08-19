'use client'

import { useMemo } from 'react'
import { Holiday } from '@/types/holiday'
import { useIsHoliday } from '@/hooks/use-holidays'
import { formatHolidayDate, isWeekend } from '@/lib/holiday-utils'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CalendarGridProps {
  year: number
  month: number // 1-12
  holidays: Holiday[]
  onDateClick?: (date: string) => void
  locale?: string
}

interface CalendarDay {
  date: string
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isWeekend: boolean
  holiday: Holiday | null
}

export function CalendarGrid({ year, month, holidays, onDateClick, locale = 'id' }: CalendarGridProps) {
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0)
    const startDate = new Date(firstDay)
    const endDate = new Date(lastDay)
    
    // Get first day of the week (Sunday = 0, Monday = 1)
    const firstDayOfWeek = firstDay.getDay()
    
    // Add days from previous month
    startDate.setDate(startDate.getDate() - firstDayOfWeek)
    
    // Add days until we have complete weeks
    const daysToShow = Math.ceil((endDate.getDate() + firstDayOfWeek) / 7) * 7
    
    const days: CalendarDay[] = []
    const today = new Date().toISOString().split('T')[0]
    
    for (let i = 0; i < daysToShow; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      
      const dateString = currentDate.toISOString().split('T')[0]
      const isCurrentMonth = currentDate.getMonth() === month - 1
      
      days.push({
        date: dateString,
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday: dateString === today,
        isWeekend: isWeekend(dateString),
        holiday: holidays.find(h => h.date === dateString) || null
      })
    }
    
    return days
  }, [year, month, holidays])

  const weekDays = locale === 'id' 
    ? ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getHolidayTypeColor = (type: Holiday['type']) => {
    switch (type) {
      case 'national':
        return 'bg-red-500'
      case 'religious':
        return 'bg-purple-500'
      case 'regional':
        return 'bg-blue-500'
      case 'joint_leave':
        return 'bg-orange-500'
      case 'commemoration':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getHolidayTypeBadge = (type: Holiday['type']) => {
    switch (type) {
      case 'national':
        return 'destructive'
      case 'religious':
        return 'secondary'
      case 'regional':
        return 'default'
      case 'joint_leave':
        return 'outline'
      case 'commemoration':
        return 'outline'
      default:
        return 'outline'
    }
  }

  return (
    <TooltipProvider>
      <div className="calendar-grid">
        {/* Header with day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((calendarDay) => (
            <Tooltip key={calendarDay.date}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "relative h-12 sm:h-16 border border-border rounded-md p-1 cursor-pointer transition-colors hover:bg-accent",
                    !calendarDay.isCurrentMonth && "opacity-50",
                    calendarDay.isToday && "ring-2 ring-primary",
                    calendarDay.isWeekend && "bg-muted/50",
                    calendarDay.holiday && "bg-accent"
                  )}
                  onClick={() => onDateClick?.(calendarDay.date)}
                >
                  {/* Day number */}
                  <div className="text-sm font-medium">
                    {calendarDay.day}
                  </div>
                  
                  {/* Holiday indicator */}
                  {calendarDay.holiday && (
                    <div className="absolute top-1 right-1">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          getHolidayTypeColor(calendarDay.holiday.type)
                        )}
                      />
                    </div>
                  )}
                  
                  {/* Holiday name (on larger screens) */}
                  {calendarDay.holiday && (
                    <div className="hidden sm:block mt-1">
                      <Badge
                        variant={getHolidayTypeBadge(calendarDay.holiday.type)}
                        className="text-xs px-1 py-0 h-auto leading-tight"
                      >
                        {calendarDay.holiday.name[locale as 'id' | 'en'].slice(0, 8)}...
                      </Badge>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              
              {calendarDay.holiday && (
                <TooltipContent>
                  <div className="max-w-sm">
                    <p className="font-medium">
                      {calendarDay.holiday.name[locale as 'id' | 'en']}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatHolidayDate(calendarDay.holiday.date, locale)}
                    </p>
                    {calendarDay.holiday.description && (
                      <p className="text-xs mt-1">
                        {calendarDay.holiday.description[locale as 'id' | 'en']}
                      </p>
                    )}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}