import { Holiday } from '@/types/holiday';

/**
 * Regional holidays for 2025
 * These are province or region-specific holidays
 */
export const regionalHolidays2025: Holiday[] = [
  // DKI Jakarta
  {
    id: 'jakarta-anniversary-2025',
    name: {
      id: 'Hari Jadi DKI Jakarta',
      en: 'Jakarta Anniversary',
    },
    date: '2025-06-22',
    type: 'regional',
    religion: 'secular',
    provinces: ['dki_jakarta'],
    isVariable: false,
    year: 2025,
    description: {
      id: 'Hari ulang tahun DKI Jakarta',
      en: 'Anniversary of Jakarta as the capital city',
    },
  },

  // Bali
  {
    id: 'galungan-2025',
    name: {
      id: 'Hari Raya Galungan',
      en: 'Galungan Day',
    },
    date: '2025-05-07',
    type: 'regional',
    religion: 'hindu',
    provinces: ['bali'],
    isVariable: true,
    year: 2025,
    description: {
      id: 'Hari raya umat Hindu Bali',
      en: 'Hindu Balinese religious holiday',
    },
  },
  {
    id: 'kuningan-2025',
    name: {
      id: 'Hari Raya Kuningan',
      en: 'Kuningan Day',
    },
    date: '2025-05-17',
    type: 'regional',
    religion: 'hindu',
    provinces: ['bali'],
    isVariable: true,
    year: 2025,
    description: {
      id: 'Hari raya umat Hindu Bali, 10 hari setelah Galungan',
      en: 'Hindu Balinese religious holiday, 10 days after Galungan',
    },
  },

  // Aceh
  {
    id: 'aceh-special-autonomy-2025',
    name: {
      id: 'Hari Otonomi Khusus Aceh',
      en: 'Aceh Special Autonomy Day',
    },
    date: '2025-08-15',
    type: 'regional',
    religion: 'secular',
    provinces: ['aceh'],
    isVariable: false,
    year: 2025,
    description: {
      id: 'Hari peringatan otonomi khusus Aceh',
      en: 'Commemoration of Aceh Special Autonomy',
    },
  },

  // Papua
  {
    id: 'papua-anniversary-2025',
    name: {
      id: 'Hari Jadi Papua',
      en: 'Papua Anniversary',
    },
    date: '2025-05-01',
    type: 'regional',
    religion: 'secular',
    provinces: [
      'papua',
      'papua_barat',
      'papua_selatan',
      'papua_tengah',
      'papua_pegunungan',
      'papua_barat_daya',
    ],
    isVariable: false,
    year: 2025,
    description: {
      id: 'Hari jadi Provinsi Papua',
      en: 'Papua Province Anniversary',
    },
  },

  // Yogyakarta
  {
    id: 'yogyakarta-anniversary-2025',
    name: {
      id: 'Hari Jadi Kota Yogyakarta',
      en: 'Yogyakarta City Anniversary',
    },
    date: '2025-10-07',
    type: 'regional',
    religion: 'secular',
    provinces: ['diy_yogyakarta'],
    isVariable: false,
    year: 2025,
    description: {
      id: 'Hari jadi Kota Yogyakarta',
      en: 'Anniversary of Yogyakarta City',
    },
  },

  // West Java
  {
    id: 'west-java-anniversary-2025',
    name: {
      id: 'Hari Jadi Jawa Barat',
      en: 'West Java Anniversary',
    },
    date: '2025-04-19',
    type: 'regional',
    religion: 'secular',
    provinces: ['jawa_barat'],
    isVariable: false,
    year: 2025,
    description: {
      id: 'Hari jadi Provinsi Jawa Barat',
      en: 'West Java Province Anniversary',
    },
  },

  // East Java
  {
    id: 'east-java-anniversary-2025',
    name: {
      id: 'Hari Jadi Jawa Timur',
      en: 'East Java Anniversary',
    },
    date: '2025-10-12',
    type: 'regional',
    religion: 'secular',
    provinces: ['jawa_timur'],
    isVariable: false,
    year: 2025,
    description: {
      id: 'Hari jadi Provinsi Jawa Timur',
      en: 'East Java Province Anniversary',
    },
  },

  // Central Java
  {
    id: 'central-java-anniversary-2025',
    name: {
      id: 'Hari Jadi Jawa Tengah',
      en: 'Central Java Anniversary',
    },
    date: '2025-08-15',
    type: 'regional',
    religion: 'secular',
    provinces: ['jawa_tengah'],
    isVariable: false,
    year: 2025,
    description: {
      id: 'Hari jadi Provinsi Jawa Tengah',
      en: 'Central Java Province Anniversary',
    },
  },
];
