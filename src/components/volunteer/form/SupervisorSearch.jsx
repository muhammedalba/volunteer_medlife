import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, User, Loader2, AlertCircle } from "lucide-react";
import { motion as Motion } from "framer-motion";

const SupervisorSearch = ({
  supervisors,
  onSelect,
  selectedId,
  isLoading,
  error,
  label = "المشرف",
  minSearchLength = 2,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);
  const listRef = useRef(null);

  // Filter supervisors based on search term - only show results when user types
  const filteredSupervisors = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < minSearchLength) {
      return [];
    }

    return supervisors.filter((supervisor) =>
      supervisor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [supervisors, searchTerm, minSearchLength]);

  // Get selected supervisor from the full supervisors list
  const selectedSupervisor = useMemo(() => {
    return supervisors.find((s) => s.id === selectedId);
  }, [supervisors, selectedId]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsOpen(true);
    setHighlightedIndex(0);
  };

  // Handle supervisor selection
  const handleSelect = (supervisor) => {
    onSelect(supervisor.id);
    setSearchTerm(supervisor.full_name);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || filteredSupervisors.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSupervisors.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSupervisors.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredSupervisors[highlightedIndex]) {
          handleSelect(filteredSupervisors[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Clear search and selection
  const handleClear = () => {
    setSearchTerm("");
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex];
      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  // Close dropdown when search is cleared
  useEffect(() => {
    if (!searchTerm.trim()) {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  }, [searchTerm]);

  return (
    <div className="relative" ref={searchRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => {
            if (searchTerm.length >= minSearchLength) {
              setIsOpen(true);
              setHighlightedIndex(0);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={`ابحث عن اسم المشرف (أدخل على الأقل ${minSearchLength} حروف)...`}
          className={`w-full pr-10 pl-10 py-2 focus:outline-none border border-gry-700 rounded-2xl focus:ring-1 focus:ring-bgColor focus:border-transparent transition-colors text-gray-700 focus:text-gray-700 ${
            error ? "border-red-500" : "border-gray-300"
          } ${
            selectedSupervisor ? "bg-green-50 border-green-300" : "bg-white"
          }`}
          disabled={isLoading}
        />

        {selectedSupervisor && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <AlertCircle className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center text-sm text-red-600"
        >
          <AlertCircle className="ml-1 h-4 w-4 text-red-500" />
          {error}
        </Motion.div>
      )}

      {/* Selected Supervisor Display */}
      {selectedSupervisor && (
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200"
        >
          <User className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-800">
            تم اختيار: {selectedSupervisor.full_name}
          </span>
        </Motion.div>
      )}

      {/* Dropdown Results */}
      {isOpen && searchTerm.length >= minSearchLength && (
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden"
        >
          {filteredSupervisors.length > 0 ? (
            <div ref={listRef} className="max-h-60 overflow-y-auto">
              {filteredSupervisors.map((supervisor, index) => (
                <div
                  key={supervisor.id}
                  onClick={() => handleSelect(supervisor)}
                  className={`px-3 py-2 cursor-pointer flex items-center gap-3 transition-colors ${
                    index === highlightedIndex
                      ? "bg-bgColor text-white"
                      : "hover:bg-gray-100"
                  } ${
                    selectedId === supervisor.id
                      ? "bg-green-50 text-green-800"
                      : ""
                  }`}
                >
                  <User className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {supervisor.full_name}
                    </div>
                    {supervisor.email && (
                      <div
                        className={`text-xs truncate ${
                          index === highlightedIndex
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {supervisor.email}
                      </div>
                    )}
                  </div>
                  {selectedId === supervisor.id && (
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-3 py-4 text-center text-gray-500">
              لا توجد نتائج مطابقة لـ "{searchTerm}"
            </div>
          )}
        </Motion.div>
      )}

      {/* Helper text */}
      {!searchTerm && (
        <div className="mt-1 text-xs text-gray-400">
          ابدأ بكتابة اسم المشرف للبحث
        </div>
      )}
    </div>
  );
};

export default SupervisorSearch;
