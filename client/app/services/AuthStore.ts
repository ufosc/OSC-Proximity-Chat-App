import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { Store } from "pullstate";

import { auth, db } from "../configs/firebaseConfig";
import { doc, getDoc, setDoc } from "@firebase/firestore"; // Import Firestore functions
import { UserProfile } from "@app/types/User";

interface AuthStoreInterface {
  isLoggedin: boolean;
  initialized: boolean;
  userAuthInfo: User | null;
  userProfile: UserProfile | null;
}

export const AuthStore = new Store<AuthStoreInterface>({
  isLoggedin: false,
  initialized: false,
  userAuthInfo: null,
  userProfile: null,
});

// // TODO: Must call notifyUpdateProfile if connected to socket server
// export const updateUserProfile = async (userId: string, profile: UserProfile) => {
//   try {
//     const docRef = doc(db, "users", userId);
//     await setDoc(docRef, profile);
//   } catch (e) {
//     console.error("Error updating user profile: ", e);
//   }
// }

const unsub = onAuthStateChanged(auth, async (user) => {
  console.log("onAuthStateChanged", user);

  let userProfile: UserProfile | null = null;

  if (!!user) {
    // User is signed in

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userProfile = docSnap.data() as UserProfile;
      } else {
        // Create user profile if not exists
        await setDoc(docRef, userProfile = {
          displayName: user.displayName || "New User",
          profilePicture: 0,
        });
      }
    } catch (e) {
      console.error("Error getting user profile: ", e);
    }

  } else {
    // User is signed out
  }

  AuthStore.update((store) => {
    store.initialized = true;
    store.isLoggedin = !!user;
    store.userAuthInfo = user;
    store.userProfile = userProfile;
  });
});

export const appSignIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    let userProfile: UserProfile | null = null;

    try {
      const docRef = doc(db, "users", response.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userProfile = docSnap.data() as UserProfile;
      } else {
        // Create user profile if not exists
        await setDoc(docRef, userProfile = {
          displayName: response.user.displayName || "New User",
          profilePicture: 0,
        });
      }
    } catch (e) {
      console.error("Error getting user profile: ", e);
    }

    AuthStore.update((store) => {
      store.userAuthInfo = response?.user;
      store.isLoggedin = !!response?.user;
      store.userProfile = userProfile;
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

    let userProfile: UserProfile | null = null;

    try {
      const docRef = doc(db, "users", response.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userProfile = docSnap.data() as UserProfile;
      } else {
        // Create user profile if not exists
        await setDoc(docRef, userProfile = {
          displayName: response.user.displayName || "New User",
          profilePicture: 0,
        });
      }
    } catch (e) {
      console.error("Error getting user profile: ", e);
    }

    AuthStore.update((store) => {
      store.userAuthInfo = response.user;
      store.isLoggedin = !!response.user;
      store.userProfile = userProfile;
    });

    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};
