import React from "react";
import PropTypes from "prop-types";
import { motion as _MOTION } from 'framer-motion';

const VolunteerProfileCard = ({ volunteer, onEditClick }) => {
  console.log(volunteer,"volunteer");
  
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
        <div className="p-6 sm:p-8 w-full">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="uppercase tracking-wide text-xs sm:text-sm text-bgColor font-semibold">
                اسم المستخدم : {volunteer.username}
              </div>
              <h2 className="mt-2 text-xl sm:text-2xl font-bold text-gray-900">
                {volunteer.full_name}
              </h2>
            </div>
            <button
              onClick={onEditClick}
              className="inline-flex items-center px-3 py-1.5 border text-md font-medium rounded-full text-bgColor  hover:bg-red-200/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bgColor transition-colors duration-200 "
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
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            {volunteer.role} في {volunteer.volunteer_place}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {volunteer.study_status && (
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
                {volunteer.study_status}
              </span>
            )}
            {volunteer.academic_degree && (
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                {volunteer.academic_degree}
              </span>
            )}
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
    role: PropTypes.string,
    volunteer_place: PropTypes.string,
    study_status: PropTypes.string,
    academic_degree: PropTypes.string,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default VolunteerProfileCard;
