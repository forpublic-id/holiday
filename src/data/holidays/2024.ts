import { HolidayYear } from '@/types/holiday'

export const holidays2024: HolidayYear = {
  year: 2024,
  lastUpdated: '2025-08-25T12:00:00Z',
  source: 'SKB 3 Menteri No. 855, 3, dan 4 Tahun 2023 - Data lengkap 17 hari libur nasional dan 10 cuti bersama',
  holidays: [
    // National Holidays
    {
      id: 'new-year-2024',
      name: {
        id: 'Tahun Baru Masehi',
        en: 'New Year\'s Day'
      },
      date: '2024-01-01',
      type: 'national',
      religion: 'secular',
      isVariable: false,
      year: 2024
    },
    {
      id: 'isra-miraj-2024',
      name: {
        id: 'Isra Mi\'raj Nabi Muhammad SAW',
        en: 'Isra Mi\'raj'
      },
      date: '2024-02-08',
      type: 'national',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    {
      id: 'chinese-new-year-2024',
      name: {
        id: 'Tahun Baru Imlek',
        en: 'Chinese New Year'
      },
      date: '2024-02-10',
      type: 'national',
      religion: 'confucian',
      isVariable: true,
      year: 2024
    },
    {
      id: 'nyepi-2024',
      name: {
        id: 'Hari Raya Nyepi Tahun Baru Saka',
        en: 'Nyepi (Balinese New Year)'
      },
      date: '2024-03-11',
      type: 'national',
      religion: 'hindu',
      isVariable: true,
      year: 2024
    },
    {
      id: 'good-friday-2024',
      name: {
        id: 'Wafat Isa Al Masih',
        en: 'Good Friday'
      },
      date: '2024-03-29',
      type: 'national',
      religion: 'christian',
      isVariable: true,
      year: 2024
    },
    {
      id: 'easter-2024',
      name: {
        id: 'Hari Paskah',
        en: 'Easter Sunday'
      },
      date: '2024-03-31',
      type: 'national',
      religion: 'christian',
      isVariable: true,
      year: 2024
    },
    {
      id: 'eid-al-fitr-1-2024',
      name: {
        id: 'Hari Raya Idul Fitri',
        en: 'Eid al-Fitr'
      },
      date: '2024-04-10',
      type: 'national',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    {
      id: 'eid-al-fitr-2-2024',
      name: {
        id: 'Hari Raya Idul Fitri (Hari Kedua)',
        en: 'Eid al-Fitr (Second Day)'
      },
      date: '2024-04-11',
      type: 'national',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    {
      id: 'labor-day-2024',
      name: {
        id: 'Hari Buruh Internasional',
        en: 'International Labor Day'
      },
      date: '2024-05-01',
      type: 'national',
      religion: 'secular',
      isVariable: false,
      year: 2024
    },
    {
      id: 'vesak-2024',
      name: {
        id: 'Hari Raya Waisak',
        en: 'Vesak Day'
      },
      date: '2024-05-23',
      type: 'national',
      religion: 'buddhist',
      isVariable: true,
      year: 2024
    },
    {
      id: 'ascension-2024',
      name: {
        id: 'Kenaikan Isa Al Masih',
        en: 'Ascension of Jesus Christ'
      },
      date: '2024-05-09',
      type: 'national',
      religion: 'christian',
      isVariable: true,
      year: 2024
    },
    {
      id: 'pancasila-day-2024',
      name: {
        id: 'Hari Lahir Pancasila',
        en: 'Pancasila Day'
      },
      date: '2024-06-01',
      type: 'national',
      religion: 'secular',
      isVariable: false,
      year: 2024
    },
    {
      id: 'eid-al-adha-2024',
      name: {
        id: 'Hari Raya Idul Adha',
        en: 'Eid al-Adha'
      },
      date: '2024-06-17',
      type: 'national',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    {
      id: 'independence-day-2024',
      name: {
        id: 'Hari Kemerdekaan Republik Indonesia',
        en: 'Indonesian Independence Day'
      },
      date: '2024-08-17',
      type: 'national',
      religion: 'secular',
      isVariable: false,
      year: 2024
    },
    {
      id: 'islamic-new-year-2024',
      name: {
        id: 'Tahun Baru Islam (1 Muharram)',
        en: 'Islamic New Year'
      },
      date: '2024-07-07',
      type: 'national',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    {
      id: 'mawlid-2024',
      name: {
        id: 'Maulid Nabi Muhammad SAW',
        en: 'Prophet Muhammad\'s Birthday'
      },
      date: '2024-09-16',
      type: 'national',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    {
      id: 'christmas-2024',
      name: {
        id: 'Hari Raya Natal',
        en: 'Christmas Day'
      },
      date: '2024-12-25',
      type: 'national',
      religion: 'christian',
      isVariable: false,
      year: 2024
    }
  ],
  jointLeaves: [
    // Cuti bersama Tahun Baru Imlek
    {
      id: 'joint-leave-imlek-2024',
      name: {
        id: 'Cuti Bersama Tahun Baru Imlek',
        en: 'Chinese New Year Joint Leave'
      },
      date: '2024-02-09',
      type: 'joint_leave',
      religion: 'confucian',
      isVariable: true,
      year: 2024
    },
    // Cuti bersama Hari Suci Nyepi
    {
      id: 'joint-leave-nyepi-2024',
      name: {
        id: 'Cuti Bersama Hari Suci Nyepi',
        en: 'Nyepi Joint Leave'
      },
      date: '2024-03-12',
      type: 'joint_leave',
      religion: 'hindu',
      isVariable: true,
      year: 2024
    },
    // Cuti bersama Idul Fitri
    {
      id: 'joint-leave-eid-2024-1',
      name: {
        id: 'Cuti Bersama Idul Fitri',
        en: 'Eid al-Fitr Joint Leave'
      },
      date: '2024-04-08',
      type: 'joint_leave',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    {
      id: 'joint-leave-eid-2024-2',
      name: {
        id: 'Cuti Bersama Idul Fitri',
        en: 'Eid al-Fitr Joint Leave'
      },
      date: '2024-04-09',
      type: 'joint_leave',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    {
      id: 'joint-leave-eid-2024-3',
      name: {
        id: 'Cuti Bersama Idul Fitri',
        en: 'Eid al-Fitr Joint Leave'
      },
      date: '2024-04-12',
      type: 'joint_leave',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    {
      id: 'joint-leave-eid-2024-4',
      name: {
        id: 'Cuti Bersama Idul Fitri',
        en: 'Eid al-Fitr Joint Leave'
      },
      date: '2024-04-15',
      type: 'joint_leave',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    // Cuti bersama Kenaikan Isa Almasih
    {
      id: 'joint-leave-ascension-2024',
      name: {
        id: 'Cuti Bersama Kenaikan Isa Almasih',
        en: 'Ascension Day Joint Leave'
      },
      date: '2024-05-10',
      type: 'joint_leave',
      religion: 'christian',
      isVariable: true,
      year: 2024
    },
    // Cuti bersama Hari Raya Waisak
    {
      id: 'joint-leave-vesak-2024',
      name: {
        id: 'Cuti Bersama Hari Raya Waisak',
        en: 'Vesak Day Joint Leave'
      },
      date: '2024-05-24',
      type: 'joint_leave',
      religion: 'buddhist',
      isVariable: true,
      year: 2024
    },
    // Cuti bersama Hari Raya Idul Adha
    {
      id: 'joint-leave-adha-2024',
      name: {
        id: 'Cuti Bersama Hari Raya Idul Adha',
        en: 'Eid al-Adha Joint Leave'
      },
      date: '2024-06-18',
      type: 'joint_leave',
      religion: 'islam',
      isVariable: true,
      year: 2024
    },
    // Cuti bersama Hari Raya Natal
    {
      id: 'joint-leave-christmas-2024',
      name: {
        id: 'Cuti Bersama Hari Raya Natal',
        en: 'Christmas Joint Leave'
      },
      date: '2024-12-26',
      type: 'joint_leave',
      religion: 'christian',
      isVariable: false,
      year: 2024
    }
  ]
}