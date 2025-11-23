import React from "react";
import { LucideIcon } from "lucide-react";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  type?: "text" | "password" | "email" | "number" | "select" | "textarea";
  value?: string | number;
  onChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  options?: Array<{ value: string | number; label: string }>;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconColor?: string;
  rows?: number;
}

const FormInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormInputProps
>(
  (
    {
      label,
      name,
      type = "text",
      value,
      onChange,
      options,
      icon: Icon,
      iconPosition = "left",
      iconColor = "text-bgColor",
      className,
      rows,
      placeholder,
      ...props
    },
    ref
  ) => {
    const baseClassName =
      className ||
      "w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-300 focus:bg-white transition-all duration-200 placeholder-gray-400 text-gray-700 shadow-sm hover:shadow-md";

    // Filter props for each element type
    const commonProps = {
      name,
      value,
      onChange,
    };

    const inputProps = {
      ...commonProps,
      type: type as React.HTMLInputTypeAttribute,
      className: baseClassName,
      ref: ref as React.Ref<HTMLInputElement>,
      placeholder,
      ...Object.fromEntries(
        Object.entries(props).filter(
          ([key]) =>
            !["rows", "accept", "alt", "capture", "multiple"].includes(key)
        )
      ),
    };

    const textareaProps = {
      ...commonProps,
      className:
        "w-full px-4 py-3 border-0 bg-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-300 focus:bg-white transition-all duration-200 placeholder-gray-400 text-gray-700 shadow-sm hover:shadow-md resize-none",
      ref: ref as React.Ref<HTMLTextAreaElement>,
      rows: rows || 3,
      placeholder: placeholder || label || "اكتب ملاحظتك",
      ...Object.fromEntries(
        Object.entries(props).filter(
          ([key]) =>
            !["type", "accept", "alt", "capture", "multiple"].includes(key)
        )
      ),
    };

    const selectProps = {
      ...commonProps,
      className:
        "w-full px-4 py-3 border-0 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md cursor-pointer",
      ref: ref as React.Ref<HTMLSelectElement>,
      ...Object.fromEntries(
        Object.entries(props).filter(
          ([key]) =>
            !["type", "rows", "accept", "alt", "capture", "multiple"].includes(
              key
            )
        )
      ),
    };

    return (
      <div>
        {label && (
          <div className="flex items-center mb-2">
            {Icon && iconPosition === "left" && (
              <Icon className={`ml-2 h-4 w-4 ${iconColor} flex-shrink-0`} />
            )}
            <label className="block text-sm font-semibold text-gray-700">
              {label}
            </label>
            {Icon && iconPosition === "right" && (
              <Icon className={`mr-2 h-4 w-4 ${iconColor} flex-shrink-0`} />
            )}
          </div>
        )}
        {type === "select" ? (
          <select {...selectProps}>
            <option value="">{`اختر ${label}`}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea {...textareaProps} />
        ) : (
          <input {...inputProps} />
        )}
      </div>
    );
  }
);

export default FormInput;
