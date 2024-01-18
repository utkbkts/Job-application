"use client";
import { useFormSearchContext } from "@/context/SearchContext";
import useApplyForm from "@/hook/useApplyForm";
import useDeletePost from "@/hook/useDeletePost";
import useGetDetail from "@/hook/usegetPostId";
import { Button } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailById = () => {
  const { IsLoading, LoginUser } = useFormSearchContext();
  const { ApplyForm, applicationStatus, setApplicationStatus } = useApplyForm();
  const { id } = useParams();
  const router = useRouter();
  const { getDetail, detailpost } = useGetDetail();
  const [localStora, setLocalStora] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLocalStora = localStorage.getItem("user-Admin");
        setLocalStora(storedLocalStora);
    }
  }, [router]);
  const { deletePostGet } = useDeletePost();
  useEffect(() => {
    getDetail(id);
  }, []);
  if (IsLoading) {
    return (
      <span className="text-4xl text-center flex items-center justify-center font-bold">
        Loading...
      </span>
    );
  }
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await ApplyForm(id);
      router.refresh();
    } catch (error) {
      console.error("Error applying:", error.message);
    }
  };
  const handleDelete = async () => {
    try {
      await deletePostGet(id);
      router.push("/");
    } catch (error) {
      console.error("Error applying:", error.message);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="border border-gray-200 rounded-md p-2 w-full">
        <div className="flex gap-1 w-full ">
          <Image
            src={"/softwarewalpaper.jpg"}
            alt="image"
            width={400}
            height={400}
            className="w-24 h-24 object-cover"
          />
          <div className="flex flex-col gap-2 justify-between w-full">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <span>Title:{detailpost.title}</span>
                <span className="text-green-400">
                  Remote:{detailpost.remote ? "true" : "false"}
                </span>
              </div>
              {localStora && (
                <div>
                  {applicationStatus ? (
                    <Button
                      onClick={handleClick}
                      variant="outlined"
                      color="secondary"
                    >
                      Apply Now
                    </Button>
                  ) : (
                    <Button variant="outlined" color="success">
                      application submitted
                    </Button>
                  )}
                </div>
              )}
              {LoginUser?.uid && LoginUser.uid === detailpost.createdBy && (
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <span>Company Name:{detailpost.company}</span>
                <span>Salary: {detailpost.salary}</span>
                <span>Location: {detailpost.location}</span>
              </div>
              <div className="flex flex-col">
                <span>Type: {detailpost.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-2xl">Description</span>
        <li>{detailpost.description}</li>
        <span className="font-bold text-2xl">Responsibilities</span>
        <li>{detailpost.responsibilities}</li>
      </div>
    </div>
  );
};

export default DetailById;
