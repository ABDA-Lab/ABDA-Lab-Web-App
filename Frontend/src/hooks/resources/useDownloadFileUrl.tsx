import { useState } from "react";

export const useDownloadFile = () => {
  const [message, setMessage] = useState<string>("");

  const downloadFile = async (fileName: string) => {
    if (!fileName) {
      setMessage("Please enter a file name.");
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
          objectKey: `uploads/${fileName}`,
          expiryDurationMinutes: 15,
          httpVerb: "GET",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get pre-signed URL.");
      }

      const { presignedUrl } = await response.json();

      const a = document.createElement("a");
      a.href = presignedUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage("File downloaded successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred.");
      }
    }
  };

  return { downloadFile, message };
};
