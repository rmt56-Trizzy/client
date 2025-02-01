import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

export default function ProfileModal({ isModalOpen, handelLogout }) {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative hidden md:block md:px-1"
        >
          <div className="flex items-center absolute -left-15 lg:-left-12 top-11 z-10">
            <div className="bg-white p-6 rounded-lg text-center shadow-lg w-80">
              <h2 className="text-lg font-bold mb-4">Menu</h2>
              <ul className="space-y-3">
                <li className="cursor-pointer border-b border-gray-300 py-2 font-semibold hover:text-blue-500">
                  My Trip
                </li>
                <li className="cursor-pointer font-semibold border-b border-gray-300 py-2 hover:text-blue-500">
                  Subscription
                </li>
                <li>
                  <button
                    className="w-full py-2 mt-8 cursor-pointer text-red-600 border-red-600 font-semibold border rounded-md hover:bg-red-50 transition-all duration-300"
                    onClick={handelLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ProfileModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handelLogout: PropTypes.func.isRequired,
};
