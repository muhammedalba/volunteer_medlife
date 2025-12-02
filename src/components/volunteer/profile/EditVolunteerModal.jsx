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
      dob: "",
      national_id: "",
      phone: "",
      governorate: "",
      address: "",
      qualification: "",
      university: "",
      academic_year: "",
      date_of_joining: "",
      working_hours: "",
      specialization: "",
      hospital: "",
      academic_status: "",
      photo: null,
      photo_preview: null,
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (volunteer) {
      setFormData({
        full_name: volunteer.full_name || "",
        dob: volunteer.dob ? volunteer.dob.split("T")[0] : "",
        national_id: volunteer.national_id || "",
        phone: volunteer.phone || "",
        governorate: volunteer.governorate || "",
        address: volunteer.address || "",
        qualification: volunteer.qualification || "",
        university: volunteer.university || "",
        academic_year: volunteer.academic_year || "",
        date_of_joining: volunteer.date_of_joining || "",
        working_hours: volunteer.working_hours || "",
        specialization: volunteer.specialization || "",
        hospital: volunteer.hospital || "",
        academic_status: volunteer.academic_status || "",
        photo: null,
        photo_preview: volunteer.photo_path ? `/${volunteer.photo_path}` : null,
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

  const handlePhotoChange = useCallback((file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
          photo_preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        photo: null,
        photo_preview: null,
      }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Create FormData for file upload
        const payload = new FormData();

        // Add all text fields
        Object.entries(formData).forEach(([key, value]) => {
          if (
            key !== "photo" &&
            key !== "photo_preview" &&
            value &&
            value.trim()
          ) {
            payload.append(key, value);
          }
        });

        // Add photo file if exists
        if (formData.photo) {
          payload.append("photo", formData.photo);
        }

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
          <DialogHeader className="relative bg-gradient-to-r from-bgColor to-red-200 text-white p-3 sm:p-6 rounded-xl">
            <div className="flex items-center justify-center">
              <Edit3 className="mr-3 h-6 w-6" />
              <DialogTitle className="text-md sm:text-lg font-bold text-center">
                تعديل بيانات المتطوع
              </DialogTitle>
            </div>
            <div className="absolute left-4 top-2 sm:top-4">
              <User className="h-6 w-6 opacity-75" />
            </div>
          </DialogHeader>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <EditVolunteerForm
              formData={formData}
              onChange={handleChange}
              onPhotoChange={handlePhotoChange}
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
