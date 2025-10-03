import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const useUserName = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState();

  useEffect(() => {
    if (!user) return;

    const fetchName = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setName(docSnap.data().name);
      }
    };

    fetchName();
  }, [user]);

  return name;
};

export default useUserName;
