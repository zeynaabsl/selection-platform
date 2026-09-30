import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { mockSession } from './mocks/mockSession.js';

const ComingSoon = () => <p className="text-slate-500">Page à venir.</p>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/events/${mockSession.defaultEventId}/dashboard`} replace />} />
      <Route path="/events/:eventId" element={<Layout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
