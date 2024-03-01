import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../components/Form/LoginForm/validator";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface User {
  id: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  superUser: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  signIn: (data: LoginData) => void;
  loading: boolean;
  userLogout: () => void;
  isErrorModalOpen: boolean;
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser: User | undefined;
  setLoggedUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem("@token");
    const getUserByToken = async () => {
      if (token) {
        setLoading(false);
        try {
          const { data } = await api.get("users/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoggedUser(data)
          navigate("/Dashboard");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    getUserByToken();
    setLoading(false);
  }, []);

  const signIn = async (data: LoginData) => {
    try {
      const response = await api.post("/login", data);
      const { token } = response.data;
      const { id } = response.data.user;
      api.defaults.headers.common.Authorization = `Beares ${token}`;
      localStorage.setItem("@token", token);
      localStorage.setItem("@id", id);
      setLoggedUser(response.data.user);
      toast.success("Login realizado com sucesso");
      navigate("dashboard");
    } catch (error: any) {
      error.message && toast.error("E-mail ou senha incorretos");
    }
  };

  const userLogout = () => {
    navigate("/");
    localStorage.removeItem("@token");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        loading,
        userLogout,
        isErrorModalOpen,
        setIsErrorModalOpen,
        loggedUser,
        setLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
