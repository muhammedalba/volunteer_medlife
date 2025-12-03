import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion as Motion } from "framer-motion";
import {
  Star,
  Plus,
  Zap,
  Heart,
  Target,
  Brain,
  Award,
  Users,
  Scale,
  Clock,
  FileText,
  MessageSquare,
} from "lucide-react";
import { VolunteerInfoCard, InfoItem } from "..";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SupervisorRatingForm from "../SupervisorRatingForm";

const RatingsTab = memo(({ ratings: initialRatings = [], volunteerId }) => {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratings, setRatings] = useState(initialRatings);
  console.log(ratings, "ratings");
  console.log(volunteerId, "volunteerId");

  // Memoized callback to prevent unnecessary re-renders
  const handleRatingSubmitted = useCallback((newRating) => {
    setRatings((prev) => [newRating, ...prev]);
  }, []);

  // Sync ratings with prop changes
  useEffect(() => setRatings(initialRatings), [initialRatings]);

  // Memoized animation variants for better performance
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const infoContainerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.1,
        },
      },
    }),
    []
  );

  const infoItemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -10 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  // Icon mapping for better performance and consistency
  const getIcon = useCallback((iconName, color = "text-gray-500") => {
    const iconMap = {
      star: <Star className={`h-4 w-4 ${color}`} />,
      plus: <Plus className={`h-4 w-4 ${color}`} />,
      zap: <Zap className={`h-4 w-4 ${color}`} />,
      heart: <Heart className={`h-4 w-4 ${color}`} />,
      target: <Target className={`h-4 w-4 ${color}`} />,
      brain: <Brain className={`h-4 w-4 ${color}`} />,
      award: <Award className={`h-4 w-4 ${color}`} />,
      users: <Users className={`h-4 w-4 ${color}`} />,
      scale: <Scale className={`h-4 w-4 ${color}`} />,
      clock: <Clock className={`h-4 w-4 ${color}`} />,
      file: <FileText className={`h-4 w-4 ${color}`} />,
      message: <MessageSquare className={`h-4 w-4 ${color}`} />,
    };
    return iconMap[iconName] || iconMap.star;
  }, []);

  // Memoized rating items with icons
  const ratingItems = useMemo(
    () => [
      {
        label: "درجة النشاط",
        key: "activity_score",
        icon: "zap",
        color: "text-yellow-500",
      },
      {
        label: "درجة السلوك",
        key: "behavior_score",
        icon: "heart",
        color: "text-red-500",
      },
      {
        label: "درجة التحفيز",
        key: "motivation_score",
        icon: "target",
        color: "text-blue-500",
      },
      {
        label: "المهارات العلمية",
        key: "scientific_skill_score",
        icon: "brain",
        color: "text-purple-500",
      },
      {
        label: "درجة العدالة",
        key: "fairness_score",
        icon: "award",
        color: "text-green-500",
      },
      {
        label: "جودة الفريق",
        key: "team_quality_score",
        icon: "users",
        color: "text-indigo-500",
      },
      {
        label: "توزيع المهام",
        key: "tasks_distribution_fairness",
        icon: "scale",
        color: "text-orange-500",
      },
      {
        label: "وقت المشرف",
        key: "general_supervisor_time",
        icon: "clock",
        color: "text-cyan-500",
      },
      {
        label: "سلوك الإدارة",
        key: "management_behavior",
        icon: "file",
        color: "text-gray-600",
      },
      {
        label: "الإيجابيات والسلبيات",
        key: "pros_cons",
        icon: "message",
        color: "text-gray-600",
      },
      {
        label: "المساحة الممنوحة",
        key: "space_given",
        icon: "file",
        color: "text-gray-600",
      },
      {
        label: "الاستماع والمقترحات",
        key: "listening_and_suggestions",
        icon: "message",
        color: "text-gray-600",
      },
    ],
    []
  );

  return (
    <Motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <Motion.div variants={cardVariants} className="flex justify-end">
        <Motion.button
          type="button"
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsRatingModalOpen(true)}
          className="
            px-5 py-2.5 rounded-xl text-sm font-semibold
            bg-bgColor text-white shadow-lg
            hover:bg-red-500 hover:shadow-xl
            transition-all duration-300 flex items-center gap-2
          "
        >
          {getIcon("plus", "text-white")}
          إضافة تقييم جديد
        </Motion.button>
      </Motion.div>

      <div className="grid grid-cols-1 gap-6">
        {ratings.length > 0 ? (
          <Motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {ratings.map((rating) => (
              <Motion.div
                key={rating.id}
                variants={cardVariants}
                whileHover={{ y: -3, scale: 1.01 }}
                className="transition-transform duration-300"
              >
                <VolunteerInfoCard
                  title={
                    <Motion.div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getIcon("star", "text-yellow-500")}
                        <span className="text-md">تقييم المشرف : {rating?.supervisor_user?.full_name}</span>
                      </div>
                      {/* create at  */}
                      <span className="text-red-500 break-words text-sm ">
                        {new Date(rating.created_at).toLocaleDateString(
                          "ar-EG"
                        )}
                      </span>
                    </Motion.div>
                  }
                  icon={getIcon("star", "text-yellow-500")}
                >
                  <Motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    variants={infoContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {ratingItems.map((item, idx) => {
                      const value = rating[item.key];
                      const displayValue =
                        typeof value === "number"
                          ? `${value}/${
                              item.key.includes("fairness") ||
                              item.key.includes("team") ||
                              item.key.includes("tasks") ||
                              item.key.includes("general")
                                ? 5
                                : 5
                            }`
                          : value || "غير متوفر";

                      return (
                        <Motion.div
                          key={item.key}
                          className={idx >= 8 ? "col-span-full" : ""}
                          variants={infoItemVariants}
                        >
                          <div className="flex items-center gap-2 shadow-sm">
                            {getIcon(item.icon, item.color)}
                            <InfoItem label={item.label} value={displayValue} />
                          </div>
                        </Motion.div>
                      );
                    })}
                  </Motion.div>
                </VolunteerInfoCard>
              </Motion.div>
            ))}
          </Motion.div>
        ) : (
          <Motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="
              text-center py-14 
              backdrop-blur-lg bg-white/20 
              rounded-3xl shadow-xl border border-white/30
            "
          >
            <Motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex justify-center mb-4"
            >
              {getIcon("star", "text-gray-400")}
            </Motion.div>
            <p className="text-gray-700 text-lg font-medium">
              لا توجد تقييمات للمشرفين
            </p>
            <p className="text-gray-500 text-sm mt-2">
              كن أول من يضيف تقييماً للمشرف
            </p>
          </Motion.div>
        )}
      </div>

      {/* Add Rating Modal */}
      <Dialog open={isRatingModalOpen} onOpenChange={setIsRatingModalOpen}>
        <DialogContent className="sm:max-w-[625px] bg-white shadow-2xl rounded-2xl overflow-hidden">
          <DialogHeader className=" flex items-center justify-center relative bg-gradient-to-r from-bgColor to-red-300 text-white p-3 sm:p-6 rounded-xl">
            <Motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              {getIcon("plus", "text-white")}
              <DialogTitle className="text-md sm:text-lg font-bold text-center mr-2">
                إضافة تقييم جديد
              </DialogTitle>
            </Motion.div>
          </DialogHeader>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 max-h-[70vh] overflow-y-auto"
          >
            <SupervisorRatingForm
              volunteerId={volunteerId}
              onSuccess={(newRating) => {
                handleRatingSubmitted(newRating);
                setIsRatingModalOpen(false);
              }}
            />
          </Motion.div>
        </DialogContent>
      </Dialog>
    </Motion.div>
  );
});

RatingsTab.displayName = "RatingsTab";

export default RatingsTab;
