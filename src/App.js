import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import MoodTracker from './pages/MoodTracker';
import PeriodTracker from './pages/PeriodTracker';
import Analytics from './pages/Analytics';
import Resources from './pages/Resources';
import ProtectedRoute from './components/ProtectedRoute';
import ChatBot from './components/ChatBot';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl text-center text-purple-800 mb-4 font-bold">
          🌸 MoodMate
        </h1>
        
        <p className="text-xl md:text-2xl text-center text-gray-700 mb-12">
          رفيقتك في رحلة الصحة النفسية
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* بطاقة تسجيل المزاج */}
          <div 
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
            onClick={() => window.location.href = '/mood'}
          >
            <div className="text-5xl mb-4 text-center">📝</div>
            <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">
              سجلي مزاجك
            </h2>
            <p className="text-gray-600 text-center">
              كيف تشعرين اليوم؟ اختاري مشاعرك وسجليها
            </p>
          </div>

          {/* بطاقة الدورة الشهرية */}
          <div 
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
            onClick={() => window.location.href = '/period'}
          >
            <div className="text-5xl mb-4 text-center">📅</div>
            <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">
              الدورة الشهرية
            </h2>
            <p className="text-gray-600 text-center">
              تتبعي دورتك واعرفي تأثيرها على مزاجك
            </p>
          </div>

          {/* بطاقة التحليلات */}
          <div 
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
            onClick={() => window.location.href = '/analytics'}
          >
            <div className="text-5xl mb-4 text-center">📊</div>
            <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">
              التحليلات
            </h2>
            <p className="text-gray-600 text-center">
              شوفي الأنماط والرسوم البيانية لمزاجك
            </p>
          </div>
        </div>

        {/* بطاقة الموارد (تحت البطاقات) */}
        <div 
          className="mt-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
          onClick={() => window.location.href = '/resources'}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="text-4xl">📚</div>
            <div>
              <h2 className="text-2xl font-bold text-purple-700 mb-1">
                الموارد والدعم
              </h2>
              <p className="text-gray-600">
                مقالات، فيديوهات، وأرقام دعم نفسي
              </p>
            </div>
          </div>
        </div>

        {/* الرسالة التحفيزية */}
        <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center">
          <p className="text-lg text-purple-700">
            "صحتك النفسية مهمة... احنا هنا عشان ندعمك 💜"
          </p>
        </div>

        {/* زر المساعدة السريعة */}
        <button className="fixed bottom-8 right-8 bg-red-500 hover:bg-red-600 text-white w-16 h-16 rounded-full text-3xl shadow-lg hover:shadow-xl transition duration-300 animate-pulse">
          🆘
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resources" element={<Resources />} />
        
        {/* الصفحات المحمية (تحتاج تسجيل دخول) */}
        <Route 
          path="/mood" 
          element={
            <ProtectedRoute>
              <MoodTracker />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/period" 
          element={
            <ProtectedRoute>
              <PeriodTracker />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      {/* شات بوت (يظهر في كل الصفحات) */}
      <ChatBot />
    </BrowserRouter>
  );
}

export default App;