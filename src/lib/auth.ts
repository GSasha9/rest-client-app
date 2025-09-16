import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import {
  errorNotifyMessage,
  successNotifyMessage,
  warningNotifyMessage,
} from '@/utils/notifyMessage';
import { TFunction } from '@/validations/signInValidation.schema';
import { auth, db } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (t: TFunction) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;

    if (!res || !user) {
      throw new Error(t('auth.error.google'));
    }

    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }

    successNotifyMessage(t('auth.success.signinGoogle'));
  } catch (err) {
    if (err instanceof Error) {
      errorNotifyMessage(err.message);
    } else {
      errorNotifyMessage(t('auth.error.unknown'));
    }
  }
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  t: TFunction
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;

    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    successNotifyMessage(t('auth.success.signup'));

    return { success: true };
  } catch (err) {
    if (
      err instanceof FirebaseError &&
      err.code === 'auth/email-already-in-use'
    ) {
      warningNotifyMessage(t('auth.error.signup.userExists'));
    } else if (err instanceof Error) {
      errorNotifyMessage(err.message);
    } else {
      errorNotifyMessage(t('auth.error.signup.failed'));
    }
  }
};

export const signInUser = async (
  email: string,
  password: string,
  t: TFunction
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    successNotifyMessage(t('auth.success.signin'));

    return { success: true };
  } catch (err) {
    if (
      err instanceof FirebaseError &&
      err.code === 'auth/invalid-credential'
    ) {
      warningNotifyMessage(t('auth.error.signin'));
    } else if (err instanceof Error) {
      errorNotifyMessage(err.message);
    } else {
      errorNotifyMessage(t('auth.error.unknown'));
    }
  }
};

export const signOutUser = async (t: TFunction, extraMsg?: string) => {
  try {
    await signOut(auth);

    if (extraMsg) {
      warningNotifyMessage(extraMsg);
    } else {
      warningNotifyMessage(t('auth.success.signup'));
    }
  } catch (err) {
    if (err instanceof Error) {
      errorNotifyMessage(err.message);
    } else {
      errorNotifyMessage(t('auth.error.unknown'));
    }
  }
};
