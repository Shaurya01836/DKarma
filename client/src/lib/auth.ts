import { User } from 'firebase/auth';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Frontend auth functions using Firebase
export const signIn = async (email: string, password: string) => {
  console.log('Firebase signIn called with:', email);
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('User signed in:', user.email);
    return { user };
  } catch (error: unknown) {
    console.error('Sign in error:', error);
    if (error instanceof Error) {
      if (error.message === 'auth/user-not-found') {
        throw new Error('Email not registered. Please register first.');
      } else if (error.message === 'auth/wrong-password') {
        throw new Error('Invalid password.');
      } else {
        throw new Error('Login failed. Please try again.');
      }
    }
  }
};

export const signUp = async (email: string, password: string, displayName?: string) => {
  console.log('Firebase signUp called with:', email, displayName);
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    if (displayName) {
      await updateProfile(user, { displayName });
    }
    
    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName || user.displayName,
      createdAt: new Date(),
      userType: null, // Will be set when user chooses role
    });
    
    console.log('User registered in Firebase:', { email, displayName });
    return { user };
  } catch (error: unknown) {
    console.error('Sign up error:', error);
    if (error instanceof Error) {
      if (error.message === 'auth/email-already-in-use') {
        throw new Error('Email already registered. Please login instead.');
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    }
  }
};

export const signInWithGoogle = async () => {
  console.log('Firebase signInWithGoogle called');
  
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // New Google user, store in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date(),
        userType: null, // Will be set when user chooses role
        provider: 'google',
      });
      console.log('New Google user registered in Firebase:', user.email);
    } else {
      console.log('Existing Google user logged in:', user.email);
    }
    
    return { userCredential: { user } };
  } catch (error: unknown) {
    console.error('Google sign in error:', error);
    if (error instanceof Error) {
      throw new Error('Google login failed. Please try again.');
    }
  }
};

export const signOutUser = async () => {
  console.log('Firebase signOutUser called');
  
  try {
    await auth.signOut();
    localStorage.removeItem('user');
    return true;
  } catch (error: unknown) {
    console.error('Sign out error:', error);
    if (error instanceof Error) {
      throw new Error('Sign out failed.');
    }
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
}; 