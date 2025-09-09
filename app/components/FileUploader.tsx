import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

// Utility function to format file size
function formatSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = (bytes / Math.pow(k, i)).toFixed(2);

    return `${formattedSize} ${sizes[i]}`;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0] || null;
            console.log("Dropped file:", selectedFile);
            setFile(selectedFile);
            onFileSelect?.(selectedFile);
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: { "application/pdf": [".pdf"] },
        maxSize: 20 * 1024 * 1024, // 20 MB
    });

    return (
        <div {...getRootProps()} className="w-full gradient-border cursor-pointer">
            <input {...getInputProps()} />
            <div className="uploader-drag-area flex flex-col items-center justify-center p-8 min-h-[208px]">
                {file ? (
                    <div className="uploader-selected-file flex items-center justify-between w-full">
                        <img src="/images/pdf.png" alt="pdf" className="w-10 h-10" />
                        <div className="flex-1 mx-3">
                            <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                            <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                        </div>
                        <button
                            className="p-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                                onFileSelect?.(null);
                            }}
                        >
                            <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 flex items-center justify-center mb-2">
                            <img src="/icons/info.svg" alt="upload" className="w-16 h-16" />
                        </div>
                        <p className="text-lg text-gray-500 text-center">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploader;
