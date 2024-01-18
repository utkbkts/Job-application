"use client";
import React, { forwardRef, useMemo, useState } from "react";
import CitiesList from "./CitiesList";
import { Input } from "@mui/material";

const LocationInput = forwardRef(({ onLocationSelected, ...props }, ref) => {
  const [locationSearchInput, setlocationSearchInput] = useState("");

  const cities = useMemo(() => {
    if (!locationSearchInput.trim()) return [];
    const searchWords = locationSearchInput.split(" ");

    return CitiesList.map(
      (city) => `${city.name},${city.subcountry},${city.country}`
    )
      .filter(
        (city) =>
          city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
          searchWords.every((word) => {
            return city.toLowerCase().includes(word.toLowerCase());
          })
      )
      .slice(0, 5);
  }, [locationSearchInput]);

  return (
    <div className="relative">
      <Input
        type="search"
        value={locationSearchInput}
        onChange={(e) => setlocationSearchInput(e.target.value)}
        {...props}
        inputRef={ref}
        className="w-full"
      />
      {locationSearchInput.trim() && (
        <div className="absolute bg-gray-100 shadow-xl border-x border-b rounded-b-lg z-20 divide-y text-sm">
          {!cities.length && <p className="p-3">No results found</p>}
          {cities.map((item) => (
            <button
              className="block w-full text-start p-2 "
              onMouseDown={(e) => {
                e.preventDefault();
                onLocationSelected(item);
                setlocationSearchInput("");
              }}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default LocationInput;
