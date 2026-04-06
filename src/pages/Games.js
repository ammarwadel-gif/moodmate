function Games() {
  const games = [
    {
      name: '🧠 لعبة الذاكرة',
      description: 'اختاري البطاقات المتطابقة - لعبة ممتعة لتقوية الذاكرة والتركيز',
      icon: '🧠',
      url: 'https://www.memozor.com/ar/memory-games'
    },
    {
      name: '🎨 تلوين ماندالا',
      description: 'ألوان جميلة لتهدئة الأعصاب والاسترخاء - فن علاجي',
      icon: '🎨',
      url: 'https://www.supercoloring.com/ar/categories/mandala'
    },
    {
      name: '🧩 ألغاز ذكاء',
      description: 'اختبر ذكاءك مع هذه الألغاز المسلية والممتعة',
      icon: '🧩',
      url: 'https://www.arabic-riddles.com/'
    },
    {
      name: '🎯 لعبة التركيز',
      description: 'لعبة بسيطة لتحسين التركيز والانتباه وتقوية الملاحظة',
      icon: '🎯',
      url: 'https://www.crazygames.com/game/puzzle-games'
    },
    {
      name: '🐱 القط الجائع',
      description: 'أطعمي القط قبل ما يهرب - لعبة مسلية وسريعة',
      icon: '🐱',
      url: 'https://www.crazygames.com/game/hungry-cat'
    },
    {
      name: '🧮 ألعاب الرياضيات',
      description: 'اختاري الأرقام الصحيحة قبل انتهاء الوقت - تحدى عقلك',
      icon: '🧮',
      url: 'https://www.coolmathgames.com/'
    },
    {
      name: '🎪 ألعاب مهارات',
      description: 'ألعاب متنوعة لتطوير المهارات والتفكير السريع',
      icon: '🎪',
      url: 'https://www.crazygames.com/c/skill'
    },
    {
      name: '🎨 ألعاب إبداعية',
      description: 'ألعاب تنمي الإبداع والخيال - استمتعي بإبداعك',
      icon: '🎨',
      url: 'https://www.crazygames.com/c/creative'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-4">🎮 ألعاب للاسترخاء والتفكير</h1>
        <p className="text-center text-gray-700 mb-8 text-lg">
          خذي استراحة واستمتعي بهذه الألعاب المجانية - الألعاب تساعد على تقليل التوتر وتحسين المزاج
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
            ✨ خذي استراحة لمدة 10 دقائق يومياً للعب، ستلاحظين تحسناً في مزاجك ✨
          </p>
        </div>
        
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>💡 جميع الألعاب مجانية وآمنة ومناسبة لجميع الأعمار</p>
        </div>
      </div>
    </div>
  );
}

export default Games;