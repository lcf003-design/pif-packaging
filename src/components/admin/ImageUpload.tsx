"use client";

import { useState, useCallback, useEffect } from "react";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Upload, X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  currentImage?: string;
  className?: string;
}

export default function ImageUpload({
  onUploadComplete,
  currentImage,
  className = "",
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

  const uploadFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WEBP)");
      return;
    }

    // Validate size (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Create a local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
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
          setError("Upload failed. Please try again.");
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadComplete(downloadURL);
          // Keep the preview as is, or switch to the remote URL to be safe,
          // though local objectUrl is faster. Usually switching to remote proves it works.
          setPreview(downloadURL);
          setIsUploading(false);
          // Optionally revoke objectUrl to free memory
          URL.revokeObjectURL(objectUrl);
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
            relative group flex flex-col items-center justify-center w-full h-64 
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
              <div className="mb-3 p-3 bg-white rounded-full shadow-sm">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="mb-2 text-sm text-gray-500 font-medium">
                <span className="font-semibold text-berlin-blue">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-400">
                SVG, PNG, JPG or WEBP (max. 5MB)
              </p>
            </>
          )}

          {/* Hidden Input */}
          <input
            type="file"
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
