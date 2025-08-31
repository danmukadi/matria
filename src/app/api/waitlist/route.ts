import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Additional checks for common issues
    if (email.includes('..') || // consecutive dots
        email.startsWith('.') || 
        email.endsWith('.') ||
        email.includes('@.') || // dot immediately after @
        email.includes('.@') || // dot immediately before @
        email.length > 254 ||   // RFC maximum length
        email.split('@').length !== 2) { // must have exactly one @
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert email into waitlist_emails table
    // UNIQUE constraint will prevent duplicates automatically
    const { data, error } = await supabase
      .from('waitlist_emails')
      .insert([{ email: email }]);

    if (error) {
      console.error('Supabase insert error:', error);
      
      // Handle duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    console.log('New waitlist signup:', email);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        email: email 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}