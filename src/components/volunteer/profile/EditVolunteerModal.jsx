import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion as Motion } from "framer-motion";
import { User, Edit3, Save, X } from "lucide-react";
import { successNotify, errorNotify } from "../../../utils/Toast";
import EditVolunteerForm from "./EditVolunteerForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const EditVolunteerModal = memo(({ isOpen, onClose, volunteer, onSave }) => {
  const initialFormData = useMemo(
    () => ({
      full_name: "",
      birth_date: "",
      university: "",
      academic_degree: "",
      study_status: "",
      study_year: "",
      specialization: "",
      phone: "",
      address_general: "",
      address_details: "",
      volunteer_place: "",
      general_notes: "",
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (volunteer) {
      setFormData({
        full_name: volunteer.full_name || "",
        birth_date: volunteer.birth_date
          ? volunteer.birth_date.split("T")[0]
          : "",
        university: volunteer.university || "",
        academic_degree: volunteer.academic_degree || "",
        study_status: volunteer.study_status || "",
        study_year: volunteer.study_year || "",
        specialization: volunteer.specialization || "",
        phone: volunteer.phone || "",
        address_general: volunteer.address_general || "",
        address_details: volunteer.address_details || "",
        volunteer_place: volunteer.volunteer_place || "",
        general_notes: volunteer.general_notes || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [volunteer, initialFormData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Filter out empty values
        const payload = Object.entries(formData).reduce((acc, [key, value]) => {
          if (value && value.trim()) acc[key] = value;
          return acc;
        }, {});

        await onSave(payload);
        successNotify("تم تحديث بيانات المتطوع بنجاح");
        onClose();
      } catch (error) {
        console.error("Error updating volunteer:", error);
        errorNotify("حدث خطأ أثناء تحديث البيانات");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSave, onClose]
  );

  const modalVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9, y: 20 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: { duration: 0.2 },
      },
    }),
    []
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-white shadow-2xl rounded-2xl overflow-hidden">
        <Motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <DialogHeader className="relative bg-gradient-to-r from-bgColor to-red-200 text-white p-6 rounded-xl">
            <div className="flex items-center justify-center">
              <Edit3 className="mr-3 h-6 w-6" />
              <DialogTitle className="text-xl font-bold text-center">
                تعديل بيانات المتطوع
              </DialogTitle>
            </div>
            <div className="absolute left-4 top-4">
              <User className="h-8 w-8 opacity-75" />
            </div>
          </DialogHeader>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <EditVolunteerForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={onClose}
              isSubmitting={isSubmitting}
            />
          </div>
        </Motion.div>
      </DialogContent>
    </Dialog>
  );
});

EditVolunteerModal.displayName = "EditVolunteerModal";

export default EditVolunteerModal;
