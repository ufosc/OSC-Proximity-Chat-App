import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { Store } from "pullstate";

import { auth , db } from "../configs/firebaseConfig";
import { doc , setDoc } from "@firebase/firestore"; // Import Firestore functions

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

const createUserConfig = async (userId: string) => {
  try {
    const docRef = doc(db, "UserConfigs", userId);

    await setDoc(docRef, {
      // TODO: create a matching UserConfig type in the app/types folder.
      // In documentation: make explicit that the key for UserConfig documents is the same as a uid from the user auth collection.
      isConnected: false,
      lastConnectionTime: "",
      displayName: "",
      userIcon: {
        imageType: 0,
        color: "#02efdb"
      },
      darkMode: false,
      notificationsEnabled: false,
      language: "English",
      
    });
  } catch (e){
    console.error("Error creating UserConfig: ", e);
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

    if (response.user) {
      await createUserConfig(response.user.uid);
    }

    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};
