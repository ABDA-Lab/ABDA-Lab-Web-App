'use client';

import { useState } from 'react';
import { useUploadFile } from '@/hooks/useUploadFile';

const UploadFileButton: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadFile, message } = useUploadFile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    uploadFile(file);
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadFileButton;
