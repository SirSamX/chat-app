"use client"

import styles from "./page.module.css";
import { login } from "../lib/auth/login";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import AuthButton from "@/components/AuthBtn";
import AuthButtons from "@/components/AuthBtns";



export default function Auth() {
  
  return(
    <>
      <AuthButtons />
    </>
  )
}