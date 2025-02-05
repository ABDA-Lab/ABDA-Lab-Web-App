import React from "react";

type ViewFileProps = {
  name: string;
  date: string;
  type: string;
  size?: string;
};

const ViewFile: React.FC<ViewFileProps> = ({ name, date, type, size }) => {
  const getIcon = (type: string) => {
    const fileType = type.toLowerCase();
    if (fileType.includes("file folder")) {
      return {
        icon: "📁",
        color: "text-blue-600"
      };
    }
    if (fileType.includes("zip")) {
      return {
        icon: "🗜️",
        color: "text-purple-600"
      };
    }
    return {
      icon: "📄",
      color: "text-gray-600"
    };
  };

  const { icon, color } = getIcon(type);

  return (
    <div className="group relative flex items-center px-6 py-3 hover:bg-gray-50 border-b border-gray-200 cursor-pointer transition-all duration-200 ease-in-out">
      {/* Hover highlight effect */}
      <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />

      {/* Icon with container */}
      <div className="w-12 flex items-center justify-center">
        <span className={`text-2xl ${color} group-hover:scale-110 transition-all duration-200`}>
          {icon}
        </span>
      </div>

      {/* Name with truncate */}
      <div className="flex-1 min-w-0 px-4">
        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
          {name}
        </p>
      </div>

      {/* Date */}
      <div className="flex-1 hidden sm:block px-4">
        <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          {date}
        </p>
      </div>

      {/* Type */}
      <div className="flex-1 hidden md:block px-4">
        <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          {type}
        </p>
      </div>

      {/* Size with conditional rendering */}
      {type.toLowerCase() !== "file folder" && size && (
        <div className="w-28 text-right">
          <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
            {size}
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewFile;
