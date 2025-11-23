import { motion as _motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Stepper({ currentStep, steps }) {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const Icon = step.icon;

        const stepColor = isCurrent
          ? "bg-blue-500 text-white"
          : isCompleted
          ? "bg-green-500 text-white"
          : "bg-gray-300 text-gray-600";

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* الخط الواصل بين الدوائر */}
            {index !== 0 && (
              <_motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6 }}
                className={`
                  absolute top-5 right-[-3rem] sm:right-[-4rem] h-1 rounded-full
                  ${isCurrent || isCompleted ? "bg-green-500" : "bg-gray-300"}
                `}
              ></_motion.span>
            )}

            {/* الدائرة */}
            <_motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: isCurrent ? 1.2 : 1,
                opacity: 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`
                w-10 h-10 md:w-12 md:h-12 flex justify-center items-center rounded-full shadow-md
                transition-all duration-300 z-10
                ${stepColor}
              `}
            >
              {isCompleted ? (
                <Check className="w-6 h-6" />
              ) : (
                <Icon className=" h-6 w-4 md:w-6" />
              )}
            </_motion.div>

            {/* اسم الخطوة */}
            <_motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={` hidden
                text-sm mt-3 md:block
                ${
                  isCurrent || isCompleted
                    ? "text-blue-600 font-semibold"
                    : "text-gray-400"
                }
              `}
            >
              {step.title}
            </_motion.p>
          </div>
        );
      })}
    </div>
  );
}
