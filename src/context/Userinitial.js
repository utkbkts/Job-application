"use client"
import React, { createContext, useContext, useReducer } from "react";
import * as yup from "yup";

const FormContext = createContext();

const initialState = {
  title: "",
  type: "",
  company: "",
  locationoffice: "",
  location: "",
  description: "",
  responsibilities: "",
  salary:"",
  remote:"",
};
const validationSchema = yup.object({
    title: yup.string().required("Missing title"),
    type: yup.string().required("Missing type"),
    company: yup.string().required("Missing company"),
    locationoffice: yup.string().required("Missing locationoffice"),
    location: yup.string().required("Missing location"),
    description: yup.string().required("Missing description"),
  });

const formReducer = (state, action) => {
  switch (action.type) {
    case "form_data_update":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const formdataupdate = (data) => {
    dispatch({
      type: "form_data_update",
      payload: data,
    });
  };

  return (
    <FormContext.Provider value={{ state, formdataupdate,validationSchema,initialState,dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};