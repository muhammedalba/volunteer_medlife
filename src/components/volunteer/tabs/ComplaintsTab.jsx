import React, { useState } from "react";
import { toast } from "react-toastify";
import { submitComplaint } from "@/services/volunteerService";

const ComplaintsTab = ({ complaints = [], volunteerId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await submitComplaint({
        content: content.trim(),
        volunteer_id: volunteerId,
      });

      toast.success("تم إرسال الشكوى بنجاح");
      setContent("");
      setIsModalOpen(false);
      window.location.reload(); // Refresh to show the new complaint
    } catch (error) {
      toast.error("فشل في إرسال الشكوى");
      console.error("Error submitting complaint:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          إضافة شكوى جديدة
        </button>
      </div>

      {/* Complaint Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">إضافة شكوى جديدة</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="4"
                  placeholder="اكتب شكواك هنا..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  disabled={isSubmitting}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center"
                  disabled={isSubmitting || !content.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
          </div>
        </div>
      )}

      {/* Complaints List */}
      {complaints.length > 0 ? (
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      complaint.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {complaint.status === "pending"
                      ? "قيد الانتظار"
                      : "تمت المعالجة"}
                  </span>
                  <p className="mt-2 text-gray-700">{complaint.content}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {new Date(complaint.created_at).toLocaleDateString("ar-EG")}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <p className="text-gray-500">لا توجد شكاوى</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintsTab;
