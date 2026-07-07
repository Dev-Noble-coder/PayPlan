import { redirect } from 'next/navigation';

export default function Home() {
  // For the sake of the demo, we immediately redirect to the dashboard.
  // In a real app, this might check for authentication first.
  redirect('/dashboard');
}
