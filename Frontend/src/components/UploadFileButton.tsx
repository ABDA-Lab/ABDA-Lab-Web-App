"use client";

import { useState } from "react";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import useAwsSetup from "@/hooks/resources/useAwsSetup";

interface UploadFileProps {
  filePath: string;
}

export default function UploadFileButton({ filePath }: UploadFileProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { s3Client, isLoading, error: awsError } = useAwsSetup();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!s3Client) {
      setError("AWS S3 client is not initialized");
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Convert file to ArrayBuffer
      const fileBuffer = await file.arrayBuffer();
      
      const params = {
        Bucket: "khangstorage", // Replace with your actual bucket name
        Key: `${filePath}${file.name}`,
        Body: new Uint8Array(fileBuffer), // Convert ArrayBuffer to Uint8Array
        ContentType: file.type,
      };

      await s3Client.send(new PutObjectCommand(params));
      setSuccessMessage("File uploaded successfully");
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload file. Check your access.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
        disabled={isUploading || isLoading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white disabled:opacity-50"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
      {awsError && <p className="text-red-500 mt-2">AWS Error: {awsError}</p>}
    </div>
  );
}