import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../components/Form/LoginForm/validator";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { RegisterData } from "../components/Form/RegisterForm/validator";
import { RecoverPasswordData } from "../components/Form/RecoverPasswordForm/validator";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  signIn: (data: LoginData) => void;
  loading: boolean;
  registerUser: (data: RegisterData) => void;
  userLogout: () => void;
  isErrorModalOpen: boolean;
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  recoverPassword: (data: RecoverPasswordData) => void
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("@token");
    if (!token) {
      setLoading(false);
      return;
    }
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  const signIn = async (data: LoginData) => {
    try {
      const response = await api.post("/login", data);
      const { token } = response.data;
      api.defaults.headers.common.Authorization = `Beares ${token}`;
      localStorage.setItem("@token", token);
      navigate("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (data: RegisterData) => {
    const { confirmPassword, ...registerData } = data;

    try {
      await api.post("/users", registerData);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  const userLogout = () => {
    navigate("/");
    localStorage.removeItem("@token");
  };

  const recoverPassword = async (data: RecoverPasswordData) => {
    try {
      await api.post("/password", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        loading,
        registerUser,
        userLogout,
        isErrorModalOpen,
        setIsErrorModalOpen,
        recoverPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
