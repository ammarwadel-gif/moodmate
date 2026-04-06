function Games() {
  // ألعاب بسيطة مجانية بدون حقوق طبع ونشر - كلها تعمل مباشرة في المتصفح
  const games = [
    {
      name: '🧩 لعبة الأرقام 2048',
      description: 'لعبة ألغاز بسيطة - ادمجي الأرقام لتصلين إلى 2048',
      icon: '🧩',
      url: 'https://play2048.co/'
    },
    {
      name: '🧠 لعبة الذاكرة',
      description: 'اختاري البطاقات المتطابقة - لعبة مجانية لتقوية الذاكرة',
      icon: '🧠',
      url: 'https://www.memozor.com/ar/memory-games'
    },
    {
      name: '🎨 تلوين ماندالا',
      description: 'ألوان جميلة لتهدئة الأعصاب والاسترخاء',
      icon: '🎨',
      url: 'https://www.supercoloring.com/ar/categories/mandala'
    },
    {
      name: '🧩 لعبة سودوكو',
      description: 'لعبة أرقام كلاسيكية لتنشيط العقل والتركيز',
      icon: '🔢',
      url: 'https://sudoku.com/ar'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-4">🎮 ألعاب للاسترخاء والتفكير</h1>
        <p className="text-center text-gray-700 mb-8 text-lg">
          خذي استراحة واستمتعي بهذه الألعاب المجانية - تساعد على تقليل التوتر وتحسين المزاج
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <a 
              key={index}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 text-center group cursor-pointer transform hover:-translate-y-2"
            >
              <div className="text-7xl mb-4 group-hover:scale-110 transition duration-300">{game.icon}</div>
              <h2 className="text-xl font-bold text-purple-700 mb-2">{game.name}</h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{game.description}</p>
              <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg group-hover:bg-purple-700 transition text-sm">
                ابدأ اللعب 🎮
              </span>
            </a>
          ))}
        </div>
        
        <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center">
          <p className="text-purple-700">
            ✨ خذي استراحة لمدة 10 دقائق يومياً للعب - ستلاحظين تحسناً في مزاجك ✨
          </p>
        </div>
        
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>💡 جميع الألعاب مجانية وآمنة ومناسبة لجميع الأعمار - بدون حقوق طبع ونشر</p>
        </div>
      </div>
    </div>
  );
}

export default Games;