import { useState } from 'react';

function Resources() {
  const [activeTab, setActiveTab] = useState('articles');
  
  const articles = [
    {
      title: '📝 الصحة النفسية للمراهقات',
      content: 'نصائح وإرشادات للتعامل مع الضغوط النفسية خلال فترة المراهقة. تعلمي كيف تعتني بصحتك النفسية.',
      link: 'https://www.who.int/ar/news-room/fact-sheets/detail/adolescent-mental-health'
    },
    {
      title: '😌 كيف تتغلبين على القلق',
      content: 'طرق بسيطة وفعالة للتخلص من التوتر والقلق اليومي. تمارين تنفس ونصائح عملية.',
      link: 'https://www.mayoclinic.org/ar/diseases-conditions/anxiety/symptoms-causes/syc-20350961'
    },
    {
      title: '😴 أهمية النوم للصحة النفسية',
      content: 'تعرفي على علاقة النوم الجيد بالمزاج والصحة النفسية. نصائح لتحسين جودة نومك.',
      link: 'https://www.sleepfoundation.org/mental-health'
    },
    {
      title: '💪 كيفية بناء الثقة بالنفس',
      content: 'خطوات عملية لتعزيز ثقتك بنفسك وتقدير ذاتك. ابدأي رحلتك نحو شخصية أقوى.',
      link: 'https://www.psychologytoday.com/us/basics/self-esteem'
    }
  ];
  
  const videos = [
    {
      title: 'تمارين تنفس عميق للاسترخاء',
      url: 'https://www.youtube.com/embed/3vXj2mYwWxI',
      duration: '5 دقائق'
    },
    {
      title: 'كيف تتغلبين على القلق - نصائح عملية',
      url: 'https://www.youtube.com/embed/WWloia6G2wQ',
      duration: '8 دقائق'
    },
    {
      title: 'تأمل للمبتدئين - 10 دقائق',
      url: 'https://www.youtube.com/embed/ZToicYcHIOU',
      duration: '10 دقائق'
    }
  ];
  
  const supportLines = [
    { country: '🇪🇬 مصر', number: '16328', organization: 'خط الدعم النفسي - وزارة الصحة' },
    { country: '🇸🇦 السعودية', number: '920033360', organization: 'مركز الصحة النفسية' },
    { country: '🇦🇪 الإمارات', number: '800 4673', organization: 'خط المساعدة النفسية' },
    { country: '🇯🇴 الأردن', number: '110', organization: 'الخط الوطني للمساعدة' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">📚 الموارد والدعم</h1>
        
        {/* التبويبات */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button onClick={() => setActiveTab('articles')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'articles' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-100'}`}>📝 مقالات</button>
          <button onClick={() => setActiveTab('videos')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'videos' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-100'}`}>🎥 فيديوهات</button>
          <button onClick={() => setActiveTab('support')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'support' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-100'}`}>📞 دعم نفسي</button>
        </div>
        
        {/* المقالات */}
        {activeTab === 'articles' && (
          <div className="grid gap-6">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-bold text-purple-700 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.content}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 font-semibold">اقرأ المزيد →</a>
              </div>
            ))}
          </div>
        )}
        
        {/* الفيديوهات */}
        {activeTab === 'videos' && (
          <div className="grid gap-6">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-700 mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-3">⏱️ المدة: {video.duration}</p>
                <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
                  <iframe src={video.url} title={video.title} className="absolute top-0 left-0 w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* أرقام الدعم */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 text-center">
              <div className="text-5xl mb-4">🆘</div>
              <h3 className="text-2xl font-bold text-red-700 mb-2">إذا كنتِ بحاجة للمساعدة فوراً</h3>
              <p className="text-gray-700">هذه الأرقام مجانية ومتاحة 24 ساعة</p>
            </div>
            <div className="grid gap-4">
              {supportLines.map((line, index) => (
                <div key={index} className="border rounded-xl p-4 hover:bg-purple-50 transition">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div><h4 className="font-bold text-lg">{line.country}</h4><p className="text-sm text-gray-600">{line.organization}</p></div>
                    <p className="text-2xl font-bold text-purple-700" dir="ltr">{line.number}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resources;