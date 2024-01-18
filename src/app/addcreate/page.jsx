"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FilledInput,
  FormControl,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { JobTypes, locationTypes } from "@/utils/JobTypes";
import LocationInput from "@/utils/LocationInput";
import PaginationInput from "@/components/pagination/Pagination";
import AddCreatetwo from "./AddCreatetwo";
import { useFormContext } from "@/context/Userinitial";
import { useRouter } from "next/navigation";

const AddCreate = () => {
  const { state, formdataupdate, validationSchema,dispatch } = useFormContext();
  const [active, setactive] = useState(false);
  const [number, setNumber] = useState(0);
  const router = useRouter()
  const localstora = localStorage.getItem("user-Admin")
  if(!localstora){
    return router.push("/")
  }
  const ref = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: state,
  });
  const onSubmitFirstForm = async (data) => {
    formdataupdate(data);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    formdataupdate({
      [name]: value,
    });
    setValue(name, value);
  };

  const handleChangeChecked = (event) => {
    const { name, checked } = event.target;
    formdataupdate({
      [name]: checked,
    });
    setValue(name, checked);
  };

 
  return (
    <div className="w-full max-w-5xl mx-auto">
      {active && number === 1 ? (
        <div className="flex flex-col w-full mt-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black">
              Find your perfect developer
            </h1>
            <span className="text-gray-400 font-light">
              Get your job posting seen by thousand of job seekers.
            </span>
          </div>
          <div className="border border-gray-300 w-full p-2 rounded-md">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-black">Job Details</span>
              <span className="text-gray-400 font-light">
                Provide a job description and details
              </span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmitFirstForm)}
              className="mt-8 w-full"
            >
              <FormGroup className="flex flex-col gap-5">
                <FormControl>
                  <InputLabel>Job Title</InputLabel>
                  <Input
                    className="MuiInput-input"
                    {...register("title")}
                    type="text"
                    name="title"
                    value={state.title}
                    onChange={handleChange}
                  />
                  {errors.title && (
                    <span className="text-red-400">
                      {errors?.title?.message}
                    </span>
                  )}
                </FormControl>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="remote"
                    {...register("remote")}
                    id="remote"
                    checked={state.remote}
                    onChange={handleChangeChecked}
                  />
                  <label htmlFor="">Remote</label>
                </div>
                <FormControl>
                  <InputLabel
                    id="demo-simple-select-label"
                    className="w-[150px] bg-white"
                  >
                    mode of operation
                  </InputLabel>
                  <Select
                    {...register("type")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="type"
                    value={state.type}
                    onChange={handleChange}
                    name="type"
                  >
                    <MenuItem value="" disabled>
                      Select an Option
                    </MenuItem>
                    {JobTypes.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.type && (
                    <span className="text-red-400">
                      {errors?.type?.message}
                    </span>
                  )}
                </FormControl>
                <FormControl>
                  <InputLabel>Job Company Name</InputLabel>
                  <Input
                    className="MuiInput-input"
                    {...register("company")}
                    type="text"
                    name="company"
                    value={state.company}
                    onChange={handleChange}
                  />
                  {errors.company && (
                    <span className="text-red-400">
                      {errors?.company?.message}
                    </span>
                  )}
                </FormControl>
                <FormControl>
                  <InputLabel
                    id="demo-simple-select-label"
                    className=" bg-white"
                  >
                    Location
                  </InputLabel>
                  <Select
                    {...register("location")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="location"
                    value={state.location}
                    onChange={handleChange}
                    name="location"
                  >
                    <MenuItem value="" disabled>
                      Select an Option
                    </MenuItem>
                    {locationTypes.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.location && (
                    <span className="text-red-400">
                      {errors?.location?.message}
                    </span>
                  )}
                </FormControl>
                <FormControl>
                  <label>Location/Office</label>
                  <LocationInput
                    onLocationSelected={(value) => {
                      setValue("locationoffice", value);
                      formdataupdate({
                        locationoffice: value,
                      });
                    }}
                    ref={ref}
                  />
                  {errors.locationoffice && (
                    <span className="text-red-400">
                      {errors?.locationoffice?.message}
                    </span>
                  )}
                  {state.locationoffice && (
                    <Typography variant="body2" color="textSecondary">
                      Selected Country: {state.locationoffice}
                    </Typography>
                  )}
                </FormControl>
                <FormControl>
                  <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    type="text"
                    {...register("description")}
                    name="description"
                    rows={4}
                    value={state.description}
                    onChange={handleChange}
                    variant="standard"
                  />
                  {errors.description && (
                    <span className="text-red-400">
                      {errors?.description?.message}
                    </span>
                  )}
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">
                    Salary
                  </InputLabel>
                  <FilledInput
                    value={state.salary}
                    name="salary"
                    onChange={handleChange}
                    id="filled-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </FormGroup>
            </form>
          </div>
        </div>
      ) : (
        <AddCreatetwo />
      )}
      <PaginationInput
        setactive={setactive}
        number={number}
        setNumber={setNumber}
        active={active}
      />
    </div>
  );
};

export default AddCreate;
