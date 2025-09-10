import { Badge } from '@/components/ui/badge';
import type { HolidayType } from '@/types/holiday';

interface HolidayBadgeProps {
  type: HolidayType;
}

export default function HolidayBadge({ type }: HolidayBadgeProps) {
  const getBadgeConfig = (type: HolidayType) => {
    switch (type) {
      case 'national':
        return {
          variant: 'destructive' as const,
          className: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
          label: 'Nasional',
        };
      case 'regional':
        return {
          variant: 'default' as const,
          className: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
          label: 'Regional',
        };
      case 'joint_leave':
        return {
          variant: 'secondary' as const,
          className:
            'bg-orange-600 hover:bg-orange-700 text-white border-orange-600',
          label: 'Cuti Bersama',
        };
      case 'religious':
        return {
          variant: 'default' as const,
          className:
            'bg-purple-600 hover:bg-purple-700 text-white border-purple-600',
          label: 'Keagamaan',
        };
      case 'commemoration':
        return {
          variant: 'outline' as const,
          className: 'border-gray-400 text-gray-700',
          label: 'Peringatan',
        };
      default:
        return {
          variant: 'default' as const,
          className: '',
          label: type,
        };
    }
  };

  const config = getBadgeConfig(type);

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}
