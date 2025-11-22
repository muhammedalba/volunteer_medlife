import React, { useState, useEffect } from "react";
import { VolunteerInfoCard, InfoItem } from "..";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import SupervisorRatingForm from "../SupervisorRatingForm";

const RatingsTab = ({ ratings: initialRatings = [], volunteerId }) => {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratings, setRatings] = useState(initialRatings);

  // Update ratings when initialRatings prop changes
  useEffect(() => {
    setRatings(initialRatings);
  }, [initialRatings]);

  const handleRatingSubmitted = (newRating) => {
    // Add the new rating to the beginning of the list
    setRatings((prev) => [newRating, ...prev]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsRatingModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {/* <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> */}
          إضافة تقييم جديد
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <VolunteerInfoCard
              key={rating.id}
              title={`تقييم المشرف #${rating.supervisor_id}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoItem
                  label="درجة النشاط"
                  value={`${rating.activity_score}/10`}
                />
                <InfoItem
                  label="درجة السلوك"
                  value={`${rating.behavior_score}/10`}
                />
                <InfoItem
                  label="درجة التحفيز"
                  value={`${rating.motivation_score}/10`}
                />
                <InfoItem
                  label="المهارات العلمية"
                  value={`${rating.scientific_skill_score}/10`}
                />
                <InfoItem
                  label="درجة العدالة"
                  value={`${rating.fairness_score}/5`}
                />
                <InfoItem
                  label="جودة الفريق"
                  value={`${rating.team_quality_score}/5`}
                />
                <InfoItem
                  label="توزيع المهام"
                  value={`${rating.tasks_distribution_fairness}/5`}
                />
                <InfoItem
                  label="وقت المشرف"
                  value={`${rating.general_supervisor_time}/5`}
                />
                <InfoItem
                  label="سلوك الإدارة"
                  value={rating.management_behavior}
                />
                <div className="col-span-full">
                  <InfoItem
                    label="الإيجابيات والسلبيات"
                    value={rating.pros_cons}
                  />
                </div>
                <div className="col-span-full">
                  <InfoItem
                    label="المساحة الممنوحة"
                    value={rating.space_given}
                  />
                </div>
                <div className="col-span-full">
                  <InfoItem
                    label="الاستماع والمقترحات"
                    value={rating.listening_and_suggestions}
                  />
                </div>
              </div>
            </VolunteerInfoCard>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-500">لا توجد تقييمات للمشرفين</p>
          </div>
        )}
      </div>

      {/* Add Rating Modal */}
      <Dialog
        open={isRatingModalOpen}
        onOpenChange={(open) => !isSubmitting && setIsRatingModalOpen(open)}
      >
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة تقييم جديد</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              onClick={() => !isSubmitting && setIsRatingModalOpen(false)}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">إغلاق</span>
            </Button>
          </DialogHeader>
          <div className="p-1">
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
    </div>
  );
};

export default RatingsTab;
