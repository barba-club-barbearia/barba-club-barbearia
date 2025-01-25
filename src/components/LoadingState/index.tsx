export const LoadingState = () => (
  <div className="bg-[#0f0f0f] rounded-xl border border-amber-900/20 shadow-lg overflow-hidden">
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <div className="w-1/2 h-6 bg-gray-800 rounded animate-pulse mb-4"></div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="w-1/3 h-4 bg-gray-800 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-900 rounded shadow-md animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
              <div>
                <div className="w-32 h-4 bg-gray-800 rounded mb-2"></div>
                <div className="w-24 h-3 bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
