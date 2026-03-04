import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export type BookingType = 'package' | 'rental' | 'airticket' | 'custom';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  userId: string;
  type: BookingType;
  status: BookingStatus;
  data: Record<string, unknown>;
  createdAt: { seconds: number } | null;
}

const COLLECTION = 'bookings';

export async function saveBooking(
  userId: string,
  type: BookingType,
  data: Record<string, unknown>
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    userId,
    type,
    status: 'pending',
    data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  const q = query(
    collection(db, COLLECTION),
    where('userId', '==', userId)
  );
  const snapshot = await getDocs(q);
  const bookings = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt,
  })) as Booking[];
  // Sort by createdAt desc (newest first)
  bookings.sort((a, b) => {
    const aSec = a.createdAt?.seconds ?? 0;
    const bSec = b.createdAt?.seconds ?? 0;
    return bSec - aSec;
  });
  return bookings;
}

export async function cancelBooking(bookingId: string): Promise<void> {
  const ref = doc(db, COLLECTION, bookingId);
  await updateDoc(ref, { status: 'cancelled' });
}
