import { useState } from 'react';
import { createContext } from 'react';

import { CategoryList } from '@/types/category.interface';

type CategoryContext = {
  storedCategoryList: CategoryList[] | undefined;
  setStoredCategoryList: (
    storedCategoryList: CategoryList[] | undefined
  ) => void;
};

export const CategoryContext = createContext<CategoryContext>({
  storedCategoryList: [],
  setStoredCategoryList: () => {},
});

export const CategoryProvider = (props: { children: React.ReactNode }) => {
  const [storedCategoryList, setStoredCategoryList] =
    useState<CategoryList[]>();

  const categoryContextValue: CategoryContext = {
    storedCategoryList,
    setStoredCategoryList,
  };

  return (
    <CategoryContext.Provider value={categoryContextValue}>
      {props.children}
    </CategoryContext.Provider>
  );
};
