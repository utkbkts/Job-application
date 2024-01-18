"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";

const useReadyAdmin = () => {
  const [UserAdmin, setUserAdmin] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "admin"));
        const data = onSnapshot(q, (snapshot) => {
          let productArray = [];

          snapshot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
          });
          setUserAdmin(productArray);
          setIsLoading(false);
        });
        return () => data;
      } catch (error) {
        toast.error("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, []);
  return { UserAdmin };
};

export default useReadyAdmin;
