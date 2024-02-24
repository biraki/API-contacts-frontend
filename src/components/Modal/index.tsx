import { ReactNode, RefObject } from "react";
import { Container } from "./styles";
import { useOutclick } from "../../hooks/useOutclick";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  openModal?: () => void;
}

export const Modal = ({ children, openModal }: ModalProps) => {
  const ref = useOutclick(() => {
    if (openModal) {
      openModal();
    }
  }) as RefObject<HTMLDivElement>;

  return createPortal(
    <Container>
      <div role="dialog" ref={ref}>
        {children}
      </div>
    </Container>,
    document.body
  );
};
