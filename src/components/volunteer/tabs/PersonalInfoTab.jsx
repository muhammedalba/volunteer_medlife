import React, { memo, useMemo, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import {
  User,
  Calendar,
  Phone,
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  Home,
  HeartHandshake,
  Clock,
  Mail,
} from "lucide-react";
import { VolunteerInfoCard, InfoItem } from "..";

const PersonalInfoTab = memo(({ volunteer }) => {
  // Memoize formatted data to prevent unnecessary recalculations
  const formattedData = useMemo(
    () => ({
      birthDate: volunteer.birth_date
        ? new Date(volunteer.birth_date).toLocaleDateString("ar-EG")
        : "غير متوفر",
      memberSince: volunteer.created_at
        ? new Date(volunteer.created_at).toLocaleDateString("ar-EG")
        : "غير متوفر",
    }),
    [volunteer.birth_date, volunteer.created_at]
  );

  // Animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const iconVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0, rotate: -180 },
      visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  // Icon mapping with colors for better performance
  const getIcon = useCallback((iconName, color = "text-bgColor") => {
    const iconMap = {
      user: <User className={`h-5 w-5 mx-1 ${color}`} />,
      calendar: <Calendar className={`h-5 w-5 mx-1 ${color}`} />,
      phone: <Phone className={`h-5 w-5 mx-1 ${color}`} />,
      graduation: <GraduationCap className={`h-5 w-5 mx-1 ${color}`} />,
      award: <Award className={`h-5 w-5 mx-1 ${color}`} />,
      book: <BookOpen className={`h-5 w-5 mx-1 ${color}`} />,
      mapPin: <MapPin className={`h-5 w-5 mx-1 ${color}`} />,
      home: <Home className={`h-5 w-5 mx-1 ${color}`} />,
      handshake: <HeartHandshake className={`h-5 w-5 mx-1 ${color}`} />,
      clock: <Clock className={`h-5 w-5 mx-1 ${color}`} />,
      mail: <Mail className={`h-5 w-5 mx-1 ${color}`} />,
    };
    return iconMap[iconName] || iconMap.user;
  }, []);

  return (
    <Motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <Motion.div variants={cardVariants}>
        <VolunteerInfoCard
          title="المعلومات الشخصية"
          icon={getIcon("user", "text-blue-500")}
        >
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("user", "text-blue-500")}
            <InfoItem label="الاسم الكامل" value={volunteer.full_name} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("mail", "text-green-600")}
            <InfoItem label="اسم المستخدم" value={volunteer.username} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("calendar", "text-blue-500")}
            <InfoItem label="تاريخ الميلاد" value={formattedData.birthDate} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("phone", "text-green-600")}
            <InfoItem label="رقم الهاتف" value={volunteer.phone} />
          </Motion.div>
        </VolunteerInfoCard>
      </Motion.div>

      <Motion.div variants={cardVariants}>
        <VolunteerInfoCard
          title="المعلومات الأكاديمية"
          icon={getIcon("graduation", "text-purple-500")}
        >
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("graduation", "text-purple-500")}
            <InfoItem label="الجامعة" value={volunteer.university} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("award", "text-yellow-500")}
            <InfoItem
              label="الدرجة العلمية"
              value={volunteer.academic_degree}
            />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("book", "text-green-500")}
            <InfoItem label="حالة الدراسة" value={volunteer.study_status} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("calendar", "text-indigo-500")}
            <InfoItem label="سنة الدراسة" value={volunteer.study_year} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("book", "text-teal-500")}
            <InfoItem label="التخصص" value={volunteer.specialization} />
          </Motion.div>
        </VolunteerInfoCard>
      </Motion.div>

      <Motion.div variants={cardVariants} className="md:col-span-2">
        <VolunteerInfoCard
          title="العنوان"
          icon={getIcon("mapPin", "text-red-500")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Motion.div variants={iconVariants} className="flex items-center">
              {getIcon("mapPin", "text-red-500")}
              <InfoItem
                label="العنوان العام"
                value={volunteer.address_general}
              />
            </Motion.div>
            <Motion.div variants={iconVariants} className="flex items-center">
              {getIcon("home", "text-orange-500")}
              <InfoItem
                label="تفاصيل العنوان"
                value={volunteer.address_details}
              />
            </Motion.div>
          </div>
          <Motion.div variants={iconVariants} className="flex items-center">
            {getIcon("clock", "text-cyan-500")}
            <InfoItem label="عضو منذ" value={formattedData.memberSince} />
          </Motion.div>
        </VolunteerInfoCard>
      </Motion.div>

      <Motion.div variants={cardVariants} className="md:col-span-2">
        <VolunteerInfoCard
          title="معلومات التطوع"
          icon={getIcon("handshake", "text-green-500")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Motion.div variants={iconVariants} className="flex items-center">
              {getIcon("mapPin", "text-pink-500")}
              <InfoItem label="مكان التطوع" value={volunteer.volunteer_place} />
            </Motion.div>
            <Motion.div variants={iconVariants} className="flex items-center">
              {getIcon("book", "text-gray-600")}
              <InfoItem label="ملاحظات عامة" value={volunteer.general_notes} />
            </Motion.div>
            <Motion.div variants={iconVariants} className="flex items-center">
              {getIcon("clock", "text-cyan-500")}
              <InfoItem label="عضو منذ" value={formattedData.memberSince} />
            </Motion.div>
          </div>
        </VolunteerInfoCard>
      </Motion.div>
    </Motion.div>
  );
});

PersonalInfoTab.displayName = "PersonalInfoTab";

export default PersonalInfoTab;
