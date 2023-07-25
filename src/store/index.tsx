import React from 'react';

import { recordList, recordListType } from '@/utils/constants/recordList';

type ContextType = {
  recordList: recordListType[];
};

export const MainContext = React.createContext<ContextType>({
  recordList: [],
});

export default function MainContextProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  const contextValue: ContextType = {
    recordList: recordList,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
}
