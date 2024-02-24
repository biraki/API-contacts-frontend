import  { ReactNode, createContext, useState } from "react";
interface UpdateContactModalProps {
  children: ReactNode;
}

interface UpdateContactModalValues {
  toggleUpdateContactModal: () => void;
  isUpdateContactModalOpen: boolean;
}

export const UpdateContactModalContext = createContext<UpdateContactModalValues>(
  {} as UpdateContactModalValues
);

export const UpdateContactModalProvider = ({ children }: UpdateContactModalProps) => {
  const [isUpdateContactModalOpen, setIsUpdateContactModalOpen] = useState(false);

  const toggleUpdateContactModal = () => {
    setIsUpdateContactModalOpen(!isUpdateContactModalOpen);
  };

  return (
    <UpdateContactModalContext.Provider
      value={{ isUpdateContactModalOpen, toggleUpdateContactModal }}
    >
      {children}
    </UpdateContactModalContext.Provider>
  );
};
