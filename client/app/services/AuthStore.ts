import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { Store } from "pullstate";

import { auth, db } from "../configs/firebaseConfig";
import { doc, setDoc } from "@firebase/firestore"; // Import Firestore functions
import { UserProfile } from "@app/types/User";

interface AuthStoreInterface {
  isLoggedin: boolean;
  initialized: boolean;
  userAuthInfo: User | null;
}

export const AuthStore = new Store<AuthStoreInterface>({
  isLoggedin: false,
  initialized: false,
  userAuthInfo: null,
});

// TODO: Must call notifyUpdateProfile if connected to socket server
export const updateUserProfile = async (userId: string, profile: UserProfile) => {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, profile);
  } catch (e) {
    console.error("Error updating user profile: ", e);
  }
}

const unsub = onAuthStateChanged(auth, (user) => {
  console.log("onAuthStateChanged", user);
  AuthStore.update((store) => {
    (store.initialized = true),
      (store.isLoggedin = !!user),
      (store.userAuthInfo = user);
  });
});

export const appSignIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    AuthStore.update((store) => {
      store.userAuthInfo = response?.user;
      store.isLoggedin = !!response?.user;
    });
    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};

export const appSignOut = async () => {
  try {
    await signOut(auth);
    AuthStore.update((store) => {
      store.userAuthInfo = null;
      store.isLoggedin = false;
    });
    return { user: null };
  } catch (e) {
    return { error: e };
  }
};

export const appSignUp = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    AuthStore.update((store) => {
      store.userAuthInfo = response.user;
      store.isLoggedin = !!response.user;
    });

    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};
