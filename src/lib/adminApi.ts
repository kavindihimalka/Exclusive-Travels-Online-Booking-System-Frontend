const getAuthHeaders = (): HeadersInit => {
  const token = sessionStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function fetchAdminBookings(): Promise<AdminBooking[]> {
  const res = await fetch('/api/admin/bookings', { headers: getAuthHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch bookings');
  return json.data || [];
}

export async function updateBookingStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'cancelled'
): Promise<void> {
  const res = await fetch(`/api/admin/bookings/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to update');
}

export interface AdminBooking {
  id: string;
  userId: string;
  type: 'package' | 'rental' | 'airticket' | 'custom';
  status: 'pending' | 'confirmed' | 'cancelled';
  data: Record<string, unknown>;
  createdAt?: { seconds: number };
}
