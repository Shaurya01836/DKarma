const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const ethers = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Firebase Admin
let serviceAccount;
try {
  // Try to parse from environment variable
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
  
  // If service account is empty or invalid, try to load from file
  if (!serviceAccount.project_id) {
    const fs = require('fs');
    const path = require('path');
    const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
    
    if (fs.existsSync(serviceAccountPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      console.log('✅ Loaded Firebase service account from file');
    } else {
      console.log('⚠️  No Firebase service account found. Please set up FIREBASE_SERVICE_ACCOUNT in .env or create serviceAccountKey.json');
      process.exit(1);
    }
  }
} catch (error) {
  console.error('❌ Error loading Firebase service account:', error.message);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Helper function to verify Ethereum signature
function verifySignature(address, signature, message) {
  try {
    // Recover the address from the signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

// Helper function to create custom token
async function createCustomToken(address) {
  try {
    // Create a custom token for the wallet address
    const customToken = await admin.auth().createCustomToken(address, {
      walletAddress: address,
    });
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
}

// Routes
app.post('/auth/wallet', async (req, res) => {
  try {
    const { address, signature, message } = req.body;

    if (!address || !signature || !message) {
      return res.status(400).json({
        error: 'Missing required fields: address, signature, message',
      });
    }

    // Verify the signature
    const isValid = verifySignature(address, signature, message);
    if (!isValid) {
      return res.status(401).json({
        error: 'Invalid signature',
      });
    }

    // Create custom token
    const customToken = await createCustomToken(address);

    res.json({
      success: true,
      customToken,
      message: 'Wallet authenticated successfully',
    });
  } catch (error) {
    console.error('Wallet authentication error:', error);
    res.status(500).json({
      error: 'Authentication failed',
    });
  }
});

app.post('/auth/link-wallet', async (req, res) => {
  try {
    const { userId, address, signature, message } = req.body;

    if (!userId || !address || !signature || !message) {
      return res.status(400).json({
        error: 'Missing required fields: userId, address, signature, message',
      });
    }

    // Verify the signature
    const isValid = verifySignature(address, signature, message);
    if (!isValid) {
      return res.status(401).json({
        error: 'Invalid signature',
      });
    }

    // Update user's custom claims to include wallet address
    await admin.auth().setCustomUserClaims(userId, {
      walletAddress: address,
    });

    res.json({
      success: true,
      message: 'Wallet linked successfully',
    });
  } catch (error) {
    console.error('Wallet linking error:', error);
    res.status(500).json({
      error: 'Wallet linking failed',
    });
  }
});

app.post('/auth/verify-signature', async (req, res) => {
  try {
    const { address, signature, message } = req.body;

    if (!address || !signature || !message) {
      return res.status(400).json({
        error: 'Missing required fields: address, signature, message',
      });
    }

    // Verify the signature
    const isValid = verifySignature(address, signature, message);

    res.json({
      valid: isValid,
      message: isValid ? 'Signature is valid' : 'Signature is invalid',
    });
  } catch (error) {
    console.error('Signature verification error:', error);
    res.status(500).json({
      error: 'Signature verification failed',
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Wallet authentication server running on port ${PORT}`);
  console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 