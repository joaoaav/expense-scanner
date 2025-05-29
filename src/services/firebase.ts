import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FIREBASE_API_KEY, FIREBASE_PROJECT_ID, ... } from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: FIREBASE_PROJECT_ID,
  ...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);