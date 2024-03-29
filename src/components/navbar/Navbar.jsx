"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import { GiPayMoney } from "react-icons/gi";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { useRouter } from "next/navigation";
import { useFormSearchContext } from "@/context/SearchContext";

const Navbar = () => {
  const { LoginUser } = useFormSearchContext();
  const router = useRouter();
  const [localStora, setLocalStora] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLocalStora = localStorage.getItem("user-Admin");

      if (!storedLocalStora) {
        router.push("/");
      } else {
        setLocalStora(storedLocalStora);
      }
    }
  }, [router]);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user-info");
      localStorage.removeItem("user-Admin");
      router.refresh();
      router.push("/users-login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };
  return (
    <div className="w-full h-[30vh] flex items-center">
      <div className="flex w-full items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <GiPayMoney size={30} />
          <Button>
            <Link
              href={"/"}
              className="md:text-3xl text-[16px] font-bold md:tracking-wide text-black"
            >
              Job Application
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {!LoginUser && (
            <>
              <Link href={"/login-employer"}>
                <Button variant="text" color="warning">
                  Employer Login
                </Button>
              </Link>
              <Link href={"/users-login"}>
                <Button variant="text" color="warning">
                  Users Login
                </Button>
              </Link>
            </>
          )}
          {localStora &&(
            <>
              <span>Welcome, {LoginUser?.displayName}</span>
              <Link href={"/addcreate"} passHref>
                <Button component="a" color="success" variant="text">
                  Create Post
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="text" color="warning">
                Logout
              </Button>
            </>
          )}
          {LoginUser && !localStora &&  <>
              <span>Welcome, {LoginUser?.displayName}</span>
              <Button onClick={handleLogout} variant="text" color="warning">
                Logout
              </Button>
            </>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
