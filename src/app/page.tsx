import { redirect } from 'next/navigation';

export default function RootPage() {
  // Since localePrefix is 'always', redirect to /id which will be handled by middleware
  redirect('/id');
}
