import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { auth, db } from '../utils/firebase-config';

const MyAccount = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});

  const fetchUserInfo = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
    </div>
  );
};

export default MyAccount;
