import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  submitSupervisorRating,
  getSupervisors,
} from "@/services/volunteerService";
import FormInput from "./form/FormInput";
import supervisorRatingSchema from "./validation/supervisorRatingSchema";

const steps = ["بيانات المشرف", "درجات التقييم", "ملاحظاتك التفصيلية"];
const stepFields = [
  ["supervisor_id"],
  [
    "activity_score",
    "behavior_score",
    "motivation_score",
    "scientific_skill_score",
    "fairness_score",
    "team_quality_score",
    "tasks_distribution_fairness",
    "general_supervisor_time",
  ],
  ["management_behavior", "pros_cons", "space_given"],
];

const SupervisorRatingForm = ({ volunteerId, onSuccess, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [isLoadingSupervisors, setIsLoadingSupervisors] = useState(false);
  const [supervisorsError, setSupervisorsError] = useState("");

  const defaultValues = useMemo(
    () => ({
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
    }),
    [volunteerId]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(supervisorRatingSchema),
    defaultValues,
    mode: "onTouched",
  });

  const scoreFields = useMemo(
    () => [
      { name: "activity_score", label: "درجة النشاط (1-10)", min: 1, max: 10 },
      { name: "behavior_score", label: "درجة السلوك (1-10)", min: 1, max: 10 },
      {
        name: "motivation_score",
        label: "درجة التحفيز (1-10)",
        min: 1,
        max: 10,
      },
      {
        name: "scientific_skill_score",
        label: "المهارات العلمية (1-10)",
        min: 1,
        max: 10,
      },
      { name: "fairness_score", label: "درجة العدالة (1-5)", min: 1, max: 5 },
      {
        name: "team_quality_score",
        label: "جودة الفريق (1-5)",
        min: 1,
        max: 5,
      },
      {
        name: "tasks_distribution_fairness",
        label: "توزيع المهام (1-5)",
        min: 1,
        max: 5,
      },
      {
        name: "general_supervisor_time",
        label: "وقت المشرف (1-5)",
        min: 1,
        max: 5,
      },
    ],
    []
  );

  const textFields = useMemo(
    () => [
      { name: "management_behavior", label: "سلوك الإدارة", rows: 2 },
      { name: "pros_cons", label: "الإيجابيات والسلبيات", rows: 3 },
      { name: "space_given", label: "المساحة الممنوحة", rows: 2 },
    ],
    []
  );

  const fetchSupervisors = useCallback(async () => {
    try {
      setIsLoadingSupervisors(true);
      setSupervisorsError("");
      const data = await getSupervisors();
      if (data?.status && Array.isArray(data.supervisors))
        setSupervisors(data.supervisors);
      else setSupervisors([]);
    } catch {
      toast.error("فشل في تحميل قائمة المشرفين");
      setSupervisorsError("فشل في تحميل قائمة المشرفين");
    } finally {
      setIsLoadingSupervisors(false);
    }
  }, []);

  useEffect(() => {
    fetchSupervisors();
  }, [fetchSupervisors]);

  const onSubmit = useCallback(
    async (data) => {
      setIsSubmitting(true);
      try {
        const response = await submitSupervisorRating(data);
        toast.success(response.message || "تم إرسال التقييم بنجاح");
        if (onSuccess) onSuccess(response.rating);
      } catch {
        toast.error("حدث خطأ أثناء إرسال التقييم");
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSuccess]
  );

  const nextStep = async () => {
    const fieldsToValidate = stepFields[currentStep] || [];
    const valid = await trigger(fieldsToValidate);
    if (valid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-5  bg-white rounded-2xl  relative transition-all duration-500 h-[450px] "
    >
      {/* Progress Bar */}
      <div className="flex items-center  gap-2 mb-5">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`h-2 w-full rounded-full transition-all duration-500 ${
                index <= currentStep
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gray-300"
              }`}
            ></div>
            <p
              className={`text-xs mt-1 transition-colors duration-500 ${
                index <= currentStep
                  ? "text-blue-600 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="space-y-4">
        {/* Step 1: Supervisors */}
        {currentStep === 0 && (
          <div className="space-y-2">
            <FormInput
              label="اختر المشرف"
              name="supervisor_id"
              type="select"
              {...register("supervisor_id")}
              disabled={isLoadingSupervisors || !!supervisorsError}
              options={supervisors.map((s) => ({
                value: s.id,
                label: s.full_name || s.username,
              }))}
            />
            {errors.supervisor_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.supervisor_id.message}
              </p>
            )}
          </div>
        )}

        {/* Step 2: Scores */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scoreFields.map((f) => (
              <FormInput
                key={f.name}
                label={f.label}
                name={f.name}
                type="number"
                min={f.min}
                max={f.max}
                {...register(f.name)}
              />
            ))}
          </div>
        )}

        {/* Step 3: Text Feedback */}
        {currentStep === 2 && (
          <div className="space-y-4">
            {textFields.map((f) => (
              <div key={f.name} className="space-y-1">
                <FormInput
                  label={f.label}
                  name={f.name}
                  type="textarea"
                  rows={f.rows}
                  {...register(f.name)}
                />
                {errors[f.name] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[f.name]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full mt-5">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 text-sm rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition"
        >
          السابق
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition"
          >
            التالي
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-500 transition"
          >
            {isSubmitting ? "جاري الإرسال..." : "حفظ التقييم"}
          </button>
        )}
      </div>
    </form>
  );
};

export default SupervisorRatingForm;
