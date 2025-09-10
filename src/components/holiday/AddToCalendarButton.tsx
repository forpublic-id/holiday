'use client';

import { Calendar, Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { Holiday } from '@/types/holiday';

interface AddToCalendarButtonProps {
  holiday: Holiday;
  locale: 'id' | 'en';
}

export default function AddToCalendarButton({
  holiday,
  locale,
}: AddToCalendarButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const formatDateForCalendar = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10).replace(/-/g, '');
  };

  const holidayName = holiday.name[locale];
  const holidayDate = formatDateForCalendar(holiday.date);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(holidayName)}&dates=${holidayDate}/${holidayDate}&details=${encodeURIComponent(holiday.description?.[locale] || '')}&location=Indonesia`;

  const generateICalContent = () => {
    const startDate = holidayDate;
    const endDate = holidayDate;

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Holiday Calendar Indonesia//EN
BEGIN:VEVENT
UID:${holiday.id}@holiday-calendar-indonesia.com
DTSTAMP:${new Date().toISOString().slice(0, 19).replace(/[-:]/g, '')}Z
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
SUMMARY:${holidayName}
DESCRIPTION:${holiday.description?.[locale] || ''}
LOCATION:Indonesia
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;
  };

  const downloadICal = () => {
    const content = generateICalContent();
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${holiday.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
      >
        <Calendar className="w-4 h-4" />
        {locale === 'id' ? 'Tambah ke Kalender' : 'Add to Calendar'}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-1">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setShowDropdown(false)}
            >
              <ExternalLink className="w-4 h-4" />
              Google Calendar
            </a>

            <button
              onClick={downloadICal}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
            >
              <Download className="w-4 h-4" />
              {locale === 'id' ? 'Unduh iCal' : 'Download iCal'}
            </button>
          </div>
        </div>
      )}

      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
