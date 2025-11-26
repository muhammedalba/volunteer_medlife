import { Link } from "react-router-dom";
import { motion as _motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const featureCard = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingAnimation = {
    hidden: { y: 0 },
    visible: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[var(--secondary-color)] via-[var(--secondary-color)] to-[color:var(--bg-Color)]/10">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <_motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-[color:var(--bg-Color)]/5 rounded-full blur-3xl"
        />
        <_motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-[color:var(--bg-Color)]/3 rounded-full blur-3xl"
        />
        <_motion.div
          variants={floatingAnimation}
          initial="hidden"
          animate="visible"
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-[color:var(--bg-Color)]/20 rounded-full"
        />
        <_motion.div
          variants={floatingAnimation}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="absolute top-3/4 right-1/3 w-3 h-3 bg-[color:var(--bg-Color)]/30 rounded-full"
        />
        <_motion.div
          variants={floatingAnimation}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="absolute top-1/2 left-2/3 w-2 h-2 bg-[color:var(--bg-Color)]/25 rounded-full"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <_motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-6xl w-full"
        >
          {/* Hero section */}
          <_motion.div variants={item} className="text-center mb-16">
            <_motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--bg-Color)]/10 backdrop-blur-sm border border-[color:var(--bg-Color)]/20 text-[color:var(--bg-Color)] text-sm font-medium mb-8"
            >
              <Icon icon="solar:heart-pulse-bold" className="w-5 h-5" />
              منصة متطوعي Medlife
            </_motion.div>

            <_motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[color:var(--text-color)] leading-tight mb-6"
            >
              مساحة واحدة لمتابعة
              <_motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bg-Color)] to-[color:var(--bg-Color)]/80"
              >
                رحلة تطوعك
              </_motion.span>
            </_motion.h1>

            <_motion.p
              variants={item}
              className="text-lg sm:text-xl max-w-3xl mx-auto text-[color:var(--text-color)]/70 mb-10 leading-relaxed"
            >
              تابع تقييماتك وملاحظات المشرفين، وقدّم شكاواك ومقترحاتك بسهولة ضمن
              واجهة عربية بسيطة وعصرية مصممة خصيصاً لك.
            </_motion.p>

            <_motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[color:var(--bg-Color)] to-[color:var(--bg-Color)]/90 text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Icon
                  icon="solar:login-3-bold"
                  className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300"
                />
                دخول المتطوعين
                <Icon
                  icon="solar:arrow-left-bold"
                  className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </_motion.div>
          </_motion.div>

          {/* Features grid */}
          <_motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            <_motion.div
              variants={featureCard}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[color:var(--bg-Color)]/20 to-[color:var(--bg-Color)]/10 text-[color:var(--bg-Color)] mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon icon="solar:chart-square-bold" className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-[color:var(--text-color)] text-lg mb-2">
                متابعة التقييمات
              </h3>
              <p className="text-sm text-[color:var(--text-color)]/70 leading-relaxed">
                اطّلع على تقييماتك الشهرية وتطور نشاطك داخل الفريق بسهولة.
              </p>
            </_motion.div>

            <_motion.div
              variants={featureCard}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-400/10 text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon icon="solar:chat-round-dots-bold" className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-[color:var(--text-color)] text-lg mb-2">
                الشكاوى والمقترحات
              </h3>
              <p className="text-sm text-[color:var(--text-color)]/70 leading-relaxed">
                أرسل ملاحظاتك للإدارة بشكل منظّم، وتابع ردود المشرفين عليها.
              </p>
            </_motion.div>

            <_motion.div
              variants={featureCard}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon icon="solar:smile-circle-bold" className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-[color:var(--text-color)] text-lg mb-2">
                تجربة استخدام مريحة
              </h3>
              <p className="text-sm text-[color:var(--text-color)]/70 leading-relaxed">
                واجهة عربية بسيطة، متجاوبة مع الجوال، ومناسبة لاستخدامك اليومي.
              </p>
            </_motion.div>

            <_motion.div
              variants={featureCard}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400/20 to-indigo-400/10 text-indigo-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon
                  icon="solar:users-group-two-rounded-bold"
                  className="w-7 h-7"
                />
              </div>
              <h3 className="font-bold text-[color:var(--text-color)] text-lg mb-2">
                جزء من فريق Medlife
              </h3>
              <p className="text-sm text-[color:var(--text-color)]/70 leading-relaxed">
                كن دائمًا على اطلاع بما يهمك داخل فريق متطوعي Medlife.
              </p>
            </_motion.div>
          </_motion.div>

          {/* Stats Section */}
          <_motion.div variants={item} className="mb-16">
            <_motion.div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
              <_motion.h2
                variants={item}
                className="text-2xl sm:text-3xl font-bold text-center text-[color:var(--text-color)] mb-8"
              >
                أرقامنا تتحدث عنا
              </_motion.h2>
              <_motion.div
                variants={container}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                <_motion.div variants={item} className="text-center">
                  <_motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-black text-[color:var(--bg-Color)] mb-2"
                  >
                    500+
                  </_motion.div>
                  <p className="text-sm text-[color:var(--text-color)]/70">
                    متطوع نشط
                  </p>
                </_motion.div>

                <_motion.div variants={item} className="text-center">
                  <_motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-black text-amber-500 mb-2"
                  >
                    50+
                  </_motion.div>
                  <p className="text-sm text-[color:var(--text-color)]/70">
                    نشاط شهري
                  </p>
                </_motion.div>

                <_motion.div variants={item} className="text-center">
                  <_motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-black text-emerald-500 mb-2"
                  >
                    1000+
                  </_motion.div>
                  <p className="text-sm text-[color:var(--text-color)]/70">
                    ساعة تطوع
                  </p>
                </_motion.div>

                <_motion.div variants={item} className="text-center">
                  <_motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-black text-indigo-500 mb-2"
                  >
                    95%
                  </_motion.div>
                  <p className="text-sm text-[color:var(--text-color)]/70">
                    رضا المتطوعين
                  </p>
                </_motion.div>
              </_motion.div>
            </_motion.div>
          </_motion.div>

          {/* Activities Section */}
          <_motion.div variants={item} className="mb-16">
            <_motion.h2
              variants={item}
              className="text-2xl sm:text-3xl font-bold text-center text-[color:var(--text-color)] mb-8"
            >
              أنشطة التطوع
            </_motion.h2>
            <_motion.div
              variants={container}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <_motion.div
                variants={featureCard}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-red-50 to-red-100/50 backdrop-blur-sm rounded-3xl p-6 border border-red-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-400/20 to-red-400/10 text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon icon="solar:heart-bold" className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-red-700 text-lg mb-2">
                  الدعم الطبي
                </h3>
                <p className="text-sm text-red-600/80 leading-relaxed">
                  المساعدة في الفعاليات الطبية وتقديم الدعم للمرضى والمحتاجين.
                </p>
              </_motion.div>

              <_motion.div
                variants={featureCard}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm rounded-3xl p-6 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-400/10 text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon icon="solar:graduation-cap-bold" className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-blue-700 text-lg mb-2">
                  التوعية الصحية
                </h3>
                <p className="text-sm text-blue-600/80 leading-relaxed">
                  نشر الوعي الصحي في المجتمع وتنظيم حملات توعوية.
                </p>
              </_motion.div>

              <_motion.div
                variants={featureCard}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm rounded-3xl p-6 border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-400/20 to-green-400/10 text-green-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon icon="solar:hand-shake-bold" className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-green-700 text-lg mb-2">
                  الإغاثة الإنسانية
                </h3>
                <p className="text-sm text-green-600/80 leading-relaxed">
                  المشاركة في عمليات الإغاثة وتقديم المساعدة في الأزمات.
                </p>
              </_motion.div>
            </_motion.div>
          </_motion.div>

          {/* Testimonials Section */}
          <_motion.div variants={item} className="mb-16">
            <_motion.h2
              variants={item}
              className="text-2xl sm:text-3xl font-bold text-center text-[color:var(--text-color)] mb-8"
            >
              شهادات متطوعينا
            </_motion.h2>
            <_motion.div
              variants={container}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <_motion.div
                variants={featureCard}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[color:var(--bg-Color)]/20 to-[color:var(--bg-Color)]/10 flex items-center justify-center">
                    <Icon
                      icon="solar:user-bold"
                      className="w-6 h-6 text-[color:var(--bg-Color)]"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[color:var(--text-color)]">
                      أحمد محمد
                    </h4>
                    <p className="text-sm text-[color:var(--text-color)]/60">
                      متطوع منذ 2022
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[color:var(--text-color)]/80 leading-relaxed">
                  "منصة رائعة سهّلت علينا متابعة أنشطتنا وتقييماتنا. الواجهة
                  بسيطة وفعالة!"
                </p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon="solar:star-bold"
                      className="w-4 h-4 text-yellow-400"
                    />
                  ))}
                </div>
              </_motion.div>

              <_motion.div
                variants={featureCard}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-400/10 flex items-center justify-center">
                    <Icon
                      icon="solar:user-bold"
                      className="w-6 h-6 text-amber-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[color:var(--text-color)]">
                      فاطمة علي
                    </h4>
                    <p className="text-sm text-[color:var(--text-color)]/60">
                      متطوعة منذ 2021
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[color:var(--text-color)]/80 leading-relaxed">
                  "أحب كيف يمكنني تتبع تقييماتي الشهرية وإرسال ملاحظاتي بسهولة
                  للإدارة."
                </p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon="solar:star-bold"
                      className="w-4 h-4 text-yellow-400"
                    />
                  ))}
                </div>
              </_motion.div>

              <_motion.div
                variants={featureCard}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 flex items-center justify-center">
                    <Icon
                      icon="solar:user-bold"
                      className="w-6 h-6 text-emerald-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[color:var(--text-color)]">
                      محمد خالد
                    </h4>
                    <p className="text-sm text-[color:var(--text-color)]/60">
                      متطوع منذ 2023
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[color:var(--text-color)]/80 leading-relaxed">
                  "تجربة استخدام ممتازة والمنصة تساعدنا على التنظيم بشكل أفضل."
                </p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon="solar:star-bold"
                      className="w-4 h-4 text-yellow-400"
                    />
                  ))}
                </div>
              </_motion.div>
            </_motion.div>
          </_motion.div>

          {/* Call to Action */}
          <_motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-[color:var(--bg-Color)] to-[color:var(--bg-Color)]/90 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
          >
            <_motion.h2
              variants={item}
              className="text-2xl sm:text-3xl md:text-4xl font-black mb-4"
            >
              انضم إلى فريق Medlife اليوم!
            </_motion.h2>
            <_motion.p
              variants={item}
              className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
            >
              كن جزءاً من فريق يعمل على تحسين حياة الآخرين وتقديم العون
              للمحتاجين
            </_motion.p>
            <_motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[color:var(--bg-Color)] text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Icon
                  icon="solar:user-plus-bold"
                  className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform duration-300"
                />
                ابدأ رحلتك التطوعية
                <Icon
                  icon="solar:arrow-left-bold"
                  className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </_motion.div>
          </_motion.div>
        </_motion.div>
      </div>
    </div>
  );
}
