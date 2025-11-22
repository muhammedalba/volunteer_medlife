import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { motion as _motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { loginVolunteer } from "../../services/volunteerService.js";
import { warnNotify, errorNotify, successNotify } from "../../utils/Toast";

// تعريف مخطط التحقق من صحة البيانات
const loginSchema = yup
  .object({
    username: yup.string().required("اسم المستخدم مطلوب"),
    password: yup
      .string()
      .required("حقل كلمة المرور مطلوب")
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  })
  .required();

type FormData = yup.InferType<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const alertVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0 },
  };

  const fieldsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.25, staggerChildren: 0.12 },
    },
  };

  const fieldItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const responseData = await loginVolunteer(data);
      //
      const loginSuccess = await login(responseData);

      if (loginSuccess) {
        setSuccess("تم تسجيل الدخول بنجاح!");
        successNotify("تم تسجيل الدخول بنجاح!");
        reset();
        navigate("/volunteer/info");
      } else {
        setError("حدث خطأ أثناء تسجيل الدخول");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || "اسم المستخدم أو كلمة المرور غير صحيحة"
        );
        errorNotify(err.response.data.message);
      } else {
        warnNotify("حدث خطأ في الاتصال بالخادم");
        setError("حدث خطأ في الاتصال بالخادم");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <_motion.div
      className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <_motion.div
        className="relative max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 -z-10" />
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تسجيل الدخول
          </h2>
        </div>

        {error && (
          <_motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="block sm:inline">{error}</span>
          </_motion.div>
        )}

        {success && (
          <_motion.div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="block sm:inline">{success}</span>
          </_motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <_motion.div
            className="rounded-md shadow-sm -space-y-px"
            variants={fieldsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <_motion.div variants={fieldItemVariants}>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                اسم المستخدم
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.username ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="اسم المستخدم"
                {...register("username")}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </_motion.div>
            <_motion.div className="mt-4 pt-5" variants={fieldItemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="كلمة المرور"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </_motion.div>
          </_motion.div>
          <div>
            <_motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.01, y: -1 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-bgColor hover:bg-red-400 focus:outline-none focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </_motion.button>
          </div>
        </form>
      </_motion.div>
    </_motion.div>
  );
}
