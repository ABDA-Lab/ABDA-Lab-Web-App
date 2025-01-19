import { useState } from "react";

export const useUploadFile = () => {
  const [message, setMessage] = useState<string>("");

  const uploadFile = async (file: File | null) => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    try {
      const response = await fetch("/api/resource/get-presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bucketName: "khangstorage",
          objectKey: `uploads/${file.name}`,
          expiryDurationMinutes: 15,
          httpVerb: "PUT",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to get pre-signed URL.");
      }

      const { presignedUrl } = await response.json();
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", presignedUrl, true);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          console.log(`Uploaded ${percent}%`);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setMessage("File uploaded successfully!");
        } else {
          setMessage(xhr.statusText);
        }
      };

      xhr.onerror = () => {
        setMessage(xhr.statusText);
      };

      xhr.send(file);

      
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred.");
      }
    }
  };

  return { uploadFile, message };
};
