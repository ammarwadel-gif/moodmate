function Games() {
  const games = [
    {
      name: '🧠 لعبة الذاكرة',
      description: 'اختاري البطاقات المتطابقة وقوي ذاكرتك',
      icon: '🧠',
      url: 'https://www.memozor.com/ar/memory-games/for-kids'
    },
    {
      name: '🎨 تلوين ماندالا',
      description: 'استرخي مع التلوين وهدئ أعصابك',
      icon: '🎨',
      url: 'https://www.colorit.com/pages/mandala-coloring-pages'
    },
    {
      name: '📝 الكلمات المتقاطعة',
      description: 'لعبة تفكير ممتعة تنشط العقل',
      icon: '📝',
      url: 'https://www.arabic-crosswords.com/'
    },
    {
      name: '🧩 ألغاز ذكاء',
      description: 'حل الألغاز واستمتع بتحدي عقلك',
      icon: '🧩',
      url: 'https://www.brain-den.com/'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-4">
          🎮 ألعاب للاسترخاء والتفكير
        </h1>
        
        <p className="text-center text-gray-700 mb-8 text-lg">
          الألعاب تساعد على الاسترخاء وتقليل التوتر وتحسين المزاج
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 text-center group">
              <div className="text-7xl mb-4 group-hover:scale-110 transition duration-300">{game.icon}</div>
              <h2 className="text-xl font-bold text-purple-700 mb-2">{game.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>
              <a 
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition inline-block w-full"
              >
                ابدأ اللعب 🎮
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center">
          <p className="text-purple-700">
            💡 خذي استراحة لمدة 10 دقائق يومياً للعب هذه الألعاب، ستلاحظين تحسناً في مزاجك
          </p>
        </div>
      </div>
    </div>
  );
}

export default Games;