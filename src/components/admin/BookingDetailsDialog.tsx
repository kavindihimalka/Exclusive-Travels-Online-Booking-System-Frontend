import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { type AdminBooking } from '../../lib/adminApi';
import { User } from 'lucide-react';

const TYPE_LABELS: Record<string, string> = {
  package: 'Tour Package',
  rental: 'Car Rental',
  airticket: 'Air Ticket',
  custom: 'Custom Tour',
};

function formatDate(val: unknown): string {
  if (!val) return '-';
  if (typeof val === 'object' && val !== null && 'seconds' in val) {
    return new Date((val as { seconds: number }).seconds * 1000).toLocaleString();
  }
  if (typeof val === 'object' && val !== null && '_seconds' in val) {
    return new Date((val as { _seconds: number })._seconds * 1000).toLocaleString();
  }
  return String(val);
}

function DetailRow({ label, value, href }: { label: string; value: React.ReactNode; href?: string }) {
  if (value == null || value === '') return null;
  const content = href ? (
    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
      {String(value)}
    </a>
  ) : (
    <span>{String(value)}</span>
  );
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600 text-sm font-medium">{label}</span>
      <span className="text-right text-sm">{content}</span>
    </div>
  );
}

export default function BookingDetailsDialog({
  booking,
  open,
  onOpenChange,
}: {
  booking: AdminBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!booking) return null;

  const { type, status, data, createdAt } = booking;
  const phone = data.phone || data.mobileNumber;
  const phoneHref = phone ? `tel:${String(phone).replace(/\D/g, '')}` : undefined;
  const whatsappHref = phone
    ? `https://wa.me/${String(phone).replace(/\D/g, '').replace(/^0/, '94')}`
    : undefined;

  const name =
    data.name ||
    data.fullName ||
    (data.firstName && data.lastName
      ? `${data.firstName} ${data.lastName}`.trim()
      : data.firstName || data.lastName);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {TYPE_LABELS[type]} · {status}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Contact info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-sm text-gray-700 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> Contact
            </h4>
            <div className="space-y-0">
              <DetailRow label="Name" value={name || booking.userId} />
              <DetailRow label="Email" value={data.email} />
              <DetailRow
                label="Phone"
                value={phone}
                href={phoneHref}
              />
              {phone && (
                <div className="flex justify-end pt-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Open WhatsApp →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Type-specific details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-sm text-gray-700 mb-3">Booking details</h4>
            <div className="space-y-0">
              {type === 'package' && (
                <>
                  <DetailRow label="Package" value={data.packageName} />
                  <DetailRow label="Date" value={data.date} />
                  <DetailRow label="Travelers" value={data.travelers} />
                  <DetailRow label="Reference" value={data.referenceNumber} />
                </>
              )}
              {type === 'rental' && (
                <>
                  <DetailRow label="Car" value={data.carModel} />
                  <DetailRow label="Pickup" value={data.startDate} />
                  <DetailRow label="Return" value={data.endDate} />
                  <DetailRow label="Location" value={data.location} />
                  <DetailRow label="Driver" value={data.driver === 'yes' ? 'Yes' : data.driver} />
                </>
              )}
              {type === 'airticket' && (
                <>
                  <DetailRow label="Tour type" value={data.tourType} />
                  <DetailRow label="Cabin" value={data.cabinClass} />
                  <DetailRow label="Departure" value={data.departure} />
                  <DetailRow label="Arrival" value={data.arrival} />
                  <DetailRow label="Departure date" value={data.departureDate} />
                  <DetailRow label="Return date" value={data.returnDate} />
                  <DetailRow label="Adults" value={data.adults} />
                  <DetailRow label="Children" value={data.children} />
                  <DetailRow label="Infants" value={data.infants} />
                  <DetailRow label="Student fare" value={data.studentFare} />
                </>
              )}
              {type === 'custom' && (
                <>
                  <DetailRow label="Country" value={data.country} />
                  <DetailRow label="Travel dates" value={data.travelDates} />
                  <DetailRow label="Group size" value={data.groupSize} />
                  <DetailRow label="Accommodation" value={data.accommodation} />
                  <DetailRow label="Budget" value={data.budget} />
                  <DetailRow label="Interests" value={data.interests} />
                  <DetailRow label="Reference" value={data.referenceNumber} />
                </>
              )}
            </div>
          </div>

          {/* Message */}
          {(data.message as string) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Message</h4>
              <p className="text-sm text-gray-600">{String(data.message)}</p>
            </div>
          )}

          {/* Meta */}
          <div className="text-xs text-gray-500">
            <DetailRow label="Submitted" value={formatDate(createdAt)} />
            <DetailRow label="User ID" value={booking.userId} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
