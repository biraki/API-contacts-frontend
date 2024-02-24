import { ReactNode, createContext, useState } from "react";
interface InfoContactModalProps {
  children: ReactNode;
}

interface InfoContactModalValues {
  toggleInfoContactModal: () => void;
  isInfoContactModalOpen: boolean;
}

export const InfoContactModalContext = createContext<InfoContactModalValues>(
  {} as InfoContactModalValues
);

export const InfoContactModalProvider = ({
  children,
}: InfoContactModalProps) => {
  const [isInfoContactModalOpen, setIsInfoContactModalOpen] = useState(false);

  const toggleInfoContactModal = () => {
    setIsInfoContactModalOpen(!isInfoContactModalOpen);
  };

  return (
    <InfoContactModalContext.Provider
      value={{ isInfoContactModalOpen, toggleInfoContactModal }}
    >
      {children}
    </InfoContactModalContext.Provider>
  );
};
