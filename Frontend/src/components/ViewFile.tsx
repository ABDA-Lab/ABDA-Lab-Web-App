import React from "react";

type ViewFileProps = {
  name: string;
  date: string;
  type: string;
  size?: string;
};

const ViewFile: React.FC<ViewFileProps> = ({ name, date, type, size }) => {
  // Determine icon based on type
  const getIcon = (type: string) => {
    if (type.toLowerCase().includes("file folder")) return "📁"; // Folder icon
    if (type.toLowerCase().includes("zip")) return "🗜️"; // Zip icon
    return "📄"; // Default icon
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: "20px" }}>{getIcon(type)}</span>

      {/* Name */}
      <span style={{ flex: 1 }}>{name}</span>

      {/* Date */}
      <span style={{ flex: 1 }}>{date}</span>

      {/* Type */}
      <span style={{ flex: 1 }}>{type}</span>

      {/* Size (only if type is not "File Folder") */}
      {type.toLowerCase() !== "file folder" && size && (
        <span style={{ flex: 1 }}>{size}</span>
      )}
    </div>
  );
};

export default ViewFile;
