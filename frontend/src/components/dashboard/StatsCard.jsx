"use client"

const StatsCard = ({ stat, onClick }) => {
  const Icon = stat.icon

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
              {stat.value}
            </p>
            <p className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {stat.change} from last month
            </p>
          </div>
          <div className={`p-3 rounded-full ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
            <Icon className={`h-6 w-6 ${stat.color}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard
