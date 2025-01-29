import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validate } from "react-email-validator";
import authAnimation from "../../animations/authAnimation2.json";
import Lottie from "lottie-react";
import { IoIosArrowDropleft } from "react-icons/io";

export default function Register() {
  const [input, setInput] = useState({
    email: "adada@mail.com",
    fullName: "",
    password: "",
  });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isRegisterValid, setIsRegisterValid] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isAgreeToTerms, setIsAgreeToTerms] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setInput({ ...input, email: e.target.value });
    setIsValidEmail(validate(input.email));
  };

  const handleContunue = () => {
    if (isValidEmail) {
      setIsNext(true);
      return;
    }
  };

  const handleBack = () => {
    setIsNext(false);
    setInput({
      email: "",
      fullName: "",
      password: "",
    });
    setIsValidEmail(false);
    setIsAgreeToTerms(false);
  };

  useEffect(() => {
    setIsRegisterValid(
      input.email.trim() !== "" &&
        input.fullName.trim() !== "" &&
        input.password.trim() !== "" &&
        isAgreeToTerms
    );
  }, [input, isAgreeToTerms]);

  const handleRegister = () => {
    navigate("/login");
  };

  return (
    <div className="mx-auto xl:w-[550px] flex justify-center items-center h-screen">
      <div className="border border-gray-100 rounded-sm shadow-xl h-[900px] p-10 w-full">
        {!isNext ? (
          <>
            <div>
              <p className="text-xl font-semibold">
                Sign in or create an account
              </p>
              <p className="text-sm">
                Sign up for free or log in to access amazing deals and benefits!
              </p>
            </div>
            <div>
              <Lottie animationData={authAnimation} loop={true} />
            </div>
            <div className="mt-10">
              <div className="group relative">
                <label className="absolute left-3.5 top-1.5 text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
                  Email
                </label>
                <input
                  type="email"
                  value={input.email}
                  onChange={handleEmailChange}
                  className="mt-4 w-full border text-sm border-gray-300 rounded-lg px-4 py-3 focus:outline-none outline-none focus:border-blue-500"
                  placeholder="id@email.com"
                />
              </div>
              {isValidEmail ? (
                <div className="mt-4">
                  <button
                    className="rounded-4xl border border-gray-300 transition-all duration-500 cursor-pointer font-semibold hover:bg-blue-50 text-blue-500 w-full py-2 hover:border-blue-500"
                    onClick={handleContunue}
                  >
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
        ) : (
          <>
            <div>
              <button className="cursor-pointer" onClick={handleBack}>
                <IoIosArrowDropleft className="text-4xl text-gray-500 hover:text-blue-500" />
              </button>
            </div>
            <div className="mt-20">
              <p className="text-2xl font-semibold">
                First, tell us your preferred name.
              </p>
              <p className="mt-4 text-sm">
                We&apos;re setting up your account for {input.email}. Please let
                us know your preferred name to get started.
              </p>
            </div>
            <div className="mt-20">
              <div className="group relative">
                <label className="absolute left-3.5 top-1.5 text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
                  Full Name
                </label>
                <input
                  type="text"
                  value={input.fullName}
                  onChange={(e) =>
                    setInput({ ...input, fullName: e.target.value })
                  }
                  className="mt-4 w-full border text-sm border-gray-300 rounded-lg px-4 py-3 focus:outline-none outline-none focus:border-blue-500"
                  placeholder="Full Name"
                />
              </div>
              <div className="group relative mt-8">
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
            </div>

            {isRegisterValid ? (
              <div className="mt-20">
                <button
                  className="rounded-4xl border border-gray-300 transition-all duration-500 cursor-pointer font-semibold hover:bg-blue-50 text-blue-500 w-full py-2 hover:border-blue-500"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="mt-20">
                <button className="rounded-4xl border border-gray-300 font-semibold text-gray-300 w-full py-2 bg-blue-50">
                  Register
                </button>
              </div>
            )}

            <div className="mt-10 flex items-center gap-4">
              <input
                type="checkbox"
                className="w-8 h-8"
                value={isAgreeToTerms}
                onChange={() => setIsAgreeToTerms(!isAgreeToTerms)}
              />
              <label className="text-sm text-gray-500">
                I agree to receive updates and promotions about Agoda and its
                affiliates or business partners via various channels, including
                WhatsApp. Opt out anytime. Read more in the Privacy Policy.
              </label>
            </div>
            <div className="mt-10">
              <p className="text-xs text-gray-500 mt-4 text-center">
                By signing in, I agree to Agoda&apos;s{" "}
                <span className="text-blue-500">Terms of Use</span> and{" "}
                <span className="text-blue-500">Privacy Policy.</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
