import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

export default function ProfileModal({ isModalOpen }) {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative hidden md:block md:px-1 lg:px-10"
        >
          <div className="flex items-center absolute -left-24 top-11">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-semibold mb-4">Menu</h2>
              <ul className="space-y-3">
                <li className="cursor-pointer hover:text-blue-500">My Trip</li>
                <li className="cursor-pointer hover:text-blue-500">
                  Subscription
                </li>
                <li>
                  <button className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
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
};
