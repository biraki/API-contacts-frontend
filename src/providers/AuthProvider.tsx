import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../components/Form/LoginForm/validator";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { RegisterData } from "../components/Form/RegisterForm/validator";
import { RecoverPasswordData } from "../components/Form/RecoverPasswordForm/validator";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ResetPassordRequest, ResetPasswordData } from "../components/Form/ResetPasswordForm/validator";

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
  recoverPassword: (data: RecoverPasswordData) => void;
  resetPassword: (data: ResetPassordRequest, tokenUrl: string) => void;
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
      toast.success("Login realizado com sucesso")
      navigate("dashboard");
    } catch (error: any) {
      (error.message && toast.error("E-mail ou senha incorretos"));
    }
  };

  const registerUser = async (data: RegisterData) => {
    const { confirmPassword, ...registerData } = data;

    try {
      await api.post("/users", registerData);
      toast.success("Cadastro realizado com sucesso")
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
      toast.success("O link foi enviado para o e-mail cadastrado")
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error("Email invalido")
    }
  }

  const resetPassword = async (data: ResetPassordRequest, tokenUrl: string) => {
    console.log(data)
    try {
      await api.patch(`/password/${tokenUrl}`, data)
      toast.success("A senha foi alterada com sucesso")
      navigate("/")
    }  catch (error) {
      console.log(error);
      toast.error("Senha invalida")
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
        recoverPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
