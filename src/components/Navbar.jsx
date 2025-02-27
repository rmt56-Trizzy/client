import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import ProfileModal from "./ProfileModal";
import { toastSuccess } from "../utils/swallAlert";
import { gql, useQuery } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query Query($id: ID!) {
    getUserById(_id: $id) {
      _id
      fullName
    }
  }
`;

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  const [userData, setUserData] = useState({});

  const { data } = useQuery(GET_USER_BY_ID, {
    variables: { id: localStorage.getItem("userId") },
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  const handelLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    toastSuccess("Logout successfully");
    setIsLogin(false);
    navigate("/login");
  };

  const handleNavigateProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    if (data) {
      setUserData(data.getUserById);
    }
  }, [data]);

  return (
    <div className="md:h-[67px] h-10 border-b-1 border-gray-300 sticky top-0 z-50 bg-white">
      <motion.div className="mx-auto w-full max-w-screen-xl flex items-center justify-between h-full px-4 md:px-10 lg:px-12">
        <NavLink to={"/"} className={"me-auto"}>
          <motion.img
            initial={{
              x: -300,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            src="/img/Trizzy_icon.png"
            alt="Trizzy-Logo"
            className="md:w-15 w-9.5"
          />
        </NavLink>
        <motion.div
          initial={{
            x: 300,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="md:hidden flex items-center gap-3"
        >
          <div className="rounded-full flex justify-between items-center gap-2 py-[4px] px-1.5 bg-gray-200">
            <p className="text-xs font-semibold">ID</p>
            <img
              src="/img/Indonesia flag.png"
              alt="indo-flag"
              className="w-4 h-4 rounded-full"
            />
          </div>
          <div>
            <button
              className="md:hidden flex flex-col max-w-screen w-7 justify-center items-center gap-1 p-2 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <MdClose className="text-2xl" />
              ) : (
                <GiHamburgerMenu className="text-xl" />
              )}
            </button>
          </div>
        </motion.div>

        <ProfileModal
          isModalOpen={isModalProfileOpen}
          handelLogout={handelLogout}
          handleNavigateProfile={handleNavigateProfile}
        />
        <motion.div
          initial={{
            x: 20,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="hidden md:block"
        >
          {isLogin ? (
            <div className="flex gap-4">
              <div className="rounded-full flex justify-between items-center gap-3 px-3 bg-gray-200">
                <p className=" font-semibold">ID</p>
                <img
                  src="/img/Indonesia flag.png"
                  alt="indo-flag"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <button
                className="cursor-pointer"
                onClick={() => setIsModalProfileOpen(!isModalProfileOpen)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src="/img/profile.png"
                    alt="profile-image"
                    className="w-9 h-9 rounded-full"
                  />
                  <p className="text-xs lg:text-sm">{userData.fullName}</p>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="rounded-full flex justify-between items-center gap-3 px-3 bg-gray-200">
                <p className=" font-semibold">ID</p>
                <img
                  src="/img/Indonesia flag.png"
                  alt="indo-flag"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <NavLink to={"/login"}>
                <button className="rounded-md border transition-all duration-300 cursor-pointer border-green-600 py-1 px-3 font-semibold hover:bg-green-50 text-green-600">
                  Login
                </button>
              </NavLink>
              <NavLink to={"/register"}>
                <button className="rounded-md border transition-all duration-300 cursor-pointer border-blue-600 py-1 px-3 font-semibold hover:bg-blue-50 text-blue-600">
                  Register
                </button>
              </NavLink>
            </div>
          )}
        </motion.div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="fixed top-10 right-0 h-full w-2/3 bg-white p-10 shadow-lg md:hidden"
            >
              {isLogin ? (
                <div className="text-center">
                  <div className="flex flex-col items-center justify-center gap-2 mx-auto">
                    <img
                      src="/img/profile.png"
                      alt="profile-image"
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="text-sm">Profile Name</p>
                  </div>
                  <div className="mt-6 font-semibold">
                    <NavLink to={"/profile"}>
                      <p className="border-b-1 text-sm border-gray-300 w-full py-3">
                        My Trips
                      </p>
                    </NavLink>
                    <NavLink to={"/profile"}>
                      <p className="py-3 text-sm border-b-1 border-gray-300 w-full">
                        Subscription
                      </p>
                    </NavLink>
                    <button
                      className="rounded-md border text-sm md:text-base mt-4 transition-all duration-300 border-red-600 py-1 md:py-1 px-3 font-semibold hover:bg-red-50 text-red-600"
                      onClick={handelLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 mx-auto w-28">
                  <NavLink to={"/login"}>
                    <button className="rounded-md border w-full text-sm md:text-base transition-all duration-300 border-green-600 py-1 md:py-1 px-3 font-semibold hover:bg-green-50 text-green-600">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to={"/register"}>
                    <button className="rounded-md w-full border text-sm md:text-base transition-all duration-300 border-blue-600 py-1 md:py-1 px-3 font-semibold hover:bg-blue-50 text-blue-600">
                      Register
                    </button>
                  </NavLink>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
