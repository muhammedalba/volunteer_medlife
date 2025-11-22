import React, { useState, useEffect } from "react";
import { motion as _motion } from "framer-motion";
import { VolunteerInfoCard, InfoItem } from "..";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SupervisorRatingForm from "../SupervisorRatingForm";

const RatingsTab = ({ ratings: initialRatings = [], volunteerId }) => {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratings, setRatings] = useState(initialRatings);

  useEffect(() => setRatings(initialRatings), [initialRatings]);

  const listContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const infoContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const infoItemVariant = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
  };

  const handleRatingSubmitted = (newRating) => {
    setRatings((prev) => [newRating, ...prev]);
  };

  return (
    <_motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-end">
        <_motion.button
          type="button"
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsRatingModalOpen(true)}
          className="
            px-5 py-2.5 rounded-xl text-sm font-semibold
            bg-primary/80 text-bgColor shadow-lg
            hover:bg-primary/90 hover:shadow-xl
            transition-all backdrop-blur-md
          "
        >
          إضافة تقييم جديد
        </_motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ratings.length > 0 ? (
          <_motion.div
            variants={listContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {ratings.map((rating) => (
              <_motion.div
                key={rating.id}
                variants={listItem}
                whileHover={{ y: -3, scale: 1.01 }}
                className="transition-transform"
              >
                <VolunteerInfoCard
                  title={`تقييم المشرف #${rating.supervisor_id}`}
                >
                  <_motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    variants={infoContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      ["درجة النشاط", `${rating.activity_score}/10`],
                      ["درجة السلوك", `${rating.behavior_score}/10`],
                      ["درجة التحفيز", `${rating.motivation_score}/10`],
                      [
                        "المهارات العلمية",
                        `${rating.scientific_skill_score}/10`,
                      ],
                      ["درجة العدالة", `${rating.fairness_score}/5`],
                      ["جودة الفريق", `${rating.team_quality_score}/5`],
                      [
                        "توزيع المهام",
                        `${rating.tasks_distribution_fairness}/5`,
                      ],
                      ["وقت المشرف", `${rating.general_supervisor_time}/5`],
                      ["سلوك الإدارة", rating.management_behavior],
                      ["الإيجابيات والسلبيات", rating.pros_cons],
                      ["المساحة الممنوحة", rating.space_given],
                      ["الاستماع والمقترحات", rating.listening_and_suggestions],
                    ].map(([label, value], idx) => (
                      <_motion.div
                        key={idx}
                        className={idx >= 8 ? "col-span-full" : ""}
                        variants={infoItemVariant}
                      >
                        <InfoItem label={label} value={value} />
                      </_motion.div>
                    ))}
                  </_motion.div>
                </VolunteerInfoCard>
              </_motion.div>
            ))}
          </_motion.div>
        ) : (
          <div
            className="
              text-center py-14 
              backdrop-blur-lg bg-white/20 
              rounded-3xl shadow-xl border border-white/30
            "
          >
            <p className="text-gray-700 text-lg">لا توجد تقييمات للمشرفين</p>
          </div>
        )}
      </div>

      {/* Add Rating Modal */}
      <Dialog
        open={isRatingModalOpen}
        onOpenChange={(open) => !isSubmitting && setIsRatingModalOpen(open)}
      >
        <DialogContent className="sm:max-w-[625px] bg-white  shadow-2xl rounded-2xl ">
          <DialogHeader>
            <DialogTitle className="text-center text-gray-900">
              إضافة تقييم جديد
            </DialogTitle>

            <Button
              variant="ghost"
              size="icon"
              className="
                absolute right-1 top-0 rounded-full 
                bg-white/40 backdrop-blur-md 
                hover:bg-white/60 shadow
              "
              onClick={() => !isSubmitting && setIsRatingModalOpen(false)}
              disabled={isSubmitting}
            ></Button>
          </DialogHeader>

          <div className="p-1 overflow-y-auto">
            <SupervisorRatingForm
              volunteerId={volunteerId}
              onSuccess={(newRating) => {
                handleRatingSubmitted(newRating);
                setIsRatingModalOpen(false);
              }}
              onClose={() => !isSubmitting && setIsRatingModalOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </_motion.div>
  );
};

export default RatingsTab;
