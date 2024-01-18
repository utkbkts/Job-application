"use client"

import { useFormSearchContext } from '@/context/SearchContext';
import React from 'react'
import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";

const PaginationCount = ({handlePageChange}) => {
    const { currentPage,NoofPages } = useFormSearchContext();

  return (
    <div className='flex items-center justify-center'>
    <div className='flex items-center justify-center'>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange("Prev")}
      >
        <IoIosArrowBack />
      </button>
      <span className='bg-gray-400 p-1 rounded-md w-8 h-8 flex items-center justify-center'>{currentPage}</span>
      <button
        onClick={() => handlePageChange("Next")}
        disabled={currentPage === NoofPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  </div>
  )
}

export default PaginationCount
