import { useParams } from 'react-router-dom';
import useSession from '../hooks/useSession.js';
import useDashboard from '../hooks/useDashboard.js';
import DashboardAdmin from '../components/dashboard/DashboardAdmin.jsx';
import DashboardSelector from '../components/dashboard/DashboardSelector.jsx';

export default function DashboardPage() {
  const { eventId } = useParams();
  const { role } = useSession();
  const { data, loading, error } = useDashboard(eventId, role);

  if (loading) return <p className="text-slate-500">Chargement du dashboard…</p>;
  if (error) return <p className="text-red-600">Impossible de charger le dashboard ({error.message}). Recharge la page.</p>;

  return role === 'ADMIN' ? <DashboardAdmin data={data} /> : <DashboardSelector data={data} />;
}
