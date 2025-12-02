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
          <Motion.div
            variants={iconVariants}
            className="flex items-center  gap-2"
          >
            {getIcon("user", "text-blue-500")}
            <InfoItem label="الاسم الكامل" value={volunteer.full_name} />
          </Motion.div>
          <Motion.div
            variants={iconVariants}
            className="flex items-center gap-2"
          >
            {getIcon("calendar", "text-blue-500")}
            <InfoItem label="تاريخ الميلاد" value={volunteer.dob} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center gap-2">
            {getIcon("phone", "text-green-600")}
            <InfoItem label="رقم الهاتف" value={volunteer.phone} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center gap-2">
            {getIcon("user", "text-purple-600")}
            <InfoItem label="رقم الهوية" value={volunteer.national_id} />
          </Motion.div>
        </VolunteerInfoCard>
      </Motion.div>

      <Motion.div variants={cardVariants}>
        <VolunteerInfoCard
          title="المعلومات الأكاديمية"
          icon={getIcon("graduation", "text-purple-500")}
        >
          <Motion.div variants={iconVariants} className="flex items-center gap-2">
            {getIcon("graduation", "text-purple-500")}
            <InfoItem label="الجامعة" value={volunteer.university} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center gap-2">
            {getIcon("award", "text-yellow-500")}
            <InfoItem label="المؤهل" value={volunteer.qualification} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center gap-2">
            {getIcon("book", "text-green-500")}
            <InfoItem
              label="الحالة الأكاديمية"
              value={volunteer.academic_status}
            />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center gap-2">
            {getIcon("calendar", "text-indigo-500")}
            <InfoItem label="السنة الدراسية" value={volunteer.academic_year} />
          </Motion.div>
          <Motion.div variants={iconVariants} className="flex items-center gap-2">
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
            <Motion.div variants={iconVariants} className="flex items-center gap-2">
              {getIcon("mapPin", "text-red-500")}
              <InfoItem label="المحافظة" value={volunteer.governorate} />
            </Motion.div>
            <Motion.div
              variants={iconVariants}
              className="flex items-center gap-2"
            >
              {getIcon("home", "text-orange-500")}
              <InfoItem label="العنوان" value={volunteer.address} />
            </Motion.div>
          </div>
        </VolunteerInfoCard>
      </Motion.div>

      <Motion.div variants={cardVariants} className="md:col-span-2">
        <VolunteerInfoCard
          title="معلومات التطوع"
          icon={getIcon("handshake", "text-green-500")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Motion.div variants={iconVariants} className="flex items-center gap-2">
              {getIcon("mapPin", "text-pink-500")}
              <InfoItem label="المستشفى" value={volunteer.hospital} />
            </Motion.div>
            <Motion.div variants={iconVariants} className="flex items-center gap-2">
              {getIcon("book", "text-gray-600")}
              <InfoItem label="ساعات العمل" value={volunteer.working_hours} />
            </Motion.div>
            <Motion.div variants={iconVariants} className="flex items-center gap-2">
              {getIcon("clock", "text-cyan-500")}
              <InfoItem
                label="تاريخ الانضمام"
                value={volunteer.date_of_joining}
              />
            </Motion.div>
          </div>
        </VolunteerInfoCard>
      </Motion.div>
    </Motion.div>
  );
});

PersonalInfoTab.displayName = "PersonalInfoTab";

export default PersonalInfoTab;
