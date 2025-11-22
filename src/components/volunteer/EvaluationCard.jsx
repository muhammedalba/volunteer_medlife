import React, { useState, useEffect } from "react";
import { motion as _motion } from "framer-motion";
import { AlertCircle, Award, Info } from "lucide-react";

const EvaluationCard = ({ evaluation }) => {
  const [progressValues, setProgressValues] = useState({
    initial: 0,
    monthly: 0,
    posts: 0,
    activity: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValues({
        initial: evaluation.initial_score,
        monthly: evaluation.monthly_score,
        posts: evaluation.posts_score,
        activity: evaluation.activity_score,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-800";
  };

  const scoreColor = getScoreColor(20);

  return (
    <_motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <_motion.div
        whileHover={{
          y: -5,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 shadow-lg"
      >
        <div className={`bg-gradient-to-r ${scoreColor} p-6 text-black`}>
          <div className="flex justify-between items-start">
            <div>
              <_motion.h3
                className="text-2xl font-bold"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {evaluation.team_name}
              </_motion.h3>
              <_motion.p
                className="text-white/90 mt-1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {formatDate(evaluation.evaluation_date)}
              </_motion.p>
            </div>

            <_motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
                delay: 0.4,
              }}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center"
            >
              <_motion.span
                className="text-2xl font-bold"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  },
                }}
              >
                {evaluation.final_score}%
              </_motion.span>
            </_motion.div>
          </div>
        </div>

        <div className="p-6">
          <_motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 mb-6"
          >
            {[
              {
                label: "التقييم الأولي",
                value: evaluation.initial_score,
                key: "initial",
              },
              {
                label: "التقييم الشهري",
                value: evaluation.monthly_score,
                key: "monthly",
              },
              {
                label: "درجة المشاركات",
                value: evaluation.posts_score,
                key: "posts",
              },
              {
                label: "درجة النشاط",
                value: evaluation.activity_score,
                key: "activity",
              },
            ].map((item) => (
              <_motion.div
                key={item.key}
                variants={item}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
              >
                <p className="text-sm text-gray-500">{item.label}</p>
                <div className="flex items-center mt-1">
                  <div className="h-1.5 rounded-full bg-gray-200 w-full mr-2">
                    <_motion.div
                      className={`h-full rounded-full ${getScoreColor(
                        item.value
                      )}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressValues[item.key]}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="font-semibold whitespace-nowrap">
                    {Math.round(progressValues[item.key])}%
                  </span>
                </div>
              </_motion.div>
            ))}
          </_motion.div>

          <_motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            {evaluation.supervisor_opinion && (
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center text-blue-600 mb-2">
                  <Info className="ml-1 h-4 w-4" />
                  <span className="text-sm font-medium">ملاحظات المشرف</span>
                </div>
                <p className="text-gray-700 text-sm">
                  {evaluation.supervisor_opinion}
                </p>
              </div>
            )}

            {evaluation.negatives_notes && (
              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                <div className="flex items-center text-amber-600 mb-2">
                  <AlertCircle className="ml-1 h-4 w-4" />
                  <span className="text-sm font-medium">ملاحظات سلبية</span>
                </div>
                <p className="text-gray-700 text-sm">
                  {evaluation.negatives_notes}
                </p>
              </div>
            )}

            {evaluation.ideas_presented && (
              <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center text-green-600 mb-2">
                  <Award className="ml-1 h-4 w-4" />
                  <span className="text-sm font-medium">الأفكار المقدمة</span>
                </div>
                <p className="text-gray-700 text-sm">
                  {evaluation.ideas_presented}
                </p>
              </div>
            )}
          </_motion.div>
        </div>
      </_motion.div>
      <div className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </_motion.div>
  );
};

export default EvaluationCard;
