import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Simple component to test backend connection.
 * Fetches /api/ping and displays the result.
 * Hidden on /admin routes.
 */
export default function ConnectionTest() {
  const { pathname } = useLocation();
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/ping')
      .then((res) => res.json())
      .then((data) => {
        setStatus('connected');
        setMessage(data.message || 'Backend connected');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.message || 'Backend not reachable');
      });
  }, []);

  if (pathname.startsWith('/admin') || pathname === '/login') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 px-3 py-2 rounded-lg text-sm shadow-lg bg-slate-800 text-white">
      {status === 'checking' && <span>Checking backend...</span>}
      {status === 'connected' && <span>✓ {message}</span>}
      {status === 'error' && <span className="text-red-300">✗ {message}</span>}
    </div>
  );
}
