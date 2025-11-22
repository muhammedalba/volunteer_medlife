import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { submitSupervisorRating } from "@/services/volunteerService";

const SupervisorRatingForm = ({ volunteerId, onSuccess, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [formData, setFormData] = useState({
    supervisor_id: "",
    activity_score: 5,
    behavior_score: 5,
    motivation_score: 5,
    scientific_skill_score: 5,
    fairness_score: 3,
    team_quality_score: 3,
    tasks_distribution_fairness: 3,
    general_supervisor_time: 3,
    management_behavior: "",
    pros_cons: "",
    space_given: "",
    listening_and_suggestions: "",
    volunteer_id: volunteerId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.endsWith("_score") ||
        name.endsWith("_fairness") ||
        name.endsWith("_time")
          ? Number(value)
          : value,
    }));
  };

  // Fetch supervisors list - you'll need to implement this API endpoint
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        // Replace with your actual API call to fetch supervisors
        // const response = await api.get('/supervisors');
        // setSupervisors(response.data);

        // For now, using a placeholder
        setSupervisors([
          { id: 1, name: "المشرف 1" },
          { id: 2, name: "المشرف 2" },
        ]);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
        toast.error("فشل في تحميل قائمة المشرفين");
      }
    };

    fetchSupervisors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.supervisor_id) {
      toast.error("الرجاء اختيار المشرف");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitSupervisorRating(formData);
      toast.success(response.message || "تم إرسال التقييم بنجاح");
      onSuccess(response.rating);
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء إرسال التقييم"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">تقييم المشرف</h3>

      {/* Supervisor Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          اسم المشرف <span className="text-red-500">*</span>
        </label>
        <select
          name="supervisor_id"
          value={formData.supervisor_id}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="">اختر المشرف</option>
          {supervisors.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.id}>
              {supervisor.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Activity Score */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            درجة النشاط (1-10)
          </label>
          <input
            type="number"
            name="activity_score"
            min="1"
            max="10"
            value={formData.activity_score}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Behavior Score */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            درجة السلوك (1-10)
          </label>
          <input
            type="number"
            name="behavior_score"
            min="1"
            max="10"
            value={formData.behavior_score}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Motivation Score */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            درجة التحفيز (1-10)
          </label>
          <input
            type="number"
            name="motivation_score"
            min="1"
            max="10"
            value={formData.motivation_score}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Scientific Skill Score */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            المهارات العلمية (1-10)
          </label>
          <input
            type="number"
            name="scientific_skill_score"
            min="1"
            max="10"
            value={formData.scientific_skill_score}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Fairness Score */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            درجة العدالة (1-5)
          </label>
          <input
            type="number"
            name="fairness_score"
            min="1"
            max="5"
            value={formData.fairness_score}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Team Quality Score */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            جودة الفريق (1-5)
          </label>
          <input
            type="number"
            name="team_quality_score"
            min="1"
            max="5"
            value={formData.team_quality_score}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Tasks Distribution Fairness */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            توزيع المهام (1-5)
          </label>
          <input
            type="number"
            name="tasks_distribution_fairness"
            min="1"
            max="5"
            value={formData.tasks_distribution_fairness}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* General Supervisor Time */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            وقت المشرف (1-5)
          </label>
          <input
            type="number"
            name="general_supervisor_time"
            min="1"
            max="5"
            value={formData.general_supervisor_time}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      {/* Management Behavior */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          سلوك الإدارة
        </label>
        <textarea
          name="management_behavior"
          value={formData.management_behavior}
          onChange={handleChange}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Pros and Cons */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          الإيجابيات والسلبيات
        </label>
        <textarea
          name="pros_cons"
          value={formData.pros_cons}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Space Given */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          المساحة الممنوحة
        </label>
        <textarea
          name="space_given"
          value={formData.space_given}
          onChange={handleChange}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          إلغاء
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري الإرسال..." : "حفظ التقييم"}
        </button>
      </div>
    </form>
  );
};

export default SupervisorRatingForm;
