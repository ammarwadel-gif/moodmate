import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

function Analytics() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // 1. مراقبة حالة تسجيل الدخول
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. جلب البيانات عند وجود مستخدم
  useEffect(() => {
    const fetchMoods = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const q = query(
          collection(db, 'moods'),
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );
        const snapshot = await getDocs(q);
        const items = [];
        snapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setMoods(items);
      } catch (error) {
        console.error("Error fetching moods:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMoods();
  }, [user]);

  // حساب الإحصائيات
  const stats = {
    total: moods.length,
    happy: moods.filter(m => m.mood === '😊').length,
    sad: moods.filter(m => m.mood === '😢').length,
    angry: moods.filter(m => m.mood === '😠').length,
    tired: moods.filter(m => m.mood === '😴').length,
    anxious: moods.filter(m => m.mood === '😰').length
  };

  // حالة عدم تسجيل الدخول
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8 flex justify-center items-center">
        <div className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-md">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">يجب تسجيل الدخول أولاً</h2>
          <p className="text-gray-600 mb-6">لتتمكني من رؤية تحليلاتك وتسجيلاتك</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition"
          >
            اذهب لتسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  // حالة التحميل
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="text-5xl animate-spin inline-block">⏳</div>
          <p className="text-purple-700 mt-4 text-lg">جاري تحميل تحليلاتك...</p>
        </div>
      </div>
    );
  }

  // عرض التحليلات
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">📊 تحليلاتي النفسية</h1>
        
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 text-center shadow-md">
            <div className="text-4xl mb-2">📋</div>
            <div className="text-3xl font-bold text-purple-700">{stats.total}</div>
            <div className="text-gray-600">إجمالي التسجيلات</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md">
            <div className="text-4xl mb-2">😊</div>
            <div className="text-3xl font-bold text-green-600">{stats.happy}</div>
            <div className="text-gray-600">سعيدة</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md">
            <div className="text-4xl mb-2">😢</div>
            <div className="text-3xl font-bold text-blue-600">{stats.sad}</div>
            <div className="text-gray-600">حزينة</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md">
            <div className="text-4xl mb-2">😠</div>
            <div className="text-3xl font-bold text-red-600">{stats.angry}</div>
            <div className="text-gray-600">غضبانة</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md">
            <div className="text-4xl mb-2">😰</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.anxious}</div>
            <div className="text-gray-600">قلقة</div>
          </div>
        </div>
        
        {/* قائمة التسجيلات */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 border-b pb-2">📋 تفاصيل تسجيلاتي</h2>
          
          {moods.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 text-lg">لا توجد تسجيلات مزاج بعد</p>
              <button 
                onClick={() => window.location.href = '/mood'}
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                سجل مزاجك الآن
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[450px] overflow-y-auto">
              {moods.map((mood, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 hover:bg-gray-50 p-3 rounded-lg transition">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{mood.mood}</span>
                      <span className="font-semibold text-gray-800">
                        {mood.mood === '😊' ? 'سعيدة' : 
                         mood.mood === '😢' ? 'حزينة' : 
                         mood.mood === '😠' ? 'غضبانة' : 
                         mood.mood === '😴' ? 'متعبة' : 'قلقة'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {mood.date?.toDate ? mood.date.toDate().toLocaleDateString('ar-EG') : 'اليوم'}
                    </span>
                  </div>
                  {mood.note && (
                    <p className="text-gray-600 text-sm mt-2 mr-12 bg-gray-50 p-2 rounded-lg">
                      💬 {mood.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* نصيحة */}
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 text-center">
          <p className="text-purple-800">
            💜 تذكري: تسجيل مشاعرك يساعدك على فهم نفسك بشكل أفضل
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;