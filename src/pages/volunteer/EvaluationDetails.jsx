import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvaluationById } from "@/services/volunteerService";
import EvaluationCard from "@/components/volunteer/EvaluationCard";
import { Button } from "@/components/ui/button";
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
import { motion, AnimatePresence } from "framer-motion";

// Enhanced animation variants for a more modern feel
const containerVariants = {
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
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardHover = {
  scale: 1.03,
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
  transition: {
    duration: 0.3,
    ease: "easeInOut",
  },
};

const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
  },
};

const EvaluationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const data = await getEvaluationById(id);
        setEvaluation(data.evaluation);
      } catch (err) {
        console.error("Error fetching evaluation details:", err);
        setError("فشل في تحميل تفاصيل التقييم");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluation();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-red-50 to-red-100 text-center"
      >
        <p className="text-red-600 text-lg font-semibold mb-4">{error}</p>
        <motion.button
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 flex items-center"
        >
          <ArrowRight className="ml-2 h-5 w-5" />
          العودة
        </motion.button>
      </motion.div>
    );
  }

  if (!evaluation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-center"
      >
        <p className="text-gray-600 text-lg font-semibold mb-4">لم يتم العثور على التقييم المطلوب</p>
        <motion.button
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
        >
          <ArrowRight className="ml-2 h-5 w-5" />
          العودة
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex justify-between items-center"
        >
          <motion.h1
            className="text-3xl font-bold text-gray-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            تفاصيل التقييم
          </motion.h1>
          <motion.button
            whileHover={buttonHover}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="group px-5 py-2.5 bg-white text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
          >
            <ArrowRight className="ml-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            العودة إلى قائمة التقييمات
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={evaluation.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <motion.div
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
              variants={itemVariants}
            >
              <EvaluationCard evaluation={evaluation} />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
            >
              <div className="p-8">
                <motion.h2
                  variants={itemVariants}
                  className="text-2xl font-semibold text-gray-800 mb-8 pb-4 border-b border-gray-200 flex items-center"
                >
                  <User className="ml-3 h-6 w-6 text-blue-600" />
                  معلومات المشرف
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                    className="p-5 bg-gray-50 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">الاسم الكامل</h3>
                        <p className="mt-1 text-gray-800 font-semibold">
                          {evaluation.supervisor?.full_name || "غير متوفر"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                    className="p-5 bg-gray-50 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">البريد الإلكتروني</h3>
                        <p className="mt-1 text-gray-800 font-semibold">
                          {evaluation.supervisor?.username || "غير متوفر"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                    className="p-5 bg-gray-50 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <University className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">الجامعة</h3>
                        <p className="mt-1 text-gray-800 font-semibold">
                          {evaluation.supervisor?.university || "غير متوفر"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                    className="p-5 bg-gray-50 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">التخصص</h3>
                        <p className="mt-1 text-gray-800 font-semibold">
                          {evaluation.supervisor?.specialization || "غير متوفر"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                    className="p-5 bg-gray-50 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">الدرجة العلمية</h3>
                        <p className="mt-1 text-gray-800 font-semibold">
                          {evaluation.supervisor?.academic_degree || "غير متوفر"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                    className="p-5 bg-gray-50 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">سنة التخرج</h3>
                        <p className="mt-1 text-gray-800 font-semibold">
                          {evaluation.supervisor?.study_year || "غير متوفر"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EvaluationDetails;