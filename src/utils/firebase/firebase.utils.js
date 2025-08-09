import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqF5-icmUAA1OKVhsKtslYoz_-3mE6ORE",
  authDomain: "e-commerce-58cde.firebaseapp.com",
  projectId: "e-commerce-58cde",
  storageBucket: "e-commerce-58cde.firebasestorage.app",
  messagingSenderId: "239799121809",
  appId: "1:239799121809:web:a140e29f42561e38d0cc30"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(firebaseApp);

export function signInWithGooglePopup() {
  signInWithPopup(auth, googleProvider);
}

export function signInWithGoogleRedirect() {
  signInWithRedirect(auth, googleProvider);
}

export const db = getFirestore(firebaseApp);

export async function addCollectionAndDocuments(
  collectionKey,
  objectsToAdd,
  field
) {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export async function getCategoriesAndDocuments() {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
};

export async function createUserDocumentFromAuth(
  userAuth,
  additionalInformation = {}
) {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export async function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export async function signInAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export async function signOutUser() {
  await signOut(auth);
}

export function onAuthStateChangedListener(callback) {
  onAuthStateChanged(auth, callback);
}