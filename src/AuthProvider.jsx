import {  createContext, useEffect, useState } from "react";
import { app } from "../firebase.config";
import {
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
    })
    return () => unsubscribed;
},[])

const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleLogin,
    logOut,
}
return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
);
};

export default AuthProvider;
