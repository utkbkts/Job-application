"use client";

import { useFormSearchContext } from "@/context/SearchContext";
import { JobTypes } from "@/utils/JobTypes";
import LocationInput from "@/utils/LocationInput";
import React, { useEffect, useRef } from "react";

const Sidebar = ({ onFilter, HandleClear }) => {
  const ref = useRef();
  const {
    searchTitle,
    setSearchTitle,
    setSearchType,
    setsearchlocation,
    locationremote,
    setlocationremote,
  } = useFormSearchContext();

  const clearFilters = () => {
    setSearchTitle("");
    setSearchType("");
    setsearchlocation("");
    setlocationremote("")
  };
  return (
    <form onSubmit={onFilter} className="flex flex-col gap-2">
      <span>Search</span>
      <input
        className="border border-black p-1 rounded-md"
        type="text"
        name="search"
        placeholder="Title,company,etc."
        id="search"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value.toLowerCase().trim())}
      />
      <div>
        <span>All Types</span>
        <select
          className="w-full border border-black py-2 rounded-md"
          name="type"
          id=""
          defaultValue=""
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="" disabled readOnly>
            Select Types
          </option>
          {JobTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>All Location</span>
        <div className="">
          <LocationInput
            onLocationSelected={(value) => {
              setsearchlocation(value);
            }}
            ref={ref}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          name="remote"
          id="remote"
          checked={locationremote}
          onChange={(e) => setlocationremote(e.target.checked)}
        />
        <span>Remote Jobs</span>
      </div>
      <button
        type="submit"
        className="bg-black text-white rounded-md w-full py-2"
      >
        Filter Jobs
      </button>
      <button
        onClick={() => {
          clearFilters();
          HandleClear();
        }}
        type="button"
        className="bg-red-400 text-white rounded-md w-full py-2"
      >
        Clear
      </button>
    </form>
  );
};

export default Sidebar;
