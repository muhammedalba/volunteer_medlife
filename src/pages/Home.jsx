import { Link } from "react-router-dom";
import { motion as _motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Home() {
  const container = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--secondary-color)]">
      <_motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full bg-[var(--min-color)]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 px-6 py-10 sm:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero text */}
          <div className="space-y-5 text-center md:text-right">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[color:var(--bg-Color)]/10 text-[color:var(--bg-Color)] text-xs font-medium">
              <Icon icon="solar:heart-pulse-broken" className="w-4 h-4" />
              منصة متطوعيmedlide
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[color:var(--text-color)] leading-snug">
              مساحة واحدة لمتابعة
              <span className="text-[color:var(--bg-Color)]"> رحلة تطوعك</span>
            </h1>
            <p className="text-sm sm:text-base max-w-md md:ml-auto md:mr-0 mx-auto text-[color:var(--text-color)]/70">
              تابع تقييماتك وملاحظات المشرفين، وقدّم شكاواك ومقترحاتك بسهولة ضمن
              واجهة عربية بسيطة وعصرية.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center md:justify-end pt-2">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[color:var(--bg-Color)] text-white text-sm font-medium shadow-sm hover:bg-[color:var(--bg-Color)]/90 transition-colors"
              >
                <Icon icon="solar:login-2-broken" className="w-5 h-5 ml-2" />
                دخول المتطوعين
              </Link>
            </div>
          </div>

          {/* Feature icons */}
          <div className="mt-6 md:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[color:var(--text-color)]/80">
            <div className="bg-[var(--secondary-color)] rounded-2xl p-4 border border-gray-100 flex flex-col gap-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[color:var(--bg-Color)]/10 text-[color:var(--bg-Color)] mb-1">
                <Icon icon="solar:chart-square-broken" className="w-5 h-5" />
              </div>
              <p className="font-semibold text-[color:var(--text-color)]">
                متابعة التقييمات
              </p>
              <p className="text-xs text-[color:var(--text-color)]/70">
                اطّلع على تقييماتك الشهرية وتطور نشاطك داخل الفريق بسهولة.
              </p>
            </div>
            <div className="bg-[var(--secondary-color)] rounded-2xl p-4 border border-gray-100 flex flex-col gap-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-500 mb-1">
                <Icon icon="solar:chat-round-dots-broken" className="w-5 h-5" />
              </div>
              <p className="font-semibold text-[color:var(--text-color)]">
                الشكاوى والمقترحات
              </p>
              <p className="text-xs text-[color:var(--text-color)]/70">
                أرسل ملاحظاتك للإدارة بشكل منظّم، وتابع ردود المشرفين عليها.
              </p>
            </div>
            <div className="bg-[var(--secondary-color)] rounded-2xl p-4 border border-gray-100 flex flex-col gap-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 mb-1">
                <Icon icon="solar:smile-circle-broken" className="w-5 h-5" />
              </div>
              <p className="font-semibold text-[color:var(--text-color)]">
                تجربة استخدام مريحة
              </p>
              <p className="text-xs text-[color:var(--text-color)]/70">
                واجهة عربية بسيطة، متجاوبة مع الجوال، ومناسبة لاستخدامك اليومي.
              </p>
            </div>
            <div className="bg-[var(--secondary-color)] rounded-2xl p-4 border border-gray-100 flex flex-col gap-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 mb-1">
                <Icon
                  icon="solar:users-group-two-rounded-broken"
                  className="w-5 h-5"
                />
              </div>
              <p className="font-semibold text-[color:var(--text-color)]">
                جزء من فريقmedlide
              </p>
              <p className="text-xs text-[color:var(--text-color)]/70">
                كن دائمًا على اطلاع بما يهمك داخل فريق متطوعيmedlide.
              </p>
            </div>
          </div>
        </div>
      </_motion.div>
    </div>
  );
}
