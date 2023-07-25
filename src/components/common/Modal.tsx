import styled from '@emotion/styled';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  width?: number;
  height?: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function Modal({
  width = 940,
  height = 640,
  setIsOpen,
  children,
}: ModalProps) {
  const modalContainerStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height]
  );

  const closeModal = useCallback(
    (
      e:
        | React.MouseEvent<HTMLDivElement, MouseEvent>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (e.target !== e.currentTarget) return;
      setIsOpen(false);
    },
    [setIsOpen]
  );

  return createPortal(
    <BackgroundDim onClick={e => closeModal(e)}>
      <ModalContainer
        style={{
          ...modalContainerStyle,
          transition: 'all ease 0.2s',
        }}
      >
        {children}
        <ModalCloseButton onClick={e => closeModal(e)}>X</ModalCloseButton>
      </ModalContainer>
    </BackgroundDim>,
    document.body
  );
}

const BackgroundDim = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(40, 40, 40, 0.2);
`;

const ModalContainer = styled('div')`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px 10px 10px 10px;
`;

const ModalCloseButton = styled('button')`
  font-size: 18px;
  position: fixed;
  top: 2%;
  left: 95%;
  margin: 3px;
`;
