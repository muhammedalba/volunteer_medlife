import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import logo from "../../assets/AfiaLogo.png";
import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { loginVolunteer } from "../../services/volunteerService.js";
import { warnNotify, errorNotify, successNotify } from "../../utils/Toast";
import FormInput from "../../components/volunteer/form/FormInput.tsx";

// تعريف مخطط التحقق من صحة البيانات
const loginSchema = yup
  .object({
    full_name: yup.string().required("اسم المستخدم مطلوب"),
    password: yup
      .string()
      .required("حقل كلمة المرور مطلوب")
      .min(2, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  })
  .required();

type FormData = yup.InferType<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDemoMode, setIsDemoMode] = useState(false);

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
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      full_name: isDemoMode ? "alaa ghfary" : "",
      password: isDemoMode ? "11" : "",
    },
  });

  // Update form values when demo mode changes
  const toggleDemoMode = () => {
    const newDemoMode = !isDemoMode;
    setIsDemoMode(newDemoMode);
    if (newDemoMode) {
      setValue("full_name", "alaa ghfary");
      setValue("password", "11");
    } else {
      setValue("full_name", "");
      setValue("password", "");
    }
  };

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
        console.log(err.response.data);
      } else {
        warnNotify("حدث خطأ في الاتصال بالخادم");
        setError("حدث خطأ في الاتصال بالخادم");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Motion.div
      className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Motion.div
        className="relative max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg "
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="pointer-events-none  inset-0 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 -z-10 relative" />
        <img
          className=" rounded-full m-auto z-10 absolute top-[-25%] left-1/2 transform -translate-x-1/2"
          src={logo}
          alt="logo"
          width={150}
        />
        <div>
          <div className="flex justify-center items-center gap-2">
            <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
              اهلا بعودتك 
            </h2>
          </div>
        </div>

        {error && (
          <Motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center"
            role="alert"
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <AlertCircle className="ml-2 h-5 w-5 text-red-500" />
            <span className="block sm:inline">{error}</span>
          </Motion.div>
        )}

        {success && (
          <Motion.div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center"
            role="alert"
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
            <span className="block sm:inline">{success}</span>
          </Motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Demo Mode Toggle */}
          <Motion.div
            className="flex items-center justify-center"
            variants={fieldItemVariants}
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDemoMode}
                onChange={toggleDemoMode}
                className="ml-2 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-600">
                وضع التجريب (تعبئة تلقائية)
              </span>
            </label>
          </Motion.div>

          <Motion.div
            className="space-y-4"
            variants={fieldsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <Motion.div variants={fieldItemVariants}>
              <FormInput
                label="اسم المستخدم"
                type="text"
                icon={User}
                iconColor="text-blue-500"
                placeholder="اسم المستخدم"
                {...register("full_name")}
              />
            </Motion.div>

            <Motion.div variants={fieldItemVariants}>
              <FormInput
                label="كلمة المرور"
                type="password"
                icon={Lock}
                iconColor="text-red-500"
                placeholder="كلمة المرور"
                {...register("password")}
              />
            </Motion.div>
          </Motion.div>

          <div>
            <Motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.01, y: -1 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-bgColor hover:bg-red-400 focus:outline-none focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Motion.button>
          </div>
        </form>
      </Motion.div>
    </Motion.div>
  );
}
