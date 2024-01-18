"use client"
import { collection, endAt, endBefore, getDocs, limit, limitToLast, orderBy, query, startAfter } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../firebase/config";
import { useFormSearchContext } from "@/context/SearchContext";

const usePagination = () => {
  // State değerleri
  const {
    currentPage,
    setcurrentPage,
    paginationBlog,
    setPaginationblog,
    count,
    setcount,
    NoofPages,
    setNoofPages,
    Lastvisiblepagination,
    setLastvisiblepagination,
  } = useFormSearchContext();

  // İlk sayfa verilerini getirme fonksiyonu
  const GetPagination = async () => {
    const BlogRef = collection(db, "Blogs");
    const first = query(BlogRef, orderBy("title"), limit(3));
    const docSnapShot = await getDocs(first);

    // İlk sayfadaki blogları state'e kaydet
    setPaginationblog(
      docSnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setcount(docSnapShot.size);

    // Son görünür blogu kaydet, eğer hiç blog yoksa null yap
    if (docSnapShot.docs.length > 0) {
      setLastvisiblepagination(docSnapShot.docs[docSnapShot.docs.length - 1]);
    } else {
      setLastvisiblepagination(null);
    }
  };

  // Toplam blog sayısını ve sayfa sayısını hesaplama fonksiyonu
  const getTotalBlog = async () => {
    const blogref = collection(db, "Blogs");
    const docsnapShot = await getDocs(blogref);
    const totalblog = docsnapShot.size;
    const totalPages = Math.ceil(totalblog / 3);
    setNoofPages(totalPages);
  };

  // Daha fazla blog getirme fonksiyonu
  const fetchMorePagination = async () => {
    if (Lastvisiblepagination) {
      const blogref = collection(db, "Blogs");
      const nextblogQuery = query(
        blogref,
        orderBy("title"),
        startAfter(Lastvisiblepagination),
        limit(3)
      );
      const nextblogsnap = await getDocs(nextblogQuery);

      // Yeni sayfada yeni veriler yüklendiğinde paginationBlog sıfırlanır.
      setPaginationblog(
        nextblogsnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setcount(nextblogsnap.size);

      // Son görünür blogu kaydet, eğer hiç blog yoksa null yap
      if (nextblogsnap.docs.length > 0) {
        setLastvisiblepagination(nextblogsnap.docs[nextblogsnap.docs.length - 1]);
      } else {
        setLastvisiblepagination(null);
      }
    }
  };

  // Önceki sayfaya gitme fonksiyonu
  const fetchPrev = async () => {
    if (Lastvisiblepagination) {
      const blogref = collection(db, "Blogs");
      const end =
        NoofPages !== currentPage
          ? endAt(Lastvisiblepagination)
          : endBefore(Lastvisiblepagination);
      const limitData =
        NoofPages !== currentPage
          ? limit(3)
          : count <= 3 && NoofPages % 2 === 0
          ? limit(3)
          : limitToLast(3);
      const prevquery = query(blogref, orderBy("title"), end, limitData);
      const prevblogsnap = await getDocs(prevquery);

      // Yeni sayfada yeni veriler yüklendiğinde paginationBlog sıfırlanır.
      setPaginationblog(
        prevblogsnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setcount(prevblogsnap.size);

      // Son görünür blogu kaydet, eğer hiç blog yoksa null yap
      if (prevblogsnap.docs.length > 0) {
        setLastvisiblepagination(prevblogsnap.docs[prevblogsnap.docs.length - 1]);
      } else {
        setLastvisiblepagination(null);
      }
    }
  };

  useEffect(() => {
    // Component yüklendiğinde ilk sayfa verilerini ve toplam blog sayısını getir
    GetPagination();
    getTotalBlog();
  }, []);

  return { fetchPrev, fetchMorePagination, GetPagination };
};

export default usePagination;
