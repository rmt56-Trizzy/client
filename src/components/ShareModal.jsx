import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineCopy } from "react-icons/ai";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import { validate } from "react-email-validator";
import { toastSuccess } from "../utils/swallAlert";

const SHARE_WITH_EMAIL = gql`
  mutation Mutation($payload: ShareInput) {
    shareItinerary(payload: $payload)
  }
`;

export default function ShareModal({
  isOpen,
  onClose,
  viewUID,
  recommendationId,
}) {
  const [email, setEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const link = `${window.location.origin}/recommendation/${recommendationId}?view-access=${viewUID}`;

  const [shareItinerary] = useMutation(SHARE_WITH_EMAIL, {
    onCompleted: (data) => {
      toastSuccess(data.shareItinerary);
      onClose();
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleShare = () => {
    shareItinerary({
      variables: {
        payload: {
          email,
          recommendationId,
        },
      },
    });
    setEmail("");
  };

  useEffect(() => {
    if (validate(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }, [email]);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Share This Link</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Copyable Link */}
        <div className="flex items-center border rounded-lg px-3 py-2 mt-4">
          <input
            className="border-none outline-none flex-1 bg-transparent"
            value={link}
            readOnly
          />
          {isCopied ? (
            <span className="text-green-500 text-sm ml-2">Copied!</span>
          ) : (
            <button
              onClick={handleCopy}
              className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <AiOutlineCopy size={20} />
            </button>
          )}
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        {isValidEmail ? (
          <button
            onClick={handleShare}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            Share
          </button>
        ) : (
          <button
            disabled
            className="mt-4 w-full bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed"
          >
            Share
          </button>
        )}
      </motion.div>
    </div>
  );
}

ShareModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  viewUID: PropTypes.string.isRequired,
  recommendationId: PropTypes.string.isRequired,
};
