const articlesSkeleton = [1, 2, 3, 4];

const ArticlesLoading = () => {
  return (
    <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="my-5 w-full md:w-2/3 m-auto bg-gray-300 h-12 rounded"></div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
        {articlesSkeleton.map((item, ind) => {
          return (
            <div className="group relative cursor-pointer" key={ind}>
              {/* Image skeleton */}
              <div className="w-full h-52 lg:h-80 bg-gray-300 animate-pulse rounded-md"></div>

              {/* Content skeleton */}
              <div className="mt-4 flex justify-between">
                <div className="w-full">
                  {/* Title skeleton */}
                  <div className="h-4 bg-gray-300 animate-pulse rounded-md w-2/3 mb-2"></div>
                  <hr />
                  {/* Body skeleton */}
                  <div className="h-3 bg-gray-300 animate-pulse rounded-md w-full mt-2"></div>
                  <div className="h-3 bg-gray-300 animate-pulse rounded-md w-4/5 mt-1"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticlesLoading;
