'use client';

import { useState } from 'react';
import { useDownloadFile } from '@/hooks/useDownloadFile';

const DownloadFileButton: React.FC = () => {
  const [fileName, setFileName] = useState<string>('');
  const { downloadFile, message } = useDownloadFile();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleDownload = () => {
    downloadFile(fileName);
  };

  return (
    <div>
      <h2>Download File</h2>
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={handleInputChange}
      />
      <button onClick={handleDownload}>Download</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DownloadFileButton;
