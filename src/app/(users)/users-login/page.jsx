"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, FormGroup, Input, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { Link as MUILink } from "@mui/material";
import Image from "next/image";
import useLoginUsers from "@/hook/useLoginUsers";
import { useRouter } from "next/navigation";
const validationSchema = yup
  .object({
    name: yup.string().required("Missing Name"),
    email: yup.string().required("Missing Email").email("Invalid email format"),
    password: yup.string().required("Missing password"),
  })
  .required();

const Login = () => {
  const {loginUser}=useLoginUsers()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onsubmit = (data) => {
    loginUser(data)
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="font-bold text-4xl pb-4 pt-4">User Sign In</h1>
      <div className="w-[600px]  h-[400px] shadow-md  backdrop-blur-lg rounded-md p-2 flex  justify-center flex-col">
        <form onSubmit={handleSubmit(onsubmit)}>
          <FormGroup className="flex flex-col gap-3">
            <FormControl>
              <InputLabel>Full Name</InputLabel>
              <Input
                className="MuiInput-input"
                {...register("name")}
                type="text"
                name="name"
              />
              {errors.name && (
                <span className="text-red-400">{errors?.name?.message}</span>
              )}
            </FormControl>
            <FormControl>
              <InputLabel>Email</InputLabel>
              <Input
                className="MuiInput-input"
                {...register("email")}
                type="email"
                name="email"
              />
              {errors.name && (
                <span className="text-red-400">{errors?.email?.message}</span>
              )}
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input
                className="MuiInput-input"
                {...register("password")}
                type="password"
                name="password"
              />
              {errors.name && (
                <span className="text-red-400">
                  {errors?.password?.message}
                </span>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              className="bg-blue-700 text-whit"
            >
              Submit
            </Button>
            <span className="text-center">
              {" "}
              Don't you have an account? ?
              <span  className="text-blue-300 underline cursor-pointer" onClick={() => router.push("/users-register")}>Sign Up</span>
            </span>
          </FormGroup>
        </form>
      </div>
    </div>
  );
};

export default Login;
