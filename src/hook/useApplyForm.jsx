"use client"

import { useFormSearchContext } from '@/context/SearchContext';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '../../firebase/config';
import { useState } from 'react';

const useApplyForm = () => {
const {LoginUser}=useFormSearchContext()
const [applicationStatus, setApplicationStatus] = useState([]);
    const ApplyForm=async(postId)=>{
        const newApplication = {
            postId: postId,
            name: LoginUser.displayName,
            email: LoginUser.email,
            createdAt: serverTimestamp(),
            createdBy: LoginUser.uid,
          };
        try {
            const docRef = await addDoc(collection(db, 'ApplyForm'), newApplication);
            toast.success('Application submitted successfully!');
            setApplicationStatus(docRef.id)
            return docRef.id; 
        } catch (error) {
            toast.error(error.message)
        }
    }
    return{ApplyForm,applicationStatus,setApplicationStatus}
}

export default useApplyForm
