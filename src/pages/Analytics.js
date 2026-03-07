import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function Analytics() {
  const [moodData, setMoodData] = useState([]);
  const [, setPeriodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEntries: 0,
    mostCommonMood: '',
    averageMood: 0,
    moodByPeriod: {}
  });
  
  const user = auth.currentUser;
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000'];
  
  const moodTranslation = {
    '😊': 'سعيدة',
    '😢': 'حزينة',
    '😠': 'غضبانة',
    '😴': 'متعبة',
    '😰': 'قلقة'
  };

  const getMoodValue = (mood) => {
    const values = { '😊': 5, '😢': 2, '😠': 1, '😴': 3, '😰': 2 };
    return values[mood] || 3;
  };

  const calculateStats = (moods, periods) => {
    if (moods.length === 0) return;
    
    const totalEntries = moods.length;
    
    const moodCounts = {};
    moods.forEach(m => {
      moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
    });
    
    let mostCommonMood = '😊';
    let maxCount = 0;
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonMood = mood;
      }
    });
    
    const totalMood = moods.reduce((sum, m) => sum + getMoodValue(m.mood), 0);
    const averageMood = (totalMood / moods.length).toFixed(1);
    
    const moodByPeriod = {
      'قبل الدورة': 0,
      'أثناء الدورة': 0,
      'بعد الدورة': 0
    };
    
    if (periods.length > 0) {
      moods.forEach(mood => {
        const moodDate = mood.date;
        
        let periodPhase = 'بعد الدورة';
        for (let i = 0; i < periods.length; i++) {
          const period = periods[i];
          const periodStart = period.startDate;
          const periodEnd = new Date(periodStart);
          periodEnd.setDate(periodEnd.getDate() + (period.periodLength || 5));
          
          const prePeriodStart = new Date(periodStart);
          prePeriodStart.setDate(prePeriodStart.getDate() - 7);
          
          if (moodDate >= prePeriodStart && moodDate < periodStart) {
            periodPhase = 'قبل الدورة';
            break;
          } else if (moodDate >= periodStart && moodDate <= periodEnd) {
            periodPhase = 'أثناء الدورة';
            break;
          }
        }
        
        moodByPeriod[periodPhase] += getMoodValue(mood.mood);
      });
    }
    
    setStats({
      totalEntries,
      mostCommonMood: moodTranslation[mostCommonMood] || mostCommonMood,
      averageMood,
      moodByPeriod
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const moodsQuery = query(
          collection(db, 'moods'),
          where('userId', '==', user.uid),
          orderBy('date', 'asc')
        );
        
        const moodsSnapshot = await getDocs(moodsQuery);
        const moods = [];
        moodsSnapshot.forEach((doc) => {
          const data = doc.data();
          moods.push({
            ...data,
            date: data.date.toDate(),
            moodValue: getMoodValue(data.mood)
          });
        });
        setMoodData(moods);
        
        const periodsQuery = query(
          collection(db, 'periods'),
          where('userId', '==', user.uid),
          orderBy('startDate', 'asc')
        );
        
        const periodsSnapshot = await getDocs(periodsQuery);
        const periods = [];
        periodsSnapshot.forEach((doc) => {
          const data = doc.data();
          periods.push({
            ...data,
            startDate: data.startDate.toDate()
          });
        });
        setPeriodData(periods);
        
        calculateStats(moods, periods);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const lineChartData = moodData.map(m => ({
    name: m.date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' }),
    value: m.moodValue,
    mood: m.mood
  }));

  const pieChartData = Object.entries(
    moodData.reduce((acc, m) => {
      acc[m.mood] = (acc[m.mood] || 0) + 1;
      return acc;
    }, {})
  ).map(([mood, count]) => ({
    name: moodTranslation[mood] || mood,
    value: count,
    mood
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">⏳</div>
          <p className="text-xl text-purple-700">جاري تحميل التحليلات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          📊 التحليلات والإحصائيات
        </h1>
        
        {moodData.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-xl text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              لا توجد بيانات كافية للتحليل
            </h2>
            <p className="text-gray-600 mb-6">
              قومي بتسجيل مزاجك لبضعة أيام لتبدأ التحليلات بالظهور
            </p>
            <button
              onClick={() => window.location.href = '/mood'}
              className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition"
            >
              سجلي مزاجك الآن
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="text-lg font-bold text-purple-700 mb-2">إجمالي التسجيلات</h3>
                <p className="text-3xl text-gray-800">{stats.totalEntries}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-3xl mb-2">😊</div>
                <h3 className="text-lg font-bold text-purple-700 mb-2">أكثر مزاج</h3>
                <p className="text-2xl text-gray-800">{stats.mostCommonMood}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-3xl mb-2">📈</div>
                <h3 className="text-lg font-bold text-purple-700 mb-2">متوسط المزاج</h3>
                <p className="text-3xl text-gray-800">{stats.averageMood}/5</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-6">تطور المزاج عبر الوقت</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 6]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="المزاج" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-purple-700 mb-6">توزيع المشاعر</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={entry => entry.name}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-purple-700 mb-6">المزاج حسب مرحلة الدورة</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'قبل الدورة', value: stats.moodByPeriod['قبل الدورة'] || 0 },
                        { name: 'أثناء الدورة', value: stats.moodByPeriod['أثناء الدورة'] || 0 },
                        { name: 'بعد الدورة', value: stats.moodByPeriod['بعد الدورة'] || 0 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  * تظهر هذه الإحصائية عند وجود بيانات كافية عن الدورة الشهرية
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl mt-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-6">آخر التسجيلات</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="px-4 py-3 text-right text-purple-800">التاريخ</th>
                      <th className="px-4 py-3 text-right text-purple-800">المزاج</th>
                      <th className="px-4 py-3 text-right text-purple-800">ملاحظة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moodData.slice(-5).reverse().map((mood, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-4 py-3">
                          {mood.date.toLocaleDateString('ar-EG')}
                        </td>
                        <td className="px-4 py-3 text-2xl">{mood.mood}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {mood.note || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Analytics;