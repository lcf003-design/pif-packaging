"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-black text-industrial-50 select-none mb-4">
          OOPS
        </h1>
        <h2 className="text-xl font-bold text-industrial-900 mb-4">
          Something went wrong!
        </h2>
        <p className="text-industrial-600 mb-8 max-w-sm mx-auto">
          We apologize for the inconvenience. A critical error occurred while
          processing your request.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-industrial-900 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-industrial-800 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
