export const GearGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-2.5">
          <div className="w-full aspect-square bg-slate-200 rounded-xl mb-2"></div>
          <div className="h-3 w-12 bg-slate-200 rounded mb-1.5"></div>
          <div className="h-3.5 w-full bg-slate-200 rounded mb-1.5"></div>
          <div className="h-3 w-2/3 bg-slate-200 rounded mb-2.5"></div>
          <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export const TechniqueListSkeleton = () => {
  return (
    <div className="space-y-2.5 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-3.5">
          <div className="flex justify-between items-center mb-2">
            <div className="h-3 w-14 bg-slate-200 rounded"></div>
            <div className="h-3.5 w-14 bg-slate-200 rounded-full"></div>
          </div>
          <div className="h-4 w-3/4 bg-slate-200 rounded mb-2"></div>
          <div className="h-3 w-full bg-slate-200 rounded mb-1.5"></div>
          <div className="h-3 w-4/5 bg-slate-200 rounded mb-3"></div>
          <div className="h-3 w-1/3 bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};
