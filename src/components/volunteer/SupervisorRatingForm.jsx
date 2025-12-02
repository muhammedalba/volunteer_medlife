import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion as Motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  User,
  Star,
  Stars,
  CheckCircle,
  AlertCircle,
  BadgeCheck,
  Zap,
  Target,
  Heart,
  Brain,
  Award,
  Users,
  Scale,
  Clock,
} from "lucide-react";
import {
  submitSupervisorRating,
  getSupervisors,
} from "@/services/volunteerService";
import { successNotify, errorNotify } from "../../utils/Toast";
import FormInput from "./form/FormInput";
import supervisorRatingSchema from "./validation/supervisorRatingSchema";
import Stepper from "./Stepper";
const steps = [
  {
    title: "بيانات المشرف",
    icon: User,
    color: "text-blue-500",
  },
  {
    title: "درجات التقييم",
    icon: Stars,
    color: "text-yellow-500",
  },
  {
    title: "ملاحظاتك التفصيلية",
    icon: BadgeCheck,
    color: "text-green-500",
  },
];
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

const SupervisorRatingForm = memo(({ volunteerId, onSuccess }) => {
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
      {
        name: "activity_score",
        label: "درجة النشاط (1-5)",
        min: 1,
        max: 5,
        icon: Zap,
        iconColor: "text-yellow-500",
      },
      {
        name: "behavior_score",
        label: "درجة السلوك (1-5)",
        min: 1,
        max: 5,
        icon: Heart,
        iconColor: "text-red-500",
      },
      {
        name: "motivation_score",
        label: "درجة التحفيز (1-5)",
        min: 1,
        max: 5,
        icon: Target,
        iconColor: "text-blue-500",
      },
      {
        name: "scientific_skill_score",
        label: "المهارات العلمية (1-5)",
        min: 1,
        max: 5,
        icon: Brain,
        iconColor: "text-purple-500",
      },
      {
        name: "fairness_score",
        label: "درجة العدالة (1-5)",
        min: 1,
        max: 5,
        icon: Award,
        iconColor: "text-green-500",
      },
      {
        name: "team_quality_score",
        label: "جودة الفريق (1-5)",
        min: 1,
        max: 5,
        icon: Users,
        iconColor: "text-indigo-500",
      },
      {
        name: "tasks_distribution_fairness",
        label: "توزيع المهام (1-5)",
        min: 1,
        max: 5,
        icon: Scale,
        iconColor: "text-orange-500",
      },
      {
        name: "general_supervisor_time",
        label: "وقت المشرف (1-5)",
        min: 1,
        max: 5,
        icon: Clock,
        iconColor: "text-cyan-500",
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
    } catch (error) {
      console.error("Error fetching supervisors:", error);
      errorNotify("فشل في تحميل قائمة المشرفين");
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
        successNotify(response.message || "تم إرسال التقييم بنجاح");
        if (onSuccess) onSuccess(response.rating);
      } catch (error) {
        console.error("Error submitting rating:", error);
        errorNotify("حدث خطأ أثناء إرسال التقييم");
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSuccess]
  );

  const nextStep = useCallback(async () => {
    const fieldsToValidate = stepFields[currentStep] || [];
    const valid = await trigger(fieldsToValidate);
    if (valid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [currentStep, trigger]);

  const prevStep = useCallback(
    () => setCurrentStep((prev) => Math.max(prev - 1, 0)),
    []
  );

  const formVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
      },
      stepTransition: {
        hidden: { opacity: 0, x: 50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.4, ease: "easeInOut" },
        },
      },
    }),
    []
  );

  return (
    <Motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-500 "
      >
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-8">
          <Stepper currentStep={currentStep} steps={steps} />
        </div>

        {/* Step Content */}
        <Motion.div
          key={currentStep}
          variants={formVariants.stepTransition}
          initial="hidden"
          animate="visible"
          className="min-h-[300px]"
        >
          {/* Step 1: Supervisors */}
          {currentStep === 0 && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <User className="mx-auto h-12 w-12 text-blue-500 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800">
                  اختر المشرف
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  الرجاء اختيار المشرف الذي تريد تقييمه
                </p>
              </div>
              <div className="max-w-sm mx-auto">
                <FormInput
                  label="المشرف"
                  name="supervisor_id"
                  type="select"
                  {...register("supervisor_id")}
                  disabled={isLoadingSupervisors || !!supervisorsError}
                  options={supervisors.map((s) => ({
                    value: s.id,
                    label: s.full_name ,
                  }))}
                  className="w-full"
                />
                {errors.supervisor_id && (
                  <Motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center text-sm text-red-600"
                  >
                    <AlertCircle className="ml-1 h-4 w-4 text-red-500" />
                    {errors.supervisor_id.message}
                  </Motion.div>
                )}
                {supervisorsError && (
                  <Motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
                  >
                    {supervisorsError}
                  </Motion.div>
                )}
              </div>
            </Motion.div>
          )}

          {/* Step 2: Scores */}
          {currentStep === 1 && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Stars className="mx-auto h-12 w-12 text-yellow-500 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800">
                  درجات التقييم
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  قيم المشرف في مختلف الجوانب (من 1 إلى 5)
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scoreFields.map((f) => (
                  <Motion.div
                    key={f.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * scoreFields.indexOf(f) }}
                    className="space-y-2"
                  >
                    <FormInput
                      label={f.label}
                      name={f.name}
                      type="number"
                      min={f.min}
                      max={f.max}
                      icon={f.icon}
                      iconColor={f.iconColor}
                      {...register(f.name)}
                      className="w-full rounded-xl border p-2 focus:outline-none focus:ring-1 focus:ring-red-400 border-gray-200"
                    />
                    {errors[f.name] && (
                      <Motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center text-sm text-red-600"
                      >
                        <AlertCircle className="ml-1 h-4 w-4 text-red-500" />
                        {errors[f.name]?.message}
                      </Motion.div>
                    )}
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          )}

          {/* Step 3: Text Feedback */}
          {currentStep === 2 && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800">
                  ملاحظاتك التفصيلية
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  شاركنا رأيك وتفاصيل تجربتك
                </p>
              </div>
              <div className="space-y-6">
                {textFields.map((f) => (
                  <Motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * textFields.indexOf(f) }}
                    className="space-y-2"
                  >
                    <FormInput
                      label={f.label}
                      name={f.name}
                      type="textarea"
                      rows={f.rows}
                      {...register(f.name)}
                      className="w-full"
                    />
                    {errors[f.name] && (
                      <Motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center text-sm text-red-600"
                      >
                        <AlertCircle className="ml-1 h-4 w-4 text-red-500" />
                        {errors[f.name]?.message}
                      </Motion.div>
                    )}
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          )}
        </Motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center w-full mt-8 pt-6 border-t border-gray-100">
          <Motion.button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 text-sm font-medium rounded-xl transition-all flex items-center ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm"
            }`}
          >
            <ChevronRight className="ml-2 h-4 w-4 text-gray-600" />
            السابق
          </Motion.button>

          {currentStep < steps.length - 1 ? (
            <Motion.button
              type="button"
              onClick={nextStep}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-sm font-semibold text-white bg-bgColor rounded-xl hover:bg-red-500 transition-all flex items-center shadow-sm hover:shadow-md"
            >
              التالي
              <ChevronLeft className="mr-2 h-4 w-4 text-white" />
            </Motion.button>
          ) : (
            <Motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              className="px-6 py-3 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-500 transition-all flex items-center shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
                <>
                  حفظ التقييم
                  <CheckCircle className="mr-2 h-4 w-4 text-white" />
                </>
              )}
            </Motion.button>
          )}
        </div>
      </form>
    </Motion.div>
  );
});

SupervisorRatingForm.displayName = "SupervisorRatingForm";

export default SupervisorRatingForm;
