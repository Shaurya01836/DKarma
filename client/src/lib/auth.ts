import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  User,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './firebase';
import { UserService } from '@/services/userService';

// Sign up with email and password
export const signUp = async (email: string, password: string, displayName?: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered:', userCredential.user);
    
    // Update profile with display name if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
      try {
        await UserService.createUserProfile(userCredential.user, {
          displayName: displayName,
          email: email,
        });
        console.log('User profile created in Firestore after register');
      } catch (err) {
        console.error('Error creating user profile in Firestore after register:', err);
      }
    }
    
    return userCredential;
  } catch (error) {
    console.error('Error in signUp:', error);
    throw error;
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
    
    // Ensure user profile exists in Firestore
    if (userCredential.user) {
      try {
        const profile = await UserService.getUserProfile(userCredential.user.uid);
        if (!profile) {
          await UserService.createUserProfile(userCredential.user, {
            displayName: userCredential.user.displayName || '',
            email: userCredential.user.email || '',
          });
          console.log('User profile created in Firestore after login');
        } else {
          console.log('User profile already exists in Firestore after login');
        }
      } catch (err) {
        console.error('Error checking/creating user profile in Firestore after login:', err);
      }
    }
    return userCredential;
  } catch (error) {
    console.error('Error in signIn:', error);
    throw error;
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    console.log('User logged in with Google:', userCredential.user);
    
    // Ensure user profile exists in Firestore
    if (userCredential.user) {
      try {
        const profile = await UserService.getUserProfile(userCredential.user.uid);
        if (!profile) {
          await UserService.createUserProfile(userCredential.user, {
            displayName: userCredential.user.displayName || '',
            email: userCredential.user.email || '',
          });
          console.log('User profile created in Firestore after Google login');
        } else {
          console.log('User profile already exists in Firestore after Google login');
        }
      } catch (err) {
        console.error('Error checking/creating user profile in Firestore after Google login:', err);
      }
    }
    return userCredential;
  } catch (error) {
    console.error('Error in signInWithGoogle:', error);
    throw error;
  }
};
