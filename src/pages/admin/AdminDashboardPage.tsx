import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  fetchAdminBookings,
  updateBookingStatus,
  type AdminBooking,
} from '../../lib/adminApi';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import {
  Package,
  Car,
  Plane,
  Compass,
  RefreshCw,
  Check,
  X,
  Loader2,
  Eye,
} from 'lucide-react';
import BookingDetailsDialog from '../../components/admin/BookingDetailsDialog';

const TYPE_LABELS: Record<string, string> = {
  package: 'Tour Package',
  rental: 'Car Rental',
  airticket: 'Air Ticket',
  custom: 'Custom Tour',
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  package: <Package className="w-4 h-4" />,
  rental: <Car className="w-4 h-4" />,
  airticket: <Plane className="w-4 h-4" />,
  custom: <Compass className="w-4 h-4" />,
};

function formatDate(val: unknown): string {
  if (!val) return '-';
  if (typeof val === 'object' && val !== null) {
    const sec = (val as { seconds?: number; _seconds?: number }).seconds ?? (val as { _seconds?: number })._seconds;
    if (typeof sec === 'number') {
      return new Date(sec * 1000).toLocaleString();
    }
  }
  return String(val);
}

function getDisplayName(booking: AdminBooking): string {
  const d = booking.data;
  if (d?.name) return String(d.name);
  if (d?.fullName) return String(d.fullName);
  if (d?.firstName && d?.lastName) return `${d.firstName} ${d.lastName}`.trim();
  if (d?.firstName) return String(d.firstName);
  if (d?.lastName) return String(d.lastName);
  if (d?.email) return String(d.email);
  return booking.userId?.slice(0, 8) + '...' || '-';
}

function getBookingSummary(booking: AdminBooking): string {
  const { type, data } = booking;
  switch (type) {
    case 'package':
      return `${data.packageName || 'Tour'} · ${data.travelers || '-'} travelers`;
    case 'rental':
      return `${data.carModel || 'Car'} · ${data.startDate || '-'} to ${data.endDate || '-'}`;
    case 'airticket':
      return `${data.departure || '-'} → ${data.arrival || '-'}`;
    case 'custom':
      return `Custom tour · ${data.groupSize || '-'} people`;
    default:
      return 'Booking';
  }
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
    pending: 'secondary',
    confirmed: 'default',
    cancelled: 'destructive',
  };
  return (
    <Badge variant={variants[status] || 'secondary'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminBookings();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: 'confirmed' | 'cancelled'
  ) => {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = bookings.filter((b) => {
    if (filterType !== 'all' && b.type !== filterType) return false;
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    byType: {
      package: bookings.filter((b) => b.type === 'package').length,
      rental: bookings.filter((b) => b.type === 'rental').length,
      airticket: bookings.filter((b) => b.type === 'airticket').length,
      custom: bookings.filter((b) => b.type === 'custom').length,
    },
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl font-bold text-primary">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all bookings and requests
            </p>
          </div>
          <Button
            variant="outline"
            onClick={loadBookings}
            disabled={loading}
            className="gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Refresh
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {stats.confirmed}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Cancelled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All types</option>
              <option value="package">Tour Package</option>
              <option value="rental">Car Rental</option>
              <option value="airticket">Air Ticket</option>
              <option value="custom">Custom Tour</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium">{error}</p>
            <p className="text-sm text-red-600 mt-1">
              Ensure the backend has Firebase Admin credentials (GOOGLE_APPLICATION_CREDENTIALS) for Firestore access.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={loadBookings}
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Bookings table */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {filtered.length} booking{filtered.length !== 1 ? 's' : ''}
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No bookings found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((booking) => (
                    <TableRow
                      key={booking.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setDetailsOpen(true);
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-primary">
                            {TYPE_ICONS[booking.type]}
                          </span>
                          {TYPE_LABELS[booking.type]}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {getBookingSummary(booking)}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {getDisplayName(booking)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(booking.createdAt)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setDetailsOpen(true);
                            }}
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {booking.status === 'pending' && (
                            <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() =>
                                handleUpdateStatus(booking.id, 'confirmed')
                              }
                              disabled={updatingId === booking.id}
                            >
                              {updatingId === booking.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() =>
                                handleUpdateStatus(booking.id, 'cancelled')
                              }
                              disabled={updatingId === booking.id}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <BookingDetailsDialog
          booking={selectedBooking}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      </div>
    </AdminLayout>
  );
}
