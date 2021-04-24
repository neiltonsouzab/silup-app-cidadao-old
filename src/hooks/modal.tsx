import React, { createContext, useCallback, useState, useContext } from 'react';

import ModalContainer from '../components/ModalContainer';

interface ModalContextData {
  show(): void;
  hidden(): void;
  init(modalContent: React.FC): void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState<React.FC>();

  const init = useCallback((modalContent: React.FC) => {
    setContent(modalContent);
  }, []);

  const show = useCallback(() => {
    setIsShowing(true);
  }, []);

  const hidden = useCallback(() => {
    setIsShowing(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        show,
        hidden,
        init,
      }}
    >
      {children}
      {isShowing && (
        <ModalContainer onTouchStart={hidden}>{content}</ModalContainer>
      )}
    </ModalContext.Provider>
  );
};

function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be use within a ModalProvider');
  }

  return context;
}

export { ModalProvider, useModal };
