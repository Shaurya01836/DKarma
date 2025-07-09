import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const { userId, address, signature, message } = await request.json();

    if (!userId || !address || !signature || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify the signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // In a real implementation, you would:
    // 1. Verify the user exists in your database
    // 2. Store the wallet address linked to the user
    // 3. Return success

    // For now, we'll return a mock success response
    return NextResponse.json({
      success: true,
      message: 'Wallet linked successfully',
    });

  } catch (error) {
    console.error('Wallet linking error:', error);
    return NextResponse.json(
      { error: 'Wallet linking failed' },
      { status: 500 }
    );
  }
} 