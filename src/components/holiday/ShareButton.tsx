'use client';

import { Check, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';
import type { Holiday } from '@/types/holiday';

interface ShareButtonProps {
  holiday: Holiday;
  locale: 'id' | 'en';
}

export default function ShareButton({ holiday, locale }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText =
    locale === 'id'
      ? `${holiday.name.id} - ${holiday.date} | Kalender Libur Indonesia`
      : `${holiday.name.en} - ${holiday.date} | Indonesian Holiday Calendar`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: shareUrl,
        });
      } catch (_error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        <Share2 className="w-4 h-4" />
        {locale === 'id' ? 'Bagikan' : 'Share'}
      </button>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        title={locale === 'id' ? 'Salin tautan' : 'Copy link'}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-600" />
            {locale === 'id' ? 'Tersalin' : 'Copied'}
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            {locale === 'id' ? 'Salin' : 'Copy'}
          </>
        )}
      </button>
    </div>
  );
}
