import { createContext, Dispatch, SetStateAction, useState } from 'react';

export type SelectedIdContext = {
  selectedIds: number[];
  setSelectedIds: Dispatch<SetStateAction<number[]>>;
};

export const SelectedIdContext = createContext<SelectedIdContext>({
  selectedIds: [],
  setSelectedIds: () => {},
});

export const SelectedIdProvider = (props: { children: React.ReactNode }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const selectedIdContextValue: SelectedIdContext = {
    selectedIds,
    setSelectedIds,
  };

  return (
    <SelectedIdContext.Provider value={selectedIdContextValue}>
      {props.children}
    </SelectedIdContext.Provider>
  );
};
