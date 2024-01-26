import { User, onAuthStateChanged } from 'firebase/auth'
import { Store } from 'pullstate'
import { app, auth } from '../configs/firebaseConfig'

interface AuthStoreInterface {
    isLoggedin: boolean,
    initialized: boolean,
    user: User | null,
}

export const AuthStore = new Store<AuthStoreInterface>({
    isLoggedin: false,
    initialized: false,
    user: null,
})

const unsub = onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChanged', user);
    AuthStore.update((store) => {
        store.initialized = true,
        store.isLoggedin = user ? true : false,
        store.user = user
    })
});