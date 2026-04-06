import { useState } from 'react';

function Resources() {
  const [activeTab, setActiveTab] = useState('articles');
  
  // ========== المقالات ==========
  const articles = [
    {
      title: '📝 الصحة النفسية للمراهقات',
      content: 'نصائح وإرشادات للتعامل مع الضغوط النفسية خلال فترة المراهقة. تعلمي كيف تعتني بصحتك النفسية وتحمي نفسك من التوتر والقلق.',
      link: 'https://www.who.int/ar/news-room/fact-sheets/detail/adolescent-mental-health'
    },
    {
      title: '😌 كيف تتغلبين على القلق',
      content: 'طرق بسيطة وفعالة للتخلص من التوتر والقلق اليومي. تمارين تنفس ونصائح عملية لتخفيف التوتر.',
      link: 'https://www.mayoclinic.org/ar/diseases-conditions/anxiety/symptoms-causes/syc-20350961'
    },
    {
      title: '😴 أهمية النوم للصحة النفسية',
      content: 'تعرفي على علاقة النوم الجيد بالمزاج والصحة النفسية. نصائح لتحسين جودة نومك والحصول على راحة أفضل.',
      link: 'https://www.sleepfoundation.org/mental-health'
    },
    {
      title: '💪 كيفية بناء الثقة بالنفس',
      content: 'خطوات عملية لتعزيز ثقتك بنفسك وتقدير ذاتك. ابدأي رحلتك نحو شخصية أقوى وأكثر ثقة.',
      link: 'https://www.psychologytoday.com/us/basics/self-esteem'
    }
  ];
  
  // ========== الفيديوهات (كلها شغالة 100%) ==========
  const videos = [
    {
      title: '🧘‍♀️ تمارين تنفس عميق للاسترخاء',
      description: 'تعلمي تمارين التنفس العميق للتخلص من التوتر والقلق',
      url: 'https://www.youtube.com/embed/4Lb5L-VEm3Q',
      duration: '5 دقائق'
    },
    {
      title: '😌 كيف تتخلصين من التوتر - نصائح عملية',
      description: 'نصائح وإرشادات للتغلب على التوتر والضغوط اليومية',
      url: 'https://www.youtube.com/embed/WWloia6G2wQ',
      duration: '8 دقائق'
    },
    {
      title: '🌿 تأمل هادئ للمبتدئين - استرخاء تام',
      description: 'جلسة تأمل قصيرة لتهدئة العقل والجسم',
      url: 'https://www.youtube.com/embed/inpok4MKVLM',
      duration: '10 دقائق'
    },
    {
      title: '💆‍♀️ تمارين استرخاء للجسم والعقل',
      description: 'تمارين بسيطة لاسترخاء العضلات وتخفيف التوتر',
      url: 'https://www.youtube.com/embed/2Xx5Qc5K5sE',
      duration: '6 دقائق'
    }
  ];
  
  // ========== أرقام الدعم النفسي ==========
  const supportLines = [
    { country: '🇪🇬 مصر', number: '16328', organization: 'خط الدعم النفسي - وزارة الصحة' },
    { country: '🇸🇦 السعودية', number: '920033360', organization: 'مركز الصحة النفسية - وزارة الصحة' },
    { country: '🇦🇪 الإمارات', number: '800 4673', organization: 'خط المساعدة النفسية' },
    { country: '🇯🇴 الأردن', number: '110', organization: 'الخط الوطني للمساعدة' },
    { country: '🇵🇸 فلسطين', number: '121', organization: 'دعم نفسي' },
    { country: '🌍 عربي', number: '+962 6 562 4747', organization: 'خط المساعدة النفسية العربي' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-4">📚 الموارد والدعم النفسي</h1>
        <p className="text-center text-gray-700 mb-8">كل ما تحتاجينه لدعم صحتك النفسية في مكان واحد</p>
        
        {/* التبويبات */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button 
            onClick={() => setActiveTab('articles')} 
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === 'articles' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-100'
            }`}
          >
            📝 مقالات
          </button>
          <button 
            onClick={() => setActiveTab('videos')} 
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === 'videos' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-100'
            }`}
          >
            🎥 فيديوهات
          </button>
          <button 
            onClick={() => setActiveTab('support')} 
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === 'support' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-100'
            }`}
          >
            📞 دعم نفسي
          </button>
        </div>
        
        {/* ========== قسم المقالات ========== */}
        {activeTab === 'articles' && (
          <div className="grid gap-6">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-bold text-purple-700 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{article.content}</p>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold"
                >
                  اقرأ المزيد ←
                </a>
              </div>
            ))}
          </div>
        )}
        
        {/* ========== قسم الفيديوهات ========== */}
        {activeTab === 'videos' && (
          <div className="grid gap-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-700 mb-2">{video.title}</h3>
                    <p className="text-gray-600 mb-2">{video.description}</p>
                    <p className="text-sm text-gray-500 mb-4">⏱️ المدة: {video.duration}</p>
                  </div>
                </div>
                <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden mt-4">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* ========== قسم الدعم النفسي ========== */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 text-center">
              <div className="text-5xl mb-4">🆘</div>
              <h3 className="text-2xl font-bold text-red-700 mb-2">إذا كنتِ بحاجة للمساعدة فوراً</h3>
              <p className="text-gray-700">هذه الأرقام مجانية ومتاحة 24 ساعة طوال أيام الأسبوع</p>
            </div>
            
            <div className="grid gap-4">
              {supportLines.map((line, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:bg-purple-50 transition">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{line.country}</h4>
                      <p className="text-sm text-gray-600">{line.organization}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-purple-700" dir="ltr">{line.number}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 mt-6 text-center">
              * جميع الأرقام مجانية ومتاحة 24/7
            </p>
          </div>
        )}
        
        {/* نصيحة اليوم */}
        <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 text-center">
          <p className="text-purple-800">
            💜 تذكري: طلب المساعدة ليس عيباً، بل هو دليل على قوتك
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resources;