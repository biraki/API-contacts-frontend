import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { RegisterData } from "../components/Form/RegisterForm/validator";
import { RecoverPasswordData } from "../components/Form/RecoverPasswordForm/validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResetPassordRequest } from "../components/Form/ResetPasswordForm/validator";
import { UpdateUserData } from "../components/Form/UpdateUserForm/validator";
import { AuthContext } from "./AuthProvider";

export interface User {
  id: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  superUser: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextValues {
  registerUser: (data: RegisterData) => void;
  recoverPassword: (data: RecoverPasswordData) => void;
  resetPassword: (data: ResetPassordRequest, tokenUrl: string) => void;
  isUpdateUserModalOpen: boolean;
  isDeleteUserModalOpen: boolean;
  toggleUpdateUserModal: () => void;
  toggleDeleteUserModal: () => void;
  deleteUser: (userId: string) => void;
  updateUser:(data: UpdateUserData, userId: string) => void;
  getUserById: (userId: string) => void;
  selectedUser: User;
}

export const UserContext = createContext<UserContextValues>(
  {} as UserContextValues
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { setLoggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>({} as User)
  
  const registerUser = async (data: RegisterData) => {
    const { confirmPassword, ...registerData } = data;

    try {
      await api.post("/users", registerData);
      toast.success("Cadastro realizado com sucesso");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}`);
      setSelectedUser(response.data)
    } catch (error) {
      console.log(error);
    }
  };


  const updateUser = async (data: UpdateUserData, userId: string) => {
    try {
      const response = await api.patch(`/users/${userId}`, data);
      toast.success("Usuario atualizado com sucesso");
      setLoggedUser(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      console.log(userId)
      await api.delete(`/users/${userId}`)
      toast.success("Conta Deletada");
      navigate("/");
    }
   catch (error) {
    console.log(error)
   }
  }

  const recoverPassword = async (data: RecoverPasswordData) => {
    try {
      await api.post("/password", data);
      toast.success("O link foi enviado para o e-mail cadastrado");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Email invalido");
    }
  };

  const resetPassword = async (data: ResetPassordRequest, tokenUrl: string) => {
    console.log(data);
    try {
      await api.patch(`/password/${tokenUrl}`, data);
      toast.success("A senha foi alterada com sucesso");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Senha invalida");
    }
  };

  const toggleUpdateUserModal = () => {
    setIsUpdateUserModalOpen(!isUpdateUserModalOpen);
  };

  const toggleDeleteUserModal = () => {
    setIsDeleteUserModalOpen(!isDeleteUserModalOpen);
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        recoverPassword,
        resetPassword,
        isUpdateUserModalOpen,
        isDeleteUserModalOpen,
        toggleUpdateUserModal,
        toggleDeleteUserModal,
        deleteUser,
        updateUser,
        getUserById,
        selectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
