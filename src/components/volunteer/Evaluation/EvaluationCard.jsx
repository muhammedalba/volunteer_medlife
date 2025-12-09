import React, { memo, useMemo, useCallback } from "react";
import { motion as _motion } from "framer-motion";
import {
  AlertCircle,
  Award,
  Info,
  TrendingUp,
  FileText,
  Zap,
  Calendar,
  User,
  Star,
} from "lucide-react";

const EvaluationCard = memo(({ evaluation }) => {
  const container = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.15,
        },
      },
    }),
    []
  );

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "غير محدد";
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const getScoreColor = useCallback((score) => {
    if (score >= 4) return "from-green-600 to-emerald-900/60";
    if (score >= 3) return "from-blue-700 to-cyan-500/90";
    if (score >= 1) return "from-amber-400/80 to-yellow-700";
    return "from-red-500/80 to-rose-600/90";
  }, []);

  const toFiveStarValue = useCallback((score) => {
    if (score == null) return 0;
    const numeric = Math.round(Number(score));
    return Math.max(0, Math.min(5, numeric));
  }, []);


  const renderStars = useCallback(
    (score) => {
      const value = toFiveStarValue(score);

      return (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={
                index < value
                  ? "text-yellow-400 text-xl drop-shadow-sm"
                  : "text-gray-300 text-xl"
              }
            >
              ★
            </span>
          ))}
          {/* <span className="text-xs text-gray-600 mr-1">({value}/5)</span> */}
        </div>
      );
    },
    [toFiveStarValue]
  );

  const finalScore = evaluation.final_score ?? 0;
  const scoreColor = getScoreColor(finalScore);

  const scoreItems = useMemo(
    () => [
      {
        icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
        label: "التقييم الأولي",
        value: evaluation.initial_score,
        key: "initial",
      },
      {
        icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
        label: "التقييم الشهري",
        value: evaluation.monthly_score,
        key: "monthly",
      },
      {
        icon: <FileText className="h-5 w-5 text-green-500" />,
        label: "تقييم عدد البوستات / الحملات",
        value: evaluation.posts_score,
        key: "posts",
      },
      {
        icon: <Zap className="h-5 w-5 text-yellow-500" />,
        label: "تقييم النشاط",
        value: evaluation.activity_score,
        key: "activity",
      },
      {
        icon: <Award className="h-5 w-5 text-orange-500" />,
        label: "تقييم الالتزام",
        value: evaluation.commitment_score,
        key: "commitment",
      },
      {
        icon: <Star className="h-5 w-5 text-pink-500" />,
        label: "تقييم الإبداع",
        value: evaluation.creativity_score,
        key: "creativity",
      },
      {
        icon: <Calendar className="h-5 w-5 text-indigo-500" />,
        label: "حضور الاجتماعات",
        value: evaluation.meetings_attendance,
        key: "meetings",
      },
      {
        icon: <User className="h-5 w-5 text-teal-500" />,
        label: "المشاركة في الشبكات",
        value: evaluation.networking_participation,
        key: "networking",
      },
      {
        icon: <Info className="h-5 w-5 text-cyan-500" />,
        label: "تقييم الأفكار الجديدة",
        value: evaluation.new_ideas_score,
        key: "newIdeas",
      },
    ],
    [
      evaluation.initial_score,
      evaluation.monthly_score,
      evaluation.posts_score,
      evaluation.activity_score,
      evaluation.commitment_score,
      evaluation.creativity_score,
      evaluation.meetings_attendance,
      evaluation.networking_participation,
      evaluation.new_ideas_score,
    ]
  );

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
        <div
          className={`bg-gradient-to-r ${scoreColor} p-6 text-white flex flex-col gap-3`}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <_motion.h3
                className="text-2xl font-bold flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Star className="h-6 w-6 text-yellow-300" />
                <span>{evaluation.team_name || "اسم الخلية غير متوفر"}</span>
              </_motion.h3>
              <_motion.p
                className="text-white/90 text-sm flex items-center gap-1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Calendar className="h-4 w-4 text-white/80" />
                <span>
                  تاريخ التقييم: {formatDate(evaluation.evaluation_date)}
                </span>
              </_motion.p>
              {evaluation.supervisor_name && (
                <_motion.p
                  className="text-white/90 text-sm flex items-center gap-1"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <User className="h-4 w-4 text-white/80" />
                  <span>اسم المشرف: {evaluation.supervisor_name}</span>
                </_motion.p>
              )}
            </div>

            <_motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
                delay: 0.25,
              }}
              className="bg-black/10 backdrop-blur-sm px-4 py-2 rounded-2xl flex flex-col items-center min-w-[120px]"
            >
              <span className="text-xs text-white/80 mb-1">
                التقييم النهائي
              </span>
              {renderStars(finalScore)}
              <_motion.span
                className="text-sm font-semibold mt-1"
                animate={{
                  scale: [1, 1.06, 1],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  },
                }}
              ></_motion.span>
            </_motion.div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <_motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {scoreItems.map((item) => (
              <_motion.div
                key={item.key}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2"
              >
                <p className="text-sm text-gray-800 flex items-center gap-2">
                  {item.icon}
                  <span>{item.label} </span>
                  <span className="text-gray-600">({item.value}/5)</span>
                </p>
                <div className="flex items-center justify-between mt-1">
                  {renderStars(item.value)}
                </div>
              </_motion.div>
            ))}
          </_motion.div>

          <_motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {evaluation.negatives_notes && (
              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                <div className="flex items-center text-amber-600 mb-2">
                  <AlertCircle className="ml-1 h-4 w-4" />
                  <span className="text-sm font-medium">السلبيات</span>
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
                  <span className="text-sm font-medium">
                    الأفكار التي طرحها في الاجتماع
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                 { evaluation.ideas_presented}
                 
                </p>
              </div>
            )}

            {evaluation.supervisor?.full_name && (
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center text-gray-800 mb-2">
                  <User className="ml-1 h-4 w-4 text-bgColor" />
                  <span className="font-medium"> اسم المشرف</span>
                </div>
                <p className="text-gray-700 text-sm">
                  {evaluation.supervisor?.full_name}
                </p>
              </div>
            )}
            {evaluation.supervisor_opinion && (
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center text-blue-600 mb-2">
                  <Info className="ml-1 h-4 w-4" />
                  <span className="text-sm font-medium">رأي المشرف</span>
                </div>
                <p className="text-gray-700 text-sm">
                  {evaluation.supervisor_opinion}
                </p>
              </div>
            )}
          </_motion.div>
        </div>
      </_motion.div>
      <div className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </_motion.div>
  );
});

EvaluationCard.displayName = "EvaluationCard";

export default EvaluationCard;
