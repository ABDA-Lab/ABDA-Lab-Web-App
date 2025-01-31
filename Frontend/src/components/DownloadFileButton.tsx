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

      // First check if we have access to the file
      const checkResponse = await fetch(fileUrl, {
        method: "HEAD", // Use HEAD request to check access without downloading
        credentials: isPrivate ? "include" : "omit",
      });

      if (!checkResponse.ok) {
        throw new Error("Unauthorized or file not found");
      }

      // Create an iframe to handle the download
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Create a form within the iframe
      const form = iframe.contentDocument?.createElement('form');
      if (form) {
        form.method = 'GET';
        form.action = fileUrl;

        // Add credentials if private
        if (isPrivate) {
          form.setAttribute('credentials', 'include');
        }

        iframe.contentDocument?.body.appendChild(form);
        form.submit();
      }

      // Clean up the iframe after a short delay
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);

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
          ? "Starting Download..."
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