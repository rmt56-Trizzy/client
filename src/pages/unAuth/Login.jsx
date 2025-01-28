import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto xl:w-[550px] flex justify-center items-center h-screen">
      <div className="border border-gray-100 rounded-sm shadow-xl p-10 w-full">
        <div>
          <p className="text-xl font-semibold">Sign in or create an account</p>
          <p className="text-sm">
            Sign up for free or log in to access amazing deals and benefits!
          </p>
        </div>
        <div className="mt-10">
          <div className="group relative">
            <label className="absolute left-3.5 top-1.5 text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4">
            <button className="rounded-4xl border border-gray-300 cursor-pointer font-semibold text-blue-500 w-full py-2 hover:border-blue-500">
              Continue
            </button>
          </div>
          <div className="my-5 grid grid-cols-3 items-center text-gray-500 text-xs md:text-base">
            <hr className=" border-gray-300" />
            <p className="text-center">OR</p>
            <hr className=" border-gray-300" />
          </div>
          <div className="flex justify-center font-normal">
            <div id="buttonDiv"></div>
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
