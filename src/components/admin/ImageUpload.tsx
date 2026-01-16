"use client";

import { useState, useCallback, useEffect } from "react";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Upload, X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onUploadComplete: (url: string | string[]) => void;
  currentImage?: string;
  className?: string;
  fileNamePrefix?: string;
}

export default function ImageUpload({
  onUploadComplete,
  currentImage,
  className = "",
  fileNamePrefix = "",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [error, setError] = useState<string | null>(null);

  // Sync prop changes if external source updates (e.g. loading existing product)
  useEffect(() => {
    if (currentImage) setPreview(currentImage);
  }, [currentImage]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  // Modified to handle multiple files
  const uploadFiles = async (files: File[]) => {
    const validFiles = files.filter((file) => {
      // Validate type
      if (!file.type.startsWith("image/")) {
        setError("Skipped non-image file");
        return false;
      }
      // Validate size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Skipped file larger than 5MB");
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Show preview of first file immediately
    const objectUrl = URL.createObjectURL(validFiles[0]);
    setPreview(objectUrl);

    try {
      const uploadPromises = validFiles.map((file, idx) => {
        let finalName = file.name;

        if (fileNamePrefix) {
          const ext = file.name.split(".").pop() || "jpg";
          // If multiple files, append -1, -2, etc. logic
          // Or if just one file, keep strict SKU? User asked for -1, -2 if > 1.
          const suffix = validFiles.length > 1 ? `-${idx + 1}` : "";
          finalName = `${fileNamePrefix}${suffix}.${ext}`;
        } else {
          // Fallback to timestamp if no SKU provided
          finalName = `${Date.now()}_${file.name}`;
        }

        const storageRef = ref(storage, `products/${finalName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Calculate aggregate progress could be complex, simplifying to last file
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      const urls = await Promise.all(uploadPromises);
      onUploadComplete(urls); // Pass array back
      setPreview(undefined); // Clear preview, parent handles display
      setIsUploading(false);
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setError("One or more uploads failed.");
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering file select
    setPreview(undefined);
    onUploadComplete(""); // Clear URL in parent
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
            relative group flex flex-col items-center justify-center w-full h-full
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
          {preview ? (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Image Preview */}
              <div className="relative w-48 h-48">
                <Image
                  src={preview}
                  alt="Product preview"
                  fill
                  className="object-contain rounded-md"
                />
              </div>

              {/* Remove Button */}
              {!isUploading && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Uploading Overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 rounded-md flex items-center justify-center">
                  <div className="flex flex-col items-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <span className="text-sm font-bold">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Upload Prompt
            <>
              <div className="mb-2 p-2 bg-white rounded-full shadow-sm">
                <Upload className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs font-bold text-berlin-blue text-center">
                Add Photo
              </p>
            </>
          )}

          {/* Hidden Input */}
          <input
            type="file"
            multiple
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </div>
      </label>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <X className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}
