import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvaluationById } from "@/services/volunteerService";
import EvaluationCard from "../../components/volunteer/Evaluation/EvaluationCard";

import {
  ArrowRight,
  ChevronRight,
  User,
  Mail,
  University,
  GraduationCap,
  BookOpen,
  Calendar,
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Preloader from "../../components/Preloader/Preloader";

const EvaluationDetails = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Enhanced animation variants for a more modern feel
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.3,
          duration: 0.6,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const cardHover = useMemo(
    () => ({
      scale: 1.03,
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
    []
  );

  const buttonHover = useMemo(
    () => ({
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    }),
    []
  );
  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const fetchEvaluation = useCallback(async () => {
    try {
      const data = await getEvaluationById(id);
      setEvaluation(data.evaluation);
      console.log(data);
    } catch (err) {
      console.error("Error fetching evaluation details:", err);
      setError("فشل في تحميل تفاصيل التقييم");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvaluation();
  }, [fetchEvaluation]);

  const supervisorInfo = useMemo(() => {
    if (!evaluation?.supervisor) return [];

    return [
      {
        icon: <User className="h-5 w-5" />,
        color: "text-blue-500",
        label: "اسم المشرف",
        value: evaluation.supervisor?.full_name,
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        color: "text-green-500",
        label: "حالة الدراسة",
        value: evaluation.supervisor?.study_status,
      },
      {
        icon: <University className="h-5 w-5" />,
        color: "text-purple-500",
        label: "الجامعة",
        value: evaluation.supervisor?.university,
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        color: "text-teal-500",
        label: "التخصص",
        value: evaluation.supervisor?.specialization,
      },
      {
        icon: <GraduationCap className="h-5 w-5" />,
        color: "text-yellow-500",
        label: "الدرجة العلمية",
        value: evaluation.supervisor?.academic_degree,
      },
      {
        icon: <Calendar className="h-5 w-5" />,
        color: "text-indigo-500",
        label: "سنة التخرج",
        value: evaluation.supervisor?.study_year,
      },
    ];
  }, [evaluation?.supervisor]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-red-50 to-red-100 text-center"
      >
        <p className="text-red-600 text-lg font-semibold mb-4">{error}</p>
        <Motion.button
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoBack}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 flex items-center"
        >
          <ArrowRight className="ml-2 h-5 w-5 text-white" />
          العودة
        </Motion.button>
      </Motion.div>
    );
  }

  if (!evaluation) {
    return (
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-center"
      >
        <p className="text-gray-600 text-lg font-semibold mb-4">
          لم يتم العثور على التقييم المطلوب
        </p>
        <Motion.button
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoBack}
          className="px-6 py-3 bg-bgColor text-white rounded-lg shadow-md hover:bg-red-500 transition-colors duration-300 flex items-center"
        >
          <ArrowRight className="ml-2 h-5 w-5 text-white" />
          العودة
        </Motion.button>
      </Motion.div>
    );
  }

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <Motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex justify-between items-center"
        >
          <Motion.h1
            className="text-3xl font-bold text-gray-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            تفاصيل التقييم
          </Motion.h1>
          <Motion.button
            whileHover={buttonHover}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="group px-5 py-2.5 bg-bgColor hover:bg-red-500 text-gray-100  hover:text-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
          >
            <ArrowRight className="ml-2 h-4 w-4 text-white group-hover:-translate-x-1 transition-transform" />
            العودة إلى قائمة التقييمات
          </Motion.button>
        </Motion.div>

        <AnimatePresence mode="wait">
          <Motion.div
            key={evaluation.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <Motion.div
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
              variants={itemVariants}
            >
              <EvaluationCard evaluation={evaluation} />
            </Motion.div>
            {/* supervisor details */}
            <Motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
            >
              <div className="p-8">
                <Motion.h2
                  variants={itemVariants}
                  className="text-2xl font-semibold text-gray-800 mb-8 pb-4 border-b border-gray-200 flex items-center"
                >
                  <User className="ml-3 h-6 w-6 text-bgColor" />
                  معلومات المشرف
                </Motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supervisorInfo.map((item, index) => (
                    <Motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                      className="p-5 bg-gray-50 rounded-xl transition-all duration-300"
                    >
                      <div className="">
                        <div className="flex items-center gap-2">
                          <div className={item.color}>{item.icon}</div>
                          <h3 className="text-sm font-medium text-gray-500">
                            {item.label}
                          </h3>
                        </div>
                        <p className="mt-1 text-gray-800 font-semibold">
                          {item.value || "غير متوفر"}
                        </p>
                      </div>
                    </Motion.div>
                  ))}
                </div>
              </div>
            </Motion.div>
            {/* supervisor details   */}
          </Motion.div>
        </AnimatePresence>
      </div>
    </Motion.div>
  );
});

EvaluationDetails.displayName = "EvaluationDetails";

export default EvaluationDetails;
