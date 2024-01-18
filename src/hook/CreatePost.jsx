"use client";

import { addDoc, collection, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { useState } from "react";
import { useFormSearchContext } from "@/context/SearchContext";
import { useRouter } from "next/navigation";
const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { LoginUser } = useFormSearchContext();
  const router = useRouter()
  const handleCreatePost = async (data) => {
    const {
      title,
      type,
      company,
      location,
      description,
      responsibilities,
      locationoffice,
      salary,
      remote,
    } = data;

    if (
      !title ||
      !salary ||
      !type ||
      !company ||
      !location ||
      !locationoffice ||
      !description ||
      !responsibilities
    ) {
      throw new Error("Lütfen tüm gerekli alanları doldurun");
    }

    // Küçük harfe çevirme ve boşlukları silme işlemleri
    const formattedTitle = title.toLowerCase().trim();
    setIsLoading(true);


    try {
      const newPost = {
        title: formattedTitle,
        type,
        company,
        location,
        description,
        responsibilities,
        locationoffice,
        salary,
        remote,
        createdAt: serverTimestamp(),
        createdBy: LoginUser.uid,
      };
       await addDoc(collection(db, "Blogs"), newPost);
      setIsLoading(false);
      router.push("/")
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  return { isLoading, handleCreatePost };
};

export default useCreatePost;
