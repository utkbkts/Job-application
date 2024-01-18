"use client";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useFormSearchContext } from "@/context/SearchContext";
import toast from "react-hot-toast";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Posts, setPosts] = useState([]);

  const { searchTitle, searchType, searchlocation, locationremote } =
    useFormSearchContext();

  const getUserProfile = async () => {
    setIsLoading(true);
    try {
      let q;

      if (searchType || searchTitle || searchlocation || locationremote) {
        // Herhangi bir filtre dolu ise
        if (searchType) {
          q = query(collection(db, "Blogs"), where("type", "==", searchType));
        }
        if (searchTitle) {
          // Eğer q zaten doluysa, yeni bir sorgu oluştur
          q = q
            ? query(q, where("title", "==", searchTitle))
            : query(collection(db, "Blogs"), where("title", "==", searchTitle));
        }
        if (searchlocation) {
          q = q
            ? query(q, where("locationoffice", "==", searchlocation))
            : query(
                collection(db, "Blogs"),
                where("locationoffice", "==", searchlocation)
              );
        }
        if (locationremote) {
          q = q
            ? query(q, where("remote", "==", locationremote))
            : query(collection(db, "Blogs"), where("remote", "==", locationremote));
        }

        const querySnapshot = await getDocs(q);
        const postsArray = [];

        if (querySnapshot.empty) {
          toast.error("Post Not Found")
        } else {
          querySnapshot.forEach((doc) => {
            postsArray.push(doc.data());
          });
          setPosts(postsArray);
        }
      } else {
        console.log("Error", "No search criteria provided", "error");
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, Posts, setPosts };
};

export default useSearchUser;
