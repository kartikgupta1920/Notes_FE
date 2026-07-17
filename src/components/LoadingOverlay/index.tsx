export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-medium animate-pulse">Loading...</p>
    </div>
  );
}