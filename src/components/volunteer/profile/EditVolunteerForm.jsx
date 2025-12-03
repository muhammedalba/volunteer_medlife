import {
  User,
  Calendar,
  GraduationCap,
  Award,
  BookOpen,
  Phone,
  MapPin,
  Home,
  FileText,
  Clock,
  Building,
  IdCard,
} from "lucide-react";
import FormInput from "../form/FormInput";
import Button from "../Button";
import PhotoUpload from "../form/PhotoUpload";

const ACADEMIC_STATUSES = [
  { value: "طالب", label: "طالب" },
  { value: "خريج", label: "خريج" },
  { value: "مقيم", label: "مقيم" },
];

const WORKING_HOURS = [
  { value: "صباحية فقط", label: "صباحية فقط" },
  { value: "مسائية فقط", label: "مسائية فقط" },
  { value: "صباحية ومسائية", label: "صباحية ومسائية" },
  { value: "مرنة", label: "مرنة" },
];

const EditVolunteerForm = ({
  formData,
  onChange,
  onPhotoChange,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Photo Upload Section */}
      <div className="flex justify-center">
        <PhotoUpload
          currentPhoto={formData.photo_preview}
          onPhotoChange={onPhotoChange}
        />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="الاسم الكامل"
          name="full_name"
          icon={User}
          value={formData.full_name}
          onChange={onChange}
        />

        <FormInput
          label="تاريخ الميلاد"
          name="dob"
          type="date"
          icon={Calendar}
          iconColor="text-blue-500"
          value={formData.dob}
          onChange={onChange}
        />

        <FormInput
          label="رقم الهوية"
          name="national_id"
          icon={IdCard}
          iconColor="text-purple-600"
          value={formData.national_id}
          onChange={onChange}
        />

        <FormInput
          label="رقم الهاتف"
          name="phone"
          type="tel"
          icon={Phone}
          iconColor="text-green-600"
          value={formData.phone}
          onChange={onChange}
        />

        <FormInput
          label="المحافظة"
          name="governorate"
          icon={MapPin}
          iconColor="text-red-500"
          value={formData.governorate}
          onChange={onChange}
        />

        <FormInput
          label="العنوان"
          name="address"
          icon={Home}
          iconColor="text-orange-500"
          value={formData.address}
          onChange={onChange}
        />

        <FormInput
          label="المؤهل"
          name="qualification"
          icon={Award}
          iconColor="text-yellow-500"
          value={formData.qualification}
          onChange={onChange}
        />

        <FormInput
          label="الجامعة"
          name="university"
          icon={GraduationCap}
          iconColor="text-purple-500"
          value={formData.university}
          onChange={onChange}
        />

        <FormInput
          label="الحالة الأكاديمية"
          name="academic_status"
          type="select"
          icon={BookOpen}
          iconColor="text-green-500"
          value={formData.academic_status}
          onChange={onChange}
          options={ACADEMIC_STATUSES}
        />

        <FormInput
          label="السنة الدراسية"
          name="academic_year"
          icon={Calendar}
          iconColor="text-indigo-500"
          value={formData.academic_year}
          onChange={onChange}
        />

        <FormInput
          label="التخصص"
          name="specialization"
          icon={BookOpen}
          iconColor="text-teal-500"
          value={formData.specialization}
          onChange={onChange}
        />

        <FormInput
          label="المستشفى"
          name="hospital"
          icon={Building}
          iconColor="text-pink-500"
          value={formData.hospital}
          onChange={onChange}
        />

        <FormInput
          label="ساعات العمل"
          name="working_hours"
          type="select"
          icon={Clock}
          iconColor="text-cyan-500"
          value={formData.working_hours}
          onChange={onChange}
          options={WORKING_HOURS}
        />

        <FormInput
          disabled
          label="تاريخ الانضمام"
          name="date_of_joining"
          type="date"
          icon={Calendar}
          iconColor="text-blue-600"
          value={formData.date_of_joining}
          onChange={onChange}
        />
      </div>

      <div className="flex justify-between space-x-3 pt-4 border-t mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>
    </form>
  );
};

export default EditVolunteerForm;
