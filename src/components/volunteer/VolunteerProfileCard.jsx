import React from "react";
import PropTypes from "prop-types";
import { motion as _MOTION } from "framer-motion";

const VolunteerProfileCard = ({ volunteer, onEditClick }) => {
  console.log(volunteer, "volunteer");

  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    // Assuming photos are stored in public folder or accessible via API
    return `/${photoPath}`;
  };

  return (
    <_MOTION.div
      className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-bgColor/80 via-bgColor to-red-400/80" />
      <div className="md:flex">
        {/* Photo Section */}
        <div className="md:w-1/3 bg-gradient-to-br from-bgColor/5 to-red-400/5 p-6 flex flex-col items-center justify-center">
          {volunteer.photo_path ? (
            <div className="relative">
              <img
                src={getPhotoUrl(volunteer.photo_path)}
                alt={volunteer.full_name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    volunteer.full_name
                  )}&background=linear-gradient(135deg,%23667eea%200%,%23764ba2%20100%)&color=fff&size=128`;
                }}
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-bgColor/20 to-red-400/20 flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-3xl md:text-4xl font-bold text-bgColor">
                {volunteer.full_name?.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Information Section */}
        <div className="md:w-2/3 p-6 sm:p-8">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {volunteer.full_name}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">{volunteer.governorate}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm">{volunteer.address}</span>
              </div>
            </div>
            <button
              onClick={onEditClick}
              className="inline-flex items-center px-3 py-1.5 border text-md font-medium rounded-full text-bgColor hover:bg-red-200/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bgColor transition-colors duration-200"
            >
              <svg
                className="h-4 w-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              تعديل
            </button>
          </div>

          {/* Status Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
              {volunteer.academic_status}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
              {volunteer.qualification}
            </span>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-100">
              {volunteer.specialization}
            </span>
          </div>
        </div>
      </div>
    </_MOTION.div>
  );
};

VolunteerProfileCard.propTypes = {
  volunteer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    full_name: PropTypes.string.isRequired,
    national_id: PropTypes.string,
    phone: PropTypes.string,
    dob: PropTypes.string,
    governorate: PropTypes.string,
    address: PropTypes.string,
    qualification: PropTypes.string,
    university: PropTypes.string,
    academic_year: PropTypes.string,
    date_of_joining: PropTypes.string,
    working_hours: PropTypes.string,
    specialization: PropTypes.string,
    academic_status: PropTypes.string,
    photo_path: PropTypes.string,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default VolunteerProfileCard;
