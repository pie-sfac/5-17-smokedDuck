import { createContext, Dispatch, SetStateAction, useState } from 'react';

type QuestionContext = {
  mediaModalOpen: boolean;
  setMediaModalState: Dispatch<SetStateAction<boolean>>;
};

export const MediaContext = createContext<QuestionContext>({
  mediaModalOpen: false,
  setMediaModalState: () => {},
});

export const MediaProvider = (props: { children: React.ReactNode }) => {
  const [mediaModalState, setMediaModalState] = useState(false);

  const mediaContextValue: QuestionContext = {
    mediaModalOpen: mediaModalState,
    setMediaModalState,
  };

  return (
    <MediaContext.Provider value={mediaContextValue}>
      {props.children}
    </MediaContext.Provider>
  );
};
