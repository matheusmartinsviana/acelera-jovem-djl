export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
