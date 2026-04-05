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
      // 1. التحقق من تسجيل الدخول
      if (!user) {
        setError('⚠️ يجب تسجيل الدخول أولاً لعرض التحليلات.');
        setLoading(false);
        return;
      }

      try {
        console.log("🔄 [تحليلات] جلب البيانات لـ:", user.uid);
        setError(''); // مسح أي خطأ سابق

        // 2. إنشاء الاستعلام
        const moodsQuery = query(
          collection(db, 'moods'),
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );

        // 3. تنفيذ الاستعلام
        const querySnapshot = await getDocs(moodsQuery);
        console.log(`✅ [تحليلات] تم العثور على ${querySnapshot.size} تسجيلاً.`);

        // 4. معالجة النتيجة
        if (querySnapshot.empty) {
          setError('📝 لا توجد أي تسجيلات مزاج بعد. سجلي مزاجك الآن من الصفحة الرئيسية!');
          setMoods([]);
        } else {
          const fetchedMoods = [];
          querySnapshot.forEach((doc) => {
            fetchedMoods.push({ id: doc.id, ...doc.data() });
          });
          setMoods(fetchedMoods);
        }

      } catch (err) {
        // 5. عرض أي خطأ في الشبكة أو القواعد
        console.error("❌ [تحليلات] خطأ في الجلب:", err);
        setError(`💔 حدث خطأ في جلب البيانات: ${err.message}. تأكدي من اتصالك بالإنترنت وقواعد Firebase.`);
        setMoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, [user]);

  // --- حساب الإحصائيات ---
  const getStats = () => {
    let happy = 0, sad = 0, angry = 0, tired = 0, anxious = 0;
    moods.forEach(m => {
      switch(m.mood) {
        case '😊': happy++; break;
        case '😢': sad++; break;
        case '😠': angry++; break;
        case '😴': tired++; break;
        case '😰': anxious++; break;
        default: break;
      }
    });
    return { total: moods.length, happy, sad, angry, tired, anxious };
  };
  const stats = getStats();

  // --- واجهة التحميل ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="text-4xl animate-spin inline-block">⏳</div>
          <p className="text-purple-700 mt-4 text-lg">جاري تحميل تحليلاتك...</p>
          <p className="text-gray-500 text-sm mt-2">قد يستغرق هذا بضع ثوانٍ.</p>
        </div>
      </div>
    );
  }

  // --- واجهة الخطأ (سواء لا يوجد بيانات أو خطأ في الجلب) ---
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8 flex justify-center items-center">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">عذراً!</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          {error.includes('سجلي مزاجك') && (
            <button onClick={() => window.location.href = '/mood'} className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700">
              اذهب لتسجيل المزاج
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- واجهة النجاح (عرض الإحصائيات) ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">📊 تحليلاتك النفسية</h1>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 text-center shadow-md"><div className="text-3xl">📋</div><div className="text-2xl font-bold">{stats.total}</div><div>إجمالي التسجيلات</div></div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md"><div className="text-3xl">😊</div><div className="text-2xl font-bold text-green-600">{stats.happy}</div><div>سعيدة</div></div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md"><div className="text-3xl">😢</div><div className="text-2xl font-bold text-blue-600">{stats.sad}</div><div>حزينة</div></div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md"><div className="text-3xl">😠</div><div className="text-2xl font-bold text-red-600">{stats.angry}</div><div>غضبانة</div></div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-md"><div className="text-3xl">😰</div><div className="text-2xl font-bold text-yellow-600">{stats.anxious}</div><div>قلقة</div></div>
        </div>

        {/* قائمة التسجيلات */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 border-b pb-2">📋 تفاصيل تسجيلاتك</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {moods.map((mood, i) => (
              <div key={i} className="border-b border-gray-100 pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3"><span className="text-3xl">{mood.mood}</span><span className="font-semibold">{mood.mood === '😊' ? 'سعيدة' : mood.mood === '😢' ? 'حزينة' : mood.mood === '😠' ? 'غضبانة' : mood.mood === '😴' ? 'متعبة' : 'قلقة'}</span></div>
                  <span className="text-sm text-gray-500">{mood.date?.toDate ? mood.date.toDate().toLocaleDateString('ar-EG') : 'تاريخ غير معروف'}</span>
                </div>
                {mood.note && <p className="text-gray-600 text-sm mt-1 mr-10">💬 "{mood.note}"</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;