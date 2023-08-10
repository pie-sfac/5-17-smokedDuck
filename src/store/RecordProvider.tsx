import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { RecordDetail } from '@/types/recordDetail.interface';

type RecordContext = {
  recordModalOpen: boolean;
  setRecordModalState: Dispatch<SetStateAction<boolean>>;
  isRecordEdit: boolean;
  setIsRecordEdit: Dispatch<SetStateAction<boolean>>;
  selectedRecordCard: RecordDetail | undefined;
  setSelectedRecordCard: React.Dispatch<
    React.SetStateAction<RecordDetail | undefined>
  >;
  selectedRecordCardId: number;
  setSeletedRecordCardId: Dispatch<SetStateAction<number>>;
};

export const RecordContext = createContext<RecordContext>({
  recordModalOpen: false,
  setRecordModalState: () => {},
  isRecordEdit: false,
  setIsRecordEdit: () => {},
  selectedRecordCard: {
    id: 0,
    category: '',
    title: '',
    description: '',
    questions: [],
    createdAt: '',
    updatedAt: '',
    message: '',
  },
  setSelectedRecordCard: () => {},
  selectedRecordCardId: 0,
  setSeletedRecordCardId: () => {},
});

export const RecordProvider = (props: { children: React.ReactNode }) => {
  const [recordModalState, setRecordModalState] = useState(false);
  const [isRecordEdit, setIsRecordEdit] = useState(false);
  const [selectedRecordCard, setSelectedRecordCard] = useState<RecordDetail>();
  const [selectedRecordCardId, setSeletedRecordCardId] = useState(0);

  const RecordContextValue: RecordContext = {
    recordModalOpen: recordModalState,
    setRecordModalState,
    isRecordEdit,
    setIsRecordEdit,
    selectedRecordCard,
    setSelectedRecordCard,
    selectedRecordCardId,
    setSeletedRecordCardId,
  };

  return (
    <RecordContext.Provider value={RecordContextValue}>
      {props.children}
    </RecordContext.Provider>
  );
};
