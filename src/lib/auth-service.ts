
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { auth } from './firebase';

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    // For simplicity, re-throwing the error. In a real app, you might want to handle different error codes specifically.
    // e.g., 'auth/user-not-found', 'auth/wrong-password'
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch(error) {
        throw error;
    }
}

export const sendPasswordReset = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};


export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
};

export const reauthenticate = async (password: string): Promise<void> => {
    const user = auth.currentUser;
    if (!user || !user.email) {
        throw new Error("No user is currently signed in or user email is not available.");
    }
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
        await reauthenticateWithCredential(user, credential);
    } catch (error) {
        console.error("Re-authentication failed:", error);
        throw error;
    }
}

export const updateUserEmail = async (user: User, newEmail: string): Promise<void> => {
    try {
        await updateEmail(user, newEmail);
    } catch (error) {
        console.error("Error updating email:", error);
        // This operation is sensitive and requires recent authentication.
        // You might need to re-authenticate the user before calling this method.
        throw error;
    }
}

export const updateUserPassword = async (user: User, newPassword: string): Promise<void> => {
    try {
        await updatePassword(user, newPassword);
    } catch (error) {
        console.error("Error updating password:", error);
        // This operation is sensitive and requires recent authentication.
        // You might need to re-authenticate the user before calling this method.
        throw error;
    }
}
