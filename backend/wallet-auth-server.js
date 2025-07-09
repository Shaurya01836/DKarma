require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json';
const serviceAccount = require(path.resolve(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Wallet Authentication Endpoint
app.post('/api/auth/wallet', async (req, res) => {
  try {
    const { address, signature, message } = req.body;

    if (!address || !signature || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify the signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Create a custom token for the wallet address
    const customToken = await admin.auth().createCustomToken(address, {
      walletAddress: address,
    });

    // Store user data in Firestore (optional)
    const db = admin.firestore();
    const userRef = db.collection('users').doc(address);
    
    await userRef.set({
      walletAddress: address,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    res.json({
      customToken,
      address,
    });

  } catch (error) {
    console.error('Wallet auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Link Wallet to Existing User
app.post('/api/auth/link-wallet', async (req, res) => {
  try {
    const { userId, address, signature, message } = req.body;

    if (!userId || !address || !signature || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify the signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Verify the user exists
    const userRecord = await admin.auth().getUser(userId);
    if (!userRecord) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Store wallet address in Firestore
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    
    await userRef.update({
      walletAddress: address,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      message: 'Wallet linked successfully',
    });

  } catch (error) {
    console.error('Wallet linking error:', error);
    res.status(500).json({ error: 'Wallet linking failed' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Wallet auth server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
  console.log(`🔥 Firebase Project: ${process.env.FIREBASE_PROJECT_ID || 'Not set'}`);
}); 