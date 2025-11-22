import * as yup from "yup";

const supervisorRatingSchema = yup.object({
  supervisor_id: yup
    .number()
    .typeError("الرجاء اختيار المشرف")
    .required("الرجاء اختيار المشرف"),
  activity_score: yup.number().min(1).max(10).required("هذا الحقل مطلوب"),
  behavior_score: yup.number().min(1).max(10).required("هذا الحقل مطلوب"),
  motivation_score: yup.number().min(1).max(10).required("هذا الحقل مطلوب"),
  scientific_skill_score: yup
    .number()
    .min(1)
    .max(10)
    .required("هذا الحقل مطلوب"),
  fairness_score: yup.number().min(1).max(5).required("هذا الحقل مطلوب"),
  team_quality_score: yup.number().min(1).max(5).required("هذا الحقل مطلوب"),
  tasks_distribution_fairness: yup
    .number()
    .min(1)
    .max(5)
    .required("هذا الحقل مطلوب"),
  general_supervisor_time: yup
    .number()
    .min(1)
    .max(5)
    .required("هذا الحقل مطلوب"),
  management_behavior: yup.string().required("هذا الحقل مطلوب"),
  pros_cons: yup.string().required("هذا الحقل مطلوب"),
  space_given: yup.string().required("هذا الحقل مطلوب"),
  volunteer_id: yup.number().required(),
});

export default supervisorRatingSchema;
