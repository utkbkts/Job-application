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

const ReadyUser = () => {
  const [User, setUser] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "users"));
        const data = onSnapshot(q, (snapshot) => {
          let productArray = [];

          snapshot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
          });
          setUser(productArray);
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
  return { User };
};

export default ReadyUser;
