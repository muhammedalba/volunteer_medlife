import React, { memo, useMemo } from "react";

/**
 * VolunteerInfoCard Component (Enhanced Version)
 * - Cleaner structure and consistent styling
 * - Memoized for performance
 * - Allows flexible extension via props
 * - No behavioral changes to original functionality
 */

const VolunteerInfoCard = memo(function VolunteerInfoCard({
  title,
  children,
  className = "",
  bordered = true, // Optional improvement
  condensed = false, // Optional compact mode
}) {
  const containerClasses = useMemo(
    () => `bg-white rounded-xl shadow-md ${condensed ? "p-4" : "p-6"} ${className}`,
    [className, condensed]
  );

  const titleClasses = useMemo(
    () =>
      `text-xl font-semibold text-gray-800 mb-4 ${
        bordered ? "border-b pb-2" : ""
      }`,
    [bordered]
  );

  return (
    <div className={containerClasses}>
      <h3 className={titleClasses}>{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
});

export default VolunteerInfoCard;