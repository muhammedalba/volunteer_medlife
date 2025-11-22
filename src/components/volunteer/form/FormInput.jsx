import React from "react";

const FormInput = React.forwardRef(
  ({ label, name, type = "text", value, onChange, options, ...props }, ref) => {
    const inputProps = {
      name,
      type,
      value,
      onChange,
      className:
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
      ref,
      ...props,
    };

    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        {type === "select" ? (
          <select {...inputProps}>
            <option value="">{` ${label}`}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea {...inputProps} />
        ) : (
          <input {...inputProps} />
        )}
      </div>
    );
  }
);

export default FormInput;
