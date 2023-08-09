import axios from 'axios';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { mutate as globalMutate } from 'swr';

import { deleteCategory } from '@/apis/Category';
import { deleteLink, LINK_URL } from '@/apis/Media';
import DeleteModal from '@/components/Common/DeleteModal/DeleteModal';
import useRecord from '@/hooks/useRecord';
import { MainContext } from '@/store';
import {
  GetLinkDetailResponse,
  GetLinkListResponse,
} from '@/types/media.interface';
import { recordListType } from '@/types/recordList.interface';
import useCategory from '@/utils/categoryData';

type DeleteModalPropsType = {
  id: number | number[];
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  text: string;
  categoryId?: number;
  setIsDeleteMode?: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteModalContainer({
  id,
  title,
  text,
  setDeleteModalOpen,
  categoryId,
  setIsDeleteMode,
}: DeleteModalPropsType) {
  const { pathname } = useLocation();

  const { selectedIds, setSelectedIds } = useContext(MainContext);
  const { recordListData, mutate } = useRecord();
  const { categoryListData, mutate: mutateCategory } = useCategory();

  const handleDeleteClick = async () => {
    if (pathname === '/record' && recordListData) {
      const newRecordList: recordListType = recordListData.filter(
        (item: { id: number }) => item.id !== id
      );

      await mutate(axios.delete(`record-templates/${Number(id)}`), {
        optimisticData: newRecordList,
        populateCache: false,
      });
    }

    if (pathname === '/media') {
      deleteLink(Number(id));
      globalMutate(
        LINK_URL,
        (data: GetLinkListResponse | undefined) => {
          const updatedArchiveLinks = [...(data?.archiveLinks || [])];

          return {
            archiveLinks: updatedArchiveLinks.filter(
              (archiveLink: GetLinkDetailResponse) => archiveLink.id !== id
            ),
            message: data?.message || '',
          };
        },
        false
      );
      if (categoryListData) {
        const pickedCategory = categoryListData.categories.find(
          item => item.id === categoryId
        );

        const pickedCategoryIndex = categoryListData.categories.findIndex(
          item => item.id === categoryId
        );

        if (pickedCategory && pickedCategoryIndex) {
          const newCategory = {
            ...pickedCategory,
            totalCount: pickedCategory.totalCount - 1,
          };

          categoryListData.categories.splice(
            pickedCategoryIndex,
            1,
            newCategory
          );

          mutateCategory(categoryListData, false);
        }
      }
    }

    if (pathname === '/category') {
      selectedIds.map((id: number) => deleteCategory(id));
      const updatedCategoryList = categoryListData?.categories.slice() || [];
      selectedIds.forEach(id => {
        const index = updatedCategoryList.findIndex(item => item.id === id);
        if (index !== -1) {
          updatedCategoryList.splice(index, 1);
        }
      });

      const updatedCategoryListData = {
        ...categoryListData!,
        categories: updatedCategoryList,
      };
      mutateCategory(updatedCategoryListData, false);
      if (setIsDeleteMode) {
        setIsDeleteMode(false);
      }
      setSelectedIds([]);
    }
    setDeleteModalOpen(false);
  };

  return (
    <DeleteModal
      setDeleteModalOpen={setDeleteModalOpen}
      title={title}
      text={text}
      handleDeleteClick={handleDeleteClick}
      setIsDeleteMode={setIsDeleteMode}
    />
  );
}
