interface SkeletonProps {
  amount: number
}

export function MsgSkeleton() {
    return(
        <>
            <div className={`relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}>
              <div className="flex p-4">
                <div className="h-5 w-5 rounded-md bg-gray-200" />
                <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
              </div>
              <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
                <div className="h-7 w-20 rounded-md bg-gray-200" />
              </div>
            </div>
        </>
    )
}

export function MsgsSkeleton({ amount }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <MsgSkeleton key={index} />
      ))}
    </>
  );
}
