export const GearGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-3">
          <div className="w-full aspect-square bg-slate-200 rounded-xl mb-2.5"></div>
          <div className="h-3 w-14 bg-slate-200 rounded-full mb-2"></div>
          <div className="h-4 w-full bg-slate-200 rounded-md mb-2"></div>
          <div className="h-3 w-2/3 bg-slate-200 rounded-md mb-3"></div>
          <div className="h-3 w-1/2 bg-slate-200 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export const TechniqueListSkeleton = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="h-3 w-16 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-16 bg-slate-200 rounded-full"></div>
          </div>
          <div className="h-5 w-3/4 bg-slate-200 rounded-md mb-2"></div>
          <div className="h-3 w-full bg-slate-200 rounded-md mb-1.5"></div>
          <div className="h-3 w-4/5 bg-slate-200 rounded-md mb-3"></div>
          <div className="h-3 w-1/3 bg-slate-200 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};
