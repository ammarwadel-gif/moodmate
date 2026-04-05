import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Analytics() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const getData = async () => {
      console.log("1. بدأنا نجيب البيانات");
      
      if (!user) {
        console.log("2. مفيش مستخدم");
        setError("مفيش مستخدم مسجل");
        setLoading(false);
        return;
      }
      
      console.log("3. User ID:", user.uid);
      
      try {
        const q = query(collection(db, 'moods'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        console.log("4. عدد النتايج:", snapshot.size);
        
        const items = [];
        snapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() });
        });
        
        setMoods(items);
        console.log("5. تم التحميل");
      } catch (err) {
        console.error("6. خطأ:", err);
        setError(err.message);
      }
      
      setLoading(false);
    };
    
    getData();
  }, [user]);

  if (loading) return <div className="p-8 text-center">⏳ جاري التحميل...</div>;
  if (error) return <div className="p-8 text-center text-red-600">❌ خطأ: {error}</div>;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📊 التحليلات</h1>
      <p>عدد التسجيلات: {moods.length}</p>
      {moods.map((m, i) => (
        <div key={i} className="border p-2 my-2">
          {m.mood} - {m.note || 'بدون ملاحظة'}
        </div>
      ))}
    </div>
  );
}

export default Analytics;