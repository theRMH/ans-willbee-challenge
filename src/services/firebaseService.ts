import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  FirestoreError
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { QuizAttempt } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const saveQuizAttempt = async (attempt: QuizAttempt) => {
  const path = 'attempts';
  try {
    const docRef = await addDoc(collection(db, path), attempt);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const subscribeToAttempts = (callback: (attempts: QuizAttempt[]) => void) => {
  const path = 'attempts';
  const q = query(collection(db, path), orderBy('timestamp', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const attempts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as QuizAttempt));
    callback(attempts);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, path);
  });
};
