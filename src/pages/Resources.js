import { useState } from 'react';

function Resources() {
  const [activeTab, setActiveTab] = useState('articles');
  
  const articles = [
    {
      title: 'كيف تتعاملين مع القلق؟',
      content: 'القلق شعور طبيعي يمر به الجميع. إليك بعض النصائح: مارس تمارين التنفس، تحدث مع شخص تثقين به، اكتبي مخاوفك...',
      icon: '😰'
    },
    {
      title: 'العناية بالصحة النفسية خلال الدورة الشهرية',
      content: 'التغيرات الهرمونية تؤثر على مزاجك. احرصي على الراحة، تناولي طعاماً صحياً، مارسي الرياضة الخفيفة...',
      icon: '📅'
    },
    {
      title: 'تمارين الاسترخاء للمراهقات',
      content: 'جربي التأمل لمدة 5 دقائق يومياً، استمعي لموسيقى هادئة، اقرئي كتاباً مفضلاً، تحدثي مع صديقة...',
      icon: '🧘‍♀️'
    },
    {
      title: 'كيف تبني ثقتك بنفسك؟',
      content: 'قدر نفسك، تقبلي عيوبك، ضعي أهدافاً صغيرة وحققيها، احتفلي بإنجازاتك مهما كانت صغيرة...',
      icon: '✨'
    }
  ];
  
  const videos = [
    {
      title: 'تمارين تنفس عميق',
      url: 'https://www.youtube.com/watch?v=example1',
      duration: '5 دقائق',
      thumbnail: '🧘‍♀️'
    },
    {
      title: 'كيف تتعاملين مع الضغط الدراسي',
      url: 'https://www.youtube.com/watch?v=example2',
      duration: '8 دقائق',
      thumbnail: '📚'
    },
    {
      title: 'التأمل للمبتدئين',
      url: 'https://www.youtube.com/watch?v=example3',
      duration: '10 دقائق',
      thumbnail: '🌿'
    }
  ];
  
  const supportLines = [
    {
      country: 'مصر',
      number: '0800 888 0700',
      organization: 'خط ساخن للصحة النفسية'
    },
    {
      country: 'السعودية',
      number: '920033360',
      organization: 'وزارة الصحة'
    },
    {
      country: 'الإمارات',
      number: '800 4673',
      organization: 'خط المساعدة النفسية'
    },
    {
      country: 'الأردن',
      number: '110',
      organization: 'الخط الوطني للمساعدة'
    },
    {
      country: 'فلسطين',
      number: '121',
      organization: 'دعم نفسي'
    }
  ];
  
  const apps = [
    {
      name: 'Headspace',
      description: 'تطبيق للتأمل والاسترخاء',
      icon: '🧠'
    },
    {
      name: 'Calm',
      description: 'قصص للنوم وتمارين تنفس',
      icon: '😌'
    },
    {
      name: 'BetterHelp',
      description: 'دعم نفسي عبر الإنترنت',
      icon: '💬'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          📚 الموارد والدعم
        </h1>
        
        {/* تبويبات التنقل */}
        <div className="bg-white rounded-2xl p-2 shadow-lg mb-8 flex justify-center gap-2">
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
          <button
            onClick={() => setActiveTab('apps')}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === 'apps' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-600 hover:bg-purple-100'
            }`}
          >
            📱 تطبيقات
          </button>
        </div>
        
        {/* محتوى المقالات */}
        {activeTab === 'articles' && (
          <div className="grid gap-6">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{article.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-700 mb-2">{article.title}</h3>
                    <p className="text-gray-600">{article.content}</p>
                    <button className="mt-4 text-purple-600 hover:text-purple-800 font-semibold">
                      اقرأ المزيد →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* محتوى الفيديوهات */}
        {activeTab === 'videos' && (
          <div className="grid gap-6">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{video.thumbnail}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-700 mb-1">{video.title}</h3>
                    <p className="text-gray-600 mb-2">المدة: {video.duration}</p>
                    <a 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                      مشاهدة الفيديو
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* محتوى أرقام الدعم */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 text-center">
              <div className="text-5xl mb-4">🆘</div>
              <h3 className="text-2xl font-bold text-red-700 mb-2">هل أنت في أزمة؟</h3>
              <p className="text-gray-700 mb-4">
                إذا كنت تشعرين برغبة في إيذاء نفسك أو لديك أفكار انتحارية، اتصلي فوراً بأحد هذه الأرقام
              </p>
            </div>
            
            <div className="grid gap-4">
              {supportLines.map((line, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:bg-purple-50 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-800">{line.country}</h4>
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
              جميع الأرقام مجانية ومتاحة 24/7
            </p>
          </div>
        )}
        
        {/* محتوى التطبيقات */}
        {activeTab === 'apps' && (
          <div className="grid gap-6">
            {apps.map((app, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{app.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-700 mb-1">{app.name}</h3>
                    <p className="text-gray-600">{app.description}</p>
                    <button className="mt-2 text-purple-600 hover:text-purple-800 font-semibold">
                      زيارة الموقع →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Resources;