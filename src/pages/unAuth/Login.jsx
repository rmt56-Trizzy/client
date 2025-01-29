import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
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
    <div className="mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-0 lg:w-[550px] flex justify-center items-center min-h-screen py-4">
      <div className="border border-gray-100 rounded-lg shadow-xl w-full p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Sign in</h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <NavLink to="/register" className="text-blue-500">
                Sign up
              </NavLink>
            </p>
          </div>

          <div className="w-full md:max-w-[300px] max-w-[200px] mx-auto">
            <Lottie animationData={authAnimation} loop={true} />
          </div>

          <form className="md:space-y-4 space-y-2">
            <div className="group relative">
              <label className="absolute left-3.5 top-1.5 text-xs sm:text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
                Email
              </label>
              <input
                type="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                className="mt-4 w-full border text-sm border-gray-300 rounded-lg px-4 md:py-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="id@email.com"
                required
              />
            </div>

            <div className="group relative">
              <label className="absolute left-3.5 top-1.5 text-xs sm:text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
                Password
              </label>
              <input
                type="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                className="mt-4 w-full border text-sm border-gray-300 rounded-lg px-4 md:py-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Password"
                required
                autoComplete="current-password"
              />
            </div>

            <div>
              {isValidInputLogin ? (
                <button
                  className="rounded-4xl border mt-2 border-gray-300 transition-all duration-300 cursor-pointer font-semibold hover:bg-blue-50 text-blue-500 w-full py-1.5 sm:py-2.5 hover:border-blue-500"
                  onClick={handleLogin}
                >
                  Login
                </button>
              ) : (
                <button className="rounded-4xl border mt-2 border-gray-300 font-semibold text-gray-300 w-full py-1.5 sm:py-2.5 bg-blue-50">
                  Login
                </button>
              )}
            </div>
          </form>
          <div className="space-y-2 md:space-y-4">
            <div className="grid grid-cols-5 items-center text-gray-500 text-xs sm:text-sm">
              <hr className="col-span-2 border-gray-300" />
              <p className="text-center">OR</p>
              <hr className="col-span-2 border-gray-300" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin />
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center">
              By signing in, I agree to Agoda&apos;s{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Privacy Policy.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
