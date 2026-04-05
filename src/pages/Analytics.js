import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

function Analytics() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, happy: 0, sad: 0, angry: 0, tired: 0, anxious: 0 });
  const user = auth.currentUser;

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
        
        const querySnapshot = await getDocs(q);
        const moodsList = [];
        
        querySnapshot.forEach((doc) => {
          moodsList.push({ id: doc.id, ...doc.data() });
        });
        
        setMoods(moodsList);
        
        // حساب الإحصائيات
        let happy = 0, sad = 0, angry = 0, tired = 0, anxious = 0;
        moodsList.forEach(m => {
          if (m.mood === '😊') happy++;
          else if (m.mood === '😢') sad++;
          else if (m.mood === '😠') angry++;
          else if (m.mood === '😴') tired++;
          else if (m.mood === '😰') anxious++;
        });
        
        setStats({ total: moodsList.length, happy, sad, angry, tired, anxious });
        
      } catch (error) {
        console.error('خطأ:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMoods();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="text-4xl animate-bounce">⏳</div>
          <p className="text-purple-700 mt-4">جاري تحميل تحليلاتك...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">📊 تحليلاتك النفسية</h1>
        
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl">📝</div>
            <div className="text-2xl font-bold text-purple-700">{stats.total}</div>
            <div className="text-sm text-gray-600">إجمالي التسجيلات</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl">😊</div>
            <div className="text-2xl font-bold text-green-600">{stats.happy}</div>
            <div className="text-sm text-gray-600">سعيدة</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl">😢</div>
            <div className="text-2xl font-bold text-blue-600">{stats.sad}</div>
            <div className="text-sm text-gray-600">حزينة</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl">😠</div>
            <div className="text-2xl font-bold text-red-600">{stats.angry}</div>
            <div className="text-sm text-gray-600">غضبانة</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl">😰</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.anxious}</div>
            <div className="text-sm text-gray-600">قلقة</div>
          </div>
        </div>
        
        {/* قائمة التسجيلات */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">📋 آخر تسجيلاتك</h2>
          
          {moods.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600">لا توجد تسجيلات بعد</p>
              <button 
                onClick={() => window.location.href = '/mood'}
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                سجلي مزاجك الآن
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {moods.map((mood, index) => (
                <div key={index} className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{mood.mood}</span>
                      <span className="font-semibold text-gray-700">
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
                    <p className="text-gray-600 text-sm mt-1 mr-8">💬 {mood.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* نصيحة اليوم */}
        <div className="mt-6 bg-purple-100 rounded-2xl p-4 text-center">
          <p className="text-purple-700">
            💜 تذكري: صحتك النفسية مهمة، ونحن هنا لدعمك في كل خطوة
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;