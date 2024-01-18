"use client"

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { auth, db } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const useLoginUsers = () => {
    const [UserLogin, setUserLogin] = useState([]);
    const router = useRouter();

    const loginUser = async (data) => {
        if (!data.email || !data.password || !data.name) {
            toast.error("Error", "Please fill all the fields", "error");
            return;
        }
        try {
            const userResponse = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            if (userResponse.user) {
                const docRef = doc(db, "users", userResponse.user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
                    setUserLogin(docSnap.data());
                } else {
                    toast.error("Error", "User data not found", "error");
                }
            }
            router.push("/");
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    return { loginUser, UserLogin };
};

export default useLoginUsers;
