import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';
import admin from '../../../../lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { address, signature, message } = await request.json();

    if (!address || !signature || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify the signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Use the wallet address as the UID (or prefix it)
    const uid = `wallet:${address.toLowerCase()}`;
    const customToken = await admin.auth().createCustomToken(uid);

    // Store or update the wallet user in Firestore
    await admin.firestore().collection('walletUsers').doc(uid).set({
      address: address.toLowerCase(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    // Debug log
    console.log('Generated custom token:', customToken);

    return NextResponse.json({ customToken, address });

  } catch (error) {
    console.error('Wallet auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
} 