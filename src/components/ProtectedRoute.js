import { useEffect } from 'react';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // نتأكد إذا في user مسجل دخول ولا لأ
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // لو مش مسجل، نروح لصفحة login
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return children;
}

export default ProtectedRoute;