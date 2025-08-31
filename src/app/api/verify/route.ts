import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find the email with this verification token
    const { data: emailRecord, error: fetchError } = await supabase
      .from('waitlist_emails')
      .select('*')
      .eq('verification_token', token)
      .single();

    if (fetchError || !emailRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 404 }
      );
    }

    // Check if token has expired
    const now = new Date();
    const expiresAt = new Date(emailRecord.token_expires_at);
    
    if (now > expiresAt) {
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 410 }
      );
    }

    // Check if already verified
    if (emailRecord.verified) {
      return NextResponse.json(
        { 
          success: true,
          message: 'Email already verified',
          email: emailRecord.email,
          already_verified: true
        },
        { status: 200 }
      );
    }

    // Update the email record to mark as verified and set priority to high
    const { error: updateError } = await supabase
      .from('waitlist_emails')
      .update({
        verified: true,
        priority: 'high',
        verification_token: null,
        token_expires_at: null
      })
      .eq('id', emailRecord.id);

    if (updateError) {
      console.error('Error updating verification status:', updateError);
      return NextResponse.json(
        { error: 'Failed to verify email' },
        { status: 500 }
      );
    }

    console.log('Email verified successfully:', emailRecord.email);

    return NextResponse.json(
      {
        success: true,
        message: 'Email verified successfully',
        email: emailRecord.email,
        priority: 'high'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}