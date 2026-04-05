import { useState } from 'react';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // التحقق من صحة الإيميل
    if (!email.includes('@')) {
      setError('البريد الإلكتروني غير صحيح');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setLoading(false);
      return;
    }
    
    try {
      if (isLogin) {
        // تسجيل دخول
        await signInWithEmailAndPassword(auth, email, password);
        alert('✅ تم تسجيل الدخول بنجاح!');
        navigate('/');
      } else {
        // إنشاء حساب جديد
        await createUserWithEmailAndPassword(auth, email, password);
        alert('✅ تم إنشاء الحساب بنجاح!');
        navigate('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      // ترجمة رسائل الخطأ
      switch (error.code) {
        case 'auth/invalid-email':
          setError('البريد الإلكتروني غير صحيح');
          break;
        case 'auth/user-not-found':
          setError('لا يوجد حساب بهذا البريد الإلكتروني');
          break;
        case 'auth/wrong-password':
          setError('كلمة المرور غير صحيحة');
          break;
        case 'auth/email-already-in-use':
          setError('هذا البريد الإلكتروني مستخدم بالفعل');
          break;
        case 'auth/weak-password':
          setError('كلمة المرور ضعيفة (6 أحرف على الأقل)');
          break;
        default:
          setError('حدث خطأ، حاول مرة أخرى');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          {isLogin ? '🔐 تسجيل الدخول' : '✨ إنشاء حساب جديد'}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
            ⚠️ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              📧 البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="example@email.com"
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              🔒 كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
              required
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              كلمة المرور يجب أن تكون 6 أحرف على الأقل
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-2 px-4 rounded-lg transition duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {loading ? '⏳ جاري...' : (isLogin ? '🚪 دخول' : '📝 إنشاء حساب')}
          </button>
        </form>
        
        <p className="text-center mt-4 text-gray-600">
          {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-800 mr-1 font-bold"
            disabled={loading}
          >
            {isLogin ? 'إنشاء حساب' : 'تسجيل دخول'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;