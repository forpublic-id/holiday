'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { FAQSchema } from './SchemaMarkup';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  locale: string;
}

export function FAQ({ locale }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const faqs: FAQItem[] =
    locale === 'id'
      ? [
          {
            question: 'Kapan libur Lebaran 2025?',
            answer:
              'Libur Lebaran 2025 diprediksi jatuh pada 30 Maret - 6 April 2025, termasuk cuti bersama. Tanggal pasti akan dikonfirmasi setelah penetapan resmi pemerintah berdasarkan perhitungan hilal.',
          },
          {
            question: 'Berapa hari libur nasional Indonesia tahun 2025?',
            answer:
              'Indonesia memiliki sekitar 16 hari libur nasional dan cuti bersama pada tahun 2025, termasuk Tahun Baru, Imlek, Hari Raya Nyepi, Idul Fitri, Hari Buruh, Waisak, Idul Adha, HUT Kemerdekaan, Maulid Nabi, dan Natal.',
          },
          {
            question: 'Apa perbedaan libur nasional dan cuti bersama?',
            answer:
              'Libur nasional adalah hari libur resmi yang ditetapkan pemerintah berdasarkan undang-undang, sedangkan cuti bersama adalah hari kerja yang diliburkan untuk memperpanjang masa libur nasional agar menjadi long weekend yang efisien.',
          },
          {
            question:
              'Bagaimana cara merencanakan liburan dengan kalender ini?',
            answer:
              'Gunakan fitur filter untuk melihat libur nasional dan cuti bersama, lalu kombinasikan dengan cuti pribadi untuk membuat long weekend yang optimal. Kalender kami menampilkan semua informasi yang dibutuhkan untuk perencanaan liburan yang efektif.',
          },
          {
            question: 'Apakah libur daerah berlaku untuk semua orang?',
            answer:
              'Libur daerah hanya berlaku untuk wilayah tertentu sesuai dengan peraturan pemerintah daerah. Misalnya, Hari Raya Nyepi hanya libur resmi di Bali, sedangkan libur nasional berlaku untuk seluruh Indonesia.',
          },
          {
            question:
              'Kapan pemerintah mengumumkan libur dan cuti bersama resmi?',
            answer:
              'Pemerintah biasanya mengumumkan penetapan hari libur nasional dan cuti bersama melalui SKB (Surat Keputusan Bersama) 3 Menteri pada akhir tahun sebelumnya atau awal tahun berjalan.',
          },
        ]
      : [
          {
            question: 'When is Eid holiday 2025 in Indonesia?',
            answer:
              'Eid holiday 2025 is predicted to fall on March 30 - April 6, 2025, including joint leave days. The exact dates will be confirmed after official government announcement based on moon sighting calculations.',
          },
          {
            question: 'How many national holidays does Indonesia have in 2025?',
            answer:
              'Indonesia has approximately 16 national holidays and joint leave days in 2025, including New Year, Chinese New Year, Nyepi, Eid al-Fitr, Labor Day, Vesak, Eid al-Adha, Independence Day, Maulid, and Christmas.',
          },
          {
            question:
              'What is the difference between national holidays and joint leave days?',
            answer:
              'National holidays are official holidays set by the government based on legislation, while joint leave days are working days that are made holidays to extend national holidays into efficient long weekends.',
          },
          {
            question: 'How to plan vacation using this calendar?',
            answer:
              'Use the filter feature to view national holidays and joint leave days, then combine with personal leave to create optimal long weekends. Our calendar displays all the information needed for effective vacation planning.',
          },
          {
            question: 'Do regional holidays apply to everyone?',
            answer:
              'Regional holidays only apply to specific areas according to local government regulations. For example, Nyepi is only an official holiday in Bali, while national holidays apply throughout Indonesia.',
          },
          {
            question:
              'When does the government announce official holidays and joint leave days?',
            answer:
              'The government usually announces national holidays and joint leave days through SKB (Joint Decree) of 3 Ministers at the end of the previous year or early in the current year.',
          },
        ];

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <>
      <FAQSchema locale={locale} />
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'id'
            ? 'Pertanyaan yang Sering Diajukan'
            : 'Frequently Asked Questions'}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg">
              <button
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.has(index)}
              >
                <span className="font-medium">{faq.question}</span>
                {openItems.has(index) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {openItems.has(index) && (
                <div className="px-4 pb-3 text-muted-foreground">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
