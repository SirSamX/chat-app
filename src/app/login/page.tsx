"use client"

import React from "react";
import AuthButtons from "@/components/AuthBtns";



export default function Auth() {

  return(
    <>
      <div className="providers flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-600 to-black">
        <AuthButtons />
      </div>
    </>
  )
}