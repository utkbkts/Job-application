"use client"
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/config";
import { useFormSearchContext } from "@/context/SearchContext";

const useGetDetail = () => {
    const [detailpost, setDetailPost] = useState([]);
    const {IsLoading,setIsLoading}=useFormSearchContext()
    const getDetail = async (id) => {
      try {
        setIsLoading(true)
        const docRef = doc(collection(db, "Blogs"), id);
        const blogDetail = await getDoc(docRef);
  
        if (blogDetail.exists()) {
          const data = { ...blogDetail.data(), id: blogDetail.id };
          setDetailPost(data);
        } else {
          console.log("No such document!");
        }
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)
        console.error("Error fetching blog detail:", error);
      }
    };
  
    return { getDetail, detailpost };
  };
  
  export default useGetDetail;