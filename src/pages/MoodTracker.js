import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

function MoodTracker() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [todayMood, setTodayMood] = useState(null);
  const user = auth.currentUser;

  const moods = [
    { emoji: '😊', label: 'سعيدة', color: 'bg-green-100' },
    { emoji: '😢', label: 'حزينة', color: 'bg-blue-100' },
    { emoji: '😠', label: 'غضبانة', color: 'bg-red-100' },
    { emoji: '😴', label: 'متعبة', color: 'bg-gray-100' },
    { emoji: '😰', label: 'قلقة', color: 'bg-yellow-100' },
  ];

  // نجيب تسجيل النهاردة لو موجود
  useEffect(() => {
    const getTodayMood = async () => {
      if (!user) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const q = query(
        collection(db, 'moods'),
        where('userId', '==', user.uid),
        where('date', '>=', today)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setTodayMood(querySnapshot.docs[0].data());
      }
    };

    getTodayMood();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mood) {
      alert('اختاري مزاجك الأول');
      return;
    }

    try {
      await addDoc(collection(db, 'moods'), {
        userId: user.uid,
        mood: mood,
        note: note,
        date: new Date(),
        createdAt: new Date()
      });

      alert('تم تسجيل مزاجك 💜');
      setMood('');
      setNote('');
      
      // نحدث الصفحة
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('حصل خطأ، حاولي تاني');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          📝 سجلي مزاجك اليوم
        </h1>

        {todayMood ? (
          // لو سجلت النهاردة
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="text-6xl mb-4">{todayMood.mood}</div>
            <p className="text-xl text-gray-700 mb-4">لقد سجلت مزاجك اليوم بالفعل</p>
            {todayMood.note && (
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                ملاحظتك: {todayMood.note}
              </p>
            )}
            <p className="text-sm text-gray-400 mt-4">
              تعالي بكرة تسجلي تاني 💜
            </p>
          </div>
        ) : (
          // لو مسجلتش
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-bold mb-4">
                كيف تشعرين اليوم؟
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {moods.map((m) => (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setMood(m.emoji)}
                    className={`p-4 rounded-xl text-2xl ${m.color} ${
                      mood === m.emoji ? 'ring-4 ring-purple-500 scale-105' : ''
                    } transition duration-200`}
                  >
                    <div>{m.emoji}</div>
                    <div className="text-xs mt-1 text-gray-600">{m.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                ملاحظة إضافية (إختياري)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                rows="4"
                placeholder="شاركينا مشاعرك..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              سجلي مزاجي 💜
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default MoodTracker;