import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import useSession from '../../hooks/useSession.js';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { role, user } = useSession();

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 lg:flex lg:gap-6 lg:p-6">
      <Sidebar role={role} open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1 space-y-6 p-4 lg:p-0">
        <Header user={user} onMenuClick={() => setOpen(true)} />
        <main><Outlet /></main>
      </div>
    </div>
  );
}
