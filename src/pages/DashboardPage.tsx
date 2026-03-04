import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  getUserBookings,
  cancelBooking,
  type Booking,
  type BookingType,
} from '../lib/bookingsService';
import { Button } from '../components/ui/button';

const TYPE_LABELS: Record<BookingType, string> = {
  package: 'Tour Package',
  rental: 'Car Rental',
  airticket: 'Air Ticket',
  custom: 'Custom Tour',
};

const TYPE_ICONS: Record<BookingType, string> = {
  package: '🗺️',
  rental: '🚗',
  airticket: '✈️',
  custom: '🎯',
};

function formatDate(val: unknown): string {
  if (!val) return '-';
  if (typeof val === 'object' && val !== null && 'seconds' in val) {
    return new Date((val as { seconds: number }).seconds * 1000).toLocaleDateString();
  }
  return String(val);
}

function BookingCard({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: (id: string) => void;
}) {
  const { type, status, data } = booking;
  const isCancelled = status === 'cancelled';
  const isConfirmed = status === 'confirmed';

  const summary =
    type === 'package'
      ? `${data.packageName || 'Tour'} · ${data.travelers || '-'} travelers`
      : type === 'rental'
        ? `${data.carModel || 'Car'} · ${data.startDate || '-'} to ${data.endDate || '-'}`
        : type === 'airticket'
          ? `${data.departure || '-'} → ${data.arrival || '-'}`
          : type === 'custom'
            ? `Custom tour · ${data.groupSize || '-'} people`
            : 'Booking';

  return (
    <div
      className={`bg-white rounded-xl border p-5 transition-shadow hover:shadow-md ${
        isCancelled ? 'opacity-60 border-gray-200' : 'border-gray-200'
      }`}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
          {TYPE_ICONS[type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                {TYPE_LABELS[type]}
              </span>
              <p className="font-medium text-gray-800 mt-1">{summary}</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {formatDate(booking.createdAt)}
              </p>
              {isConfirmed && (
                <span className="inline-block mt-2 text-sm text-green-600 font-medium">Confirmed</span>
              )}
              {isCancelled && (
                <span className="inline-block mt-2 text-sm text-red-600 font-medium">Cancelled</span>
              )}
            </div>
            {!isCancelled && !isConfirmed && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCancel(booking.id)}
                className="flex-shrink-0 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-red-200 hover:text-red-600"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/dashboard' } } });
      return;
    }
    setError(null);
    getUserBookings(user.uid)
      .then(setBookings)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load');
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleCancel = async (id: string) => {
    try {
      await cancelBooking(id);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen font-sans bg-light pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-bold text-primary">My Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {user.email ? `Welcome back, ${user.email.split('@')[0]}` : 'Welcome back'}
          </p>
        </div>

        {/* Summary card */}
        {!loading && bookings.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Your requests</span>
              <span className="font-semibold text-primary">
                {pendingCount} pending
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800 font-medium">Could not load requests</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <p className="text-xs text-red-500 mt-2">
              If the error mentions an index, click the link to create it. Otherwise check Firestore rules.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                getUserBookings(user!.uid)
                  .then(setBookings)
                  .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
                  .finally(() => setLoading(false));
              }}
              className="mt-3 text-sm font-medium text-primary hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
            <div className="text-4xl mb-4">📋</div>
            <p className="font-medium text-gray-800">No requests yet</p>
            <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
              Book a tour, rent a car, or request air tickets to see your requests here.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link to="/packages">
                <Button variant="outline" size="sm" className="border">
                  Tour Packages
                </Button>
              </Link>
              <Link to="/car-rentals">
                <Button variant="outline" size="sm" className="border">
                  Car Rentals
                </Button>
              </Link>
              <Link to="/air-tickets">
                <Button variant="outline" size="sm" className="border">
                  Air Tickets
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <BookingCard key={b.id} booking={b} onCancel={handleCancel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
