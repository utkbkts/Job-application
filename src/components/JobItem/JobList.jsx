"use client";

import Price from "format-price";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const JobList = ({ item }) => {

  
  return (
    <div className="border border-gray-300 md:w-[600px] w-full rounded-md">
      <div
        className="flex justify-between w-full p-2"
      >
        <div className="flex gap-1">
          <div className="flex items-center">
            <Image
              src={"/softwarewalpaper.jpg"}
              className="w-16 h-16 rounded-md"
              width={400}
              height={400}
              alt="image"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <span className="font-bold text-xl">{item.title}</span>
                <span className="font-light text-sm">{item.company}</span>
              </div>
             
            </div>
            <Link href={`/detail/${item.id}`} className="flex flex-col mt-4  cursor-pointer" >
              <span className="font-light text-sm">{item.location}</span>
              <span className="font-light text-sm">{item.locationoffice}</span>
              <span className="font-light text-sm">
                {Price.format("en-US", "USD", item.salary)}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <span>{item.type}</span>
          <span> {moment(item?.createdAt?.toDate()).format("L")}</span>
        </div>
      </div>
    </div>
  );
};

export default JobList;
