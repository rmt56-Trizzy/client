import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { validate } from "react-email-validator";
import authAnimation from "../../animations/authAnimation2.json";
import Lottie from "lottie-react";
import { IoIosArrowDropleft } from "react-icons/io";
import { gql, useMutation } from "@apollo/client";
import { toastError, toastSuccess } from "../../utils/swallAlert";
import loadingAnimation from "../../animations/loading.json";

const REGISTER = gql`
  mutation Mutation($input: RegisterInput) {
    register(input: $input)
  }
`;

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

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      console.log(data);
      toastSuccess(data.register);
      navigate("/login");
    },
    onError: (error) => {
      toastError(error);
    },
  });

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
    register({
      variables: {
        input: input,
      },
    });
  };

  return (
    <div className="mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-0 lg:w-[550px] flex justify-center items-center min-h-screen py-4">
      <div className="border border-gray-100 rounded-lg shadow-xl w-full p-4 sm:p-6 md:p-8 lg:p-10">
        {!isNext ? (
          <div className="space-y-6">
            <div>
              <p className="text-xl sm:text-2xl font-semibold">
                Create an account
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Already have account?{" "}
                <NavLink to="/login" className="text-blue-500">
                  Sign in
                </NavLink>
              </p>
            </div>
            <div className="w-full md:max-w-[300px] max-w-[200px] mx-auto">
              <Lottie animationData={authAnimation} loop={true} />
            </div>
            <div className="mt-10 mb-2 md:mb-0">
              <div className="group relative">
                <label className="absolute left-3.5 top-1.5 text-xs sm:text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
                  Email
                </label>
                <input
                  type="email"
                  value={input.email}
                  onChange={handleEmailChange}
                  className="mt-4 w-full border text-xs md:text-sm border-gray-300 rounded-lg px-4 md:py-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="id@email.com"
                  required
                />
              </div>
              {isValidEmail ? (
                <button
                  className="rounded-4xl border mt-2 md:mt-4 border-gray-300 transition-all duration-300 cursor-pointer font-semibold hover:bg-blue-50 text-blue-500 w-full py-1.5 sm:py-2.5 hover:border-blue-500"
                  onClick={handleContunue}
                >
                  Continue
                </button>
              ) : (
                <button className="rounded-4xl border mt-2 md:mt-4 border-gray-300 font-semibold text-gray-300 w-full py-1.5 sm:py-2.5 bg-blue-50">
                  Continue
                </button>
              )}

              <div className="space-y-2 md:space-y-4 mt-4">
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
        ) : (
          <>
            <div>
              <button className="cursor-pointer" onClick={handleBack}>
                <IoIosArrowDropleft className="md:text-4xl text-2xl text-gray-500 hover:text-blue-500" />
              </button>
            </div>
            <div className="mt-2 md:mt-20">
              <p className="md:text-2xl text-xl font-semibold">
                First, tell us your preferred name.
              </p>
              <p className="md:mt-4 mt-2 text-xs md:text-sm">
                We&apos;re setting up your account for {input.email}. Please let
                us know your preferred name to get started.
              </p>
            </div>
            <form className="mt-10 md:mt-20">
              <div className="group relative">
                <label className="absolute left-3.5 top-1.5 text-xs sm:text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
                  Full Name
                </label>
                <input
                  type="text"
                  value={input.fullName}
                  onChange={(e) =>
                    setInput({ ...input, fullName: e.target.value })
                  }
                  className="mt-4 w-full border text-xs sm:text-sm border-gray-300 rounded-lg px-4 md:py-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Full Name"
                />
              </div>
              <div className="group relative mt-2 md:mt-8">
                <label className="absolute left-3.5 top-1.5 text-xs sm:text-sm bg-white px-1 text-gray-500 group-focus-within:text-blue-500">
                  Password
                </label>
                <input
                  type="password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                  className="mt-4 w-full border text-xs sm:text-sm border-gray-300 rounded-lg px-4 md:py-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                />
              </div>
            </form>

            {isRegisterValid ? (
              <div className="mt-10 md:mt-20">
                {loading ? (
                  <button className="rounded-4xl h-11.5 border mt-2 md:mt-4 border-gray-300 transition-all duration-300 cursor-pointer font-semibold hover:bg-blue-50 text-blue-500 w-full py-1.5 sm:py-2.5 hover:border-blue-500">
                    <div className="w-10 mx-auto -mt-2">
                      <Lottie animationData={loadingAnimation} loop={true} />
                    </div>
                  </button>
                ) : (
                  <button
                    className="rounded-4xl border mt-2 h-11.5 md:mt-4 border-gray-300 transition-all duration-300 cursor-pointer font-semibold hover:bg-blue-50 text-blue-500 w-full py-1.5 sm:py-2.5 hover:border-blue-500"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                )}
              </div>
            ) : (
              <div className="mt-10 md:mt-20">
                <button className="rounded-4xl border mt-2 md:mt-4 border-gray-300 font-semibold text-gray-300 w-full py-1.5 sm:py-2.5 bg-blue-50">
                  Register
                </button>
              </div>
            )}

            <div className="mt-10 flex items-center gap-4">
              <input
                type="checkbox"
                className="w-8 h-8 accent-green-500"
                value={isAgreeToTerms}
                onChange={() => setIsAgreeToTerms(!isAgreeToTerms)}
              />
              <label className="md:text-sm text-xs text-gray-500">
                I agree to receive updates and promotions about Agoda and its
                affiliates or business partners via various channels, including
                WhatsApp. Opt out anytime. Read more in the Privacy Policy.
              </label>
            </div>
            <div className="mt-10 mb-2 md:mb-0">
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
