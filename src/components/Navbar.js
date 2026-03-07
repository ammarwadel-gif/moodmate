import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* اللوجو */}
          <div 
            className="text-2xl font-bold text-purple-700 cursor-pointer hover:text-purple-900 transition"
            onClick={() => window.location.href = '/'}
          >
            🌸 MoodMate
          </div>
          
          {/* الروابط */}
          <div className="flex gap-4 items-center">
            <button 
              className="text-gray-600 hover:text-purple-700 transition"
              onClick={() => window.location.href = '/'}
            >
              الرئيسية
            </button>
            
            <button 
              className="text-gray-600 hover:text-purple-700 transition"
              onClick={() => window.location.href = '/resources'}
            >
              الموارد
            </button>
            
            {user ? (
              <>
                <button 
                  className="text-gray-600 hover:text-purple-700 transition"
                  onClick={() => window.location.href = '/mood'}
                >
                  سجلي مزاجك
                </button>
                
                <button 
                  className="text-gray-600 hover:text-purple-700 transition"
                  onClick={() => window.location.href = '/period'}
                >
                  الدورة
                </button>
                
                <button 
                  className="text-gray-600 hover:text-purple-700 transition"
                  onClick={() => window.location.href = '/analytics'}
                >
                  التحليلات
                </button>
                
                {/* عرض البريد الإلكتروني */}
                <span className="text-purple-600 mx-2 text-sm hidden md:inline">
                  {user.email}
                </span>
                
                {/* زر تسجيل الخروج */}
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                  onClick={handleLogout}
                >
                  تسجيل خروج
                </button>
              </>
            ) : (
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                onClick={() => window.location.href = '/login'}
              >
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;