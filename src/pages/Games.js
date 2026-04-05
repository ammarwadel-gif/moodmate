function Games() {
  const games = [
    {
      name: '🧠 لعبة الذاكرة',
      description: 'اختاري البطاقات المتطابقة',
      icon: '🧠',
      url: 'https://www.memozor.com/ar/memory-games'
    },
    {
      name: '🎨 تلوين للأطفال',
      description: 'استرخي مع التلوين',
      icon: '🎨',
      url: 'https://www.coloring.ws/arabic.htm'
    },
    {
      name: '🧩 سودوكو',
      description: 'لعبة أرقام للتركيز',
      icon: '🧩',
      url: 'https://www.arabic-sudoku.com/'
    },
    {
      name: '😊 ألغاز مضحكة',
      description: 'تحدي عقلك مع الألغاز',
      icon: '😄',
      url: 'https://www.arabic-lang.org/riddles/'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">🎮 ألعاب للاسترخاء</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <a 
              key={index}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition text-center block"
            >
              <div className="text-6xl mb-4">{game.icon}</div>
              <h2 className="text-xl font-bold text-purple-700 mb-2">{game.name}</h2>
              <p className="text-gray-600">{game.description}</p>
              <div className="mt-4 text-purple-600">اضغطي للعب →</div>
            </a>
          ))}
        </div>
        
        <div className="mt-8 bg-white/50 rounded-2xl p-4 text-center">
          <p>✨ كل هذه الألعاب مجانية وآمنة</p>
        </div>
      </div>
    </div>
  );
}

export default Games;