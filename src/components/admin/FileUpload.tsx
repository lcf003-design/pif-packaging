"use client";

import { useState, useCallback } from "react";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Upload, X, Loader2, FileText, CheckCircle } from "lucide-react";

interface FileUploadProps {
  onUploadComplete: (url: string, fileName: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
  className?: string;
}

export default function FileUpload({
  onUploadComplete,
  folder = "documents",
  accept = ".pdf,.doc,.docx",
  label = "Upload Document",
  className = "",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUploaded, setLastUploaded] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const uploadFile = async (file: File) => {
    // Basic validation
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Use raw file name or sanitize it? keeping it simple
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          setError("Upload failed.");
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadComplete(downloadURL, file.name);
          setLastUploaded(file.name);
          setIsUploading(false);
          // Auto-reset status after 3s? or keep it 'Success' state
          setTimeout(() => setLastUploaded(null), 3000);
        }
      );
    } catch (err) {
      console.error("Upload setup error:", err);
      setError("Something went wrong initializing upload.");
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
            relative group flex flex-col items-center justify-center w-full h-32
            border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
            ${
              isDragging
                ? "border-berlin-blue bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }
            ${error ? "border-red-300 bg-red-50" : ""}
        `}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
          {isUploading ? (
            <div className="flex flex-col items-center text-berlin-blue">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <span className="text-sm font-bold">
                {Math.round(uploadProgress)}%
              </span>
            </div>
          ) : lastUploaded ? (
            <div className="flex flex-col items-center text-green-600">
              <CheckCircle className="w-8 h-8 mb-2" />
              <span className="text-sm font-bold">Uploaded!</span>
              <span className="text-xs">{lastUploaded}</span>
            </div>
          ) : (
            <>
              <div className="mb-2">
                <FileText className="w-6 h-6 text-gray-400 mx-auto" />
              </div>
              <p className="text-sm text-gray-600 font-medium">{label}</p>
              <p className="text-xs text-gray-400 mt-1">Drag & drop or Click</p>
            </>
          )}

          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </div>
      </label>

      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <X className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}
