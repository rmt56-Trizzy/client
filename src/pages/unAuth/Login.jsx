import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validate } from "react-email-validator";
import authAnimation from "../../animations/authAnimation2.json";
import Lottie from "lottie-react";

export default function Login() {
  const [input, setInput] = useState({
    email: "adada@mail.com",
    password: "",
  });
  const [isValidInputLogin, setIsValidInputLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isValidInputLogin) {
      navigate("/");
      return;
    }
  };

  useEffect(() => {
    setIsValidInputLogin(
      input.email.trim() !== "" &&
        input.password.trim() !== "" &&
        validate(input.email)
    );
  }, [input]);

  return (
    <div className="mx-auto xl:w-[550px] flex justify-center items-center h-screen">
      <div className="border border-gray-100 rounded-sm shadow-xl h-[920px] p-10 w-full">
        <>
          <div>
            <p className="text-xl font-semibold">Sign in</p>
            <p className="text-sm">
              Sign up for free or log in to access amazing deals and benefits!
            </p>
          </div>
          <div>
            <Lottie animationData={authAnimation} loop={true} />
          </div>
          <div>
            <div className="group relative">
              <label className="absolute left-3.5 top-1.5 text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
                Email
              </label>
              <input
                type="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                className="mt-4 w-full border text-sm border-gray-300 rounded-lg px-4 py-3 focus:outline-none outline-none focus:border-blue-500"
                placeholder="id@email.com"
              />
            </div>
            <div className="group relative mt-3">
              <label className="absolute left-3.5 top-1.5 text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
                Password
              </label>
              <input
                type="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                className="mt-4 w-full border text-sm border-gray-300 rounded-lg px-4 py-3 focus:outline-none outline-none focus:border-blue-500"
                placeholder="Password"
              />
            </div>
            {isValidInputLogin ? (
              <div className="mt-4">
                <button
                  className="rounded-4xl border border-gray-300 transition-all duration-500 cursor-pointer font-semibold hover:bg-blue-50 text-blue-500 w-full py-2 hover:border-blue-500"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <button className="rounded-4xl border border-gray-300 font-semibold text-gray-300 w-full py-2 bg-blue-50">
                  Login
                </button>
              </div>
            )}

            <div className="my-5 grid grid-cols-5 items-center text-gray-500 text-xs md:text-base">
              <hr className="col-span-2 border-gray-300" />
              <p className="text-center">OR</p>
              <hr className="col-span-2 border-gray-300" />
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
        </>
      </div>
    </div>
  );
}
