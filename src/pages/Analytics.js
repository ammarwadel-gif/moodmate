import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

function Analytics() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMoods = async () => {
      console.log("🚀 بدء جلب البيانات...");
      
      if (!user) {
        console.log("❌ لا يوجد مستخدم مسجل");
        setError("يجب تسجيل الدخول أولاً");
        setLoading(false);
        return;
      }

      console.log("✅ المستخدم موجود:", user.uid);
      
      try {
        // استعلام لجلب المودز الخاصة بهذا المستخدم فقط
        const moodsQuery = query(
          collection(db, 'moods'),
          where('userId', '==', user.uid),  // نفس الـ userId اللي في Firebase
          orderBy('date', 'desc')
        );
        
        console.log("📡 جاري تنفيذ الاستعلام...");
        const querySnapshot = await getDocs(moodsQuery);
        console.log("📊 عدد المستندات:", querySnapshot.size);
        
        const moodsList = [];
        querySnapshot.forEach((doc) => {
          console.log("📄 بيانات المستند:", doc.id, doc.data());
          moodsList.push({
            id: doc.id,
            mood: doc.data().mood,
            note: doc.data().note || '',
            date: doc.data().date?.toDate() || new Date()
          });
        });
        
        console.log("✅ تم تحميل:", moodsList.length, "تسجيل");
        setMoods(moodsList);
        
        if (moodsList.length === 0) {
          setError("لا توجد تسجيلات مزاج بعد. سجل مزاجك الآن!");
        }
        
      } catch (err) {
        console.error("❌ خطأ في الجلب:", err);
        setError("حدث خطأ: " + err.message);
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

  // حالة التحميل
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="text-5xl animate-spin inline-block">⏳</div>
          <p className="text-purple-700 mt-4 text-lg">جاري تحميل التحليلات...</p>
          <p className="text-gray-500 text-sm mt-2">افتح F12 → Console لمتابعة الخطوات</p>
        </div>
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8 flex justify-center items-center">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
          {error.includes('سجل') && (
            <button 
              onClick={() => window.location.href = '/mood'}
              className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
            >
              سجل مزاجك الآن
            </button>
          )}
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
          <div className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-2">📋</div>
            <div className="text-3xl font-bold text-purple-700">{stats.total}</div>
            <div className="text-gray-600">إجمالي التسجيلات</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-2">😊</div>
            <div className="text-3xl font-bold text-green-600">{stats.happy}</div>
            <div className="text-gray-600">سعيدة</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-2">😢</div>
            <div className="text-3xl font-bold text-blue-600">{stats.sad}</div>
            <div className="text-gray-600">حزينة</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-2">😠</div>
            <div className="text-3xl font-bold text-red-600">{stats.angry}</div>
            <div className="text-gray-600">غضبانة</div>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-2">😰</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.anxious}</div>
            <div className="text-gray-600">قلقة</div>
          </div>
        </div>
        
        {/* جدول التسجيلات */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 border-b pb-2">📋 تفاصيل تسجيلاتي</h2>
          
          {moods.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600">لا توجد تسجيلات مزاج بعد</p>
              <button 
                onClick={() => window.location.href = '/mood'}
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                سجل مزاجك الآن
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[450px] overflow-y-auto">
              {moods.map((mood, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 hover:bg-gray-50 p-2 rounded-lg transition">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{mood.mood}</span>
                      <span className="font-semibold text-gray-800">
                        {mood.mood === '😊' ? 'سعيدة' : 
                         mood.mood === '😢' ? 'حزينة' : 
                         mood.mood === '😠' ? 'غضبانة' : 
                         mood.mood === '😴' ? 'متعبة' : 
                         mood.mood === '😰' ? 'قلقة' : 'غير معروف'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {mood.date.toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                  {mood.note && (
                    <p className="text-gray-600 text-sm mt-2 mr-10 bg-gray-50 p-2 rounded-lg">
                      💬 "{mood.note}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* نصيحة اليوم */}
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 text-center">
          <p className="text-purple-800">
            💜 تذكري: مشاعرك مهمة، وتدوينها يساعدك على فهم نفسك بشكل أفضل
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;