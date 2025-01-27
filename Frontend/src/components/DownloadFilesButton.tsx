import useCookieHandler from '@/hooks/resources/useSignedCookie';
import React, { useState } from 'react';

const DownloadFilesButton = () => {
    const { isLoading } = useCookieHandler(); // Ensures signed cookies are valid
    const [fileName, setFileName] = useState('');
    const [downloading, setDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState<boolean | null>(null);

    const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
    };

    const handleDownload = async () => {
        if (!fileName) {
            alert('Please enter the file name to download.');
            return;
        }

        try {
            setDownloading(true);

            // Download the file from CloudFront
            const cloudfrontUrl = `https://drolbzkvfj3fm.cloudfront.net/${fileName}`; // Replace with your CloudFront URL
            const downloadResponse = await fetch(cloudfrontUrl, {
                method: 'GET',
                credentials: 'include', // Ensures cookies are sent
                redirect:'follow'
            });
            if (!downloadResponse.ok) {
                console.log(downloadResponse);
                throw new Error('File download failed.');
            }

            // Create a blob and trigger download
            const blob = await downloadResponse.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setDownloadSuccess(true);
            alert('File downloaded successfully!');
        } catch (error) {
            console.error('Error during file download:', error);
            setDownloadSuccess(false);
            alert('Failed to download the file.');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div>
            <h1>Download File</h1>
            {isLoading ? (
                <p>Validating cookies...</p>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter file name"
                        value={fileName}
                        onChange={handleFileNameChange}
                    />
                    <button
                        onClick={handleDownload}
                        disabled={downloading || !fileName}
                        style={{
                            marginLeft: '10px',
                            cursor: downloading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {downloading ? 'Downloading...' : 'Download'}
                    </button>
                    {downloadSuccess === true && <p style={{ color: 'green' }}>File downloaded successfully!</p>}
                    {downloadSuccess === false && <p style={{ color: 'red' }}>Failed to download the file.</p>}
                </>
            )}
        </div>
    );
};

export default DownloadFilesButton;