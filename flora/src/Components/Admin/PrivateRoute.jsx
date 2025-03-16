import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { auth } from './firebase'; 

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return <div></div>; 
  }

  if (!user) {
    return <Navigate to="/" />; 
  }

  return children; 
};

export default PrivateRoute;
