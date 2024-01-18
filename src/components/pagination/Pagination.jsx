import { Pagination } from "@mui/material";
import React from "react";

const PaginationInput = ({ setactive, number, setNumber }) => {
  const handleChange = (event, value) => {
    setNumber(value);
    setactive(value === 1);
  };

  return (
    <div className="flex items-center justify-center">
      <Pagination count={2} shape="rounded" page={number} onChange={handleChange} />
    </div>
  );
};

export default PaginationInput;
