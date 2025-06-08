import React from "react";
import GridShape from "../components/login/GridShape"
import SignInForm from "../components/login/SignInForm";
export default function SignIn() {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6">
<SignInForm/>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-[#965261] relative overflow-hidden">
<GridShape/>
</div>
    </div>
  );
}