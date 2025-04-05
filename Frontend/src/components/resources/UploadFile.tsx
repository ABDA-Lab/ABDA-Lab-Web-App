'use client';
import { useState, useEffect } from 'react';
import { X, Upload, File, Check, AlertCircle } from 'lucide-react';
import { FileUpload } from '../ui/file-upload';

interface UploadFileProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadComplete?: (files: File[]) => void;
    allowedTypes?: string[];
    maxFileSize?: number; // in MB
    maxFiles?: number;
    currentPath?: string;
}

export default function UploadFile({
    isOpen,
    onClose,
    onUploadComplete,
    allowedTypes,
    maxFileSize = 50, // Default 50MB
    maxFiles = 10,
    currentPath = '/',
}: UploadFileProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFiles([]);
            setUploadProgress({});
            setErrors({});
            setUploading(false);
        }
    }, [isOpen]);

    const handleFileUpload = (newFiles: File[]) => {
        // Validate files
        const validFiles: File[] = [];
        const newErrors: Record<string, string> = {};

        newFiles.forEach((file) => {
            // Check file type if restrictions exist
            if (allowedTypes && allowedTypes.length > 0) {
                const fileType = file.type.split('/')[1];
                if (!allowedTypes.includes(fileType)) {
                    newErrors[file.name] = `File type not allowed. Accepted: ${allowedTypes.join(', ')}`;
                    return;
                }
            }

            // Check file size
            if (file.size > maxFileSize * 1024 * 1024) {
                newErrors[file.name] = `File too large. Maximum size: ${maxFileSize}MB`;
                return;
            }

            validFiles.push(file);
        });

        // Check if we're exceeding max files
        if (files.length + validFiles.length > maxFiles) {
            setErrors({
                ...newErrors,
                general: `Cannot upload more than ${maxFiles} files at once.`,
            });
            return;
        }

        setFiles([...files, ...validFiles]);
        setErrors(newErrors);
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);

        // Initialize progress for each file
        const initialProgress: Record<string, number> = {};
        files.forEach((file) => {
            initialProgress[file.name] = 0;
        });
        setUploadProgress(initialProgress);

        // Simulate upload for each file
        const uploadPromises = files.map((file) => {
            return new Promise<void>((resolve) => {
                let progress = 0;

                // Simulate progress updates
                const interval = setInterval(() => {
                    progress += Math.random() * 10;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);

                        setUploadProgress((prev) => ({
                            ...prev,
                            [file.name]: 100,
                        }));

                        setTimeout(() => {
                            resolve();
                        }, 500);
                    } else {
                        setUploadProgress((prev) => ({
                            ...prev,
                            [file.name]: Math.round(progress),
                        }));
                    }
                }, 300);
            });
        });

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        // Call onUploadComplete callback
        if (onUploadComplete) {
            onUploadComplete(files);
        }

        // Close modal after short delay
        setTimeout(() => {
            setUploading(false);
            onClose();
        }, 1000);
    };

    const removeFile = (fileToRemove: File) => {
        setFiles(files.filter((file) => file !== fileToRemove));

        // Also remove any errors for this file
        if (errors[fileToRemove.name]) {
            const newErrors = { ...errors };
            delete newErrors[fileToRemove.name];
            setErrors(newErrors);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b dark:border-zinc-800">
                    <h2 className="text-xl font-semibold">Upload Files</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Current path */}
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Uploading to: {currentPath}</div>

                    {/* Drop zone */}
                    {files.length === 0 && (
                        <div className="w-full border border-dashed bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-xl p-8">
                            <FileUpload onChange={handleFileUpload}  />
                        </div>
                    )}

                    {/* General error message */}
                    {errors.general && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
                            <div className="flex items-center gap-2">
                                <AlertCircle size={16} />
                                <span>{errors.general}</span>
                            </div>
                        </div>
                    )}

                    {/* File list */}
                    {files.length > 0 && (
                        <div className="mt-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">Files to upload</h3>
                                <button
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                    onClick={() => setFiles([])}>
                                    Clear all
                                </button>
                            </div>

                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <File size={20} className="text-blue-500 dark:text-blue-400" />
                                            <div className="flex-1 min-w-0">
                                                <p className="truncate font-medium text-sm">{file.name}</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>

                                                {/* Error message */}
                                                {errors[file.name] && (
                                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                                        {errors[file.name]}
                                                    </p>
                                                )}

                                                {/* Progress bar */}
                                                {uploading && uploadProgress[file.name] !== undefined && (
                                                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 mt-2">
                                                        <div
                                                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                                            style={{ width: `${uploadProgress[file.name]}%` }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Upload status or remove button */}
                                        {!uploading ? (
                                            <button
                                                onClick={() => removeFile(file)}
                                                className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                                <X size={16} />
                                            </button>
                                        ) : uploadProgress[file.name] === 100 ? (
                                            <Check size={16} className="text-green-500" />
                                        ) : null}
                                    </div>
                                ))}
                            </div>

                            {/* Add more files */}
                            {!uploading && (
                                <button
                                    onClick={() =>
                                        document.querySelector<HTMLInputElement>('input[type="file"]')?.click()
                                    }
                                    className="w-full py-2 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-center text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    + Add more files
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer with actions */}
                <div className="px-6 py-4 border-t dark:border-zinc-800 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        disabled={uploading}>
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={files.length === 0 || uploading || Object.keys(errors).length > 0}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}>
                        {uploading ? (
                            'Uploading...'
                        ) : (
                            <>
                                <Upload size={16} />
                                Upload {files.length > 0 ? `(${files.length})` : ''}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
