export const BreakingNewsTicker = () => {
  const breakingNews = [
    "🔴 Live: Major policy announcement expected at 6 PM",
    "⚡ Breaking: Tech giant announces revolutionary product",
    "📢 Update: International summit reaches historic agreement",
  ];

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <span className="bg-white text-red-600 px-3 py-1 rounded font-bold text-sm mr-4 flex-shrink-0">
          BREAKING
        </span>
        <div className="animate-marquee whitespace-nowrap">
          {breakingNews.map((news, index) => (
            <span key={index} className="mx-8">
              {news}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
