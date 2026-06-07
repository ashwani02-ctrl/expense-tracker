// _components/BudgetListSkeleton.jsx

export default function BudgetListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="h-40 rounded-lg bg-slate-200 animate-pulse"
        />
      ))}
    </div>
  );
}