import React, { memo, useMemo } from "react";

/**
 * InfoItem Component (Enhanced Version)
 * - Cleaner layout and more consistent spacing
 * - Memoized for performance
 * - Smarter fallbacks for empty values
 * - No behavioral changes to original logic
 */

const InfoItem = memo(function InfoItem({ label, value, className = "" }) {
  const displayValue =
    value !== undefined && value !== null && value !== "" ? value : "N/A";

  const containerClasses = useMemo(
    () =>
      `flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 last:border-0 ${className}`,
    [className]
  );

  return (
    <div className={containerClasses}>
      <span className="text-gray-600 font-medium w-40 flex-shrink-0">
        {label}
      </span>
      <span className="text-gray-800 break-words">{displayValue}</span>
    </div>
  );
});

export default InfoItem;
