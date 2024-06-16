import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const LOCAL_CONFIG = {
  emulatorPort: `http://${process.env.LOCAL_IP}`,
  emulatorHost: process.env.LOCAL_IP,
  firestorePort: 8080,
  authPort: 9099,
  databasePort: 9000,
  storagePort: 9199,
};

let firebaseConfig = {
  apiKey: 'AIzaSyBkDqJD5oK5B5ajrgUpDZPy6mAnlKcZHmg',
  authDomain: 'talktorque-4d234.firebaseapp.com',
  projectId: 'talktorque-4d234',
  storageBucket: 'talktorque-4d234.appspot.com',
  messagingSenderId: '562110916039',
  appId: '1:562110916039:web:29698bb940e1ed826d65e2',
  measurementId: 'G-ZSXLTQW2SC',
};

let app;

console.log('islocal', process.env.IS_LOCAL);

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  // app = firebase.app();
}

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const apiKey = firebaseConfig.apiKey;

if (__DEV__) {
  console.log('using firebase emulator');
  async function setupEmulators(auth) {
    const authUrl = `${LOCAL_CONFIG.emulatorPort}:${LOCAL_CONFIG.authPort}`;

    try {
      console.log(authUrl);

      await fetch(authUrl); // ensure emulator is loaded first
    } catch (error) {
      console.log(error);
    }

    connectAuthEmulator(auth, authUrl);
    connectStorageEmulator(
      storage,
      LOCAL_CONFIG.emulatorHost,
      LOCAL_CONFIG.storagePort
    );

    connectFirestoreEmulator(
      db,
      LOCAL_CONFIG.emulatorHost,
      LOCAL_CONFIG.firestorePort
    );
  }

  setupEmulators(auth);
}

export { auth, db, storage, apiKey };
