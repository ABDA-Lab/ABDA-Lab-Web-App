"use client";
import { useState } from "react";
import { useSignedCookies } from "@/hooks/resources/useSignedCookies";

interface DownloadFileProps {
  filePath: string;
  expiryHour?: number;
  private?: boolean;
}

export default function DownloadFileButton({
  filePath,
  expiryHour = 1,
  private: isPrivate = false,
}: DownloadFileProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cloudFrontBaseUrl = "https://d25xwknkj0zeof.cloudfront.net";

  // Call custom hook to ensure cookies are set
  const { isLoading, error: cookieError } = useSignedCookies(
    `/*`,
    expiryHour
  );

  const handleDownload = async () => {
    if (isLoading) return;
    setIsDownloading(true);
    setError(null);

    try {
      const fileUrl = `${cloudFrontBaseUrl}/${filePath}`;

      // Fetch the file
      const response = await fetch(fileUrl, {
        method: "GET",
        credentials:  isPrivate ? "include" : "omit", // Ensures cookies are sent
      });

      if (!response.ok) {
        throw new Error("Unauthorized or file not found");
      }

      // Convert response to a blob
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Create an anchor element and trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filePath.split("/").pop() || "downloaded_file"); // Extract filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup the blob URL to free memory
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to download file. Check your access.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={isDownloading || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        {isDownloading
          ? "Downloading..."
          : isLoading
          ? "Loading Cookies..."
          : "Download File"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {cookieError && (
        <p className="text-red-500 mt-2">Cookie Error: {cookieError}</p>
      )}
    </div>
  );
}
