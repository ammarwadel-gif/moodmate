import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Analytics() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMoods = async () => {
      if (!user) {
        setError('يجب تسجيل الدخول أولاً');
        setLoading(false);
        return;
      }

      try {
        console.log('🔄 جلب البيانات للمستخدم:', user.uid);
        
        const q = query(
          collection(db, 'moods'),
          where('userId', '==', user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        console.log('✅ عدد النتائج:', querySnapshot.size);
        
        const moodsList = [];
        querySnapshot.forEach((doc) => {
          moodsList.push({ id: doc.id, ...doc.data() });
        });
        
        setMoods(moodsList);
        
        if (moodsList.length === 0) {
          setError('لا توجد بيانات مسجلة. سجلي مزاجك أولاً');
        }
      } catch (err) {
        console.error('❌ خطأ:', err);
        setError('حدث خطأ في جلب البيانات: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMoods();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8 flex justify-center">
        <p className="text-xl">⏳ جاري التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
        <div className="bg-yellow-100 border border-yellow-400 p-4 rounded-lg text-center">
          <p className="text-yellow-800">⚠️ {error}</p>
          <button 
            onClick={() => window.location.href = '/mood'}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
          >
            سجلي مزاجك الآن
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">📊 تحليلاتك</h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">📝 تسجيلاتك ({moods.length})</h2>
          
          {moods.length === 0 ? (
            <p className="text-gray-500">لا توجد تسجيلات بعد</p>
          ) : (
            <div className="space-y-3">
              {moods.map((mood, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{mood.mood}</span>
                      <span className="font-bold">{mood.mood === '😊' ? 'سعيدة' : mood.mood === '😢' ? 'حزينة' : mood.mood === '😠' ? 'غضبانة' : mood.mood === '😴' ? 'متعبة' : 'قلقة'}</span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {mood.date?.toDate ? mood.date.toDate().toLocaleDateString('ar-EG') : 'تاريخ غير معروف'}
                    </span>
                  </div>
                  {mood.note && <p className="text-gray-600 text-sm mt-1">📌 {mood.note}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;