import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-black text-industrial-100 leading-none select-none">
          404
        </h1>
        <div className="relative -mt-12">
          <h2 className="text-2xl font-bold text-industrial-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-industrial-600 mb-8">
            The page you are looking for has been moved, deleted, or possibly
            never existed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-berlin-red text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-berlin-red/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
