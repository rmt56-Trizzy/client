import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validate } from "react-email-validator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setIsValidEmail(validate(email));
  };

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
              value={email}
              onChange={handleEmailChange}
              className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none outline-none focus:border-blue-500"
              placeholder="id@email.com"
            />
          </div>
          {isValidEmail ? (
            <div className="mt-4">
              <button className="rounded-4xl border border-gray-300 transition-all duration-500 cursor-pointer font-semibold hover:bg-blue-50 text-blue-500 w-full py-2 hover:border-blue-500">
                Continue
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <button className="rounded-4xl border border-gray-300 font-semibold text-gray-300 w-full py-2 bg-blue-50">
                Continue
              </button>
            </div>
          )}

          <div className="my-5 grid grid-cols-3 items-center text-gray-500 text-xs md:text-base">
            <hr className=" border-gray-300" />
            <p className="text-center">OR</p>
            <hr className=" border-gray-300" />
          </div>
          <div className="flex justify-center font-normal">
            <GoogleLogin />
          </div>
          <div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              By signing in, I agree to Agoda&apos;s{" "}
              <span className="text-blue-500">Terms of Use</span> and{" "}
              <span className="text-blue-500">Privacy Policy.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
