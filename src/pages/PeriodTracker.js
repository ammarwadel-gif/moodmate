import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

function PeriodTracker() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28); // متوسط طول الدورة
  const [periodLength, setPeriodLength] = useState(5); // متوسط طول أيام الحيض
  const [periods, setPeriods] = useState([]);
  const [predictions, setPredictions] = useState({});
  const user = auth.currentUser;

  // نجيب آخر الدورات المسجلة
  useEffect(() => {
    const fetchPeriods = async () => {
      if (!user) return;

      const q = query(
        collection(db, 'periods'),
        where('userId', '==', user.uid),
        orderBy('startDate', 'desc'),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const periodsData = [];
      querySnapshot.forEach((doc) => {
        periodsData.push({ id: doc.id, ...doc.data() });
      });
      setPeriods(periodsData);

      // لو في دورات مسجلة، نستخدم آخر دورة
      if (periodsData.length > 0) {
        const last = periodsData[0].startDate.toDate();
        const year = last.getFullYear();
        const month = String(last.getMonth() + 1).padStart(2, '0');
        const day = String(last.getDate()).padStart(2, '0');
        setLastPeriod(`${year}-${month}-${day}`);
      }
    };

    fetchPeriods();
  }, [user]);

  // نحسب التوقعات
  useEffect(() => {
    if (lastPeriod && cycleLength) {
      const lastDate = new Date(lastPeriod);
      
      // تاريخ الدورة الجاية
      const nextPeriod = new Date(lastDate);
      nextPeriod.setDate(lastDate.getDate() + cycleLength);
      
      // أيام التبويض (عادة يوم 14 قبل الدورة الجاية)
      const ovulation = new Date(nextPeriod);
      ovulation.setDate(nextPeriod.getDate() - 14);
      
      // أيام الخصوبة (حوالي 5 أيام قبل وبعد التبويض)
      const fertileStart = new Date(ovulation);
      fertileStart.setDate(ovulation.getDate() - 5);
      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(ovulation.getDate() + 1);

      setPredictions({
        nextPeriod: nextPeriod.toLocaleDateString('ar-EG'),
        ovulation: ovulation.toLocaleDateString('ar-EG'),
        fertileWindow: `${fertileStart.toLocaleDateString('ar-EG')} - ${fertileEnd.toLocaleDateString('ar-EG')}`
      });
    }
  }, [lastPeriod, cycleLength]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!lastPeriod) {
      alert('اختاري تاريخ آخر دورة');
      return;
    }

    try {
      await addDoc(collection(db, 'periods'), {
        userId: user.uid,
        startDate: new Date(lastPeriod),
        cycleLength: parseInt(cycleLength),
        periodLength: parseInt(periodLength),
        createdAt: new Date()
      });

      alert('تم تسجيل الدورة 💜');
      
      // نحدث الصفحة
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('حصل خطأ، حاولي تاني');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          📅 متابعة الدورة الشهرية
        </h1>

        {/* نموذج تسجيل الدورة */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">تسجيل دورة جديدة</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                تاريخ آخر دورة
              </label>
              <input
                type="date"
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">
                طول الدورة (عدد الأيام)
              </label>
              <input
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                min="20"
                max="40"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">المتوسط 28 يوم</p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">
                مدة الحيض (عدد الأيام)
              </label>
              <input
                type="number"
                value={periodLength}
                onChange={(e) => setPeriodLength(e.target.value)}
                min="2"
                max="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">المتوسط 5 أيام</p>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                تسجيل الدورة
              </button>
            </div>
          </form>
        </div>

        {/* التوقعات */}
        {predictions.nextPeriod && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">📅</div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">الدورة القادمة</h3>
              <p className="text-2xl text-gray-800">{predictions.nextPeriod}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">🥚</div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">يوم التبويض</h3>
              <p className="text-2xl text-gray-800">{predictions.ovulation}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">أيام الخصوبة</h3>
              <p className="text-lg text-gray-800">{predictions.fertileWindow}</p>
            </div>
          </div>
        )}

        {/* تاريخ الدورات السابقة */}
        {periods.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">الدورات السابقة</h2>
            
            <div className="space-y-4">
              {periods.map((period, index) => (
                <div key={period.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800">
                        {period.startDate.toDate().toLocaleDateString('ar-EG')}
                      </p>
                      <p className="text-sm text-gray-600">
                        الدورة: {period.cycleLength} يوم | الحيض: {period.periodLength} أيام
                      </p>
                    </div>
                    {index === 0 && (
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        آخر دورة
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PeriodTracker;