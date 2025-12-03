import React, { useState, useCallback, useMemo, memo } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { successNotify, errorNotify } from "../../../utils/Toast";
import { submitComplaint } from "@/services/volunteerService";
import { X, MessageSquare, Clock, CheckCircle } from "lucide-react";

const ComplaintsTab = memo(({ complaints = [], volunteerId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const animationVariants = useMemo(
    () => ({
      listContainer: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
          },
        },
      },
      listItem: {
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
        },
      },
      modal: {
        hidden: { opacity: 0, scale: 0.9, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 10 },
      },
      overlay: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      },
    }),
    []
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!content.trim()) return;

      setIsSubmitting(true);
      try {
        await submitComplaint({
          content: content.trim(),
          volunteer_id: volunteerId,
        });

        successNotify("تم إرسال الشكوى بنجاح");
        setContent("");
        setIsModalOpen(false);

        // Reload page after successful submission
        window.location.reload();
      } catch (error) {
        errorNotify("فشل في إرسال الشكوى");
        console.error("Error submitting complaint:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [content, volunteerId]
  );

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleContentChange = useCallback(
    (e) => setContent(e.target.value),
    []
  );

  const isSubmitDisabled = !content.trim() || isSubmitting;

  return (
    <Motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <MessageSquare className="ml-2 h-5 w-5 text-bgColor" />
          الشكاوى ({complaints.length})
        </h2>
        <Motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={openModal}
          className="px-4 py-2 bg-bgColor text-white rounded-xl hover:bg-red-400 transition-colors flex items-center shadow-sm hover:shadow-md"
        >
          <MessageSquare className="ml-2 h-4 w-4" />
          إضافة شكوى جديدة
        </Motion.button>
      </div>

      {/* Complaint Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            variants={animationVariants.overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
          >
            <Motion.div
              variants={animationVariants.modal}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  إضافة شكوى جديدة
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    محتوى الشكوى
                  </label>
                  <textarea
                    value={content}
                    onChange={handleContentChange}
                    className="w-full p-3 rounded-lg focus:ring-1 focus:ring-red-500 resize-none transition-all outline-none border-1 border-red-300 "
                    rows="4"
                    placeholder="اكتب شكواك هنا..."
                    required
                    disabled={isSubmitting}
                  />
                  <div className="mt-1 text-xs text-gray-500 text-left">
                    {content.length}/500 حرف
                  </div>
                </div>
                <div className="flex justify-end space-x-3 space-x-reverse">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-bgColor text-white rounded-lg hover:bg-red-500 disabled:opacity-50 flex items-center transition-colors disabled:cursor-not-allowed"
                    disabled={isSubmitDisabled}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 ml-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        جاري الإرسال...
                      </>
                    ) : (
                      "إرسال الشكوى"
                    )}
                  </button>
                </div>
              </form>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Complaints List */}
      {complaints.length > 0 ? (
        <Motion.div
          className="space-y-4"
          variants={animationVariants.listContainer}
          initial="hidden"
          animate="visible"
        >
          {complaints.map((complaint) => (
            <Motion.div
              key={complaint.id}
              variants={animationVariants.listItem}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {complaint.status === "pending" ? (
                      <div className="flex items-center px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                        <Clock className="ml-1 h-3 w-3" />
                        قيد الانتظار
                      </div>
                    ) : (
                      <div className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                        <CheckCircle className="ml-1 h-3 w-3" />
                        تمت المعالجة
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {complaint.content}
                  </p>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap mr-4">
                  {new Date(complaint.created_at).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      ) : (
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">لا توجد شكاوى</p>
          <p className="text-gray-400 text-sm mt-1">كن أول من يضيف شكوى</p>
        </Motion.div>
      )}
    </Motion.div>
  );
});

ComplaintsTab.displayName = "ComplaintsTab";

export default ComplaintsTab;
