import React, { useRef } from "react";
import { Camera, Upload, X } from "lucide-react";

const PhotoUpload = ({
  currentPhoto,
  onPhotoChange,
  label = "الصورة الشخصية",
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onPhotoChange(file);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {/* Photo Preview */}
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        {currentPhoto ? (
          <div className="relative w-full h-full">
            <img
              src={currentPhoto}
              alt="Preview"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            className="w-full h-full rounded-full bg-gradient-to-br from-bgColor/20 to-red-400/20 flex items-center justify-center border-4 border-white shadow-lg cursor-pointer hover:from-bgColor/30 hover:to-red-400/30 transition-colors"
            onClick={handleClick}
          >
            <Camera className="w-8 h-8 text-bgColor" />
          </div>
        )}
      </div>

      {/* Upload Button */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center px-4 py-2 bg-bgColor text-white rounded-lg hover:bg-bgColor/80 transition-colors text-sm font-medium"
        >
          <Upload className="w-4 h-4 ml-2" />
          {currentPhoto ? "تغيير الصورة" : "رفع صورة"}
        </button>

        {currentPhoto && (
          <button
            type="button"
            onClick={handleRemovePhoto}
            className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            <X className="w-4 h-4 ml-2" />
            إزالة
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUpload;
