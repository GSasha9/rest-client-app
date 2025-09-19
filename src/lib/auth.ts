import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {
  errorNotifyMessage,
  successNotifyMessage,
  warningNotifyMessage,
} from '@/utils/notifyMessage';
import { TFunction } from '@/validations/signInValidation.schema';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import setTokenOnServer from './set-token-on-server';

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
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }

    await setTokenOnServer();
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

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      email,
    });
    await setTokenOnServer();
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
    await setTokenOnServer();
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
      successNotifyMessage(t('auth.success.signout'));
    }
  } catch (err) {
    if (err instanceof Error) {
      errorNotifyMessage(err.message);
    } else {
      errorNotifyMessage(t('auth.error.unknown'));
    }
  }
};
