'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Holiday, Province } from '@/types/holiday'
import { useHolidays, useMonthHolidays } from '@/hooks/use-holidays'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeader } from './CalendarHeader'
import { HolidayModal } from './HolidayModal'
import { CalendarLegend } from './CalendarLegend'
import { getAvailableYears } from '@/lib/holiday-data'

interface CalendarProps {
  locale?: string
  initialYear?: number
  initialMonth?: number
  selectedProvince?: Province | null
}

export function Calendar({ 
  locale = 'id', 
  initialYear,
  initialMonth,
  selectedProvince 
}: CalendarProps) {
  const currentDate = new Date()
  const [year, setYear] = useState(initialYear || currentDate.getFullYear())
  const [month, setMonth] = useState(initialMonth || currentDate.getMonth() + 1)
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { holidays } = useHolidays(year)
  const monthHolidays = useMonthHolidays(year, month, holidays)
  
  const availableYears = getAvailableYears()

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1)
      setMonth(12)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1)
      setMonth(1)
    } else {
      setMonth(month + 1)
    }
  }

  const handleDateClick = (date: string) => {
    const holiday = holidays.find(h => h.date === date)
    if (holiday) {
      setSelectedHoliday(holiday)
      setIsModalOpen(true)
    }
  }

  const handleYearChange = (newYear: number) => {
    setYear(newYear)
  }

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth)
  }

  // Filter holidays by province if selected
  const filteredHolidays = selectedProvince 
    ? holidays.filter(holiday => 
        !holiday.provinces || 
        holiday.provinces.length === 0 || 
        holiday.provinces.includes(selectedProvince)
      )
    : holidays

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Calendar Header */}
      <CalendarHeader
        year={year}
        month={month}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        locale={locale}
        availableYears={availableYears}
      />

      {/* Calendar Legend */}
      <CalendarLegend locale={locale} />

      {/* Calendar Grid */}
      <CalendarGrid
        year={year}
        month={month}
        holidays={filteredHolidays}
        onDateClick={handleDateClick}
        locale={locale}
      />

      {/* Holiday Details Modal */}
      <HolidayModal
        holiday={selectedHoliday}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
      />
    </div>
  )
}