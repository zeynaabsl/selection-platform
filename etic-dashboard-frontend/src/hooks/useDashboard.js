import { useEffect, useState } from 'react';
import { getDashboard } from '../services/dashboardService.js';

export default function useDashboard(eventId, role) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    getDashboard(eventId, role)
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((error) => !cancelled && setState({ data: null, loading: false, error }));
    return () => { cancelled = true; };
  }, [eventId, role]);

  return state;
}
