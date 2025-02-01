import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";
import { NavLink } from "react-router";

export default function Footer() {
  return (
    <div className="border-t border-gray-300">
      <footer className="bg-white text-gray-900 py-10 border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="md:text-3xl text-xl text-slate-700 font-bold">
                Trizzy
              </h2>
              <p className="mt-3 text-gray-600 text-sm md:text-base">
                Your ultimate AI-powered travel planner. Discover the best
                hotels and itineraries effortlessly.
              </p>
            </div>

            <div className="flex flex-col md:items-center text-sm md:text-base">
              <h3 className="md:text-2xl text-base font-semibold">
                Quick Links
              </h3>
              <ul className="md:mt-3 mt-2 space-y-2">
                <li>
                  <button className="text-gray-600 hover:text-gray-900">
                    Destinations
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-gray-900">
                    Hotels
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-gray-900">
                    Itineraries
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-gray-900">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="md:text-2xl text-base font-semibold">
                Sign up for our newsletter
              </h3>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                Get travel tips, exclusive deals, and AI-powered
                recommendations.
              </p>
              <div className="flex mt-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-sm text-gray-900 border border-teal-300 rounded-l-md focus:outline-none outline-none"
                />
                <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md hover:bg-teal-600 cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-6">
            <p className="text-gray-600 text-sm">
              &copy; 2025 Trizzy. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-xl">
              <button className="text-gray-600 hover:text-blue-500">
                <FaFacebook />
              </button>
              <button className="text-gray-600 hover:text-blue-500">
                <FaXTwitter />
              </button>
              <button className="text-gray-600 hover:text-blue-500">
                <FaInstagram />
              </button>
              <NavLink
                to="https://github.com/rmt56-Trizzy"
                className="text-gray-600 hover:text-blue-500"
              >
                <FaGithub />
              </NavLink>
              <button className="text-gray-600 hover:text-blue-500">
                <FaLinkedin />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
