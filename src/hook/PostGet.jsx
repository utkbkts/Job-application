"use client"
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";


const PostGet=()=>{
    const [Getblog, setGetBlog] = useState([]);
    const [isLoading,setIsLoading]=useState(false)
    const getposts = async () => {
      setIsLoading(true)
        const unsub = onSnapshot(
            collection(db, "Blogs"),
            (snapshot) => {
              let list = [];
              snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
              });
              setGetBlog(list);
              setIsLoading(false)

            },
            (error) => {
              console.log(error);
              setIsLoading(false)
            }
          );
          return () => {
            unsub();
          };
        };
      

    return{getposts,setGetBlog,Getblog,isLoading}
}

export default PostGet;