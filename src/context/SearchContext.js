"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/config";

const FormSearchContext = createContext();

export const FormSearchProvider = ({ children }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchlocation, setsearchlocation] = useState("");
  const [locationremote, setlocationremote] = useState("");
  const [LoginUser, setLoginUser] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [paginationBlog, setPaginationblog] = useState([]);
  const [count, setcount] = useState(null);
  const [NoofPages, setNoofPages] = useState(null);
  const [Lastvisiblepagination, setLastvisiblepagination] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setLoginUser(authuser);
      } else {
        setLoginUser(null);
      }
    });
  }, []);

  return (
    <FormSearchContext.Provider
      value={{
        searchTitle,
        searchType,
        searchlocation,
        setSearchTitle,
        setSearchType,
        setsearchlocation,
        LoginUser,
        locationremote,
        setlocationremote,
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
        setLoginUser,
        IsLoading,
        setIsLoading,
      }}
    >
      {children}
    </FormSearchContext.Provider>
  );
};

export const useFormSearchContext = () => {
  return useContext(FormSearchContext);
};
