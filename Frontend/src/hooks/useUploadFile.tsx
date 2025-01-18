import { useState } from 'react';

export const useUploadFile = () => {
  const [message, setMessage] = useState<string>('');

  const uploadFile = async (file: File | null) => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    try {
      const response = await fetch('/api/resource/get-presigned-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bucketName: 'khangstorage',
          objectKey: `uploads/${file.name}`,
          expiryDurationMinutes: 15,
          httpVerb: 'PUT',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to get pre-signed URL.');
      }

      const { presignedUrl } = await response.json();
      console.log(presignedUrl)
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
        mode: 'cors'
      });

      if (uploadResponse.ok) {
        setMessage('File uploaded successfully!');
      } else {
        throw new Error('Failed to upload file.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('An unknown error occurred.');
      }
    }
  };

  return { uploadFile, message };
};
