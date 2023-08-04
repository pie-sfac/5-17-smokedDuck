import axios from 'axios';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { mutate as globalMutate } from 'swr';

import { deleteCategory } from '@/apis/Category';
import { deleteLink, LINK_URL } from '@/apis/Media';
import DeleteModal from '@/components/Common/DeleteModal/DeleteModal';
import useCategory from '@/hooks/useCategory';
import useRecord from '@/hooks/useRecord';
import { MainContext } from '@/store';
import {
  GetLinkDetailResponse,
  GetLinkListResponse,
} from '@/types/media.interface';
import { recordListType } from '@/types/recordList.interface';

type DeleteModalPropsType = {
  id: number | number[];
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  text: string;
};
const baseUrl = import.meta.env.VITE_BASE_URL as string;

export default function DeleteModalContainer({
  id,
  title,
  text,
  setDeleteModalOpen,
}: DeleteModalPropsType) {
  const { pathname } = useLocation();

  const { loginToken, selectedIds, setSelectedIds } = useContext(MainContext);
  const { recordListData, mutate } = useRecord();
  const { categoryListData, mutate: mustateCategory } = useCategory();

  const handleDeleteClick = async () => {
    const headers = {
      Authorization: `Bearer ${loginToken}`,
      'Content-Type': 'application/json',
    };

    if (pathname === '/record' && recordListData) {
      const newRecordList: recordListType = recordListData.filter(
        (item: { id: number }) => item.id !== id
      );

      await mutate(
        axios.delete(`${baseUrl}/record-templates/${Number(id)}`, { headers }),
        {
          optimisticData: newRecordList,
          populateCache: false,
        }
      );
    }

    if (pathname === '/media') {
      deleteLink(Number(id), loginToken);
      globalMutate(
        [LINK_URL, loginToken],
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
    }

    if (pathname === '/category') {
      selectedIds.map((id: number) => deleteCategory(id, loginToken));
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
      mustateCategory(updatedCategoryListData, false);
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
    />
  );
}
