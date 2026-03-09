import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 py-16">
      <div className="text-8xl font-extrabold bg-gradient-to-br from-gray-600 to-gray-800 bg-clip-text text-transparent">
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">Result Not Found</h1>
        <p className="text-gray-400 max-w-md">
          This test result does not exist or may have been removed. Double-check the URL or run a new test.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
}
