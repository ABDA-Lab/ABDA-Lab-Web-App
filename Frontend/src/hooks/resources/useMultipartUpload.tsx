"use client";

import { useState, useCallback } from "react";
import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import useAwsSetup from "@/hooks/resources/useAwsSetup";
import { UploadProgress } from "@/types/resources/upload";

export default function useMultipartUpload() {
  const { s3Client } = useAwsSetup();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);

  const uploadInChunks = useCallback(async (
    file: File,
    uploadId: string,
    bucket: string,
    key: string,
    maxChunkSize: number
  ) => {
    const chunks = Math.ceil(file.size / maxChunkSize);
    const uploadedParts: { ETag: string; PartNumber: number; ChecksumCRC32?: string; }[] = [];
    let uploadedBytes = 0;

    for (let i = 0; i < chunks; i++) {
      const start = i * maxChunkSize;
      const end = Math.min(start + maxChunkSize, file.size);
      const chunk = file.slice(start, end);
      const partNumber = i + 1;

      try {
        const chunkArrayBuffer = await chunk.arrayBuffer();

        const uploadPartCommand = new UploadPartCommand({
          Bucket: bucket,
          Key: key,
          UploadId: uploadId,
          PartNumber: partNumber,
          Body: new Uint8Array(chunkArrayBuffer),
          ContentLength: chunk.size,
          ChecksumAlgorithm: "CRC32",
        });

        const response = await s3Client!.send(uploadPartCommand);
        uploadedBytes += chunk.size;
        
        setUploadProgress({
          loaded: uploadedBytes,
          total: file.size,
          percentage: Math.round((uploadedBytes / file.size) * 100),
        });

        if (response.ETag) {
          uploadedParts.push({
            ETag: response.ETag,
            PartNumber: partNumber,
            ChecksumCRC32: response.ChecksumCRC32,
          });
        }
      } catch (err: any) {
        console.error("Part upload error:", err);
        await s3Client!.send(new AbortMultipartUploadCommand({
          Bucket: bucket,
          Key: key,
          UploadId: uploadId,
        }));
        throw new Error(`Failed to upload part ${partNumber}: ${err.message}`);
      }
    }

    return uploadedParts.sort((a, b) => a.PartNumber - b.PartNumber);
  }, [s3Client]);

  const handleUpload = async (file: File, filePath: string, maxChunkSize = 5 * 1024 * 1024) => {
    if (!s3Client) {
      setError("AWS S3 client is not initialized");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);
    setUploadProgress(null);

    const bucket = process.env.NEXT_PUBLIC_WASABI_BUCKET_NAME as string;
    const key = `${filePath}${file.name}`;

    try {
      const multipartUpload = await s3Client.send(
        new CreateMultipartUploadCommand({
          Bucket: bucket,
          Key: key,
          ContentType: file.type,
          ChecksumAlgorithm: "CRC32",
        })
      );

      if (!multipartUpload.UploadId) {
        throw new Error("Failed to initialize multipart upload");
      }

      const uploadedParts = await uploadInChunks(file, multipartUpload.UploadId, bucket, key, maxChunkSize);

      await s3Client.send(
        new CompleteMultipartUploadCommand({
          Bucket: bucket,
          Key: key,
          UploadId: multipartUpload.UploadId,
          MultipartUpload: { Parts: uploadedParts },
        })
      );

      setSuccessMessage("File uploaded successfully");
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(typeof err === 'string' ? err : err.message || "Failed to upload file. Check your access.");
    } finally {
      setIsUploading(false);
    }
  };

  return { handleUpload, isUploading, uploadProgress, error, successMessage };
}
