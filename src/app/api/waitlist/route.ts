import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

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
    if (email.includes('..') || email.startsWith('.') || email.endsWith('.') ||
        email.includes('@.') || email.includes('.@') || email.length > 254 ||
        email.split('@').length !== 2) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate verification token and expiry
    const verificationToken = generateVerificationToken();
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 24); // 24 hour expiry

    // Insert email into waitlist_emails table with verification token
    const { data, error } = await supabase
      .from('waitlist_emails')
      .insert([{ 
        email: email,
        verification_token: verificationToken,
        token_expires_at: tokenExpiresAt.toISOString()
      }])
      .select()
      .single();

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

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}`;
    
    try {
      await resend.emails.send({
        from: 'Matria <noreply@matria.us>',
        to: [email],
        subject: 'Verify your email - Matria Waitlist',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7fd1ae;">Welcome to Matria!</h2>
            <p>Thank you for joining our waitlist. We're excited to help you find midwives who truly care about you and your birth experience.</p>
            
            <p><strong>Please verify your email address to secure your priority spot:</strong></p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background-color: #7fd1ae; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">Verify Email & Get Priority Access</a>
            </div>
            
            <p style="color: #666; font-size: 14px;">This link expires in 24 hours. If you didn't sign up for Matria, you can safely ignore this email.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              Matria - Connecting Connecticut families with caring midwives<br>
              Part of the Mawa Initiative
            </p>
          </div>
        `,
      });

      console.log('Verification email sent to:', email);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail the signup if email fails - user is still in database
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Please check your email to verify your address',
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