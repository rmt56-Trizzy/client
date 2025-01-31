import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { NavLink } from "react-router";
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const isLogin = false;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);

  return (
    <div className="md:h-[67px] h-12 border-b-1 border-gray-300">
      <div className="mx-auto container flex items-center h-full px-4 md:px-0">
        <div className="me-auto">LOGO</div>
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1 p-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <MdClose className="text-2xl" />
          ) : (
            <GiHamburgerMenu className="text-xl" />
          )}
        </button>

        <ProfileModal isModalOpen={isModalProfileOpen} />
        <div className="hidden md:block">
          {isLogin ? (
            <>
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
                  <p className="text-xs lg:text-sm">Profile Name</p>
                </div>
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <button className="rounded-md border transition-all duration-300 cursor-pointer border-green-600 py-1 px-3 font-semibold hover:bg-green-50 text-green-600">
                Login
              </button>
              <button className="rounded-md border transition-all duration-300 cursor-pointer border-blue-600 py-1 px-3 font-semibold hover:bg-blue-50 text-blue-600">
                Register
              </button>
            </div>
          )}
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="fixed top-12 right-0 h-full w-2/3 bg-white p-10 shadow-lg md:hidden"
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
                    <NavLink>
                      <p className="border-b-1 text-sm border-gray-300 w-full py-3">
                        My Trips
                      </p>
                    </NavLink>
                    <NavLink>
                      <p className="py-3 text-sm border-b-1 border-gray-300 w-full">
                        Subscription
                      </p>
                    </NavLink>
                    <button className="rounded-md border text-sm md:text-base mt-4 transition-all duration-300 border-red-600 py-1 md:py-1 px-3 font-semibold hover:bg-red-50 text-red-600">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 mx-auto w-32">
                  <button className="rounded-md border text-sm md:text-base transition-all duration-300 border-green-600 py-1 md:py-1 px-3 font-semibold hover:bg-green-50 text-green-600">
                    Login
                  </button>
                  <button className="rounded-md border text-sm md:text-base transition-all duration-300 border-blue-600 py-1 md:py-1 px-3 font-semibold hover:bg-blue-50 text-blue-600">
                    Register
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
