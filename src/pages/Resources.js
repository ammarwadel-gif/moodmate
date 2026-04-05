import { useState } from 'react';

function Resources() {
  const [activeTab, setActiveTab] = useState('articles');
  
  const articles = [
    {
      title: 'كيف تتعاملين مع القلق؟',
      content: 'القلق شعور طبيعي يمر به الجميع. إليك بعض النصائح: مارس تمارين التنفس، تحدث مع شخص تثقين به، اكتبي مخاوفك في مفكرة...',
      icon: '😰',
      link: 'https://www.nas.org.eg/ar'
    },
    {
      title: 'العناية بالصحة النفسية خلال الدورة الشهرية',
      content: 'التغيرات الهرمونية تؤثر على مزاجك. احرصي على الراحة، تناولي طعاماً صحياً، مارسي الرياضة الخفيفة، واشربي الكثير من الماء...',
      icon: '📅',
      link: 'https://www.who.int/ar/news-room/fact-sheets/detail/menstrual-health'
    },
    {
      title: 'تمارين الاسترخاء للمراهقات',
      content: 'جربي التأمل لمدة 5 دقائق يومياً، استمعي لموسيقى هادئة، اقرئي كتاباً مفضلاً، تحدثي مع صديقة عن مشاعرك...',
      icon: '🧘‍♀️',
      link: 'https://www.unicef.org/egypt/'
    }
  ];
  
  const videos = [
    {
      title: 'تمارين تنفس عميق للاسترخاء',
      url: 'https://www.youtube.com/embed/temId6U0M7o',
      duration: '5 دقائق',
      thumbnail: '🧘‍♀️'
    },
    {
      title: 'كيف تتعاملين مع القلق - نصائح نفسية',
      url: 'https://www.youtube.com/embed/WWloia6G2wQ',
      duration: '8 دقائق',
      thumbnail: '😰'
    },
    {
      title: 'تأمل للمبتدئين في 10 دقائق',
      url: 'https://www.youtube.com/embed/ZToicYcHIOU',
      duration: '10 دقائق',
      thumbnail: '🌿'
    }
  ];
  
  const supportLines = [
    {
      country: '🇪🇬 مصر',
      number: '16328',
      organization: 'خط الدعم النفسي - وزارة الصحة'
    },
    {
      country: '🇸🇦 السعودية',
      number: '920033360',
      organization: 'مركز الصحة النفسية - وزارة الصحة'
    },
    {
      country: '🇦🇪 الإمارات',
      number: '800 4673',
      organization: 'خط المساعدة النفسية'
    },
    {
      country: '🌍 عربي',
      number: '+962 6 562 4747',
      organization: 'خط المساعدة النفسية العربي'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          📚 الموارد والدعم النفسي
        </h1>
        
        {/* التبويبات */}
        <div className="bg-white rounded-2xl p-2 shadow-lg mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === 'articles' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-600 hover:bg-purple-100'
            }`}
          >
            📝 مقالات
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === 'videos' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-600 hover:bg-purple-100'
            }`}
          >
            🎥 فيديوهات
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === 'support' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-600 hover:bg-purple-100'
            }`}
          >
            📞 دعم نفسي
          </button>
        </div>
        
        {/* قسم المقالات */}
        {activeTab === 'articles' && (
          <div className="grid gap-6">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="text-5xl text-center">{article.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-purple-700 mb-2">{article.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{article.content}</p>
                    <a 
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-semibold"
                    >
                      اقرأ المزيد →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* قسم الفيديوهات */}
        {activeTab === 'videos' && (
          <div className="grid gap-6">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <h3 className="text-2xl font-bold text-purple-700 mb-3">{video.title}</h3>
                <p className="text-gray-600 mb-3">⏱️ المدة: {video.duration}</p>
                <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
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
        
        {/* قسم الدعم النفسي */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 text-center">
              <div className="text-5xl mb-4">🆘</div>
              <h3 className="text-2xl font-bold text-red-700 mb-2">إذا كنتِ بحاجة للمساعدة فوراً</h3>
              <p className="text-gray-700">
                هذه الأرقام مجانية ومتاحة 24 ساعة طوال أيام الأسبوع
              </p>
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
      </div>
    </div>
  );
}

export default Resources;