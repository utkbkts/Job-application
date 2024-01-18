"use client";
import JobList from "@/components/JobItem/JobList";
import PaginationCount from "@/components/JobItem/PaginationCount";
import Sidebar from "@/components/sidebar/Sidebar";
import { useFormSearchContext } from "@/context/SearchContext";
import PostGet from "@/hook/PostGet";
import useSearchUser from "@/hook/SearchSidebar";
import useDeletePost from "@/hook/useDeletePost";
import usePagination from "@/hook/usePagination";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { Getblog, getposts, isLoading } = PostGet();
  const { Posts, getUserProfile, setPosts } = useSearchUser();
  const { searchTitle, searchType, searchlocation, locationremote,paginationBlog, setcurrentPage,setPaginationblog } =
    useFormSearchContext();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { fetchMorePagination, fetchPrev } = usePagination();
  const handleFilter = (e) => {
    e.preventDefault();
    getUserProfile(searchTitle, searchType, searchlocation, locationremote);
  };
  useEffect(() => {
    // İlk render için tüm ürünleri getir

  }, []);
  const HandleClear = () => {
    setFilteredPosts(paginationBlog);
  };

  useEffect(() => {

    // Herhangi bir filtreleme yapılmamışsa tüm ürünleri göster
    if (!searchTitle && !searchType && !searchlocation && !locationremote) {
      setFilteredPosts(Getblog);
    } else {
      // Filtreleme yapıldığında yeni ürünleri göster
      setFilteredPosts(Posts);

    }
  }, [searchTitle, Posts, Getblog]);

  useEffect(() => {
    // Update filteredPosts when paginationBlog changes
    setFilteredPosts(paginationBlog);
  }, [paginationBlog]);

  const handlePageChange = (value) => {
    if (value === "Next") {
      setcurrentPage((page) => page + 1);
      fetchMorePagination();
    } else if (value === "Prev") {
      setcurrentPage((page) => page - 1);
      fetchPrev();
    }
  };

  if (isLoading) {
    return <span className="text-center flex justify-center items-center font-bold text-4xl">Loading...</span>;
  }
  return (
    <div className="max-w-4xl mx-auto">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="md:flex-row flex-col flex gap-4">
          <div className="border border-black p-2 md:w-[200px] w-full max-h-[400px] sticky top-0">
            <Sidebar onFilter={handleFilter} HandleClear={HandleClear} />
          </div>
          <div className="flex flex-col gap-2">
            {filteredPosts.map((item) => (
              <JobList key={item.id} item={item} />
            ))}
            <PaginationCount handlePageChange={handlePageChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
