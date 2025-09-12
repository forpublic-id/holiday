import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';
import { findHolidayById } from '@/lib/holiday-data';

export const runtime = 'edge';

// Helper function to get month names
function getMonthName(month: number, locale: string): string {
  const monthNames = {
    id: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  };

  return (
    monthNames[locale as keyof typeof monthNames][month - 1] ||
    monthNames.id[month - 1]
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const locale = searchParams.get('locale') || 'id';
    const type = searchParams.get('type') || 'monthly';
    const holidayId = searchParams.get('holiday');

    // Determine content based on type
    let title = '';
    let subtitle = '';
    let dateText = '';
    let monthText = '';
    let iconEmoji = '📅';
    let holiday = null;

    if (holidayId) {
      // Handle holiday-specific OG image
      holiday = findHolidayById(holidayId);
      if (holiday) {
        title = holiday.name[locale as keyof typeof holiday.name] || holiday.name.id;
        subtitle = locale === 'id' ? 'Hari Libur Indonesia' : 'Indonesian Holiday';
        
        // Parse date and create icon
        const holidayDate = new Date(holiday.date + 'T00:00:00');
        const holidayDay = holidayDate.getDate();
        const holidayMonth = holidayDate.getMonth() + 1;
        
        // Create calendar icon with correct date
        dateText = String(holidayDay).padStart(2, '0');
        monthText = getMonthName(holidayMonth, 'id').slice(0, 3).toUpperCase();
      } else {
        // Holiday not found
        title = locale === 'id' ? 'Libur Tidak Ditemukan' : 'Holiday Not Found';
        subtitle = locale === 'id' ? 'Hari Libur Indonesia' : 'Indonesian Holiday';
      }
    } else if (type === 'yearly') {
      title = locale === 'id' ? `Daftar Libur ${year}` : `${year} Holiday List`;
      subtitle =
        locale === 'id'
          ? 'Hari Libur Nasional Indonesia'
          : 'Indonesian National Holidays';
    } else {
      const monthName = month ? getMonthName(Number(month), locale) : '';
      title =
        locale === 'id'
          ? `Libur ${monthName} ${year}`
          : `${monthName} ${year} Holidays`;
      subtitle =
        locale === 'id'
          ? 'Kalender Hari Libur Indonesia'
          : 'Indonesian Holiday Calendar';
    }

    return new ImageResponse(
      <div
        style={{
          background:
            'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.1,
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 10,
            maxWidth: '900px',
            padding: '40px',
          }}
        >
          {/* Logo/Icon area */}
          <div
            style={{
              width: '120px',
              height: '120px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {dateText ? (
              <>
                {/* Calendar header */}
                <div
                  style={{
                    fontSize: '12px',
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: '2px',
                    background: '#dc2626',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {monthText || 'JUL'}
                </div>
                {/* Calendar date */}
                <div
                  style={{
                    fontSize: '36px',
                    color: 'white',
                    fontWeight: 'bold',
                    lineHeight: 1,
                  }}
                >
                  {dateText}
                </div>
              </>
            ) : (
              <div
                style={{
                  fontSize: '60px',
                  color: 'white',
                }}
              >
                {iconEmoji}
              </div>
            )}
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              lineHeight: 1.1,
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '30px',
              fontWeight: '500',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {subtitle}
          </div>

          {/* Website URL */}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '400',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            holiday.forpublic.id
          </div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: '40px' }}>🇮🇩</div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: '500',
          }}
        >
          ForPublic.id
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        // Remove fonts for now to avoid loading issues
      }
    );
  } catch (e: unknown) {
    console.error('OG Image generation error:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
