export default function ArticleSkeleton() {
  return (
    <div className="w-5/6 md:w-2/3 mx-auto my-32 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full xl:w-1/2 mx-auto">
        <div className="h-64 w-full bg-gray-300 rounded-md"></div>
      </div>

      {/* Article Content Skeleton */}
      <div className="mt-4 flex justify-between">
        <div className="flex items-center flex-col justify-center w-full gap-4">
          <div className="h-6 w-1/4 bg-gray-300 rounded-md"></div> {/* ID */}
          <div className="h-8 w-1/2 bg-gray-300 rounded-md"></div> {/* Title */}
          <hr />
          <div className="mt-1 h-5 w-3/4 bg-gray-300 rounded-md"></div>{" "}
          {/* Body Line 1 */}
          <div className="h-5 w-2/3 bg-gray-300 rounded-md"></div>{" "}
          {/* Body Line 2 */}
          <div className="h-6 w-1/3 bg-gray-300 rounded-md"></div> {/* Date */}
        </div>
      </div>

      {/* Comment Form Prompt Skeleton */}
      <div className="mt-4">
        <div className="h-6 w-1/2 bg-blue-200 rounded-md mx-auto"></div>
      </div>

      {/* Comments Section Title */}
      <h4 className="text-xl text-gray-400 ps-1 mb-2 mt-7">comments</h4>

      {/* Comment Skeletons */}
      <div className="space-y-4">
        {Array(3)
          .fill(null)
          .map((_, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-200 rounded-lg border-2 border-gray-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="h-6 w-1/4 bg-gray-400 rounded-md"></div>{" "}
                {/* User Name */}
                <div className="h-6 w-1/5 bg-yellow-700 rounded-md"></div>{" "}
                {/* Date */}
              </div>
              <div className="h-5 w-3/4 bg-gray-300 rounded-md mb-2"></div>{" "}
              {/* Comment Text */}
              <div className="flex justify-end gap-3">
                <div className="h-6 w-6 bg-green-600 rounded-md"></div>{" "}
                {/* Edit Icon */}
                <div className="h-6 w-6 bg-red-600 rounded-md"></div>{" "}
                {/* Trash Icon */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
