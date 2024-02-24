import  { ReactNode, createContext, useState } from "react";
interface AddContactModalProps {
  children: ReactNode;
}

interface AddContactModalValues {
  toggleAddContactModal: () => void;
  isAddContactModalOpen: boolean;
}

export const AddContactModalContext = createContext<AddContactModalValues>(
  {} as AddContactModalValues
);

export const AddContactModalProvider = ({ children }: AddContactModalProps) => {
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const toggleAddContactModal = () => {
    setIsAddContactModalOpen(!isAddContactModalOpen);
  };

  return (
    <AddContactModalContext.Provider
      value={{ isAddContactModalOpen, toggleAddContactModal }}
    >
      {children}
    </AddContactModalContext.Provider>
  );
};
