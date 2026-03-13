import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendReservationConfirmation, sendAdminNotification } from '@/lib/email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  // Remove all non-digit characters for validation
  const cleaned = phone.replace(/\D/g, '');
  // US phone numbers should be 10 digits
  return cleaned.length >= 10 && cleaned.length <= 15;
}

function validateDate(date: string): boolean {
  const reservationDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if date is valid and not in the past
  return !isNaN(reservationDate.getTime()) && reservationDate >= today;
}

function validateTime(time: string, date: string): boolean {
  const now = new Date();
  const reservationDateTime = new Date(`${date}T${time}`);

  // Check if the datetime is in the future
  return reservationDateTime > now;
}

function validateGuests(guests: number): boolean {
  return Number.isInteger(guests) && guests >= 1 && guests <= 20;
}

function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, guests, date, time } = body;

    // Validation
    const errors: string[] = [];

    if (!name || !validateName(name)) {
      errors.push('Name must be between 2 and 100 characters');
    }

    if (!email || !validateEmail(email)) {
      errors.push('Please provide a valid email address');
    }

    if (!phone || !validatePhone(phone)) {
      errors.push('Please provide a valid phone number');
    }

    if (!date || !validateDate(date)) {
      errors.push('Please select a valid date (today or future)');
    }

    if (!time || !validateTime(time, date)) {
      errors.push('Please select a valid time in the future');
    }

    if (!guests || !validateGuests(Number(guests))) {
      errors.push('Number of guests must be between 1 and 20');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    // Check for duplicate reservations (same email, date, and time within 30 minutes)
    const { data: existingReservations } = await supabase
      .from('reservations')
      .select('*')
      .eq('email', email)
      .eq('date', date)
      .neq('status', 'cancelled');

    if (existingReservations && existingReservations.length > 0) {
      // Check if any existing reservation is within 30 minutes of the requested time
      const requestedTime = new Date(`${date}T${time}`);
      const hasDuplicate = existingReservations.some((reservation) => {
        const existingTime = new Date(`${reservation.date}T${reservation.time}`);
        const diffMinutes = Math.abs(requestedTime.getTime() - existingTime.getTime()) / (1000 * 60);
        return diffMinutes < 30;
      });

      if (hasDuplicate) {
        return NextResponse.json(
          { error: 'You already have a reservation around this time. Please choose a different time.' },
          { status: 400 }
        );
      }
    }

    // Save reservation to database
    const { data: reservation, error: insertError } = await supabase
      .from('reservations')
      .insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          guests: Number(guests),
          date,
          time,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Database error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create reservation. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    const confirmationResult = await sendReservationConfirmation({
      name: reservation.name,
      email: reservation.email,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      phone: reservation.phone,
    });

    // Send notification to admin
    const adminResult = await sendAdminNotification({
      name: reservation.name,
      email: reservation.email,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      phone: reservation.phone,
    });

    // Log email results but don't fail the request if emails fail
    if (!confirmationResult.success) {
      console.error('Failed to send confirmation email:', confirmationResult.error);
    }
    if (!adminResult.success) {
      console.error('Failed to send admin notification:', adminResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        reservation,
        emailSent: confirmationResult.success,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabase.from('reservations').select('*').order('date', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: reservations, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reservations' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reservations }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
